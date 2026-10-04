import Panchayat from "../models/Panchayat.js";

// CREATE PANCHAYAT
export const createPanchayat = async (req, res, next) => {
    try {
        const {
            name,
            location,
            district,
            waterStressScore,
            priority
        } = req.body;

        if (
            !name ||
            !location ||
            !district ||
            waterStressScore === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required"
            });
        }

        const panchayat = await Panchayat.create({
            name,
            location,
            district,
            waterStressScore,
            priority
        });

        res.status(201).json({
            success: true,
            message: "Panchayat created successfully",
            panchayat
        });

    } catch (error) {
        next(error);
    }
};


// GET ALL PANCHAYATS
export const getPanchayats = async (req, res, next) => {
    try {
        const panchayats = await Panchayat.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: panchayats.length,
            panchayats
        });

    } catch (error) {
        next(error);
    }
};


// GET SINGLE PANCHAYAT
export const getPanchayatById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const panchayat = await Panchayat.findById(id);

        if (!panchayat) {
            return res.status(404).json({
                success: false,
                message: "Panchayat not found"
            });
        }

        res.json({
            success: true,
            panchayat
        });

    } catch (error) {
        next(error);
    }
};