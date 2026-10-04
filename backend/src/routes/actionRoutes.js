import express from "express";

import {
    createAction,
    getActions,
    updateAction
} from "../controllers/actionController.js";

const router = express.Router();

router.post("/", createAction);

router.get("/", getActions);

router.put("/:id", updateAction);

export default router;