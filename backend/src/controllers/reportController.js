import Report from "../models/Report.js";

const createReport = async (req,res,nest) => {
   try {
        const {problemType,description,location} = req.body;

        if(!problemType || !description || !location){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const report = await Report.create({
            problemType,
            description,
            location
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
        const { status } = req.body;

        const allowedStatus = [
            "Pending",
            "Verified",
            "Resolved"
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const report = await Report.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        res.json({
            success: true,
            message: "Report status updated successfully",
            report
        });

    } catch (error) {
        next(error);
    }
};
export {createReport,getReports,updateReports,deleteReport,updateReportStatus};