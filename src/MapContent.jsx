import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MyMap from './components/map-component';

// const mapIsReadyCallback = (map) => {
//     console.log("Map is ready");
//     console.log(map);
// };

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
            <div className="map-wrapper">
                <MyMap mapIsReadyCallback={mapIsReadyCallback} vars={vars}/>
            </div>
    );
}

export default MapContent;