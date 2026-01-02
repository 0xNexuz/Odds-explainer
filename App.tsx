
import React, { useState, useEffect, useMemo } from 'react';
import { Market, Theme } from './types';
import { fetchAllMarkets } from './services/marketService';
import MarketCard from './components/MarketCard';
import MarketDetail from './components/MarketDetail';
import { Sun, Moon, Search, Filter, TrendingUp, Github, Database } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSource, setActiveSource] = useState<string>('All');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllMarkets();
        setMarkets(data);
      } catch (e) {
        console.error("Failed to fetch markets");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);

  const categories = ['All', 'Politics', 'Sports', 'Crypto', 'Climate', 'Science'];
  const sources = ['All', 'Polymarket', 'Augur', 'Gnosis', 'Manifold'];

  const filteredMarkets = useMemo(() => {
    return markets.filter(m => {
      const matchesSearch = m.question.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
      const matchesSource = activeSource === 'All' || m.source === activeSource;
      return matchesSearch && matchesCategory && matchesSource;
    });
  }, [markets, searchQuery, activeCategory, activeSource]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <TrendingUp size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white hidden sm:block">
              ODDS<span className="text-indigo-600">EXPLAINER</span>
            </span>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search across all markets..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all"
            >
              {theme === Theme.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-6 border border-indigo-100 dark:border-indigo-900/30">
            <Database size={12} />
            Multi-Source Prediction Engine
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            Unmask the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Market Truth</span>.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
            Real-time AI analysis explaining the volatility and drivers behind global prediction markets across Polymarket, Gnosis, and Augur.
          </p>
        </section>

        <div className="space-y-6 mb-12">
          {/* Category Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <Filter size={14} className="text-indigo-500" />
              {filteredMarkets.length} Active Markets
            </div>
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source:</span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {sources.map(src => (
                <button
                  key={src}
                  onClick={() => setActiveSource(src)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    activeSource === src
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent'
                    : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl h-[420px] animate-pulse">
                <div className="h-44 bg-slate-100 dark:bg-slate-800 rounded-t-3xl" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                  <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMarkets.map(market => (
              <MarketCard 
                key={market.id} 
                market={market} 
                onClick={setSelectedMarket} 
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300">
              <Database size={48} strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black">No markets discovered</h3>
              <p className="text-slate-500 font-medium">No results for "{searchQuery}" in {activeCategory} / {activeSource}.</p>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveSource('All'); }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Insight Modal */}
      {selectedMarket && (
        <MarketDetail 
          market={selectedMarket} 
          onClose={() => setSelectedMarket(null)} 
        />
      )}
    </div>
  );
}

export default App;
