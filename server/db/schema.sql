-- FILE: server/db/schema.sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'retail',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  api_key_vault JSONB
);

CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  strategy VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id),
  symbol VARCHAR(20) NOT NULL,
  quantity DECIMAL(18, 8) NOT NULL,
  avg_price DECIMAL(18, 8) NOT NULL,
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  condition JSONB NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  triggered_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS r_factor_history (
  symbol VARCHAR(20) NOT NULL,
  score DECIMAL(5, 2) NOT NULL,
  components JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (symbol, timestamp)
);

CREATE TABLE IF NOT EXISTS access_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID,
  endpoint VARCHAR(255),
  method VARCHAR(10),
  ip_address VARCHAR(45),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
