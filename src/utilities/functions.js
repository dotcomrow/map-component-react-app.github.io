import { envConfig } from '../config';
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { bbox } from "ol/loadingstrategy.js";
import { Style, Fill, Stroke } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const buildPopup = (feature) => {
  return `<div class="popup">
    <h3>${feature.get("name")}</h3>
    <p>${feature.get("description")}</p>
    <p><a href="${feature.get("url")}">More info</a></p>
  </div>`;
};

export const constructMap = (pos) => {
  return new Map({
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
      buildVectorLayer()
    ],
    // the map view will initially show the whole world
    view: new View({
      zoom: 10,
      maxZoom: 14,
      minZoom: 8,
      center: [pos.coords.longitude, pos.coords.latitude],
      constrainResolution: true,
    }),
    overlays: [
      new Overlay({
        element: buildPopup(feature),
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      }),
    ],
  });
};

export const buildVectorLayer = () => {
  var params = JSON.parse(localStorage.getItem('user-token'));
  if (params) {
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      loader: function (extent, _resolution, _projection, success, failure) {
        vectorSource.removeLoadedExtent(extent);
        const url = "https://api.suncoast.systems/features?bbox=" + extent.join(',');
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

    return new VectorLayer({
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
  } else {
    return new VectorLayer({
      source: new VectorSource()
    });
  }
};
