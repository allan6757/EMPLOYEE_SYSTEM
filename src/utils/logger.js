const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const currentLevel = LOG_LEVELS[import.meta.env.VITE_LOG_LEVEL || 'error'];

export const logger = {
  debug: (message, data) => {
    if (currentLevel <= LOG_LEVELS.debug) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },
  info: (message, data) => {
    if (currentLevel <= LOG_LEVELS.info) {
      console.info(`[INFO] ${message}`, data);
    }
  },
  warn: (message, data) => {
    if (currentLevel <= LOG_LEVELS.warn) {
      console.warn(`[WARN] ${message}`, data);
    }
  },
  error: (message, error) => {
    if (currentLevel <= LOG_LEVELS.error) {
      console.error(`[ERROR] ${message}`, error);
      // In production, send to monitoring service
      if (import.meta.env.PROD) {
        // sendToMonitoring(message, error);
      }
    }
  }
};