import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MyMap from './components/map-component';

const mapIsReadyCallback = (map) => {
    console.log("Map is ready");
    console.log(map);
};

ReactDOM.render(<MyMap mapIsReadyCallback={mapIsReadyCallback}/>, document.getElementById("root"));