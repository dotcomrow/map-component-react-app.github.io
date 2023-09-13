import React, { useEffect } from 'react';
import { useGeographic } from "ol/proj.js";
import "ol/ol.css";
import { constructMap } from "../utilities/functions";
import "../utilities/constants";

const MyMap = ({
  mapIsReadyCallback,
  vars
}) => {

  useEffect(() => {
    useGeographic();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        var map = constructMap(pos);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        var map = constructMap({
          coords: {
            latitude: 51.505,
            longitude: -0.09,
          },
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    mapIsReadyCallback();
  }, []);

  return (
    <div className="wrapper">
      <div className="map-container"></div>
      <div className="popup-container"></div>
    </div>
  );
};

export default MyMap;