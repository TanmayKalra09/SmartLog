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

// Convert ISO date string to DD/MM/YYYY format
const formatDateFromISO = (isoString) => {
  if (!isoString) return getTodaysDate();
  
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Convert DD/MM/YYYY format to ISO string for backend
const formatDateToISO = (dateString) => {
  if (!dateString) return new Date().toISOString();
  
  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};

// API utility functions
const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('token'); 
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}${url}`, config);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const data = await apiCall('/api/transactions');
      // Format dates from ISO to DD/MM/YYYY
      const formattedTransactions = data.map(transaction => ({
        ...transaction,
        date: formatDateFromISO(transaction.date)
      }));
      setTransactions(formattedTransactions);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      if (err.message.includes('No transactions found')) {
        setTransactions([]); // Handle empty state
        setError(null);
      } else {
        setError(err.message);
      }
    }
  };

  // Fetch goals from API
  const fetchGoals = async () => {
    try {
      const data = await apiCall('/api/goals');
      setGoals(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching goals:', err);
      if (err.message.includes('No goals found')) {
        setGoals([]); // Handle empty state
        setError(null);
      } else {
        setError(err.message);
      }
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTransactions(), fetchGoals()]);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Add transaction to API and update local state
  const addTransaction = async (transaction) => {
    try {
      // Convert date to ISO format for backend
      const transactionForBackend = {
        ...transaction,
        date: formatDateToISO(transaction.date)
      };
      
      const newTransaction = await apiCall('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transactionForBackend),
      });
      
      // Format the returned transaction date for frontend
      const formattedTransaction = {
        ...newTransaction,
        date: formatDateFromISO(newTransaction.date)
      };
      
      setTransactions(prev => [formattedTransaction, ...prev]);
      setError(null);
      return formattedTransaction;
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError(err.message);
      throw err;
    }
  };

  // Add goal to API and update local state
  const addGoal = async (goal) => {
    try {
      const newGoal = await apiCall('/api/goals', {
        method: 'POST',
        body: JSON.stringify(goal),
      });
      
      setGoals(prev => [newGoal, ...prev]);
      setError(null);
      return newGoal;
    } catch (err) {
      console.error('Error adding goal:', err);
      setError(err.message);
      throw err;
    }
  };

  // Delete transaction (you'll need to add DELETE endpoint to your backend)
  const deleteTransaction = async (transactionId) => {
    try {
      // Find the transaction to be deleted
      const transactionToDelete = transactions.find(t => t._id === transactionId);
      
      if (!transactionToDelete) return;

      // Delete from API first
      await apiCall(`/api/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      // If it was a contribution to a goal, update the goal
      if (transactionToDelete.goalId) {
        const updatedGoals = goals.map(goal => {
          if (goal._id === transactionToDelete.goalId) {
            return {
              ...goal,
              currentAmount: goal.currentAmount - transactionToDelete.amount
            };
          }
          return goal;
        });
        setGoals(updatedGoals);
        
        // You might also want to update the goal in the backend
        const goalToUpdate = updatedGoals.find(g => g._id === transactionToDelete.goalId);
        if (goalToUpdate) {
          await apiCall(`/api/goals/${goalToUpdate._id}`, {
            method: 'PUT',
            body: JSON.stringify({ currentAmount: goalToUpdate.currentAmount }),
          });
        }
      }

      // Update local state
      setTransactions(prev => prev.filter(t => t._id !== transactionId));
      setError(null);
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError(err.message);
      throw err;
    }
  };

  // Delete goal and related transactions
  const deleteGoal = async (goalId) => {
    try {
      // Find all transactions related to this goal
      const relatedTransactions = transactions.filter(t => t.goalId === goalId);
      
      // Delete the goal from API first
      await apiCall(`/api/goals/${goalId}`, {
        method: 'DELETE',
      });

      // Delete all related transactions from API
      for (const transaction of relatedTransactions) {
        await apiCall(`/api/transactions/${transaction._id}`, {
          method: 'DELETE',
        });
      }

      // Update local state - remove goal
      setGoals(prev => prev.filter(g => g._id !== goalId));
      
      // Update local state - remove related transactions
      setTransactions(prev => prev.filter(t => t.goalId !== goalId));
      
      setError(null);
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError(err.message);
      throw err;
    }
  };

  // Calculate income and expense from current transactions
  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Contribute to goal
  const contributeToGoal = async (goalId, amount) => {
    try {
      let goalName = '';
      
      // Update goal locally first
      const updatedGoals = goals.map(goal => {
        if (goal._id === goalId) {
          goalName = goal.name;
          return { ...goal, currentAmount: goal.currentAmount + amount };
        }
        return goal;
      });
      
      setGoals(updatedGoals);

      // Update goal in backend
      const goalToUpdate = updatedGoals.find(g => g._id === goalId);
      await apiCall(`/api/goals/${goalId}`, {
        method: 'PUT',
        body: JSON.stringify({ currentAmount: goalToUpdate.currentAmount }),
      });

      // Create contribution transaction
      const contributionTransaction = {
        note: `Contribution to "${goalName}"`,
        amount: amount,
        type: 'Expense',
        category: 'Savings',
        date: getTodaysDate(),
        goalId: goalId
      };

      await addTransaction(contributionTransaction);
      setError(null);
    } catch (err) {
      console.error('Error contributing to goal:', err);
      setError(err.message);
      throw err;
    }
  };

  const value = {
    transactions,
    goals,
    loading,
    error,
    setTransactions,
    setGoals,
    addTransaction,
    addGoal,
    deleteTransaction,
    deleteGoal,
    contributeToGoal,
    income,
    expense,
    fetchTransactions,
    fetchGoals,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};