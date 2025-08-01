const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const Goal = require('../models/Goal');
const Transaction = require('../models/Transaction');

// POST /api/goals - Create a new goal
router.post('/', auth, async (req, res) => {
  try {
    const { name, targetAmount } = req.body;

    // Validate input
    if (!name || !targetAmount) {
      return res.status(400).json({ error: 'Name and target amount are required' });
    }

    if (Number(targetAmount) <= 0) {
      return res.status(400).json({ error: 'Target amount must be greater than 0' });
    }

    const goal = new Goal({
      userId: req.user.id,
      name,
      targetAmount: Number(targetAmount),
      currentAmount: 0
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error('Error saving goal:', err);
    res.status(500).json({ error: 'Server error while saving goal' });
  }
});

// GET /api/goals - Get all goals for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    if (!goals || goals.length === 0) {
      return res.status(404).json({ error: 'No goals found' });
    }

    res.status(200).json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ error: 'Server error while fetching goals' });
  }
});

// PUT /api/goals/:id - Update a goal
router.put('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    
    // Validate currentAmount if provided
    if (updates.currentAmount !== undefined && Number(updates.currentAmount) < 0) {
      return res.status(400).json({ error: 'Current amount cannot be negative' });
    }

    // Validate targetAmount if provided
    if (updates.targetAmount !== undefined && Number(updates.targetAmount) <= 0) {
      return res.status(400).json({ error: 'Target amount must be greater than 0' });
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json(goal);
  } catch (err) {
    console.error('Error updating goal:', err);
    res.status(500).json({ error: 'Server error while updating goal' });
  }
});

// DELETE /api/goals/:id - Delete a goal and all related transactions
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the goal first
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    // Delete all transactions related to this goal
    const deleteResult = await Transaction.deleteMany({
      goalId: req.params.id,
      userId: req.user.id
    });

    // Delete the goal
    await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.status(200).json({ 
      message: 'Goal deleted successfully',
      deletedTransactions: deleteResult.deletedCount
    });
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ error: 'Server error while deleting goal' });
  }
});

// GET /api/goals/:id/transactions - Get all transactions for a specific goal
router.get('/:id/transactions', auth, async (req, res) => {
  try {
    // First verify the goal exists and belongs to the user
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    const transactions = await Transaction.find({
      goalId: req.params.id,
      userId: req.user.id
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching goal transactions:', err);
    res.status(500).json({ error: 'Server error while fetching goal transactions' });
  }
});

module.exports = router;