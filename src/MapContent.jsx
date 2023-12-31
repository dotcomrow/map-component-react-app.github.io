import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MyMap from './components/map-component';
import { ErrorBoundary } from "react-error-boundary";
import { importRemote } from "module-federation-import-remote";
import { Button } from 'dtk/Button';
import Select from 'dtk/Select';

function ErrorFallback({ error }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
        </div>
    )
}

function MapContent({ mapIsReadyCallback, vars }) {

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="container-fluid bg-white p-2 h-100 d-flex flex-column">
                <div className="pb-2 ps-2 ps-2">
                    <Select>Select from DTK</Select>
                </div>
                <MyMap mapIsReadyCallback={mapIsReadyCallback} vars={vars} />
            </div>
        </ErrorBoundary>
    );
}

export default MapContent;