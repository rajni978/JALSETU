import express from "express";

import {
    createSuggestion,
    getSuggestions
} from "../controllers/suggestionController.js";

const router = express.Router();

router.post("/", createSuggestion);

router.get("/", getSuggestions);

export default router;