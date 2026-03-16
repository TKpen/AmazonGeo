"use client";

import MapLibreMap, { Source, Layer, Marker } from "react-map-gl/maplibre";
import { useMemo, useState } from "react";
import type { Bloc, BlocKey } from "@/types/sim";

const STYLE_URL = "https://demotiles.maplibre.org/style.json";

const BLOC_FILES: Record<BlocKey, string> = {
  NorthAmerica: "/blocs/north_america.geojson",
  Europe: "/blocs/europe.geojson",
  AsiaPacific: "/blocs/asia_pacific.geojson",
  GlobalSouth: "/blocs/global_south.geojson",
};

// Where to place the text labels
const BLOC_LABEL_POSITIONS: Record<
  BlocKey,
  { longitude: number; latitude: number; name: string }
> = {
  NorthAmerica: {
    longitude: -100,
    latitude: 45,
    name: "The Pan-American Union",
  },
  Europe: {
    longitude: 15,
    latitude: 50,
    name: "European Dominion",
  },
  AsiaPacific: {
    longitude: 110,
    latitude: 40,
    name: "Pacific Sovereignty Bloc",
  },
  GlobalSouth: {
    longitude: 15,
    latitude: 5,
    name: "Global South Alliance",
  },
};

// Color logic
function colorFromStability(stability: number) {
  const s = Math.max(0, Math.min(100, stability));
  if (s >= 70) return "rgba(34, 211, 238, 0.35)";
  if (s >= 50) return "rgba(250, 204, 21, 0.35)";
  return "rgba(251, 113, 133, 0.40)";
}

function outlineColor(isSelected: boolean) {
  return isSelected ? "rgba(34,211,238,0.95)" : "rgba(255,255,255,0.15)";
}

export function WorldMap({
  blocs,
  selected,
  onSelect,
}: {
  blocs: Bloc[];
  selected: BlocKey;
  onSelect: (k: BlocKey) => void;
}) {
  const [viewState, setViewState] = useState({
    longitude: 10,
    latitude: 20,
    zoom: 1.4,
  });

  const blocByKey = useMemo(() => {
    const m = new Map<BlocKey, Bloc>();
    blocs.forEach((b) => m.set(b.key, b));
    return m;
  }, [blocs]);

  const layers = useMemo(() => {
    return (Object.keys(BLOC_FILES) as BlocKey[]).map((k) => {
      const stability = blocByKey.get(k)?.stability ?? 70;
      const isSelected = selected === k;

      return {
        key: k,
        sourceId: `bloc-src-${k}`,
        fillId: `bloc-fill-${k}`,
        lineId: `bloc-line-${k}`,
        data: BLOC_FILES[k],
        fill: colorFromStability(stability),
        line: outlineColor(isSelected),
        width: isSelected ? 2.5 : 1.2,
      };
    });
  }, [blocByKey, selected]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="text-sm font-semibold text-white">World Map</div>
        <div className="text-xs text-white/60">
          Bloc overlays • click a bloc • labels show geopolitical entities
        </div>
      </div>

      <div className="h-[520px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#070a10]">
        <MapLibreMap
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle={STYLE_URL}
          interactiveLayerIds={layers.map((l) => l.fillId)}
          onClick={(e) => {
            const f = e.features?.[0];
            const bloc = f?.properties?.bloc as BlocKey | undefined;
            if (bloc) onSelect(bloc);
          }}
        >
          {/* Bloc colored overlays */}
          {layers.map((L) => (
            <Source key={L.sourceId} id={L.sourceId} type="geojson" data={L.data}>
              <Layer
                id={L.fillId}
                type="fill"
                paint={{
                  "fill-color": L.fill,
                  "fill-opacity": 1,
                }}
              />
              <Layer
                id={L.lineId}
                type="line"
                paint={{
                  "line-color": L.line,
                  "line-width": L.width,
                }}
              />
            </Source>
          ))}

          {/* Bloc Name Labels */}
          {(Object.keys(BLOC_LABEL_POSITIONS) as BlocKey[]).map((k) => {
            const pos = BLOC_LABEL_POSITIONS[k];
            const isSelected = selected === k;

            return (
              <Marker
                key={`label-${k}`}
                longitude={pos.longitude}
                latitude={pos.latitude}
                anchor="center"
              >
                <div
                  onClick={() => onSelect(k)}
                  className={`px-3 py-1 rounded-xl text-sm font-semibold cursor-pointer transition-all
                    ${
                      isSelected
                        ? "bg-cyan-400 text-black shadow-lg scale-110"
                        : "bg-black/60 text-white hover:bg-cyan-500/70"
                    }
                  `}
                >
                  {pos.name}
                </div>
              </Marker>
            );
          })}
        </MapLibreMap>
      </div>
    </div>
  );
}