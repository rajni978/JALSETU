import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
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
                "Rainwater Harvesting",
                "Recharge Work",
                "Infrastructure Repair",
                "Water Conservation",
                "Desilting"
            ],
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        panchayat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Panchayat",
            required: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        status: {
            type: String,
            enum: [
                "Planned",
                "In Progress",
                "Completed"
            ],
            default: "Planned"
        },

        startDate: {
            type: Date
        },

        completionDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Action = mongoose.model("Action", actionSchema);

export default Action;