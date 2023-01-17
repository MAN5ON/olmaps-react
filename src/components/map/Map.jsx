import React, { useEffect, useRef } from "react";
import s from "./Map.module.scss";
import "./OLDefaultStyles.css";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { ZoomSlider } from "ol/control.js";
import XYZ from "ol/source/XYZ";

export const OLMap = (getRoutes) => {
  // const [map, setMap] = useState();
  // const [featuresLayer, setFeaturesLayer] = useState();
  // const [routes, setRoutes] = useState();

  // fetch(`../JSON/getRoutesData/1.json`)
  //   .then(res => res.json)
  //   .then(data => setRoutes(data))
  //   .catch(error => console.log(error))

  const mapElement = useRef();

  useEffect(() => {
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),

        initialFeaturesLayer,
      ],

      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    const zoomslider = new ZoomSlider();
    initialMap.addControl(zoomslider);

    // setMap(initialMap);
    // setFeaturesLayer(initialFeaturesLayer);
  }, []);

  useEffect(() => {
    if (getRoutes.length) {
      console.log(getRoutes);
    }
  }, [getRoutes]);

  return <div ref={mapElement} className={s.map} id="map"></div>;
};
