import React from 'react';
import './App.css';
import MyMap from './components/map-component';
import { useGeographic } from "ol/proj.js";

function App() {
    useGeographic();

    const mapIsReadyCallback = (map) => {
        console.log(map);
    };

    return (
        <div className="map-wrapper">
            <MyMap mapIsReadyCallback={mapIsReadyCallback}/>
        </div>
    );
}

export default App;