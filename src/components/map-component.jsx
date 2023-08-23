import React, { useEffect, useRef } from 'react';
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { bbox } from "ol/loadingstrategy.js";
import { Style, Fill, Stroke } from "ol/style";
import Graticule from "ol/layer/Graticule.js";
import "ol/ol.css";
import "../utilities/functions";
import "../utilities/constants";
import { envConfig } from '../config';

var params = JSON.parse(localStorage.getItem('oauth2-test-params'));

const graticule = new Graticule({
  // the style to use for the lines, optional.
  strokeStyle: new Stroke({
    color: "rgba(255,120,0,0.9)",
    width: 2,
    lineDash: [0.5, 4],
  }),
  showLabels: true,
  wrapX: true,
});

const formatLineString = (obj) => {
  var retArray = [];
  obj.forEach((lineString) => {
    retArray.push(lineString.getCoordinates().join(","));
  });
  return retArray.join(";");
};

const vectorSource = new VectorSource({
  format: new GeoJSON(),
  loader: function (extent, _resolution, _projection, success, failure) {
    vectorSource.removeLoadedExtent(extent);
    const url = envConfig.OL_LAYER_URL + "?bbox=" + extent.join(',');
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Bearer " + params['access_token']);
    const onError = function () {
      vectorSource.removeLoadedExtent(extent);
      failure();
    };
    xhr.onerror = onError;
    xhr.onload = function () {
      if (xhr.status === 200) {
        const features = vectorSource
          .getFormat()
          .readFeatures(xhr.responseText);
        vectorSource.addFeatures(features);
        success(features);
      } else {
        onError();
      }
    };
    xhr.send();
  },
  strategy: bbox,
  overlaps: false,
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: new Style({
    fill: new Fill({
      color: "rgba(255,255,255,0.2)",
    }),
    stroke: new Stroke({
      color: "rgba(0,0,255,0.3)",
    }),
  }),
  maxZoom: 14,
  minZoom: 8,
});

const MyMap = ({
  mapIsReadyCallback /* To be triggered when a map object is created */,
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
        graticule,
        vectorLayer,
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