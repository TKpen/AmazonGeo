export type BlocKey = "NorthAmerica" | "Europe" | "AsiaPacific" | "GlobalSouth";

export type Relations = Partial<Record<BlocKey, number>>;

export type Bloc = {
  key: BlocKey;
  name: string;
  economy: number;
  military: number;
  stability: number;
  population: number;
  resources: number;
  public_sentiment: number;
  relations: Relations;
};

export type GlobalStats = {
  stability_index: number;
  economic_index: number;
  tension_meter: number;
};

export type LogEntry = {
  turn: number;
  actor: BlocKey | "SYSTEM" | string;
  action: string;
  diplomatic_statement: string;
  reasoning: string;
  intel_codename?: string;
};

export type NewsEntry = {
  turn: number;
  actor?: string;
  summary_text: string;
  details?: string;
};

export type WorldState = {
  simulation_id: string;
  turn: number;
  global: GlobalStats;
  blocs: Bloc[];
  logs: LogEntry[];
  news: NewsEntry[];
  history_ledger?: Array<{
    turn: number;
    actor: string;
    action: string;
    summary: string;
  }>;
  active_conflicts?: Array<{
    parties: BlocKey[];
    started_turn: number;
    last_turn: number;
    heat: number;
    codename: string;
    summary: string;
  }>;
  alliances?: Array<{
    members: BlocKey[];
    strength: number;
    label: string;
    codename: string;
    turn: number;
    last_turn: number;
  }>;
  sanctions?: Array<{
    actor: BlocKey;
    target: BlocKey;
    severity: number;
    turn: number;
    codename: string;
  }>;
};

export type UserEvent = {
  type:
    | "TRADE_SANCTION"
    | "MILITARY_ESCALATION"
    | "ALLIANCE_PROPOSAL"
    | "ECONOMIC_STIMULUS"
    | "RESOURCE_EMBARGO"
    | "DIPLOMATIC_SUMMIT"
    | "DECLARATION_OF_WAR"
    | "PANDEMIC_OUTBREAK"
    | "ENERGY_CRISIS";
  actor?: BlocKey;
  target?: BlocKey;
  intensity?: number; // 1-5
  note?: string;
};
