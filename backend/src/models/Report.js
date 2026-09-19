import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        problemType: {
            type: String,
            required: [true, "Problem type is required"],
            enum: {
                values: [
                    "Drying pond",
                    "Falling water level",
                    "Broken infrastructure",
                    "Suspected contamination",
                    "Other"
                ],
                message: "Invalid problem type"
            }
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [10, "Description must be at least 10 characters"]
        },

        location: {
            type: String,
            required: [true, "Location is required"]
        },

        status: {
            type: String,
            enum: ["Pending", "Verified", "Resolved"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;