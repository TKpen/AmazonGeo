import { GlobalStats } from "@/types/sim";

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 min-w-[220px]">
      <div className="text-xs text-white/60">{label}</div>
      <div className="flex items-center gap-3">
        <div className="h-2 w-44 rounded bg-white/10 overflow-hidden">
          <div
            className="h-2 bg-cyan-400"
            style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          />
        </div>
        <div className="text-sm tabular-nums w-10 text-right text-white/80">{value}</div>
      </div>
    </div>
  );
}

export function TopBar({ turn, global }: { turn: number; global: GlobalStats }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-xs text-white/60">Turn</div>
            <div className="text-2xl font-semibold text-white">{turn}</div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">GeoStrategic Intelligence Sandbox</div>
            <div className="text-xs text-white/60">Strategic Scenario Modeling Environment</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <Meter label="Global Stability Index" value={global.stability_index} />
          <Meter label="Global Economic Index" value={global.economic_index} />
          <Meter label="Global Tension Meter" value={global.tension_meter} />
        </div>
      </div>
    </div>
  );
}