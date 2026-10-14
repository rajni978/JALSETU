import express from "express";
import { createWaterData,getWaterdata,getWaterdataById,updatedWaterData,deleteWaterData,getWaterRiskScore} from "../controllers/waterDataController.js";

const router = express.Router()

router.post("/water-data",createWaterData);

router.get("/water-data",getWaterdata)

router.get("/water-data/:id",getWaterdataById);
router.put("/water-data/:id",updatedWaterData);

router.delete("/water-data/:id",deleteWaterData)

router.get("/water-data/:id/risk",getWaterRiskScore)


export default router;