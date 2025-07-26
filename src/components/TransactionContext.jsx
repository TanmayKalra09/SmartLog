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

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastDeleted, setLastDeleted] = useState(null);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    const deleted = transactions.find((t) => t.id === id);
    if (deleted) {
      setLastDeleted(deleted);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const undoDelete = () => {
    if (lastDeleted) {
      setTransactions((prev) => [lastDeleted, ...prev]);
      setLastDeleted(null);
    }
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
        addTransaction,
        deleteTransaction,
        undoDelete,
        income,
        expense,
        lastDeleted,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
