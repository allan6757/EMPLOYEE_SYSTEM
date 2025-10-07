import { logger } from './logger';

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

// Password strength validation
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    requirements: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  };
};

// Rate limiting for login attempts
const loginAttempts = new Map();

export const checkRateLimit = (identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier) || [];
  
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    logger.warn('Rate limit exceeded', { identifier, attempts: recentAttempts.length });
    return false;
  }
  
  recentAttempts.push(now);
  loginAttempts.set(identifier, recentAttempts);
  return true;
};

// Session timeout
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const isSessionValid = (lastActivity) => {
  return Date.now() - lastActivity < SESSION_TIMEOUT;
};

// Encrypt sensitive data for localStorage
export const encryptData = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    logger.error('Encryption failed', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    return JSON.parse(atob(encryptedData));
  } catch (error) {
    logger.error('Decryption failed', error);
    return null;
  }
};