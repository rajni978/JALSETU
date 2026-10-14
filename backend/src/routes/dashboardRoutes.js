
import express from "express";
import getDashboardSummary from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/dashboard",
    authMiddleware,
    adminOnly,
    getDashboardSummary
);

export default router;
