import { useEffect, useState } from 'react';
import { MarketService, MarketQuote } from '../services/marketData';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SpotTicker() {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const { apiKeys } = useStore();

  useEffect(() => {
    const symbols = ['SPX', 'NDX', 'NIFTY', 'BTC', 'XAU', 'VIX', 'US10Y'];
    
    const fetchQuotes = async () => {
      const promises = symbols.map(s => MarketService.getSpotPrice(s, apiKeys.alphaVantage));
      const results = await Promise.all(promises);
      setQuotes(results);
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 5000);
    return () => clearInterval(interval);
  }, [apiKeys]);

  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-800 overflow-hidden whitespace-nowrap h-10 flex items-center">
      <div className="animate-marquee flex items-center space-x-8 px-4">
        {quotes.map((quote) => (
          <div key={quote.symbol} className="flex items-center space-x-2 text-sm">
            <span className="font-bold text-slate-400">{quote.symbol}</span>
            <span className="font-mono">{quote.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span className={`flex items-center text-xs ${quote.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {quote.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(quote.changePercent)}%
            </span>
          </div>
        ))}
        {/* Duplicate for seamless scrolling effect if needed, though simple map is okay for now */}
      </div>
    </div>
  );
}
