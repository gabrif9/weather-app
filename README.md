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
- [TailwindCSS](https://tailwindcss.com/) 
- [DaisyUI](https://daisyui.com/)
- [Chart.js](https://www.chartjs.org/) for charts
- [Docker Compose](https://docs.docker.com/compose/) for deployment
- Weather API (OpenWeather)
- [AnimateCSS](https://animate.style/) for animations

---

## Future Improvements / TODO

- Better chart customization and tooltips
- 🌍 Add an interactive map using Leaflet and OpenStreetMap. 
    Allow users to select cities directly from the map and see real-time weather data

## 📂 Project Structure

The frontend part of the application is organized as follows (inside `src/app`):

- **components/**  
  Contains all the Angular components used to build the application’s UI.

- **customPipes/**  
  Contains custom pipes, e.g., for scenarios like sanitizing URLs before rendering them safely.

- **models/**  
  Contains TypeScript interfaces used to strongly type and model the data received from APIs.

- **services/**  
  Contains Angular services used to handle API calls and manage external data.

- **environments/**  
  Contains environment-specific files (`environment.ts`, `env.prod.ts`) to store environment variables like the OpenWeather API key.

- **signal.ts**  
  Contains global signals, used to enable communication between different components in a reactive and lightweight way.

This structure helps keep the code modular, maintainable, and easy to extend in the future.    

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


