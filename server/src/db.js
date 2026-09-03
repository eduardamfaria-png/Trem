import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LINES } from "./lines-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "trem.db");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    line_id TEXT NOT NULL,
    station TEXT,
    category TEXT NOT NULL,
    message TEXT,
    author_name TEXT,
    confirmations INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  );

  CREATE INDEX IF NOT EXISTS idx_updates_line_id ON updates (line_id);
`);

const validLineIds = new Set(LINES.map((l) => l.id));

export function isValidLine(lineId) {
  return validLineIds.has(lineId);
}

export function insertUpdate({ lineId, station, category, message, authorName }) {
  const stmt = db.prepare(`
    INSERT INTO updates (line_id, station, category, message, author_name)
    VALUES (@lineId, @station, @category, @message, @authorName)
  `);
  const info = stmt.run({ lineId, station: station || null, category, message: message || null, authorName: authorName || null });
  return getUpdateById(info.lastInsertRowid);
}

export function getUpdateById(id) {
  return db.prepare("SELECT * FROM updates WHERE id = ?").get(id);
}

export function getRecentUpdatesForLine(lineId, limit = 50) {
  return db
    .prepare("SELECT * FROM updates WHERE line_id = ? ORDER BY created_at DESC, id DESC LIMIT ?")
    .all(lineId, limit);
}

export function getLatestUpdatePerLine() {
  return db
    .prepare(`
      SELECT u.* FROM updates u
      INNER JOIN (
        SELECT line_id, MAX(id) AS max_id FROM updates GROUP BY line_id
      ) latest ON u.line_id = latest.line_id AND u.id = latest.max_id
    `)
    .all();
}

export function confirmUpdate(id) {
  db.prepare("UPDATE updates SET confirmations = confirmations + 1 WHERE id = ?").run(id);
  return getUpdateById(id);
}
