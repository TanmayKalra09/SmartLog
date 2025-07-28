import React, { useEffect, useState } from 'react';
import { useTransactions } from './TransactionContext';

const UndoTransaction = () => {
  const { lastDeleted, undoDelete } = useTransactions();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timerRef = null;
    if (lastDeleted) {
      setShow(true);
      if (timerRef) clearTimeout(timerRef);
      timerRef = setTimeout(() => setShow(false), 5000); // Auto-hide after 5s
    }
    return () => {
      if (timerRef) clearTimeout(timerRef);
    };
  }, [lastDeleted]);

  if (!show || !lastDeleted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-slideIn">
      <span>Transaction deleted</span>
      <button
        className="ml-4 text-blue-400 hover:underline"
        onClick={() => {
          undoDelete();
          setShow(false);
        }}
      >
        Undo
      </button>
    </div>
  );
};

export default UndoTransaction;
