import mongoose from "mongoose";

const panchayatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        district: {
            type: String,
            required: true,
            trim: true
        },

        waterStressScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        }
    },
    {
        timestamps: true
    }
);

const Panchayat = mongoose.model(
    "Panchayat",
    panchayatSchema
);

export default Panchayat;