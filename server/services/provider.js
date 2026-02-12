// FILE: server/services/provider.js
import axios from 'axios';
import { config } from '../config.js';

class DataProvider {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    this.failures = 0;
  }

  async fetch(symbol) {
    throw new Error('Method not implemented');
  }
}

class AlphaVantageProvider extends DataProvider {
  async fetch(symbol) {
    // Mock implementation for demo
    if (!config.providers.alphaVantage) return this.mockData(symbol);
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${config.providers.alphaVantage}`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      this.failures++;
      throw e;
    }
  }

  mockData(symbol) {
    // Generate 100 days of random walk data
    let price = 100;
    const data = [];
    for (let i = 0; i < 100; i++) {
      price = price * (1 + (Math.random() - 0.5) * 0.02);
      data.push({
        date: new Date(Date.now() - (100 - i) * 86400000).toISOString().split('T')[0],
        open: price,
        high: price * 1.01,
        low: price * 0.99,
        close: price,
        volume: Math.floor(Math.random() * 1000000)
      });
    }
    return data;
  }
}

class FMPProvider extends DataProvider {
  async fetch(symbol) {
    // Fallback logic
    return []; 
  }
}

export class ProviderManager {
  constructor() {
    this.providers = [
      new AlphaVantageProvider('AlphaVantage', 1),
      new FMPProvider('FMP', 2),
    ].sort((a, b) => a.priority - b.priority);
  }

  async getDaily(symbol) {
    for (const provider of this.providers) {
      try {
        console.log(`Fetching ${symbol} from ${provider.name}`);
        return await provider.fetch(symbol);
      } catch (e) {
        console.error(`${provider.name} failed: ${e.message}`);
        continue;
      }
    }
    throw new Error('All providers failed');
  }

  async getOptionChain(symbol) {
    // Mock Options Data
    return Array.from({ length: 20 }, (_, i) => ({
      strike: 100 + (i - 10) * 5,
      type: i % 2 === 0 ? 'call' : 'put',
      expiry: '2023-12-15',
      bid: Math.random() * 5,
      ask: Math.random() * 5 + 0.1,
      iv: Math.random() * 0.5,
      delta: Math.random(),
      volume: Math.floor(Math.random() * 5000),
      openInterest: Math.floor(Math.random() * 10000)
    }));
  }

  async getHistoricalIV(symbol) {
    return Array.from({ length: 30 }, () => Math.random() * 0.4 + 0.2);
  }
}

export const provider = new ProviderManager();
