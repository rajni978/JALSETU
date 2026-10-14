import Suggestion from "../models/Suggestion.js";


// CREATE SUGGESTION
export const createSuggestion = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            location
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !location
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const suggestion = await Suggestion.create({
            title,
            description,
            category,
            location
        });

        res.status(201).json({
            success: true,
            message: "Suggestion submitted successfully",
            suggestion
        });

    } catch (error) {
        next(error);
    }
};


// GET ALL SUGGESTIONS
export const getSuggestions = async (req, res, next) => {
    try {
        const suggestions = await Suggestion.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: suggestions.length,
            suggestions
        });

    } catch (error) {
        next(error);
    }
};