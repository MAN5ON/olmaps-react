import React, { useState, useEffect, useRef } from "react";
import s from "../styles/Map.module.css";
import "../styles/OLDefaultStyles.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";

import { ZoomSlider } from "ol/control.js";
import MultiPoint from "ol/geom/MultiPoint.js";
import LineString from "ol/geom/LineString.js";
import Feature from "ol/Feature.js";

import { Circle, Stroke, Style } from "ol/style.js";
import Fill from "ol/style/Fill";

export const OLMap = () => {
  const [routes, setRoutes] = useState([]);

  const [map, setMap] = useState();
  const [view, setView] = useState();

  fetch("https://janti.ru:5381/Main/GetRouteData?id=3")
    .then((response) => response.json())
    .then((data) => setRoutes(data))
    .catch((err) => {
      console.log(err);
    });

  const currentRoute = routes.map((item) => [item.lon, item.lat]);
  const mapElement = useRef();

  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const view = new View({
      center: [0, 0],
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
    setView(view);
  }, []);

  useEffect(() => {
    //Routes
    if (routes.length) {
      const points = new MultiPoint(currentRoute).transform(
        "EPSG:4326",
        "EPSG:3857"
      );

      const route = new LineString(currentRoute).transform(
        "EPSG:4326",
        "EPSG:3857"
      );

      const pointsFeature = new Feature({
        type: "points",
        geometry: points,
      });

      const routeFeature = new Feature({
        type: "route",
        geometry: route,
      })

      const styles = {
        points: new Style({
          image: new Circle({
            radius: 3,
            fill: new Fill({
              color: [200, 100, 100, 0.5],
            }),
          }),
        }),
        route: new Style({
          stroke: new Stroke({
            width: 2,
            color: [100, 200, 100, 0.5],
          })
        })
      };

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [pointsFeature, routeFeature],
        }),
        style: function (feature) {
          return styles[feature.get("type")];
        },
      });

      map.addLayer(vectorLayer);

      //Overlay
      //   const popup = new Overlay({
      //     element: document.getElementById("popup"),
      //   });
      //   map.addOverlay(popup);
    }
  }, [routes, currentRoute, map, view]);

  return (
    <div className={s.mapWrapper}>
      <div ref={mapElement} className={s.map} id="map"></div>)
    </div>
  );
};
