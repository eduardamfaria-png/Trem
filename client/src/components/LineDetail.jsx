import { useEffect, useState, useCallback } from "react";
import { fetchUpdates, postUpdate, confirmUpdate, socket } from "../api";
import { timeAgo } from "../utils";
import ReportSheet from "./ReportSheet";

export default function LineDetail({ line, categories, onBack }) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchUpdates(line.id);
      setUpdates(data.updates);
    } finally {
      setLoading(false);
    }
  }, [line.id]);

  useEffect(() => {
    load();
    socket.emit("line:subscribe", line.id);

    const onNew = (update) => {
      if (update.line_id !== line.id) return;
      setUpdates((prev) => [update, ...prev.filter((u) => u.id !== update.id)]);
    };
    const onConfirmed = (update) => {
      if (update.line_id !== line.id) return;
      setUpdates((prev) => prev.map((u) => (u.id === update.id ? update : u)));
    };

    socket.on("update:new", onNew);
    socket.on("update:confirmed", onConfirmed);

    return () => {
      socket.emit("line:unsubscribe", line.id);
      socket.off("update:new", onNew);
      socket.off("update:confirmed", onConfirmed);
    };
  }, [line.id, load]);

  async function handleSubmit(payload) {
    setSending(true);
    setSendError(null);
    try {
      await postUpdate(line.id, payload);
      setSheetOpen(false);
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  }

  async function handleConfirm(id) {
    try {
      await confirmUpdate(id);
    } catch {
      // silencioso: confirmação é uma ação de baixo risco
    }
  }

  return (
    <div className="line-detail" style={{ "--line-color": line.color }}>
      <button className="back-button" onClick={onBack}>
        ← Todas as linhas
      </button>

      <div className="line-detail-title">
        <span className="line-color-bar" />
        <h2>{line.name}</h2>
      </div>

      <div className="route-strip">
        {line.stations.map((station, i) => (
          <div className="route-stop" key={station}>
            <span className="route-dot" />
            <span className="route-name">{station}</span>
            {i < line.stations.length - 1 && <span className="route-line" />}
          </div>
        ))}
      </div>

      <div className="feed-header">
        <h3>Relatos recentes</h3>
      </div>

      {loading && <p className="muted center">Carregando relatos…</p>}

      {!loading && updates.length === 0 && (
        <p className="muted center">
          Nenhum relato ainda. Seja o primeiro a atualizar essa linha!
        </p>
      )}

      <ul className="feed-list">
        {updates.map((u) => (
          <li key={u.id} className={`feed-item severity-${categorySeverity(categories, u.category)}`}>
            <div className="feed-item-top">
              <strong>{categoryLabel(categories, u.category)}</strong>
              <span className="feed-time">{timeAgo(u.created_at)}</span>
            </div>
            {u.station && <p className="feed-station">📍 {u.station}</p>}
            {u.message && <p className="feed-message">{u.message}</p>}
            <div className="feed-item-bottom">
              <span className="feed-author">{u.author_name || "Passageiro anônimo"}</span>
              <button className="confirm-button" onClick={() => handleConfirm(u.id)}>
                👍 Confirmar ({u.confirmations})
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button className="fab" onClick={() => setSheetOpen(true)}>
        + Atualizar situação
      </button>

      {sheetOpen && (
        <ReportSheet
          categories={categories}
          stations={line.stations}
          sending={sending}
          error={sendError}
          onClose={() => setSheetOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function categoryLabel(categories, id) {
  return categories.find((c) => c.id === id)?.label || id;
}
function categorySeverity(categories, id) {
  return categories.find((c) => c.id === id)?.severity || "ok";
}
