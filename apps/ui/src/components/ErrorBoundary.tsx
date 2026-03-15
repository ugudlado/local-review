/**
 * Global error boundary for catching React errors
 * Logs errors and displays a fallback UI
 */

import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { logger } from "../utils/logger";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. Please try refreshing the page.
          </AlertDescription>

          {import.meta.env.DEV && (
            <details className="mt-4 rounded bg-black/20 p-3 text-xs">
              <summary className="cursor-pointer font-medium">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 overflow-auto whitespace-pre-wrap text-red-300">
                {error.message}
                {"\n\n"}
                {error.stack}
              </pre>
            </details>
          )}

          <div className="mt-4 flex gap-3">
            <Button
              onClick={resetErrorBoundary}
              variant="destructive"
              className="flex-1"
            >
              Try Again
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="flex-1"
            >
              Refresh Page
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    logger.logError("React error boundary caught error", error, {
      componentStack: info.componentStack,
    });
  };

  const handleReset = () => {
    logger.info("Error boundary reset");
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
