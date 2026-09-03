import { useEffect, useState, useCallback, useRef } from "react";
import { fetchUpdates, postUpdate, confirmUpdate, socket } from "../api";
import { timeAgo } from "../utils";
import ReportSheet from "./ReportSheet";
import TripMode from "./TripMode";
import StoriesBar from "./StoriesBar";
import StoryViewer from "./StoryViewer";
import ToastStack from "./ToastStack";

let toastSeq = 0;

export default function LineDetail({ line, categories, onBack }) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [trip, setTrip] = useState(null); // { index, distance } | null
  const [toasts, setToasts] = useState([]);
  const [story, setStory] = useState(null); // { stories, startIndex } | null
  const tripRef = useRef(trip);
  tripRef.current = trip;

  const load = useCallback(async () => {
    try {
      const data = await fetchUpdates(line.id);
      setUpdates(data.updates);
    } finally {
      setLoading(false);
    }
  }, [line.id]);

  const pushToast = useCallback((toast) => {
    const id = ++toastSeq;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 6000);

    if ("Notification" in window && Notification.permission === "granted" && document.hidden) {
      new Notification(toast.title, { body: toast.body });
    }
  }, []);

  useEffect(() => {
    load();
    socket.emit("line:subscribe", line.id);

    const onNew = (update) => {
      if (update.line_id !== line.id) return;
      setUpdates((prev) => [update, ...prev.filter((u) => u.id !== update.id)]);

      if (tripRef.current) {
        const categoryLabel = categories.find((c) => c.id === update.category)?.label || update.category;
        const stationIndex = update.station
          ? line.stations.findIndex((s) => s.name === update.station)
          : -1;
        let where = "";
        if (stationIndex >= 0) {
          const diff = stationIndex - tripRef.current.index;
          if (diff > 0) where = ` · ${diff} estação(ões) à frente`;
          else if (diff < 0) where = ` · ${-diff} estação(ões) atrás`;
          else where = " · na sua estação";
        }
        pushToast({
          severity: categories.find((c) => c.id === update.category)?.severity || "ok",
          title: `🔔 ${categoryLabel}`,
          body: `${update.station || line.name}${where}`,
        });
      }
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
  }, [line.id, line.name, line.stations, load, categories, pushToast]);

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

      <TripMode line={line} onPositionChange={setTrip} />

      <div className="route-strip">
        {line.stations.map((station, i) => (
          <div
            className={`route-stop ${trip?.index === i ? "route-stop-current" : ""}`}
            key={station.name}
          >
            <span className="route-dot" />
            <span className="route-name">{station.name}</span>
            {i < line.stations.length - 1 && <span className="route-line" />}
          </div>
        ))}
      </div>

      <StoriesBar
        updates={updates}
        categories={categories}
        onOpen={(stories, startIndex) => setStory({ stories, startIndex })}
      />

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
            {u.photo_path && (
              <img className="feed-photo" src={u.photo_path} alt="" loading="lazy" />
            )}
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
          suggestedStation={trip ? line.stations[trip.index].name : ""}
          sending={sending}
          error={sendError}
          onClose={() => setSheetOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {story && (
        <StoryViewer
          stories={story.stories}
          startIndex={story.startIndex}
          categories={categories}
          onClose={() => setStory(null)}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}

function categoryLabel(categories, id) {
  return categories.find((c) => c.id === id)?.label || id;
}
function categorySeverity(categories, id) {
  return categories.find((c) => c.id === id)?.severity || "ok";
}
