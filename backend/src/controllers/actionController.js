import Action from "../models/Action.js";

export const createAction = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            location,
            panchayat,
            priority,
            startDate
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !location ||
            !panchayat
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required"
            });
        }

        const action = await Action.create({
            title,
            description,
            category,
            location,
            panchayat,
            priority,
            startDate
        });

        res.status(201).json({
            success: true,
            message: "Action created successfully",
            action
        });

    } catch (error) {
        next(error);
    }
};

export const getActions = async (req, res, next) => {
    try {
        const actions = await Action.find()
            .populate("panchayat", "name location district")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: actions.length,
            actions
        });

    } catch (error) {
        next(error);
    }
};

export const updateAction = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            status,
            priority,
            completionDate
        } = req.body;

        const allowedStatus = [
            "Planned",
            "In Progress",
            "Completed"
        ];

        if (status && !allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid action status"
            });
        }

        const action = await Action.findByIdAndUpdate(
            id,
            {
                ...(status && { status }),
                ...(priority && { priority }),
                ...(completionDate && { completionDate })
            },
            {
                new: true,
                runValidators: true
            }
        ).populate(
            "panchayat",
            "name location district"
        );

        if (!action) {
            return res.status(404).json({
                success: false,
                message: "Action not found"
            });
        }

        res.json({
            success: true,
            message: "Action updated successfully",
            action
        });

    } catch (error) {
        next(error);
    }
};