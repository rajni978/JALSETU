import Monitoring from "../models/Monitoring.js";


// CREATE MONITORING RECORD
export const createMonitoring = async (req, res, next) => {
    try {
        const {
            action,
            location,
            beforeGroundwaterLevel,
            afterGroundwaterLevel,
            beforeWaterAvailability,
            afterWaterAvailability,
            observations
        } = req.body;

        if (
            !action ||
            !location ||
            beforeGroundwaterLevel === undefined ||
            afterGroundwaterLevel === undefined ||
            !beforeWaterAvailability ||
            !afterWaterAvailability ||
            !observations
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const monitoring = await Monitoring.create({
            action,
            location,
            beforeGroundwaterLevel,
            afterGroundwaterLevel,
            beforeWaterAvailability,
            afterWaterAvailability,
            observations
        });

        res.status(201).json({
            success: true,
            message: "Monitoring record created successfully",
            monitoring
        });

    } catch (error) {
        next(error);
    }
};


// GET ALL MONITORING RECORDS
export const getMonitoringRecords = async (req, res, next) => {
    try {
        const monitoring = await Monitoring.find()
            .populate(
                "action",
                "title category status priority"
            )
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: monitoring.length,
            monitoring
        });

    } catch (error) {
        next(error);
    }
};


// GET MONITORING BY ID
export const getMonitoringById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const monitoring = await Monitoring.findById(id)
            .populate(
                "action",
                "title category status priority"
            );

        if (!monitoring) {
            return res.status(404).json({
                success: false,
                message: "Monitoring record not found"
            });
        }

        res.json({
            success: true,
            monitoring
        });

    } catch (error) {
        next(error);
    }
};