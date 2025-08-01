const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const Transaction = require('../models/Transaction');
const Goal = require('../models/Goal');

// POST /api/transactions - Add a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { amount, category, type, date, note, goalId } = req.body;

    // Basic validation
    if (!amount || !category || !type || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate and convert date
    const transactionDate = date ? new Date(date) : new Date();
    
    if (isNaN(transactionDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      amount: Number(amount),
      category,
      type,
      date: transactionDate,
      note,
      goalId: goalId || null
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error('Error creating transaction:', err);
    res.status(500).json({ error: 'Server error while saving transaction' });
  }
});

// GET /api/transactions - Get all transactions for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 }); // Sort by date, newest first

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found' });
    }

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Server error while fetching transactions' });
  }
});

// DELETE /api/transactions/:id - Delete a transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the transaction first to check if it's related to a goal
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // If this transaction was a contribution to a goal, update the goal's current amount
    if (transaction.goalId) {
      await Goal.findOneAndUpdate(
        { _id: transaction.goalId, userId: req.user.id },
        { $inc: { currentAmount: -transaction.amount } },
        { new: true }
      );
    }

    // Delete the transaction
    await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ error: 'Server error while deleting transaction' });
  }
});

// PUT /api/transactions/:id - Update a transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, category, type, date, note, goalId } = req.body;

    // Find the existing transaction
    const existingTransaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!existingTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // If the transaction was previously linked to a goal, reverse its contribution
    if (existingTransaction.goalId) {
      await Goal.findOneAndUpdate(
        { _id: existingTransaction.goalId, userId: req.user.id },
        { $inc: { currentAmount: -existingTransaction.amount } }
      );
    }

    // Update the transaction
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        amount: Number(amount),
        category,
        type,
        date: date ? new Date(date) : existingTransaction.date,
        note,
        goalId: goalId || null
      },
      { new: true }
    );

    // If the updated transaction is linked to a goal, add its contribution
    if (updatedTransaction.goalId) {
      await Goal.findOneAndUpdate(
        { _id: updatedTransaction.goalId, userId: req.user.id },
        { $inc: { currentAmount: updatedTransaction.amount } }
      );
    }

    res.status(200).json(updatedTransaction);
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ error: 'Server error while updating transaction' });
  }
});

module.exports = router;