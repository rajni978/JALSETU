import express from "express";

import {
    createPanchayat,
    getPanchayats,
    getPanchayatById
} from "../controllers/panchayatController.js";

const router = express.Router();

router.post("/", createPanchayat);

router.get("/", getPanchayats);

router.get("/:id", getPanchayatById);

export default router;