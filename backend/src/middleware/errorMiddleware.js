const errorMiddleware = (err, req, res, next) => {
    console.log("Error:", err.message);

    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message
    });
};

export default errorMiddleware;