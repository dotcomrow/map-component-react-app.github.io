import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MyMap from './components/map-component';
import { useGeographic } from "ol/proj.js";
import { envConfig } from './config';

useGeographic();

// const mapIsReadyCallback = (map) => {
//     trySampleRequest();

// };
function MapContent({ readyCallback }) {
    return (
        <div className="map-wrapper">
            <MyMap mapIsReadyCallback={readyCallback}/>
        </div>
    );
}

export default MapContent;