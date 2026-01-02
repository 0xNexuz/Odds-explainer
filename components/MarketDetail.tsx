
import React, { useState, useEffect } from 'react';
import { Market, MarketInsight } from '../types';
import { getMarketInsight } from '../services/gemini';
import { X, ExternalLink, Info, CheckCircle2, Loader2, Sparkles, Quote, Globe, Calendar } from 'lucide-react';

interface MarketDetailProps {
  market: Market;
  onClose: () => void;
}

const MarketDetail: React.FC<MarketDetailProps> = ({ market, onClose }) => {
  const [insight, setInsight] = useState<MarketInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMarketInsight(market.question, market.probability);
        setInsight(data);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } catch (err) {
        setError("Unable to generate insights at this moment. Please check your API key or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
  }, [market]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 shadow-sm">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold line-clamp-1 pr-8 leading-tight">{market.question}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {market.category}
                </span>
                {!loading && lastUpdated && (
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Live Analysis: {lastUpdated}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Probability</p>
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{market.probability}%</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Volume</p>
              <p className="text-xl font-bold">{market.volume}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Category</p>
              <p className="text-xl font-bold">{market.category}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Market Close</p>
              <p className="text-xl font-bold flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                {new Date(market.endsAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* AI Insight Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-indigo-500" />
                <h3 className="text-lg font-bold">Latest Market Grounding</h3>
              </div>
              {!loading && (
                <div className="text-[10px] font-bold text-indigo-500/80 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-lg">
                  Scanning Web 3.0 + News API
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                  <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-slate-900 dark:text-white font-bold text-lg animate-pulse">Running Gemini Search Grounding...</p>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">Filtering noise, social sentiment, and official news from the last 24 hours.</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-8 rounded-2xl text-center">
                <Info size={32} className="mx-auto text-red-400 mb-4" />
                <p className="font-bold text-red-600 dark:text-red-400 mb-2">Analysis Failed</p>
                <p className="text-sm text-red-500/80">{error}</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                {/* Narrative Section */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <Quote className="text-indigo-500/20 w-12 h-12 absolute -top-4 -left-2 rotate-12" />
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {insight?.explanation.split(/key drivers/i)[0].trim()}
                    </div>
                  </div>
                </div>

                {/* Grid Drivers */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Drivers & Catalyst Events</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {insight?.drivers.map((driver, idx) => (
                      <div key={idx} className="group flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 rounded-2xl transition-all hover:shadow-md">
                        <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-lg text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug">{driver}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sources List */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Verified Citations</h4>
                    <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                      {insight?.sources.length} SOURCES FOUND
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {insight?.sources.map((source, idx) => (
                      <a 
                        key={idx}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 rounded-xl transition-all group"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <Globe size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate group-hover:text-slate-900 dark:group-hover:text-white">
                            {source.title}
                          </span>
                        </div>
                        <ExternalLink size={12} className="text-slate-300 group-hover:text-indigo-500 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Footer Info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
             <span className="flex items-center gap-1"><Info size={12} /> Real-time Ingestion Active</span>
             <span className="hidden sm:inline">|</span>
             <span className="hidden sm:inline">Model: Gemini 3.0 Flash</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
               Source: Polymarket Live
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;
