import React, { useEffect, useState } from "react";
import { useTransactions } from "./TransactionContext";
import Footer from "./Footer";
import { ArrowLeft, Calendar, Tag, Trash2, FileEdit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExpenseHistoryPage() {
  const { transactions, deleteTransaction } = useTransactions();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const expenseTransactions = transactions.filter(
    (txn) => txn.type.toLowerCase() === "expense"
  );

  const maxExpense = Math.max(...expenseTransactions.map(txn => txn.amount || 0), 1); // Avoid divide by 0

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
        : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900"
    }`}>
      <main className="flex-1 w-full p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`flex items-center gap-2 mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600 dark:text-gray-300" />
            </button>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expense History
            </h1>
          </div>

          {/* Expense List */}
          <div className={`transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {expenseTransactions.length > 0 ? (
              <div className="space-y-4">
                {expenseTransactions.map((txn) => {
                  const percentage = Math.round((txn.amount / maxExpense) * 100);
                  return (
                    <div
                      key={txn.id}
                      className={`rounded-3xl shadow-sm px-4 py-3 border transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center gap-3">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-600">
                          <FileEdit className="w-6 h-6 text-white" />
                        </div>

                        {/* Tags, Date, Title */}
                        <div className="flex-1 ml-2">
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
                            <Tag className="w-4 h-4" />
                            {txn.category || "Others"}
                            <Calendar className="w-4 h-4 ml-4" />
                            {formatDate(txn.date)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {txn.title || "--"}
                          </div>
                        </div>

                        {/* Amount + Delete */}
                        <div className="flex items-center gap-4">
                          <div className="text-red-500 font-bold text-lg whitespace-nowrap">
                            -₹{txn.amount.toLocaleString()}
                          </div>
                          <button
                            onClick={() => deleteTransaction(txn.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Relative progress bar */}
                      <div className="h-1 mt-3 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1 rounded-full bg-red-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-12 text-lg">
                No expense transactions found.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
