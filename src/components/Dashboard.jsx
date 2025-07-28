import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddTransactionModal from "./AddTransactionModal";
import ConfirmationModal from "./ConfirmationModal";
import Footer from "./Footer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionPDF from "./TransactionPDF";

import {
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  Tag,
  Filter,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Moon,
  Sun,
  Target,
} from "lucide-react";

import { useTransactions } from "./TransactionContext";
import { useCurrency } from "./CurrencyContext";

export default function Dashboard() {
  const { transactions, income, expense, deleteTransaction, undoDelete } =
    useTransactions();
  const { currencySymbol } = useCurrency();

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showBalance, setShowBalance] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const balance = income - expense;
  const categories = ["All", ...new Set(transactions.map((t) => t.category))];

  // Animate values
  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const steps = 60;
    const incomeStep = income / steps;
    const expenseStep = expense / steps;
    const balanceStep = balance / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedValues({
        income: Math.floor(incomeStep * currentStep),
        expense: Math.floor(expenseStep * currentStep),
        balance: Math.floor(balanceStep * currentStep),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues({ income, expense, balance });
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [income, expense, balance]);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount) =>
    `${currencySymbol}${amount.toLocaleString("en-IN")}`;

  const getTransactionIcon = (category) => {
    const icons = {
      Food: "🍽️",
      Entertainment: "🎬",
      Utilities: "⚡",
      Income: "💰",
      Transport: "🚗",
      Shopping: "🛍️",
      Health: "🏥",
      Education: "📚",
    };
    return icons[category] || "📝";
  };

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setTransactionToDelete(null);
      setShowConfirmModal(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900"
      } p-6 transition-all`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Track your financial journey with smart insights
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Income */}
          <div
            className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
              hoveredCard === "income" ? "shadow-2xl shadow-green-200" : "shadow-lg"
            }`}
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            }}
            onMouseEnter={() => setHoveredCard("income")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-4 right-4">
              <TrendingUp className="w-8 h-8 text-white/80" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-2">Total Income</div>
            <div className="text-3xl font-black text-white mb-1">
              {formatCurrency(animatedValues.income)}
            </div>
          </div>

          {/* Expense */}
          <div
            className={`relative p-6 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
              hoveredCard === "expense" ? "shadow-2xl shadow-red-200" : "shadow-lg"
            }`}
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            }}
            onMouseEnter={() => setHoveredCard("expense")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-4 right-4">
              <TrendingDown className="w-8 h-8 text-white/80" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-2">
              Total Expense
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {formatCurrency(animatedValues.expense)}
            </div>
          </div>

          {/* Balance */}
          <div
            className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600"
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {showBalance ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
              </button>
              <Wallet className="w-8 h-8 text-white/80" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-2">
              Current Balance
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {showBalance ? formatCurrency(animatedValues.balance) : "••••••"}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 inline-block mr-2" />
            Add Transaction
          </button>

          <PDFDownloadLink
            document={<TransactionPDF transactions={transactions} />}
            fileName="transactions.pdf"
          >
            {({ loading }) => (
              <button className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow hover:scale-105 transition">
                <Download className="w-5 h-5 inline-block mr-2" />
                {loading ? "Preparing..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-4 rounded-2xl border"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-4 rounded-2xl border"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Transaction List */}
        <div>
          {filteredTransactions.length ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between mb-4"
              >
                <div>
                  <div className="font-bold">{transaction.note}</div>
                  <div className="text-sm text-gray-500">
                    <Tag className="inline w-4 h-4" /> {transaction.category}
                    <Calendar className="inline w-4 h-4 ml-2" /> {transaction.date}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`font-bold text-xl ${
                      transaction.type === "Expense" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {transaction.type === "Expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </div>
                  <button
                    onClick={() => handleDeleteClick(transaction.id)}
                    className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>

        {/* Undo */}
        <button
          onClick={undoDelete}
          className="fixed bottom-6 right-6 bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Undo Delete
        </button>

        <AddTransactionModal showModal={showModal} setShowModal={setShowModal} />
        <ConfirmationModal
          show={showConfirmModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
        <Footer />
      </div>
    </div>
  );
}
