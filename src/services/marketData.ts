// FILE: src/services/marketData.ts

// Interfaces
export interface MarketQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

export interface FearGreedData {
  value: number; // 0-100
  previousClose: number;
  sentiment: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  lastUpdated: string;
}

// Mock Data Generators for fallback
const getRandomChange = () => (Math.random() * 4 - 2);
const getRandomPrice = (base: number) => base * (1 + (Math.random() * 0.02 - 0.01));

export const MarketService = {
  async getSpotPrice(symbol: string, _apiKey?: string): Promise<MarketQuote> {
    // If API key exists, we would fetch here. For now, we simulate realistic institutional data feed.
    // In a real implementation: if (_apiKey) { ... axios.get ... }
    
    const basePrices: Record<string, number> = {
      'SPX': 4780.25,
      'NDX': 16800.50,
      'NIFTY': 21450.00,
      'BTC': 43200.00,
      'XAU': 2045.50, // Gold
      'VIX': 12.50,
      'US10Y': 3.95
    };

    const base = basePrices[symbol] || 100;
    const currentPrice = getRandomPrice(base);
    const change = getRandomChange();

    return {
      symbol,
      price: parseFloat(currentPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat((change / base * 100).toFixed(2)),
      timestamp: Date.now()
    };
  },

  async getFearGreedIndex(type: 'US' | 'India' | 'Crypto' | 'Gold'): Promise<FearGreedData> {
    let value = 50;
    
    switch(type) {
      case 'US': value = 76; break; // Currently Greed
      case 'India': value = 65; break;
      case 'Crypto': value = 72; break;
      case 'Gold': value = 55; break;
    }

    // Add some random noise
    value = Math.min(100, Math.max(0, value + Math.floor(Math.random() * 10 - 5)));

    let sentiment: FearGreedData['sentiment'] = 'Neutral';
    if (value < 25) sentiment = 'Extreme Fear';
    else if (value < 45) sentiment = 'Fear';
    else if (value < 55) sentiment = 'Neutral';
    else if (value < 75) sentiment = 'Greed';
    else sentiment = 'Extreme Greed';

    return {
      value,
      previousClose: value - (Math.random() * 4 - 2),
      sentiment,
      lastUpdated: new Date().toISOString()
    };
  },

  async getSectorHeatmap() {
    return [
      { name: 'Technology', value: 2.4, marketCap: 10 },
      { name: 'Healthcare', value: -0.5, marketCap: 6 },
      { name: 'Financials', value: 1.2, marketCap: 5 },
      { name: 'Energy', value: -1.4, marketCap: 3 },
      { name: 'Consumer Disc', value: 1.8, marketCap: 4 },
      { name: 'Consumer Staples', value: 0.2, marketCap: 3 },
      { name: 'Utilities', value: 0.5, marketCap: 2 },
      { name: 'Real Estate', value: -0.8, marketCap: 2 },
      { name: 'Materials', value: 0.9, marketCap: 1.5 },
      { name: 'Industrials', value: 1.1, marketCap: 3.5 },
      { name: 'Comm Services', value: 1.5, marketCap: 3 },
    ];
  }
};
