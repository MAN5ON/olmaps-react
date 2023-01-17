import React from "react";
import s from "./App.module.css"
import { OLMap } from "./components/map/Map"
import { Menu } from "./components/menu/Menu"

function App() {
  return (
    <div className={s.app}>
      <Menu/>
      <OLMap/>
    </div>
  );
}

export default App;
