import express from "express"

import { createReport,getReports,updateReports,deleteReport,updateReportStatus} from "../controllers/reportController.js"
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

const router = express.Router()

router.post("/reports",createReport);

router.get("/reports",getReports)

router.put("/reports/:id",updateReports);

router.delete("/reports/:id",deleteReport)

router.put(
    "/reports/:id/status",
    authMiddleware,
    adminOnly,
    updateReportStatus
);

export default router;