# 🌦️ WeatherApp Angular

An Angular application to display current weather and a 5-day forecast with interactive charts.

---

## ✨ Features

✅ Search and view weather **only for Italian cities** 🇮🇹  
✅ 5-day weather forecast with temperature, humidity, and precipitation details  
✅ **Dark mode** for a modern and elegant look 🌙  
✅ Dynamic charts showing temperature and precipitation trends (built with Chart.js)  
✅ Responsive and modern UI  
✅ Reactive state management with Angular signals

---

## 🛠️ Built With

- [Angular](https://angular.io/)
- [Chart.js](https://www.chartjs.org/) for charts
- [Docker Compose](https://docs.docker.com/compose/) for deployment
- Weather API (OpenWeather)
- [AnimateCSS](https://animate.style/) for animations

---

## Future Improvements / TODO

- Better chart customization and tooltips
- 🌍 Add an interactive map using Leaflet and OpenStreetMap. 
    Allow users to select cities directly from the map and see real-time weather data

## 🚀 Getting Started

1. Clone this repository:

```bash
git clone https://github.com/your-username/weather-app-angular.git
cd weather-app-angular
```

2. Open the file env.prod.ts located in frontend/src/environment and set your openWeather API_KEY 

3. Build and start the application using Docker Compose from the root folder

```bash
docker compose up --build -d
```

4. Check running containers using

```bash
docker ps
```

5. Then you will find your application to this link

http://localhost:4200/weather-app/


