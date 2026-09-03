import { useState } from "react";
import { timeAgo } from "../utils";

export default function StoryViewer({ stories, startIndex, categories, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const story = stories[index];
  if (!story) return null;

  const categoryLabel = categories.find((c) => c.id === story.category)?.label || story.category;

  function next() {
    if (index < stories.length - 1) setIndex(index + 1);
    else onClose();
  }
  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <div className="story-viewer" onClick={onClose}>
      <div className="story-progress">
        {stories.map((s, i) => (
          <span key={s.id} className={`story-progress-bar ${i <= index ? "filled" : ""}`} />
        ))}
      </div>

      <button className="story-close" onClick={onClose}>
        ✕
      </button>

      <img className="story-photo" src={story.photo_path} alt="" onClick={(e) => e.stopPropagation()} />

      <div className="story-info" onClick={(e) => e.stopPropagation()}>
        <strong>{categoryLabel}</strong>
        {story.station && <span>📍 {story.station}</span>}
        {story.message && <p>{story.message}</p>}
        <small>
          {story.author_name || "Passageiro anônimo"} · {timeAgo(story.created_at)}
        </small>
      </div>

      <button className="story-nav story-nav-prev" onClick={(e) => { e.stopPropagation(); prev(); }} />
      <button className="story-nav story-nav-next" onClick={(e) => { e.stopPropagation(); next(); }} />
    </div>
  );
}
