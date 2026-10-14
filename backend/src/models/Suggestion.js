import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: [
                "Pond Restoration",
                "Handpump Repair",
                "Water Tank Cleaning",
                "Rainwater Harvesting",
                "Groundwater Recharge",
                "Water Conservation",
                "Other"
            ],
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Approved",
                "Rejected"
            ],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Suggestion = mongoose.model(
    "Suggestion",
    suggestionSchema
);

export default Suggestion;