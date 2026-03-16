"use client";

import { LogEntry, NewsEntry } from "@/types/sim";
import { useMemo, useState } from "react";

type Tab = "NEWS" | "DIALOGUE" | "LOG";

export function Feeds({ logs, news }: { logs: LogEntry[]; news: NewsEntry[] }) {
  const [tab, setTab] = useState<Tab>("NEWS");

  const dialogue = useMemo(() => {
    return logs
      .slice()
      .sort((a, b) => b.turn - a.turn)
      .filter((entry) => Boolean(entry.diplomatic_statement))
      .map((entry) => ({
        turn: entry.turn,
        actor: entry.actor,
        text: entry.diplomatic_statement,
        codename: entry.intel_codename,
      }));
  }, [logs]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white">Feeds</div>
        <div className="flex gap-2">
          {(["NEWS", "DIALOGUE", "LOG"] as Tab[]).map((feedTab) => (
            <button
              key={feedTab}
              onClick={() => setTab(feedTab)}
              className={`rounded-xl px-3 py-1 text-xs border transition ${
                tab === feedTab
                  ? "bg-cyan-400 text-black border-cyan-300"
                  : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
              }`}
            >
              {feedTab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 max-h-[300px] overflow-auto pr-1 space-y-3">
        {tab === "NEWS" &&
          news
            .slice()
            .sort((a, b) => b.turn - a.turn)
            .map((entry, index) => (
              <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/60">
                  Turn {entry.turn}
                  {entry.actor ? ` • ${entry.actor}` : ""}
                </div>
                <div className="text-sm text-white/90 mt-1">{entry.summary_text}</div>
                {entry.details && (
                  <div className="text-xs text-white/60 mt-2 leading-5">{entry.details}</div>
                )}
              </div>
            ))}

        {tab === "DIALOGUE" &&
          dialogue.map((entry, index) => (
            <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/60">
                Turn {entry.turn} • {entry.actor}
                {entry.codename ? ` • ${entry.codename}` : ""}
              </div>
              <div className="text-sm text-white/90 mt-1 leading-6">{entry.text}</div>
            </div>
          ))}

        {tab === "LOG" &&
          logs
            .slice()
            .sort((a, b) => b.turn - a.turn)
            .map((entry, index) => (
              <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/60">
                  Turn {entry.turn} • {entry.actor} • {entry.action}
                  {entry.intel_codename ? ` • ${entry.intel_codename}` : ""}
                </div>
                <div className="text-sm text-white/90 mt-1 leading-6">{entry.reasoning}</div>
              </div>
            ))}
      </div>
    </div>
  );
}
