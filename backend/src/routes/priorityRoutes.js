import express from "express";

import calculatePriority from "../controllers/priorityController.js";

const router = express.Router();

router.get("/:location", calculatePriority);

export default router;