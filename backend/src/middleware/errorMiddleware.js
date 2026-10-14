const errorMiddleware = (err, req, res, next) => {
    console.error("ERROR:", err);

    // MongoDB validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(
            error => error.message
        );

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    // Duplicate MongoDB data
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate data already exists"
        });
    }

    // Default server error
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
};

export default errorMiddleware;