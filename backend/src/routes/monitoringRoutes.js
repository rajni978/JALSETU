import express from "express";

import {
    createMonitoring,
    getMonitoringRecords,
    getMonitoringById
} from "../controllers/monitoringController.js";

const router = express.Router();

router.post("/", createMonitoring);

router.get("/", getMonitoringRecords);

router.get("/:id", getMonitoringById);

export default router;