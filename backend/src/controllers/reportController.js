import Report from "../models/Report.js";

const createReport = async (req,res,next) => {
   try {
const { problemType, description, location } = req.body;
const userId = req.user.id;
        if(!problemType || !description || !location){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

       const report = await Report.create({
    problemType,
    description,
    location,
    submittedBy: userId
});

        res.status(201).json({
            success:true,
            message:"Report submitted successfully",
            report,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message
        })
    }
}

const getReports = async (req, res, next) => {
    try {
        const { location, status } = req.query;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const filter = {};

        if (req.user.role !== "admin") {
    filter.submittedBy = req.user.id;
}

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (status) {
            filter.status = status;
        }

        const reports = await Report
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalReports = await Report.countDocuments(filter);

        res.json({
            success: true,
            page,
            limit,
            totalReports,
            totalPages: Math.ceil(totalReports / limit),
            reports
        });

    } catch (error) {
        next(error);
    }
};

const updateReports = async (req,res,next) => {
     try {
            const {id} = req.params;
    
            const {problemType,description,location,status} = req.body;
    
            const report = await Report.findByIdAndUpdate(
                id,
                {
                    problemType,
                    description,
                    location,
                    status
                },
                {
                    returnDocument:"after",
                    runValidators:true
                }
            );
    
            if(!report){
                return res.status(404).json({
                    success:false,
                    message:"Report not found"
                })
            }
    
            res.json({
                success:true,
                message:"Report updated successfully",
                report
            })
        } catch (error) {
            next(error)
        }
}

const deleteReport = async (req,res,next) => {
    try {
        const {id} = req.params;

        const report = await Report.findByIdAndDelete(id)

        if(!report){
            return res.status(404).json({
                success:false,
                message:"Report not found"
            })
        }

        res.json({
            success:true,
            message:"Report updated successfully",
            report
        })
    } catch (error) {
        next(error)
    }
}



const updateReportStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, note = "" } = req.body;

        const allowedStatus = ["Pending", "Verified", "Resolved"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        if (typeof note !== "string" || note.length > 500) {
            return res.status(400).json({
                success: false,
                message: "Note must be a string of at most 500 characters"
            });
        }

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        report.status = status;

        report.statusHistory.push({
            status,
            updatedBy: req.user.id,
            note: note.trim(),
            changedAt: new Date()
        });

        await report.save();

        return res.status(200).json({
            success: true,
            message: "Report status updated successfully",
            report
        });

    } catch (error) {
        next(error);
    }
};


const trackReport = async (req, res, next) => {
    try {
        const { trackingId } = req.params;

        if (!trackingId || !/^JAL-[A-F0-9]{8}$/i.test(trackingId)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid tracking ID"
            });
        }

        const report = await Report.findOne({
            trackingId: trackingId.toUpperCase()
        }).select("trackingId problemType description location status createdAt updatedAt");

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "No report found for this tracking ID"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Report tracking details fetched successfully",
            report
        });
    } catch (error) {
        next(error);
    }
};


const getMyReports = async (req, res, next) => {
    try {
        const reports = await Report.find({
            submittedBy: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reports.length,
            reports
        });
    } catch (error) {
        next(error);
    }
};


const getAdminReportSummary = async (req, res, next) => {
    try {
        const [total, pending, verified, resolved] = await Promise.all([
            Report.countDocuments(),
            Report.countDocuments({ status: "Pending" }),
            Report.countDocuments({ status: "Verified" }),
            Report.countDocuments({ status: "Resolved" })
        ]);

        return res.status(200).json({
            success: true,
            summary: {
                total,
                pending,
                verified,
                resolved
            }
        });
    } catch (error) {
        next(error);
    }
};


export {createReport,getReports,updateReports,deleteReport,updateReportStatus,trackReport,getMyReports,getAdminReportSummary};