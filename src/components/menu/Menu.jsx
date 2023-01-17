import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import s from "./Menu.module.scss";
import list from "../../JSON/getRoutes.json";

export const Menu = () => {

  // Ошибка CORS политики, если создатели тестового её пофиксят, то получаю json так:
  // const [list, setList] = useState(routes);
  // fetch("https://janti.ru:5381/Main/GetRoutes")
  //   .then((response) => response.json())
  //   .then((data) => setList(data))
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const [menuActive, setMenuActive] = useState(false);
  const [route, changeRoute] = useState();

  return (
    <div className={s.navbar}>
      <nav className={s.nav}>
        <div className={s.menuBtn} onClick={() => setMenuActive(!menuActive)}>
          <span />
        </div>
      </nav>
      <div className={menuActive ? s.menuActive : s.menu}>
        <FormControl>
          <RadioGroup
            name="radio-buttons-group"
            defaultValue={null}
            value={route}
            onChange={(e) => {
              changeRoute(e.target.value);
            }}
          >
            {list.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Button onClick={()=> changeRoute(null)} variant="contained">Reset</Button>
      </div>
    </div>
  );
};
