import mongoose from "mongoose";

const waterDataSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            required: true
        },

        groundwaterLevel: {
            type: Number,
            required: true
        },

        rainfall: {
            type: Number,
            required: true
        },

        waterBodyCondition: {
            type: String,
            enum: ["Good", "Moderate", "Poor"],
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },

        longitude: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const WaterData = mongoose.model("WaterData", waterDataSchema);

export default WaterData;