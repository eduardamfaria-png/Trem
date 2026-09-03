import { isWithinHours } from "../utils";

export default function StoriesBar({ updates, categories, onOpen }) {
  const stories = updates.filter((u) => u.photo_path && isWithinHours(u.created_at, 24));
  if (stories.length === 0) return null;

  return (
    <div className="stories-bar">
      {stories.map((story, i) => {
        const severity = categories.find((c) => c.id === story.category)?.severity || "ok";
        return (
          <button
            key={story.id}
            className={`story-avatar severity-${severity}`}
            onClick={() => onOpen(stories, i)}
          >
            <span className="story-ring">
              <img src={story.photo_path} alt="" />
            </span>
            <span className="story-label">{story.station || story.author_name || "Relato"}</span>
          </button>
        );
      })}
    </div>
  );
}
