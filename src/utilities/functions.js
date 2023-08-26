import { envConfig } from '../config';
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { bbox } from "ol/loadingstrategy.js";
import { Style, Fill, Stroke } from "ol/style";
import VectorLayer from "ol/layer/Vector";
  
export const buildVectorLayer = () => {
    var params = JSON.parse(localStorage.getItem('user-token'));
    if (params) {
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
      source:new VectorSource()
  });
  }
};
