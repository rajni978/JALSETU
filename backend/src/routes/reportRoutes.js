import express from "express"
import Report from "../models/Report.js"

const router = express.Router();

router.post("/reports",async (req,res) => {
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
})

router.get("/reports",async (req,res) => {
    try {
        const reports = await Report.find().sort({createdAt:-1})

        res.json({
            success:true,
            count:reports.length,
            reports
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
})

router.put("/reports/:id",async (req,res) => {
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
                new:true,
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
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
})

router.delete("/reports/:id",async (req,res) => {
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
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message
        })
    }
})

export default router;