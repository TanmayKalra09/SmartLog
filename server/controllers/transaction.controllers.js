import { Transaction } from "../models/transaction.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new transaction
export const createTransaction = asyncHandler(async (req, res) => {
  const { amount, category, type, date, note, goalId } = req.body;

  // If type is Expense, category is required
  if (type === "Expense" && (!category || category.trim() === "")) {
    throw new ApiError(400, "Category is required for Expense transactions.");
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    amount,
    category,
    type,
    date,
    note,
    goalId,
  });

  res.status(201).json(new ApiResponse(201, transaction, "Transaction created"));
});

// Get all transactions for the logged-in user
export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
  res.json(new ApiResponse(200, transactions));
});

// Delete a transaction by ID
export const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findOneAndDelete({ _id: id, user: req.user._id });
  if (!transaction) throw new ApiError(404, "Transaction not found");
  res.json(new ApiResponse(200, transaction, "Transaction deleted"));
});