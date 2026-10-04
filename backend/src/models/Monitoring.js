import mongoose from "mongoose";

const monitoringSchema = new mongoose.Schema(
    {
        action: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Action",
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        beforeGroundwaterLevel: {
            type: Number,
            required: true
        },

        afterGroundwaterLevel: {
            type: Number,
            required: true
        },

        beforeWaterAvailability: {
            type: String,
            enum: ["Poor", "Moderate", "Good"],
            required: true
        },

        afterWaterAvailability: {
            type: String,
            enum: ["Poor", "Moderate", "Good"],
            required: true
        },

        observations: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Monitoring = mongoose.model(
    "Monitoring",
    monitoringSchema
);

export default Monitoring;