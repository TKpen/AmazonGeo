import { UserEvent } from "@/types/sim";

const API = "http://127.0.0.1:8000";

export async function startSimulation() {
  const res = await fetch(`${API}/simulation/start`, {
    method: "POST",
  });

  return res.json();
}

export async function getSimulation(simId: string) {
  const res = await fetch(`${API}/simulation/${simId}`);
  return res.json();
}

export async function advanceTurn(simId: string) {
  const res = await fetch(`${API}/simulation/${simId}/next`, {
    method: "POST",
  });

  return res.json();
}

export async function postEvent(simId: string, event: UserEvent) {
  const res = await fetch(`${API}/simulation/${simId}/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  return res.json();
}
