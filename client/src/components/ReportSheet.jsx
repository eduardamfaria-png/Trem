import { useRef, useState } from "react";

export default function ReportSheet({
  categories,
  stations,
  suggestedStation,
  sending,
  error,
  onClose,
  onSubmit,
}) {
  const [category, setCategory] = useState("");
  const [station, setStation] = useState(suggestedStation || "");
  const [message, setMessage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!category) return;
    onSubmit({
      category,
      station: station || null,
      message: message || null,
      authorName: authorName || null,
      photo,
    });
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
              <option key={s.name} value={s.name}>
                {s.name}
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

        <div className="field">
          Foto (opcional)
          {photoPreview ? (
            <div className="photo-preview">
              <img src={photoPreview} alt="Pré-visualização" />
              <button type="button" className="photo-remove" onClick={removePhoto}>
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="photo-capture-button"
              onClick={() => fileInputRef.current?.click()}
            >
              📷 Tirar ou escolher foto
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handlePhotoChange}
          />
        </div>

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
