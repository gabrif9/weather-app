import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { getCities } from "../cache/citiesCache";

export const getCityByName = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const query = req.query.city as string;

        if(!query) {
            res.status(400).json({ message: "Query parameter 'city' is required"})
            return;
        }

    
        const cities = getCities()

        const results = Object.values(cities).filter((city: any) => 
            city.name.toLowerCase().startsWith(query.toLowerCase())
        )

        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}