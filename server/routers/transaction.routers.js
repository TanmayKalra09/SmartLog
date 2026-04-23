import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.use(verifyUser);

router.post("/", createTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);

export default router;