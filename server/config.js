// FILE: server/config.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-change-in-prod',
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  providers: {
    alphaVantage: process.env.ALPHA_VANTAGE_KEY,
    fmp: process.env.FMP_KEY,
    twelveData: process.env.TWELVE_DATA_KEY,
    fred: process.env.FRED_KEY,
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  }
};
