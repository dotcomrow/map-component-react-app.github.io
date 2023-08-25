import React from 'react';
import { ErrorBoundry } from 'react-error-boundary';
import { useErrorBoundary } from "react-error-boundary";

const logError = ( error,  { componentStack: string }) => {
    console.log(error, string);
};

function ErrorFallback({ error }) {
    const { resetBoundary } = useErrorBoundary();
  
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetBoundary}>Try again</button>
      </div>
    );
  }

const ErrorBoundryWrapper = ({ children }) => {
    return (
        <ErrorBoundry
            FallbackComponent={ErrorFallback}
            onReset={(details) => {
                // Reset the state of your app so the error doesn't happen again
            }}
            onError={logError}
        >
            {children}
        </ErrorBoundry>
    )
}

export default ErrorBoundryWrapper;