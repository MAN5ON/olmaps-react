# OpenLayers Map using React
- :green_circle: - реализовано;
- :yellow_circle: - реализовано, но с комментарием(возможно реализовано не полностью или немного отличается от изначального требования);
- :red_circle: - не реализовано;
---
Основные задачи:
- :green_circle: создать страницу с использованием **React**;
- :green_circle: На странице отображается карта с использованием **OpenLayers**;
- :green_circle: на карте есть стандартные кнопки управления **Zoom Sliders**;
- :green_circle: У карты есть навигационная панель со списком маршрутов(выбор/отмена управляется кликом по маршруту);
- :yellow_circle: При выборе маршрута он отображается на карте в виде **LineString** и **MultiPoints** цвета указанного в настройках маршрута, шириной 2 px. Каждая точка маршрута отображается окружностью 3px. Не знаю почему, но через**Polyline** маршрут не рендерится;
- :red_circle: При нажатии левой клавишей мыши на точку маршрута выводиться всплывающее окно с данными точки: дата (формат HH:mm:ss dd.mm.yy часовой пояс локальный), координаты, направление и скорость. Всплывающее окно имеет кнопку закрытия. Так же при нажатии на пустое место карты, предыдущее окно пропадает. Окно должно быть реализовано через **Overlay**;
- :green_circle: Загрузка списка маршрутов производится при запуске страницы. Загрузка данных при выборе маршрута производиться каждый раз заново;
- :green_circle: Страница получает данные через **Web Api**.

**Ссылка на хостинг :**
## !! Дополнительные задачи !!

Дополнительные задачи не обязательны к выполнению, вы их можете реализовать при желании, будет плюсом при выборе.

- :red_circle: На линии маршрута заменить отображение точек маршрута на стрелочки, которые будут показывать направление движения;
- :red_circle: Пометить точки начала и конца маршрута специальными маркерами, к примеру два флажка разного цвета;
- :red_circle: Сделать объединение точке маршрута при отдалении масштаба для избавления от нагромождения обозначений точек **Clustered Features**. При нажатии на объединение выводиться окно с данными первой точки в объединении, иконка используется такая же, как и для обычного события, направление движения первого события;
- :red_circle: Добавить проигрывать движения по траектории **Marker Animation**;
- :red_circle: *Ваши фантазии* - любые фишки которые на ваш взгляд дополнят тестовое задание. Обязательно прикрепить описание.

