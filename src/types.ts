export type PlayerRole = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicketkeeper';

export interface PlayerStats {
  matches: number;
  runs?: number;
  battingAvg?: number;
  battingSR?: number;
  wickets?: number;
  bowlingEconomy?: number;
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  rating: number; // 1-99
  year: number; // e.g. 2024
  originalTeam: string; // e.g. 'RCB'
  stats: PlayerStats;
  description: string;
}

export interface IPLTeamTheme {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: string;
  textColor: string;
  emoji: string;
}

export interface Opponent {
  id: string;
  name: string;
  shortName: string;
  rating: number; // Overall team strength (70-95)
  emoji: string;
}

export interface MatchScorecardEntry {
  playerName: string;
  role: PlayerRole;
  runsScored?: number;
  ballsFaced?: number;
  wicketsTaken?: number;
  oversBowled?: number;
  runsConceded?: number;
  isCaptain?: boolean;
}

export interface MatchResult {
  matchNumber: number;
  opponent: Opponent;
  userRuns: number;
  userWickets: number;
  userOvers: number;
  opponentRuns: number;
  opponentWickets: number;
  opponentOvers: number;
  won: boolean;
  manOfTheMatch: {
    playerName: string;
    reason: string;
    performance: string;
    isUserPlayer: boolean;
  };
  userScorecard: MatchScorecardEntry[];
  opponentScorecard: MatchScorecardEntry[];
}

export interface CampaignState {
  status: 'LOBBY' | 'TEAM_SELECT' | 'TOURNAMENT_CONFIG' | 'DRAFTING' | 'SQUAD_PREVIEW' | 'PLAYING' | 'GAME_OVER' | 'WINNER';
  selectedTeamId: string;
  tournamentYear: number;
  tournamentLength: 'Short' | 'Long'; // Short = 9 matches, Long = 14 matches
  currentMatchNumber: number; // 1-indexed
  squad: Player[];
  captainId: string | null;
  history: MatchResult[];
  draftRound: number; // 1 to 11
  currentDraftOptions: Player[];
  currentDraftFranchiseId?: string;
  currentDraftYear?: number;
  rerollsLeft: number;
}
