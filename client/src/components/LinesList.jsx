import { SEVERITY_LABEL, timeAgo } from "../utils";

export default function LinesList({ lines, onSelect }) {
  return (
    <ul className="lines-list">
      {lines.map((line) => (
        <li key={line.id}>
          <button
            className={`line-card severity-${line.status.severity}`}
            style={{ "--line-color": line.color }}
            onClick={() => onSelect(line.id)}
          >
            <span className="line-color-bar" />
            <span className="line-card-body">
              <span className="line-card-top">
                <strong>{line.name}</strong>
                <span className={`status-pill severity-${line.status.severity}`}>
                  {SEVERITY_LABEL[line.status.severity]}
                </span>
              </span>
              <span className="line-card-status">{line.status.label}</span>
              {line.status.updatedAt && (
                <span className="line-card-time">{timeAgo(line.status.updatedAt)}</span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
