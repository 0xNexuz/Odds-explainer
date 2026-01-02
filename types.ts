
export interface Market {
  id: string;
  question: string;
  category: 'Politics' | 'Sports' | 'Crypto' | 'Global' | 'Science' | 'Climate';
  source: 'Polymarket' | 'Augur' | 'Gnosis' | 'Manifold';
  probability: number;
  volume: string;
  image?: string;
  description: string;
  endsAt: string;
  outcomeA: string;
  outcomeB: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MarketInsight {
  explanation: string;
  drivers: string[];
  sources: GroundingSource[];
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
