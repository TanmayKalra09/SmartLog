import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

const getTodaysDate = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const addGoal = (goal) => {
    setGoals([goal, ...goals]);
  }

  const deleteTransaction = (transactionId) => {
    // 1. Find the transaction to be deleted
    const transactionToDelete = transactions.find(t => t.id === transactionId);

    if (!transactionToDelete) return; // Exit if transaction not found

    // 2. Check if it was a contribution to a goal
    if (transactionToDelete.goalId) {
      // 3. If yes, "refund" the amount from the goal
      const updatedGoals = goals.map(goal => {
        if (goal.id === transactionToDelete.goalId) {
          return {
            ...goal,
            currentAmount: goal.currentAmount - transactionToDelete.amount
          };
        }
        return goal;
      });
      setGoals(updatedGoals);
    }

    // 4. Finally, delete the transaction itself
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
  };

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const contributeToGoal = (goalId, amount) => {
      let goalName = '';

      const updatedGoals = goals.map(goal => {
        if (goal.id === goalId) {
          goalName = goal.name; 
          return { ...goal, currentAmount: goal.currentAmount + amount };
        }
        return goal;
      });
      setGoals(updatedGoals);

      const contributionTransaction = {
        id: Date.now(),
        note: `Contribution to "${goalName}"`,
        amount: amount,
        type: 'Expense',
        category: 'Savings',
        date: getTodaysDate(),
        goalId: goalId
      };
      addTransaction(contributionTransaction);
    };

  return (
    <TransactionContext.Provider
      value={{ transactions, setTransactions, addTransaction, income, expense, deleteTransaction, goals, setGoals, addGoal, contributeToGoal }}
    >
      {children}
    </TransactionContext.Provider>
  );
};