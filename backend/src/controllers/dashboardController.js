import Report from "../models/Report.js";
import WaterData from "../models/WaterData.js";

import { calculateWaterRisk } from "../utils/waterRisk.js";


const getDashboardSummary = async (req, res, next) => {
    try {
        const totalReports = await Report.countDocuments();

        const pendingReports = await Report.countDocuments({
            status: "Pending"
        });

        const verifiedReports = await Report.countDocuments({
            status: "Verified"
        });

        const resolvedReports = await Report.countDocuments({
            status: "Resolved"
        });

        const totalWaterData = await WaterData.countDocuments();


const allWaterData = await WaterData.find();

let highRiskCount = 0;
let mediumRiskCount = 0;
let lowRiskCount = 0;

for (const item of allWaterData) {
    const { riskLevel } = calculateWaterRisk({
        groundwaterLevel: item.groundwaterLevel,
        rainfall: item.rainfall,
        waterBodyCondition: item.waterBodyCondition
    });

    if (riskLevel === "High") {
        highRiskCount++;
    } else if (riskLevel === "Medium") {
        mediumRiskCount++;
    } else {
        lowRiskCount++;
    }
}


        const latestWaterData = await WaterData
            .find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            summary: {
                
summary: {
    totalReports,
    pendingReports,
    verifiedReports,
    resolvedReports,
    totalWaterData,
    highRiskCount,
    mediumRiskCount,
    lowRiskCount
},

            },
            latestWaterData
        });

    } catch (error) {
        next(error);
    }
};

export default getDashboardSummary;