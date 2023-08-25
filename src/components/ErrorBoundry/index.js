import React from 'react';
import { ErrorBoundry } from 'react-error-boundary';

const ErrorBoundryWrapper = ({ children }) => {
    return (
        <ErrorBoundry>
            {children}
        </ErrorBoundry>
    )
}

export default ErrorBoundryWrapper;