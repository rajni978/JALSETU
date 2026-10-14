import express from "express"

import {
    createReport,
    getReports,
    updateReports,
    deleteReport,
    updateReportStatus,
    trackReport,
    getMyReports,
    getAdminReportSummary
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

const router = express.Router()

router.post("/reports", authMiddleware, createReport);
router.get("/reports", authMiddleware, getReports);

router.get("/reports/my", authMiddleware, getMyReports);

router.get("/reports/track/:trackingId", trackReport);


router.get("/reports/admin/summary",authMiddleware,adminOnly,getAdminReportSummary);

router.put("/reports/:id",updateReports);


router.put(
    "/reports/:id",
    authMiddleware,
    adminOnly,
    updateReports
);

router.delete(
    "/reports/:id",
    authMiddleware,
    adminOnly,
    deleteReport
);


export default router;