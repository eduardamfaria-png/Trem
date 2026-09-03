import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { LINES, CATEGORIES } from "./lines-data.js";
import {
  isValidLine,
  insertUpdate,
  getRecentUpdatesForLine,
  getLatestUpdatePerLine,
  confirmUpdate,
} from "./db.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

function lineStatus(lineId, latestByLine) {
  const update = latestByLine.get(lineId);
  if (!update) return { severity: "ok", label: "Sem relatos recentes", updatedAt: null };
  const category = CATEGORIES.find((c) => c.id === update.category);
  return {
    severity: category?.severity || "ok",
    label: category?.label || update.category,
    updatedAt: update.created_at,
  };
}

app.get("/api/lines", (req, res) => {
  const latest = getLatestUpdatePerLine();
  const latestByLine = new Map(latest.map((u) => [u.line_id, u]));
  const lines = LINES.map((line) => ({
    ...line,
    status: lineStatus(line.id, latestByLine),
  }));
  res.json({ lines, categories: CATEGORIES });
});

app.get("/api/lines/:lineId/updates", (req, res) => {
  const { lineId } = req.params;
  if (!isValidLine(lineId)) return res.status(404).json({ error: "Linha não encontrada" });
  const updates = getRecentUpdatesForLine(lineId, 100);
  res.json({ updates });
});

app.post("/api/lines/:lineId/updates", (req, res) => {
  const { lineId } = req.params;
  if (!isValidLine(lineId)) return res.status(404).json({ error: "Linha não encontrada" });

  const { station, category, message, authorName } = req.body || {};
  const validCategory = CATEGORIES.find((c) => c.id === category);
  if (!validCategory) return res.status(400).json({ error: "Categoria inválida" });
  if (message && message.length > 500) {
    return res.status(400).json({ error: "Mensagem muito longa" });
  }

  const update = insertUpdate({
    lineId,
    station: typeof station === "string" ? station.slice(0, 120) : null,
    category,
    message: typeof message === "string" ? message.slice(0, 500) : null,
    authorName: typeof authorName === "string" ? authorName.slice(0, 60) : null,
  });

  io.to(`line:${lineId}`).emit("update:new", update);
  io.emit("line:status-changed", { lineId });
  res.status(201).json({ update });
});

app.post("/api/updates/:id/confirm", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Id inválido" });
  const update = confirmUpdate(id);
  if (!update) return res.status(404).json({ error: "Atualização não encontrada" });
  io.to(`line:${update.line_id}`).emit("update:confirmed", update);
  res.json({ update });
});

io.on("connection", (socket) => {
  socket.on("line:subscribe", (lineId) => {
    if (isValidLine(lineId)) socket.join(`line:${lineId}`);
  });
  socket.on("line:unsubscribe", (lineId) => {
    socket.leave(`line:${lineId}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Trem server rodando na porta ${PORT}`);
});
