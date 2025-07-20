import { Router } from "express";
import { getCityByName } from "../controllers/cityNameController";

const router = Router();

router.get("/", getCityByName)

export default router;