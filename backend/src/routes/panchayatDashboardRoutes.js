import express from "express";

import getPanchayatDashboard
    from "../controllers/panchayatDashboardController.js";

const router = express.Router();

router.get(
    "/:id",
    getPanchayatDashboard
);

export default router;