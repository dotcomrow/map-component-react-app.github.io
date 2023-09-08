import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MyMap from './components/map-component';
import { ErrorBoundary } from "react-error-boundary";
import { importRemote } from "module-federation-import-remote";
import Button from 'dtk/Button';

function ErrorFallback({error}) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{color: 'red'}}>{error.message}</pre>
        </div>
    )
}

function MapContent({ mapIsReadyCallback, vars }) {

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="map-wrapper">
                <Button>Button from DTK</Button>
                <MyMap mapIsReadyCallback={mapIsReadyCallback} vars={vars}/>
            </div>
        </ErrorBoundary>
    );
}

export default MapContent;