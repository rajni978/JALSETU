
import express from "express";
import { getRainfallData } from "../controllers/rainfallController.js";

const router = express.Router();

router.get("/rainfall", getRainfallData);

export default router;
