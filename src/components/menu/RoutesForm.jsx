import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const RoutesForm = () => {
  const [list, setList] = useState([]);
  const [routeID, setRouteID] = useState("");

  fetch("https://janti.ru:5381/Main/GetRoutes")
    .then((response) => response.json())
    .then((data) => setList(data))
    .catch((err) => {
      console.log(err);
    });

  const handleClick = (event) => {
    if (event.target.value === routeID) {
      setRouteID("");
    } else {
      setRouteID(event.target.value);
    }
  };

  return (
    <FormControl>
      <RadioGroup name="radio-buttons-group" value={routeID}>
        {list.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio onClick={handleClick} />}
            label={item.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
