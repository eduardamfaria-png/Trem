import { io } from "socket.io-client";

export async function fetchLines() {
  const res = await fetch("/api/lines");
  if (!res.ok) throw new Error("Falha ao carregar linhas");
  return res.json();
}

export async function fetchUpdates(lineId) {
  const res = await fetch(`/api/lines/${lineId}/updates`);
  if (!res.ok) throw new Error("Falha ao carregar atualizações");
  return res.json();
}

export async function postUpdate(lineId, payload) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (key === "photo") continue;
    if (value !== null && value !== undefined) formData.append(key, value);
  }
  if (payload.photo) formData.append("photo", payload.photo);

  const res = await fetch(`/api/lines/${lineId}/updates`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Falha ao enviar atualização");
  }
  return res.json();
}

export async function confirmUpdate(id) {
  const res = await fetch(`/api/updates/${id}/confirm`, { method: "POST" });
  if (!res.ok) throw new Error("Falha ao confirmar");
  return res.json();
}

export const socket = io({ autoConnect: true });
