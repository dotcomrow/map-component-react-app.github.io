import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MyMap from './components/map-component';
import ErrorBoundryWrapper from "./components/ErrorBoundry";

// const mapIsReadyCallback = (map) => {
//     console.log("Map is ready");
//     console.log(map);
// };

function MapContent({ mapIsReadyCallback, vars }) {
    return (
        <ErrorBoundryWrapper>
            <MyMap mapIsReadyCallback={mapIsReadyCallback} />
        </ErrorBoundryWrapper>
    );
}

export default MapContent;