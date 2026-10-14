import Panchayat from "../models/Panchayat.js";
import Report from "../models/Report.js";
import Action from "../models/Action.js";
import Monitoring from "../models/Monitoring.js";
import WaterData from "../models/WaterData.js";

const getPanchayatDashboard = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Panchayat find
        const panchayat = await Panchayat.findById(id);

        if (!panchayat) {
            return res.status(404).json({
                success: false,
                message: "Panchayat not found"
            });
        }

        const location = panchayat.location;

        // Water data
        const waterData = await WaterData.findOne({
            location
        });

        // Reports
        const reports = await Report.find({
            location
        }).sort({ createdAt: -1 });

        const pendingReports = reports.filter(
            report => report.status === "Pending"
        );

        const verifiedReports = reports.filter(
            report => report.status === "Verified"
        );

        const resolvedReports = reports.filter(
            report => report.status === "Resolved"
        );

        // Actions
        const actions = await Action.find({
            panchayat: id
        })
            .sort({ createdAt: -1 });

        const plannedActions = actions.filter(
            action => action.status === "Planned"
        );

        const inProgressActions = actions.filter(
            action => action.status === "In Progress"
        );

        const completedActions = actions.filter(
            action => action.status === "Completed"
        );

        // Monitoring
        const actionIds = actions.map(action => action._id);

        const monitoring = await Monitoring.find({
            action: { $in: actionIds }
        })
            .populate(
                "action",
                "title category status"
            )
            .sort({ createdAt: -1 });

        res.json({
            success: true,

            panchayat: {
                id: panchayat._id,
                name: panchayat.name,
                location: panchayat.location,
                district: panchayat.district
            },

            waterData,

            reports: {
                total: reports.length,
                pending: pendingReports.length,
                verified: verifiedReports.length,
                resolved: resolvedReports.length,
                data: reports
            },

            actions: {
                total: actions.length,
                planned: plannedActions.length,
                inProgress: inProgressActions.length,
                completed: completedActions.length,
                data: actions
            },

            monitoring: {
                total: monitoring.length,
                data: monitoring
            }
        });

    } catch (error) {
        next(error);
    }
};

export default getPanchayatDashboard;