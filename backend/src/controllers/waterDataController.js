import WaterData from "../models/WaterData.js";

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

        const {location,groundwaterLevel,rainfall,waterBodyCondition} = req.body;

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
                messgae:"water data updated successfully",
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

        let score = 0;

        if (waterData.groundwaterLevel < 5) {
            score += 40;
        } else if (waterData.groundwaterLevel < 10) {
            score += 25;
        } else {
            score += 10;
        }

        if (waterData.rainfall < 500) {
            score += 30;
        } else if (waterData.rainfall < 1000) {
            score += 20;
        } else {
            score += 10;
        }

        if (waterData.waterBodyCondition === "Poor") {
            score += 30;
        } else if (waterData.waterBodyCondition === "Moderate") {
            score += 20;
        } else {
            score += 10;
        }

        let riskLevel;

        if (score >= 70) {
            riskLevel = "High";
        } else if (score >= 40) {
            riskLevel = "Medium";
        } else {
            riskLevel = "Low";
        }

        res.json({
            success: true,
            location: waterData.location,
            score,
            riskLevel
        });

    } catch (error) {
        next(error);
    }
};
export {createWaterData,getWaterdata,getWaterdataById,updatedWaterData,deleteWaterData,getWaterRiskScore};