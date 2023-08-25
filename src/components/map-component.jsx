import React, { useEffect, useRef } from 'react';
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj.js";
import "ol/ol.css";
import "../utilities/functions";
import "../utilities/constants";

useGeographic();

const MyMap = ({
  mapIsReadyCallback,
  vars
}) => {
  const mapContainer = useRef(null);

  const constructMap = (pos) => {
    new Map({
      // the map will be created using the 'map-root' ref
      target: document.querySelectorAll([".map-container"])[0],
      eventListeners: {
        // this is where we integrate the Vue component to OpenLayers
        // we forward all (possible) events to the Vue component
        // using the $emit method
        moveend: (evt) => {
          this.$emit("moveend", evt);
        },
        click: (evt) => {
          this.$emit("click", evt);
        },
        pointermove: (evt) => {
          this.$emit("pointermove", evt);
        },
      },
      layers: [
        // adding a background tiled layer
        new TileLayer({
          source: new OSM(), // tiles are served by OpenStreetMap
        }),
        vectorLayer
      ],
      // the map view will initially show the whole world
      view: new View({
        zoom: 10,
        maxZoom: 14,
        minZoom: 8,
        center: [pos.coords.longitude, pos.coords.latitude],
        constrainResolution: true,
      }),
    });
  };
  useEffect(() => {
    
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        constructMap(pos);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        constructMap({
          coords: {
            latitude: 51.505,
            longitude: -0.09,
          },
        });
      },
      options
    );

    mapIsReadyCallback('my map');
  }, [mapIsReadyCallback]);

  return (<div className="map-container" ref={mapContainer}></div>);
};

export default MyMap;