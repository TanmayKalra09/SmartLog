import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    } else {
      return [
        { id: 'cat0', name: 'Uncategorized' },
        { id: 'cat1', name: 'Food' },
        { id: 'cat2', name: 'Transport' },
        { id: 'cat3', name: 'Bills' },
        { id: 'cat4', name: 'Entertainment' },
      ];
    }
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addCategory = (name) => {
    if (name && !categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
      const newCategory = { id: `cat${Date.now()}`, name: name };
      setCategories([...categories, newCategory]);
    }
  };

  const updateCategory = (id, newName) => {
    setCategories(categories.map((cat) => cat.id === id ? { ...cat, name: newName } : cat));
  };

  const deleteCategory = (id) => {
    if (id === 'cat0') return;
    setTransactions(transactions.map(t => t.categoryId === id ? {...t, categoryId: 'cat0'} : t));
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };
  
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  
  const income = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Number(t.amount), 0);
  
  const value = { transactions, addTransaction, deleteTransaction, income, expense, categories, addCategory, updateCategory, deleteCategory };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};