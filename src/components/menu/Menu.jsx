import React, {useState} from "react";
import s from "./Menu.module.scss";

export const Menu = () => {
  const list = [
    {
      id: 1,
      name: "Маршрут 1",
      color: "#6A5ACD",
    },
    {
      id: 2,
      name: "Маршрут 2",
      color: "#32CD32",
    },
    {
      id: 3,
      name: "Маршрут 3",
      color: "#CD5C5C",
    },
    {
      id: 4,
      name: "Пустой маршрут",
      color: "#C71585",
    },
    {
      id: 5,
      name: "Данные не найдены (ошибка)",
      color: "#00CDCD",
    },
  ];

  //   const [list, setList] = useState([]);
  //   fetch("https://janti.ru:5381/Main/GetRoutes")
  //     .then((response) => response.json())
  //     .then((data) => setList(data))
  //     .catch((err) => {
  //       console.log(err);
  //     });

  return (
    <div className={s.menu}>
      {list.map((item) => ( 
        <div className={s.item} key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
};
