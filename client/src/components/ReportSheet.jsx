import { useState } from "react";

export default function ReportSheet({ categories, stations, sending, error, onClose, onSubmit }) {
  const [category, setCategory] = useState("");
  const [station, setStation] = useState("");
  const [message, setMessage] = useState("");
  const [authorName, setAuthorName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!category) return;
    onSubmit({ category, station: station || null, message: message || null, authorName: authorName || null });
  }

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <form className="sheet" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="sheet-handle" />
        <h3>O que está acontecendo?</h3>

        <div className="category-grid">
          {categories.map((c) => (
            <button
              type="button"
              key={c.id}
              className={`category-chip severity-${c.severity} ${category === c.id ? "selected" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <label className="field">
          Estação (opcional)
          <select value={station} onChange={(e) => setStation(e.target.value)}>
            <option value="">Selecione…</option>
            {stations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          Detalhes (opcional)
          <textarea
            value={message}
            maxLength={500}
            rows={3}
            placeholder="Ex: aguardando liberação da via há 10 minutos"
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <label className="field">
          Seu nome (opcional)
          <input
            type="text"
            value={authorName}
            maxLength={60}
            placeholder="Anônimo"
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="sheet-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={!category || sending}>
            {sending ? "Enviando…" : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
}
