import React, { useState } from "react";

import s from "../styles/Menu.module.css";
import { RoutesForm } from "./RoutesForm";

export const Menu = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className={s.navbar}>
      <nav className={s.nav}>
        <div className={s.menuBtn} onClick={() => setMenuActive(!menuActive)}>
          <span />
        </div>
      </nav>
      <div className={menuActive ? s.menuActive : s.menu}>
        <RoutesForm />
      </div>
    </div>
  );
};
