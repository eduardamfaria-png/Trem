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
