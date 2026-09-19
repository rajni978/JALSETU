import express from "express";
import WaterData from "../models/WaterData.js";

const router = express.Router();

router.post("/water-data", async (req, res) => {
    try {
        const {
            location,
            groundwaterLevel,
            rainfall,
            waterBodyCondition
        } = req.body;

        if (
            !location ||
            groundwaterLevel === undefined ||
            rainfall === undefined ||
            !waterBodyCondition
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const waterData = await WaterData.create({
            location,
            groundwaterLevel,
            rainfall,
            waterBodyCondition
        });

        res.status(201).json({
            success: true,
            message: "Water data created successfully",
            waterData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

export default router;