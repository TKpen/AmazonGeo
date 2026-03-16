import { Bloc, BlocKey } from "@/types/sim";

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-white/60">
        <span>{label}</span>
        <span className="tabular-nums text-white/80">{value}</span>
      </div>
      <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
        <div
          className="h-2 bg-cyan-400"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export function BlocPanel({ bloc, allKeys }: { bloc: Bloc; allKeys: BlocKey[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      <div>
        <div className="text-xs text-white/60">Selected Bloc</div>
        <div className="text-lg font-semibold text-white">{bloc.name}</div>
        <div className="text-xs text-white/60 mt-1">Key: {bloc.key}</div>
      </div>

      <div className="mt-4 grid gap-3">
        <Bar label="Economy" value={bloc.economy} />
        <Bar label="Military" value={bloc.military} />
        <Bar label="Stability" value={bloc.stability} />
        <Bar label="Resources" value={bloc.resources} />
        <Bar label="Public Sentiment" value={bloc.public_sentiment} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/60">Population (M)</div>
          <div className="text-lg font-semibold tabular-nums text-white">{bloc.population}</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/60">Stability Risk</div>
          <div className="text-lg font-semibold tabular-nums text-white">
            {bloc.stability >= 70 ? "Low" : bloc.stability >= 50 ? "Medium" : "High"}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-sm font-semibold mb-2 text-white">Relations</div>
        <div className="grid gap-2">
          {allKeys
            .filter((k) => k !== bloc.key)
            .map((k) => {
              const v = bloc.relations[k] ?? 0;
              const tone =
                v >= 15 ? "text-emerald-300" : v <= -15 ? "text-rose-300" : "text-white/80";
              return (
                <div key={k} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="text-sm text-white/70">{k}</div>
                  <div className={`text-sm font-semibold tabular-nums ${tone}`}>
                    {v >= 0 ? `+${v}` : v}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}