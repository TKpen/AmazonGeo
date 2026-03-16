import { WorldState } from "@/types/sim";

export const demoState: WorldState = {
  simulation_id: "demo",
  turn: 1,
  global: { stability_index: 72, economic_index: 68, tension_meter: 40 },
  blocs: [
    {
      key: "NorthAmerica",
      name: "North America Bloc",
      economy: 82,
      military: 78,
      stability: 74,
      population: 380,
      resources: 70,
      public_sentiment: 55,
      relations: { Europe: 20, AsiaPacific: -5, GlobalSouth: 10 },
    },
    {
      key: "Europe",
      name: "Europe Bloc",
      economy: 78,
      military: 65,
      stability: 72,
      population: 450,
      resources: 60,
      public_sentiment: 58,
      relations: { NorthAmerica: 20, AsiaPacific: -10, GlobalSouth: 5 },
    },
    {
      key: "AsiaPacific",
      name: "Asia-Pacific Bloc",
      economy: 85,
      military: 80,
      stability: 67,
      population: 2200,
      resources: 62,
      public_sentiment: 52,
      relations: { NorthAmerica: -5, Europe: -10, GlobalSouth: 12 },
    },
    {
      key: "GlobalSouth",
      name: "Global South Bloc",
      economy: 60,
      military: 52,
      stability: 61,
      population: 3200,
      resources: 75,
      public_sentiment: 49,
      relations: { NorthAmerica: 10, Europe: 5, AsiaPacific: 12 },
    },
  ],
  logs: [
    {
      turn: 1,
      actor: "Europe",
      action: "DIPLOMATIC_SUMMIT",
      diplomatic_statement:
        "Europe is convening an emergency summit focused on force posture, shipping lanes, and reserve energy flows. Attendance is expected to be mandatory for any bloc that still wants a voice in the post-crisis order.",
      reasoning:
        "OPERATION EUROPE SUMMIT was triggered after insurers repriced Arctic shipping routes and naval patrols surged across the North Atlantic corridor. European planners are trying to slow escalation without looking weak.",
      intel_codename: "OPERATION EUROPE SUMMIT",
    },
  ],
  news: [
    {
      turn: 1,
      actor: "Europe",
      summary_text: "Europe opens OPERATION EUROPE SUMMIT as Arctic shipping panic spreads",
      details:
        "Emergency talks are aimed at sanctions coordination, deconfliction lines, and emergency energy stability after a sharp decline in bloc relations.",
    },
  ],
};
