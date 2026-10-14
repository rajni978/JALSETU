
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Provide token in Bearer format"
            });
        }

        const token = authHeader.slice(7).trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required"
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing from environment");
            return res.status(500).json({
                success: false,
                message: "Server authentication is not configured"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || typeof decoded !== "object" || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload"
            });
        }

        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError") {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        next(error);
    }
};

export default authMiddleware;
