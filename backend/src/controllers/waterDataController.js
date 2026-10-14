import WaterData from "../models/WaterData.js";
import { calculateWaterRisk } from "../utils/waterRisk.js";

const createWaterData = async (req,res,next) => {
    try {
        const {
    location,
    groundwaterLevel,
    rainfall,
    waterBodyCondition,
    latitude,
    longitude
} = req.body;

        if (
    !location ||
    groundwaterLevel === undefined ||
    rainfall === undefined ||
    !waterBodyCondition ||
    latitude === undefined ||
    longitude === undefined
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
            waterBodyCondition,
            latitude,
            longitude
        })

        res.status(200).json({
            success:true,
            message:"Water data created successfully",
            waterData
        })
    } catch (error) {
        next(error)
    }
}



const getWaterdata = async (req,res,next) => {
    try {
        const waterData = await WaterData.find().sort({createdAt:-1})

        res.json({
            success:true,
            count:waterData.length,
            waterData
        })
    } catch (error) {
        next(error)
    }
}


const getWaterdataById = async (req,res,next) => {
    try {
        const {id} = req.params;

        const waterData = await WaterData.findById(id)

        if(!waterData){
            return res.status(404).json({
                success:false,
                message:"water data not found"
            })
        }

        res.json({
            success:true,
            waterData
        })
    } catch (error) {
        next(error)
    }
}

const updatedWaterData = async (req,res,next) => {
    try {
        const {id} = req.params;

const {
    location,
    groundwaterLevel,
    rainfall,
    waterBodyCondition,
    latitude,
    longitude
} = req.body;
        const waterData = await WaterData.findByIdAndUpdate(
    id,
    {
        location,
        groundwaterLevel,
        rainfall,
        waterBodyCondition,
        latitude,
        longitude
    },
    {
        new: true,
        runValidators: true
    }
);

            if(!waterData){
                return res.status(404).json({
                    success:false,
                    message:"water data not found"
                })
            }

            res.json({
                success:true,
                message:"water data updated successfully",
                waterData
            })
    } catch (error) {
        next(error)
    }
}

const deleteWaterData = async (req, res, next) => {
    try {
        const { id } = req.params;

        const waterData = await WaterData.findByIdAndDelete(id);

        if (!waterData) {
            return res.status(404).json({
                success: false,
                message: "Water data not found"
            });
        }

        res.json({
            success: true,
            message: "Water data deleted successfully",
            waterData
        });

    } catch (error) {
        next(error);
    }
};


const getWaterRiskScore = async (req, res, next) => {
    try {
        const { id } = req.params;

        const waterData = await WaterData.findById(id);

        if (!waterData) {
            return res.status(404).json({
                success: false,
                message: "Water data not found"
            });
        }

        const { score, riskLevel } = calculateWaterRisk({
            groundwaterLevel: waterData.groundwaterLevel,
            rainfall: waterData.rainfall,
            waterBodyCondition: waterData.waterBodyCondition
        });

        return res.status(200).json({
            success: true,
            location: waterData.location,
            score,
            riskLevel,
            waterDataId: waterData._id
        });

    } catch (error) {
        next(error);
    }
};

export {createWaterData,getWaterdata,getWaterdataById,updatedWaterData,deleteWaterData,getWaterRiskScore};