import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MapContent from './MapContent';

const mapIsReadyCallback = (map) => {
    console.log("Map is ready");
    console.log(map);
};

ReactDOM.render(<MapContent  
    mapIsReadyCallback={mapIsReadyCallback}
    vars={mapIsReadyCallback}/>, document.getElementById("root"));