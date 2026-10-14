import express from "express";

import {
    registerUser,
    loginUser,
    getProfile
} from "../controllers/authController.js";
import adminOnly from "../middleware/roleMiddleware.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.get(
    "/admin-test",
    authMiddleware,
    adminOnly,
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin! You can access this route."
        });
    }
);

export default router;