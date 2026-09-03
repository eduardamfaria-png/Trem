import { useEffect, useRef, useState } from "react";
import { nearestStationIndex } from "../utils";

// Acompanha a localização do dispositivo enquanto o usuário está numa
// viagem. A posição NUNCA é enviada ao servidor nem a outros usuários —
// fica só no navegador de quem está usando, como o "modo trajeto" de apps
// de trânsito, mas privado.
export default function TripMode({ line, onPositionChange }) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);
  const [nearest, setNearest] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    return () => stopTrip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startTrip() {
    if (!("geolocation" in navigator)) {
      setError("Seu navegador não tem suporte a localização.");
      return;
    }
    setError(null);

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const result = nearestStationIndex(line.stations, coords);
        setNearest(result);
        onPositionChange?.(result);
      },
      (geoError) => {
        setError(
          geoError.code === geoError.PERMISSION_DENIED
            ? "Permissão de localização negada."
            : "Não foi possível obter sua localização."
        );
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
    setActive(true);
  }

  function stopTrip() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setActive(false);
    setNearest(null);
    onPositionChange?.(null);
  }

  return (
    <div className="trip-mode">
      {!active && (
        <button className="trip-toggle" onClick={startTrip}>
          🧭 Iniciar minha viagem nesta linha
        </button>
      )}

      {active && (
        <div className="trip-banner">
          <div className="trip-banner-text">
            <strong>Viagem ativa</strong>
            {nearest ? (
              <span>
                Perto de <b>{line.stations[nearest.index].name}</b> (
                {Math.round(nearest.distance)} m)
              </span>
            ) : (
              <span>Obtendo sua localização…</span>
            )}
            <small>Sua localização é privada e fica só neste dispositivo.</small>
          </div>
          <button className="trip-stop" onClick={stopTrip}>
            Encerrar
          </button>
        </div>
      )}

      {error && <p className="error trip-error">{error}</p>}
    </div>
  );
}
