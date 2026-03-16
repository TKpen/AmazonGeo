"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { advanceTurn, getSimulation, postEvent, startSimulation } from "@/lib/api";
import { demoState } from "@/lib/demoState";
import { BlocKey, UserEvent, WorldState } from "@/types/sim";
import { TopBar } from "@/components/TopBar";
import { WorldMap } from "@/components/WorldMap";
import { BlocPanel } from "@/components/BlocPanel";
import { Feeds } from "@/components/Feeds";
import { EventControls } from "@/components/EventControls";

export default function Page() {
  const [simId, setSimId] = useState<string | null>(null);
  const [selected, setSelected] = useState<BlocKey>("NorthAmerica");

  useEffect(() => {
    async function init() {
      const res = await startSimulation();
      setSimId(res.simulation_id);
    }
    init();
  }, []);

  const query = useQuery({
    queryKey: ["sim", simId],
    queryFn: () => getSimulation(simId as string),
    enabled: !!simId,
    refetchInterval: 4000,
  });

  const state: WorldState = query.data ?? demoState;

  const blocKeys = useMemo(() => state.blocs.map((bloc) => bloc.key), [state.blocs]);

  const selectedBloc = useMemo(
    () => state.blocs.find((bloc) => bloc.key === selected) ?? state.blocs[0],
    [state.blocs, selected]
  );

  const advanceMut = useMutation({
    mutationFn: () => advanceTurn(simId as string),
    onSuccess: () => query.refetch(),
  });

  const eventMut = useMutation({
    mutationFn: (event: UserEvent) => postEvent(simId as string, event),
    onSuccess: () => query.refetch(),
  });

  const isWorking = advanceMut.isPending || eventMut.isPending;

  return (
    <main className="min-h-screen bg-[#0b0f17] text-[#e6edf7] p-6">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),
        linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)]
        [background-size:64px_64px]"
      />

      <div className="relative mx-auto max-w-7xl grid gap-6">
        <TopBar turn={state.turn} global={state.global ?? {}} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid gap-6">
            <WorldMap blocs={state.blocs} selected={selected} onSelect={setSelected} />
            <Feeds logs={state.logs} news={state.news} />
          </div>

          <div className="lg:col-span-4 grid gap-6">
            <EventControls
              blocKeys={blocKeys as BlocKey[]}
              isWorking={isWorking}
              onAdvance={() => advanceMut.mutate()}
              onEvent={(event) => eventMut.mutate(event)}
            />

            <BlocPanel bloc={selectedBloc} allKeys={blocKeys as BlocKey[]} />

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
              <div className="text-sm font-semibold">Connection</div>
              <div className="text-xs text-white/60 mt-1">
                API: {process.env.NEXT_PUBLIC_API_BASE ?? "(not set)"}
              </div>

              {query.isError && (
                <div className="mt-2 text-xs text-amber-300">
                  Backend not reachable - showing demo data.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
