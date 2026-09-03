export const SEVERITY_LABEL = {
  ok: "Normal",
  atencao: "Atenção",
  problema: "Problema",
};

export function timeAgo(iso) {
  if (!iso) return null;
  const normalized = iso.endsWith("Z") ? iso : `${iso}Z`;
  const diffMs = Date.now() - new Date(normalized).getTime();
  const min = Math.max(0, Math.round(diffMs / 60000));
  if (min < 1) return "agora mesmo";
  if (min < 60) return `há ${min} min`;
  const h = Math.round(min / 60);
  return `há ${h} h`;
}

export function isWithinHours(iso, hours) {
  if (!iso) return false;
  const normalized = iso.endsWith("Z") ? iso : `${iso}Z`;
  const diffMs = Date.now() - new Date(normalized).getTime();
  return diffMs >= 0 && diffMs <= hours * 60 * 60 * 1000;
}

// Distância aproximada em metros entre duas coordenadas (fórmula de haversine).
export function distanceMeters(a, b) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestStationIndex(stations, coords) {
  let bestIndex = 0;
  let bestDistance = Infinity;
  stations.forEach((station, i) => {
    const d = distanceMeters(station, coords);
    if (d < bestDistance) {
      bestDistance = d;
      bestIndex = i;
    }
  });
  return { index: bestIndex, distance: bestDistance };
}
