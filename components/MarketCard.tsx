
import React from 'react';
import { Market } from '../types';
import { TrendingUp, BarChart3, Clock, Database } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onClick: (market: Market) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Politics': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Sports': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Crypto': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Climate': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300';
      case 'Science': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
      default: return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'Polymarket': return 'border-indigo-500 text-indigo-500';
      case 'Augur': return 'border-blue-400 text-blue-400';
      case 'Gnosis': return 'border-emerald-500 text-emerald-500';
      case 'Manifold': return 'border-amber-500 text-amber-500';
      default: return 'border-slate-400 text-slate-400';
    }
  };

  return (
    <div 
      onClick={() => onClick(market)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={market.image} 
          alt={market.question} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getCategoryColor(market.category)} uppercase tracking-wider`}>
            {market.category}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border ${getSourceBadge(market.source)} uppercase tracking-wider`}>
            {market.source}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold line-clamp-2 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors h-14">
          {market.question}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {market.probability}%
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
              Confidence
            </span>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeDasharray="100, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-indigo-500"
                strokeDasharray={`${market.probability}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <BarChart3 size={12} />
            {market.volume}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {new Date(market.endsAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
