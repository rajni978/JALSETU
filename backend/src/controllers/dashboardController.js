import Report from "../models/Report.js";
import WaterData from "../models/WaterData.js";

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

        const latestWaterData = await WaterData
            .find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            summary: {
                totalReports,
                pendingReports,
                verifiedReports,
                resolvedReports,
                totalWaterData
            },
            latestWaterData
        });

    } catch (error) {
        next(error);
    }
};

export default getDashboardSummary;