/**
 * Global error boundary for catching React errors
 * Logs errors and displays a fallback UI
 */

import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { logger } from '../utils/logger';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-center text-gray-900">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-center text-gray-600">
          An unexpected error occurred. Please try refreshing the page.
        </p>

        {import.meta.env.DEV && (
          <details className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <summary className="cursor-pointer font-medium text-gray-700">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-red-600 whitespace-pre-wrap">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    logger.logError('React error boundary caught error', error, {
      componentStack: info.componentStack,
    });
  };

  const handleReset = () => {
    logger.info('Error boundary reset');
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={handleReset}
    >
      {children}
    </ReactErrorBoundary>
  );
}
