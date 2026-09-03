import { useEffect, useState, useCallback } from "react";
import { fetchLines, socket } from "./api";
import LinesList from "./components/LinesList";
import LineDetail from "./components/LineDetail";
import "./App.css";

export default function App() {
  const [lines, setLines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLines = useCallback(async () => {
    try {
      const data = await fetchLines();
      setLines(data.lines);
      setCategories(data.categories);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLines();
    const onStatusChanged = () => loadLines();
    socket.on("line:status-changed", onStatusChanged);
    return () => socket.off("line:status-changed", onStatusChanged);
  }, [loadLines]);

  const selectedLine = lines.find((l) => l.id === selectedLineId) || null;

  return (
    <>
      <header className="app-header">
        <div className="brand">
          <span className="brand-dot" />
          <div>
            <h1>Na Linha</h1>
            <p>Atualizações em tempo real, feitas por quem está a bordo</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {loading && <p className="muted center">Carregando linhas…</p>}
        {error && <p className="error center">{error}</p>}

        {!loading && !error && !selectedLine && (
          <LinesList lines={lines} onSelect={setSelectedLineId} />
        )}

        {selectedLine && (
          <LineDetail
            line={selectedLine}
            categories={categories}
            onBack={() => setSelectedLineId(null)}
          />
        )}
      </main>

      <footer className="app-footer">
        Comunidade de passageiros · dados não oficiais
      </footer>
    </>
  );
}
