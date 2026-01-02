
import { Market } from "../types";

const MOCK_MARKETS: Market[] = [
  {
    id: "p1",
    question: "Will the US implement a universal basic income pilot by 2026?",
    category: "Politics",
    source: "Polymarket",
    probability: 14,
    volume: "$5.2M",
    image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=800&auto=format&fit=crop",
    description: "Predict if any federal-level pilot program for UBI is signed into law before January 1, 2026.",
    endsAt: "2025-12-31",
    outcomeA: "Yes",
    outcomeB: "No"
  },
  {
    id: "a1",
    question: "Will a human-level AGI be announced by OpenAI in 2025?",
    category: "Crypto",
    source: "Augur",
    probability: 38,
    volume: "$12.1M",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    description: "Market resolves to 'Yes' if OpenAI officially claims to have achieved AGI in 2025.",
    endsAt: "2025-12-31",
    outcomeA: "Yes",
    outcomeB: "No"
  },
  {
    id: "g1",
    question: "Global average temperature to rise by more than 1.5°C in 2025?",
    category: "Climate",
    source: "Gnosis",
    probability: 64,
    volume: "$3.4M",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    description: "Resolves based on NASA/GISS annual temperature anomaly data.",
    endsAt: "2026-01-15",
    outcomeA: "Yes",
    outcomeB: "No"
  },
  {
    id: "p2",
    question: "Who will win the UEFA Champions League 2024/25?",
    category: "Sports",
    source: "Polymarket",
    probability: 22,
    volume: "$8.9M",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    description: "Outright winner of the 2024/25 UEFA Champions League tournament.",
    endsAt: "2025-05-31",
    outcomeA: "Real Madrid",
    outcomeB: "Manchester City"
  },
  {
    id: "m1",
    question: "Will LK-99 or another Room Temp Superconductor be verified in 2025?",
    category: "Science",
    source: "Manifold",
    probability: 8,
    volume: "$1.2M",
    image: "https://images.unsplash.com/photo-1532187875605-7f39d3a40279?q=80&w=800&auto=format&fit=crop",
    description: "Verification by at least 3 major independent labs required for Yes resolution.",
    endsAt: "2025-12-31",
    outcomeA: "Yes",
    outcomeB: "No"
  },
  {
    id: "g2",
    question: "Will the SEC approve a Solana Spot ETF by June 2025?",
    category: "Crypto",
    source: "Gnosis",
    probability: 47,
    volume: "$18.4M",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    description: "Predict if a spot Solana ETF is approved for trading on a US exchange.",
    endsAt: "2025-06-30",
    outcomeA: "Yes",
    outcomeB: "No"
  }
];

export const fetchAllMarkets = async (): Promise<Market[]> => {
  // Simulating fetching from multiple decentralized oracles
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_MARKETS;
};
