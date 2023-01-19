import React, { useState, useEffect, useRef } from "react";
import s from "../styles/Map.module.css";
import "../styles/OLDefaultStyles.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector.js';
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

import { ZoomSlider } from "ol/control.js";
import MultiPoint from "ol/geom/MultiPoint.js";
import LineString from "ol/geom/LineString.js";
import Feature from "ol/Feature.js";

import { Circle, Stroke, Style } from "ol/style.js";
import Fill from "ol/style/Fill";
import { useSelector } from "react-redux";

export const OLMap = () => {
  const [map, setMap] = useState();
  const currentCoord = useRef();

  const coords = useSelector((state) => state.coords);
  const routeObj = useSelector((state) => state.route);

  try {
    currentCoord.current = coords.items.map((item) => [item.lon, item.lat]);
  } catch (error) {
    currentCoord.current = 0;
  }

  const mapElement = useRef();

  useEffect(() => {
    //первый рендер, инициализация карты
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const view = new View({
      center: fromLonLat([70, 65]),
      zoom: 4,
      minZoom: 2,
      maxZoom: 15,
    });
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
        initalFeaturesLayer,
      ],
      view,
    });

    //Zoom
    const zoomslider = new ZoomSlider();
    map.addControl(zoomslider);
    setMap(map);
  },[]);

  if (coords.isLoaded) {
    //очистить слой перед отрисовкой
    map.getLayers().forEach(layer => {
      if (layer.get('name') && layer.get('name') === 'route_vectorLayer'){
          map.removeLayer(layer)
      }
    });

    //точки
    const points = new MultiPoint(currentCoord.current).transform(
      "EPSG:4326",
      "EPSG:3857"
    );

    const pointsFeature = new Feature({
      type: "points",
      geometry: points,
    });

    //линия
    const route = new LineString(currentCoord.current).transform(
      "EPSG:4326",
      "EPSG:3857"
    );

    const routeFeature = new Feature({
      type: "route",
      geometry: route,
    });
    
    //cтии для них
    const styles = {
      points: new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({
            color: routeObj.items[routeObj.activeValue].color,
          }),
        }),
      }),
      route: new Style({
        stroke: new Stroke({
          width: 2,
          color: routeObj.items[routeObj.activeValue].color,
        }),
      }),
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature, pointsFeature],
      }),
      style: function (feature) {
        return styles[feature.get("type")];
      },
    });

    vectorLayer.set('name', 'route_vectorLayer');
    map.addLayer(vectorLayer);
  }

  return (
    <div className={s.mapWrapper}>
      <div ref={mapElement} className={s.map} id="map"></div>
    </div>
  );
};
