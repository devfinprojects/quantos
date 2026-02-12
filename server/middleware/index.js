// FILE: server/middleware/auth.js
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth Error:', err.message);
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || (roles.length && !roles.includes(req.user.role))) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

// FILE: server/middleware/logger.js
export const auditLogger = (req, res, next) => {
  // Mock audit logger (in production, log to structured DB or ELK stack)
  if (req.method !== 'GET') {
    console.log(`[AUDIT] User ${req.user?.id || 'anonymous'} performed ${req.method} on ${req.url}`);
  }
  next();
};

// FILE: server/middleware/validator.js
import { z } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation Error', details: err.errors });
  }
};
