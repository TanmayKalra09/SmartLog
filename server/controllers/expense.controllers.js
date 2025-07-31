import { Transaction } from "../models/transaction.models.js";
import asyncHandler from "../../../SmartLog/server/utils/asyncHandler.js";

const detectRecurring = (transactions) => {
  const recurringMap = {};
  for (const tx of transactions) {
    const key = `${tx.title}-${tx.amount}`;
    if (!recurringMap[key]) recurringMap[key] = [];
    recurringMap[key].push(tx.date);
  }

  const recurringList = [];
  let totalRecurring = 0;
  const recurringByCategory = {};

  for (const key in recurringMap) {
    if (recurringMap[key].length >= 3) {
      const [title, amount] = key.split("-");
      const numericAmount = Number(amount);
      const matchTx = transactions.find(t => t.title === title && t.amount === numericAmount);
      const category = matchTx?.category || "General";

      recurringList.push({
        title,
        amount: numericAmount,
        frequency: "Monthly",
        category,
      });

      totalRecurring += numericAmount;
      recurringByCategory[category] = (recurringByCategory[category] || 0) + numericAmount;
    }
  }

  return { totalRecurring, recurringByCategory, recurringList };
};

export const getRecurringBreakdown = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const transactions = await Transaction.find({ user: userId });

  const breakdown = detectRecurring(transactions);
  res.status(200).json(breakdown);
});
