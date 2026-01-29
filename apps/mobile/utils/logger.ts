/**
 * Development logger for Mobile
 * Provides structured console logging for React Native
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

const isDev = __DEV__;

const levelEmoji: Record<LogLevel, string> = {
  debug: '🔍',
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
};

const levelColors: Record<LogLevel, string> = {
  debug: '#6b7280',
  info: '#3b82f6',
  warn: '#f59e0b',
  error: '#ef4444',
};

function formatTime(): string {
  return new Date().toISOString().split('T')[1].slice(0, 12);
}

function formatContext(context?: LogContext): string {
  if (!context || Object.keys(context).length === 0) return '';
  return ' ' + JSON.stringify(context);
}

function log(level: LogLevel, message: string, context?: LogContext): void {
  // In production, only log warnings and errors
  if (!isDev && (level === 'debug' || level === 'info')) return;

  const time = formatTime();
  const emoji = levelEmoji[level];
  const contextStr = formatContext(context);
  const output = `[${time}] [mobile] ${emoji} ${message}${contextStr}`;

  switch (level) {
    case 'error':
      console.error(output);
      break;
    case 'warn':
      console.warn(output);
      break;
    default:
      console.log(output);
  }
}

function logError(message: string, error: unknown, context?: LogContext): void {
  const errorContext: LogContext = { ...context };

  if (error instanceof Error) {
    errorContext.name = error.name;
    errorContext.message = error.message;

    // Log full error in development
    log('error', message, errorContext);
    if (isDev) {
      console.error(error);
    }
  } else {
    errorContext.error = String(error);
    log('error', message, errorContext);
  }
}

export const logger = {
  debug: (message: string, context?: LogContext) => log('debug', message, context),
  info: (message: string, context?: LogContext) => log('info', message, context),
  warn: (message: string, context?: LogContext) => log('warn', message, context),
  error: (message: string, context?: LogContext) => log('error', message, context),
  logError,

  /** Log API request/response */
  api: (method: string, url: string, status?: number, duration?: number) => {
    const statusEmoji = status
      ? status >= 500
        ? '🔴'
        : status >= 400
          ? '🟡'
          : '🟢'
      : '⏳';

    const durationStr = duration ? ` (${duration}ms)` : '';
    const statusStr = status ? ` ${status}` : '';

    log('info', `${statusEmoji} ${method} ${url}${statusStr}${durationStr}`);
  },
};
