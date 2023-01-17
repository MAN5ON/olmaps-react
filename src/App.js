import React from "react";
import s from "./App.module.scss"
import { OLMap } from "./components/map/Map"
import { Menu } from "./components/menu/Menu"
import list from "./JSON/getRoutes.json"

function App() {
  return (
    <div className={s.app}>
      <Menu list={list}/>
      <OLMap/>
    </div>
  );
}

export default App;
