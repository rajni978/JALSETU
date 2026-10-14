
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const reportSchema = new mongoose.Schema(
    {
        trackingId: {
            type: String,
            unique: true,
            default: () => `JAL-${randomUUID().slice(0, 8).toUpperCase()}`
        },

submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
},


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
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [1000, "Description cannot exceed 1000 characters"],
            trim: true
        },

        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
            maxlength: [200, "Location cannot exceed 200 characters"]
        },

        status: {
            type: String,
            enum: ["Pending", "Verified", "Resolved"],
            default: "Pending"
        },
        statusHistory: {
    type: [
        {
            status: {
                type: String,
                enum: ["Pending", "Verified", "Resolved"],
                required: true
            },
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: null
            },
            note: {
                type: String,
                maxlength: 500,
                default: ""
            },
            changedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    default: function () {
        return [{
            status: this.status || "Pending",
            updatedBy: null,
            note: "Report submitted",
            changedAt: new Date()
        }];
    }
}
    },
    {
        timestamps: true
    }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
