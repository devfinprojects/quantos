// FILE: server/routes/api.js
import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { RFactorEngine } from '../engines/r-factor.js';
import { OptionsEngine, RiskEngine } from '../engines/core.js';
import { provider } from '../services/provider.js';

const router = express.Router();
const rFactor = new RFactorEngine(provider);
const options = new OptionsEngine(provider);
const risk = new RiskEngine(provider);

// R-Factor Endpoint
router.get('/r-factor/:symbol', authenticate, async (req, res) => {
  try {
    const score = await rFactor.generateScore(req.params.symbol);
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Options Scanner
router.get('/options-scan/:symbol', authenticate, authorize(['pro', 'admin']), async (req, res) => {
  try {
    const scan = await options.runScan(req.params.symbol);
    res.json(scan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Market Mood
router.get('/market-mood', async (req, res) => {
  // Mock Mood Data
  res.json({
    us: { score: 75, regime: 'Greed', liquidty: 'High' },
    india: { score: 60, regime: 'Neutral', liquidty: 'Medium' },
    crypto: { score: 20, regime: 'Extreme Fear', liquidty: 'Low' },
    timestamp: new Date(),
  });
});

// Risk Metrics (Portfolio)
router.post('/risk-metrics', authenticate, async (req, res) => {
  try {
    const { positions } = req.body; // Expect array of { symbol, quantity }
    if (!positions || !Array.isArray(positions)) {
      return res.status(400).json({ error: 'Invalid positions array' });
    }
    const metrics = await risk.analyzePortfolio(positions);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Dashboard Stats
router.get('/admin/stats', authenticate, authorize(['admin']), (req, res) => {
  res.json({
    users: 1542,
    active_subscriptions: 890,
    api_calls_today: 45000,
    system_health: '99.9%',
  });
});

export default router;
