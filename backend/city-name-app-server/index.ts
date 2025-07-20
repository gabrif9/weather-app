import express from "express";
import cityNameRoutes from "./src/routes/cityNameRoutes";
import helmet from "helmet";
import cors from "cors";
import { loadCities } from "./src/cache/citiesCache";

const app = express();

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(cors())



// Routes
app.use("/cityname", cityNameRoutes)

loadCities()


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


