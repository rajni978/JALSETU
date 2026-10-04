import WaterData from "../models/WaterData.js";
import Report from "../models/Report.js";

const calculatePriority = async (req, res, next) => {
    try {
        const { location } = req.params;

        const waterData = await WaterData.findOne({ location });

        if (!waterData) {
            return res.status(404).json({
                success: false,
                message: "Water data not found for this location"
            });
        }

        // Calculate water risk score
        let waterScore = 0;

        if (waterData.groundwaterLevel < 5) {
            waterScore += 40;
        } else if (waterData.groundwaterLevel < 10) {
            waterScore += 25;
        } else {
            waterScore += 10;
        }

        if (waterData.rainfall < 500) {
            waterScore += 30;
        } else if (waterData.rainfall < 1000) {
            waterScore += 20;
        } else {
            waterScore += 10;
        }

        if (waterData.waterBodyCondition === "Poor") {
            waterScore += 30;
        } else if (waterData.waterBodyCondition === "Moderate") {
            waterScore += 20;
        } else {
            waterScore += 10;
        }

        // Get community reports
        const reports = await Report.find({
            location
        });

        const pendingReports = reports.filter(
            report => report.status === "Pending"
        );

        // Calculate final priority
        let priorityScore = waterScore;

        if (reports.length >= 5) {
            priorityScore += 30;
        } else if (reports.length >= 2) {
            priorityScore += 20;
        } else if (reports.length >= 1) {
            priorityScore += 10;
        }

        if (pendingReports.length >= 3) {
            priorityScore += 20;
        }

        let priority = "Low";

        if (priorityScore >= 70) {
            priority = "High";
        } else if (priorityScore >= 40) {
            priority = "Medium";
        }

        res.json({
            success: true,
            location,
            waterRiskScore: waterScore,
            priorityScore,
            priority,
            totalReports: reports.length,
            pendingReports: pendingReports.length
        });

    } catch (error) {
        next(error);
    }
};

export default calculatePriority;