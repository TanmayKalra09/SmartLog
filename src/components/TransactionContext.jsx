import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
  undoDelete: () => {},
  income: 0,
  expense: 0,
  lastDeleted: null,
});

// eslint-disable-next-line react-refresh/only-export-components
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

  const [lastDeleted, setLastDeleted] = useState(null);
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  // ✅ Merged deleteTransaction with Undo + Goal Refund
  const deleteTransaction = (transactionId) => {
    const transactionToDelete = transactions.find((t) => t.id === transactionId);
    if (!transactionToDelete) return;

    // Save last deleted for Undo feature
    setLastDeleted(transactionToDelete);

    // If it was a goal contribution, refund it
    if (transactionToDelete.goalId) {
      const updatedGoals = goals.map((goal) =>
        goal.id === transactionToDelete.goalId
          ? { ...goal, currentAmount: goal.currentAmount - transactionToDelete.amount }
          : goal
      );
      setGoals(updatedGoals);
    }

    // Remove from transactions
    const updatedTransactions = transactions.filter((t) => t.id !== transactionId);
    setTransactions(updatedTransactions);
  };

  const undoDelete = () => {
    if (lastDeleted) {
      setTransactions((prev) => [lastDeleted, ...prev]);
      setLastDeleted(null);
    }
  };

  const addGoal = (goal) => {
    setGoals([goal, ...goals]);
  };

  const contributeToGoal = (goalId, amount) => {
    let goalName = '';
    const updatedGoals = goals.map((goal) => {
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
      goalId: goalId,
    };
    addTransaction(contributionTransaction);
  };

  const income = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + (isNaN(Number(t.amount)) ? 0 : Number(t.amount)), 0);

  const expense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + (isNaN(Number(t.amount)) ? 0 : Number(t.amount)), 0);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction,
        deleteTransaction,
        undoDelete,
        income,
        expense,
        lastDeleted,
        goals,
        setGoals,
        addGoal,
        contributeToGoal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
