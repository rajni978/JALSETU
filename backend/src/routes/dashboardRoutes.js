import express from "express";
import getDashboardSummary from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/dashboard", getDashboardSummary);

export default router;