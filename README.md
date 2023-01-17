# OpenLayers Map using React

use `npm start` 

Необходимо:
- создать страницу с использованием React;
- На странице отображается карта с использованием OpenLayers;
- на карте есть стандартные кнопки управления (Zoom Sliders);
- У карты есть навигационная панель со списком маршрутов(выбор/отмена управляется кликом по маршруту);
- При выборе маршрута он отображается на карте в виде polyline цвета указанного в настройках маршрута, шириной 2 px. Каждая точка маршрута отображается окружностью 3px;
- При нажатии левой клавишей мыши на точку маршрута выводиться всплывающее окно с данными точки: дата (формат HH:mm:ss dd.mm.yy часовой пояс локальный), координаты, направление и скорость. Всплывающее окно имеет кнопку закрытия. Так же при нажатии на пустое место карты, предыдущее окно пропадает. Окно должно быть реализовано через Overlay;
- Загрузка списка маршрутов производится при запуске страницы. Загрузка данных при выборе маршрута производиться каждый раз заново;
- Данные страница не получает через Web Api (т.к. временное тестовое API выдаёт ошибку CORS политики). В проекте используются локальные JSON файлы, однако в проекте так же есть закоментированные fetch запросы к серверу.

https://janti.ru:5381/Main/GetRoutes или `JSON/getRoutes.json` (без параметров) - Возвращает список маршрутов (5 шт). 
Результат json массив структур:
```json
[
	{"id":1,"name":"Маршрут 1","color":"#6A5ACD"},
	{"id":2,"name":"Маршрут 2","color":"#32CD32"},
	{"id":3,"name":"Маршрут 3","color":"#CD5C5C"},
	{"id":4,"name":"Пустой маршрут","color":"#C71585"},
	{"id":5,"name":"Данные не найдены (ошибка)","color":"#00CDCD"}
]
```
где:
``id`` - идентификатор маршрута
``name`` - наименование маршрута
``color`` - цвет в формате hex, для вывода линии и точек маршрута

https://janti.ru:5381/Main/GetRouteData?id=3 или `JSON/getRoutesData/(id).json`(параметр int ``id``) - Возвращает данные траектории движения, по указанному идентификатору маршрута, в формате:
```json
[
	{"time":1673704832,"lon":76.58818333333333,"lat":66.080085,"course":130,"speed":0},
	{"..."},
	{"time":1673747252,"lon":77.32884166666666,"lat":65.95150833333334,"course":117,"speed":15}
]
```
где:
``time`` - время события в формате UNIX
``lon`` - координата долготы в проекции WGS84
``lat`` - координата широты в проекции WGS84
``course`` - направление движения от 0 до 360 (0 или 360 - движется на север)
``speed`` - скорость движения км/ч

Для сдачи задания необходимо разместить страницу на хостинге, а код загрузить на github и скинуть ссылки на оба ресурса.
## !! Дополнительные задачи !!

Дополнительные задачи не обязательны к выполнению, вы их можете реализовать при желании, будет плюсом при выборе.

- :x: На линии маршрута заменить отображение точек маршрута на стрелочки, которые будут показывать направление движения;
- :x: Пометить точки начала и конца маршрута специальными маркерами, к примеру два флажка разного цвета;
- :x: Сделать объединение точке маршрута при отдалении масштаба для избавления от нагромождения обозначений точек (Clustered Features). При нажатии на объединение выводиться окно с данными первой точки в объединении, иконка используется такая же, как и для обычного события, направление движения первого события;
- :x: Добавить проигрывать движения по траектории (Marker Animation);
- :x: “Ваши фантазии” - любые фишки которые на ваш взгляд дополнят тестовое задание. Обязательно прикрепить описание.

## Оценивается:

- Корректность работы страницы
- Скорость работы страницы
- UI/UX (понимаем, что вы не дизайнеры)
- Чистота кода
- Адаптивность
