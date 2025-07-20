import path from "path";
import fs from "fs";
import { City } from "../models/city";

let cities: Record<string, City> = {};

export function loadCities() {
    const filePath = path.join(__dirname, "../data/cities.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    cities = JSON.parse(rawData);
    console.log(`✅ cities.json loaded in cache (${Object.keys(cities).length} cities)`);
}

export function getCities() {
  return cities;
}