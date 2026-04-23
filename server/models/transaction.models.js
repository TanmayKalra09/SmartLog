import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      validate: {
        validator: function (v) {
          // If type is "Expense", category is required (not empty)
          if (this.type === "Expense") {
            return typeof v === "string" && v.trim().length > 0;
          }
          // If type is "Income", category can be empty or undefined
          return true;
        },
        message: "Category is required for Expense transactions.",
      },
    },
    type: { type: String, enum: ["Income", "Expense"], required: true },
    date: { type: String, required: true }, // e.g. "DD/MM/YYYY"
    note: { type: String, default: "" },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" }, // optional
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);