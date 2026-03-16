"use client";

import { BlocKey, UserEvent } from "@/types/sim";
import { useState } from "react";

const EVENT_TYPES: UserEvent["type"][] = [
  "TRADE_SANCTION",
  "MILITARY_ESCALATION",
  "ALLIANCE_PROPOSAL",
  "ECONOMIC_STIMULUS",
  "RESOURCE_EMBARGO",
  "DIPLOMATIC_SUMMIT",
  "DECLARATION_OF_WAR",
  "PANDEMIC_OUTBREAK",
  "ENERGY_CRISIS",
];

export function EventControls({
  blocKeys,
  onAdvance,
  onEvent,
  isWorking,
}: {
  blocKeys: BlocKey[];
  onAdvance: () => void;
  onEvent: (e: UserEvent) => void;
  isWorking: boolean;
}) {
  const [type, setType] = useState<UserEvent["type"]>("TRADE_SANCTION");
  const [actor, setActor] = useState<BlocKey>("NorthAmerica");
  const [target, setTarget] = useState<BlocKey>("AsiaPacific");
  const [intensity, setIntensity] = useState<number>(3);
  const [note, setNote] = useState("");

  const inputClass =
    "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-cyan-400/50";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="text-sm font-semibold text-white">Intervention Panel</div>
      <div className="text-xs text-white/60 mt-1">Inject an event or advance the simulation.</div>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-1">
          <span className="text-xs text-white/60">Event Type</span>
          <select
            className={inputClass}
            value={type}
            onChange={(e) => setType(e.target.value as UserEvent["type"])}
          >
            {EVENT_TYPES.map((eventType) => (
              <option key={eventType} value={eventType} className="bg-[#0b0f17]">
                {eventType}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-white/60">Actor</span>
            <select
              className={inputClass}
              value={actor}
              onChange={(e) => setActor(e.target.value as BlocKey)}
            >
              {blocKeys.map((key) => (
                <option key={key} value={key} className="bg-[#0b0f17]">
                  {key}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-white/60">Target</span>
            <select
              className={inputClass}
              value={target}
              onChange={(e) => setTarget(e.target.value as BlocKey)}
            >
              {blocKeys.map((key) => (
                <option key={key} value={key} className="bg-[#0b0f17]">
                  {key}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-xs text-white/60">Intensity (1-5)</span>
          <input
            type="range"
            min={1}
            max={5}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="accent-cyan-400"
          />
          <div className="text-xs text-white/60">Selected: {intensity}</div>
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-white/60">Note (optional)</span>
          <input
            className={inputClass}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., Targeted semiconductor exports"
          />
        </label>

        <button
          disabled={isWorking}
          onClick={() => onEvent({ type, actor, target, intensity, note })}
          className="rounded-xl bg-cyan-400 text-black font-semibold px-4 py-2 text-sm hover:bg-cyan-300 disabled:opacity-50"
        >
          Submit Event
        </button>

        <button
          disabled={isWorking}
          onClick={onAdvance}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 disabled:opacity-50"
        >
          Advance Turn
        </button>
      </div>
    </div>
  );
}
