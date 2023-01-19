import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveValue, fetchRoutes } from "../redux-toolkit/routeSlice";
import { fetchCoords } from "../redux-toolkit/coordsSlice";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const RoutesForm = () => {
  const route = useSelector((state) => state.route);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoutes());
  }, []);

  //рендер при изменении в активных маршрутах
  const handleClick = (event) => {
    if (event.target.value === route.activeValue) {
      dispatch(changeActiveValue(0));
      dispatch(fetchCoords(4));
    } else {
      dispatch(changeActiveValue(event.target.value));
      dispatch(fetchCoords(event.target.value));
    }
  };

  return (
    <FormControl>
      <RadioGroup name="radio-buttons-group" value={route.activeValue}>
        {route.loading && <div>Загрузка...</div>}
        {!route.loading && route.error ? <div>Error: {route.error}</div> : null}
        {!route.loading && route.items.length ? (
          route.items.map((item) => (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio onClick={handleClick} />}
              label={item.name}
            />
          ))
        ) : (
          <label>В данный момент нет маршрутов для показа</label>
        )}
      </RadioGroup>
    </FormControl>
  );
};
