// FILE: server/engines/r-factor.js
import { std, mean } from 'mathjs';

// R-Factor: Institutional Proprietary Scoring
export class RFactorEngine {
  constructor(provider) {
    this.provider = provider;
  }

  calculateMomentum(prices, period = 14) {
    if (prices.length < period) return 0;
    const start = prices[0];
    const end = prices[prices.length - 1];
    return ((end - start) / start) * 100;
  }

  calculateVolatility(prices) {
    return std(prices);
  }

  detectVolumeAnomaly(volumes) {
    const avgVolume = mean(volumes.slice(0, -1));
    const currentVolume = volumes[volumes.length - 1];
    return currentVolume > avgVolume * 2.5; // 2.5x spike
  }

  classifyRegime(marketData) {
    const volatility = this.calculateVolatility(marketData.prices);
    if (volatility > 2.0) return 'RISK-OFF'; // High Vol
    if (volatility < 0.5) return 'COMPLACENT';
    return 'RISK-ON'; // Stable
  }

  async generateScore(symbol) {
    // Mock data fetch from provider
    const data = await this.provider.getDaily(symbol);
    const prices = data.map(d => d.close);
    const volumes = data.map(d => d.volume);

    const momentum = this.calculateMomentum(prices);
    const volatility = this.calculateVolatility(prices);
    const volAnomaly = this.detectVolumeAnomaly(volumes);
    const regime = this.classifyRegime({ prices });

    // Composite Score Algorithm
    let score = 50;
    score += momentum * 0.5;
    score -= volatility * 2;
    if (volAnomaly) score += 10;
    if (regime === 'RISK-ON') score += 5;

    return {
      symbol,
      r_factor: Math.min(100, Math.max(0, score)),
      components: {
        momentum,
        volatility,
        volAnomaly,
        regime,
      },
      confidence: 0.85, // Placeholder
      timestamp: new Date(),
    };
  }
}
