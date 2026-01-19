export interface Team {
  name: string;
  logo: string;
}

export interface MatchOdds {
  home: number;
  draw: number;
  away: number;
}

export interface Match {
  id: string;
  league: string;
  leagueIcon?: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string;
  status: 'Live' | 'Scheduled' | 'Finished';
  score?: {
    home: number;
    away: number;
  };
  minute?: number;
  odds: MatchOdds;
}

export interface Bet {
  id: string;
  matchId: string;
  matchTitle: string;
  selection: '1' | 'X' | '2'; // Home, Draw, Away
  odds: number;
  stake: number;
}

export enum SportType {
  FOOTBALL = 'Football',
  BASKETBALL = 'Basketball',
  TENNIS = 'Tennis',
  VOLLEYBALL = 'Volleyball'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}