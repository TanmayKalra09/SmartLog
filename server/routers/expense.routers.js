import express from "express";
import { getRecurringBreakdown } from "../controllers/expense.controllers.js";
import { verifyUser } from "../../../SmartLog/server/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/recurring-breakdown", verifyUser, getRecurringBreakdown);

export default router;
