FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@latest

COPY . .

RUN ng cache clean
RUN ng build --configuration=production --base-href /weather-app/

FROM nginx:1.25

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build app/dist/weather-app/browser /usr/share/nginx/html/weather-app