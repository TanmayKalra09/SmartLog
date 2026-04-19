import {
  Plus, TrendingUp, TrendingDown, Wallet, Calendar, Tag,
  Filter, Search, Eye, EyeOff, ChevronDown, ChevronUp,
  Trash2, Download, Moon, Sun, Target, ArrowUpRight
} from "lucide-react";

import { useTransactions } from "./TransactionContext";
import { useCurrency } from "./CurrencyContext";
import { useState, useEffect } from "react";
import AddTransactionModal from "./AddTransactionModal";
import EnhancedEmptyState from "./EnhancedEmptyState";
import ConfirmationModal from "./ConfirmationModal";
import Footer from "./Footer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionPDF from "./TransactionPDF";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { transactions, income, expense, deleteTransaction } = useTransactions();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("date-desc");
  const [animatedValues, setAnimatedValues] = useState({ income: 0, expense: 0, balance: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const { currency, locale, setCurrency, setLocale } = useCurrency();

  const currencies = [
    { code: "INR", locale: "en-IN", symbol: "₹" },
    { code: "USD", locale: "en-US", symbol: "$" },
    { code: "EUR", locale: "de-DE", symbol: "€" },
    { code: "BRL", locale: "pt-BR", symbol: "R$" },
    { code: "JPY", locale: "ja-JP", symbol: "¥" },
  ];

  const currentIndex = currencies.findIndex((c) => c.code === currency);
  const currentCurrency = currencies.find((c) => c.code === currency) || currencies[0];

  const handleCurrencySelect = (e) => {
    const selected = currencies.find(c => c.code === e.target.value);
    if (selected) { setCurrency(selected.code); setLocale(selected.locale); }
  };

  const balance = income - expense;
  const categories = ["All", ...new Set(transactions.map(t => t.category))];

  const handleDelete = (id) => { setTransactionToDelete(id); setShowDeleteModal(true); };
  const handleConfirmDelete = () => {
    deleteTransaction(transactionToDelete);
    setShowDeleteModal(false);
    setTransactionToDelete(null);
  };

  useEffect(() => {
    setIsVisible(true);
    const duration = 1600;
    const steps = 60;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const t = currentStep / steps;
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setAnimatedValues({
        income: Math.floor(income * ease),
        expense: Math.floor(expense * ease),
        balance: Math.floor(balance * ease),
      });
      if (currentStep >= steps) { clearInterval(timer); setAnimatedValues({ income, expense, balance }); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [income, expense, balance]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showModal);
    return () => document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const filteredAndSortedTransactions = transactions
    .filter(t => {
      const matchesSearch =
        t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortCriteria === "date-desc") return parseDate(b.date) - parseDate(a.date);
      if (sortCriteria === "date-asc") return parseDate(a.date) - parseDate(b.date);
      if (sortCriteria === "amount-desc") return b.amount - a.amount;
      if (sortCriteria === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 0 }).format(amount);

  const getTransactionIcon = (category) => {
    const icons = {
      Food: "🍽️", Entertainment: "🎬", Utilities: "⚡", Income: "💰",
      Transport: "🚗", Shopping: "🛍️", Health: "🏥", Education: "📚", Savings: "🏦",
    };
    return icons[category] || "📝";
  };

  const maxAmount = Math.max(1, ...transactions.map(t => t.amount));

  const convertToCSV = (txns) => {
    const headers = ["Date", "Type", "Category", "Amount", "Note"];
    const rows = txns.map(t => [t.date, t.type, t.category, t.amount, t.note.includes(",") ? `"${t.note}"` : t.note]);
    return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  };

  const downloadCSV = (csv) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // ─── Shared class helpers ────────────────────────────────────────────────────
  const base = darkMode
    ? "bg-gray-950 text-gray-100"
    : "bg-gray-50 text-gray-900";

  const card = darkMode
    ? "bg-gray-900 border border-gray-800"
    : "bg-white border border-gray-100";

  const inputCls = darkMode
    ? "bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 focus:border-gray-600"
    : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400";

  const mutedText = darkMode ? "text-gray-500" : "text-gray-400";
  const secondaryText = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${base}`}>
      <main className="flex-1 w-full px-5 py-8 mb-24">
        <div className="max-w-4xl mx-auto">

          {/* ── Top bar ────────────────────────────────────────────────── */}
          <div className={`flex items-start justify-between mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
              <p className={`text-sm mt-0.5 ${secondaryText}`}>
                {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${card} ${secondaryText} hover:opacity-70`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                to="/goals"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${card} ${secondaryText} hover:opacity-70`}
              >
                <Target className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className={`flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium transition-opacity ${darkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white"} hover:opacity-80`}
              >
                <Plus className="w-3.5 h-3.5" />
                Add transaction
              </button>
            </div>
          </div>

          {/* ── Stat cards ────────────────────────────────────────────── */}
          <div className={`grid grid-cols-3 gap-3 mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {/* Income */}
            <Link to="/income-history" className="block group">
              <div className={`rounded-xl p-4 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-emerald-50 border border-emerald-100"}`}>
                <div className={`text-xs font-medium uppercase tracking-widest mb-3 ${darkMode ? "text-gray-500" : "text-emerald-600"}`}>
                  Income
                </div>
                <div className={`text-2xl font-semibold tracking-tight ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                  {formatCurrency(animatedValues.income)}
                </div>
                <div className={`text-xs mt-1 ${darkMode ? "text-gray-600" : "text-emerald-500"}`}>
                  {transactions.filter(t => t.type === "Income").length} transactions
                </div>
                <div className={`absolute bottom-0 left-0 h-0.5 w-full ${darkMode ? "bg-emerald-800" : "bg-emerald-200"}`} />
                <ArrowUpRight className={`absolute top-3 right-3 w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? "text-gray-500" : "text-emerald-400"}`} />
              </div>
            </Link>

            {/* Expense */}
            <Link to="/expense-history" className="block group">
              <div className={`rounded-xl p-4 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-rose-50 border border-rose-100"}`}>
                <div className={`text-xs font-medium uppercase tracking-widest mb-3 ${darkMode ? "text-gray-500" : "text-rose-500"}`}>
                  Expenses
                </div>
                <div className={`text-2xl font-semibold tracking-tight ${darkMode ? "text-rose-400" : "text-rose-600"}`}>
                  {formatCurrency(animatedValues.expense)}
                </div>
                <div className={`text-xs mt-1 ${darkMode ? "text-gray-600" : "text-rose-400"}`}>
                  {transactions.filter(t => t.type === "Expense").length} transactions
                </div>
                <div className={`absolute bottom-0 left-0 h-0.5 w-full ${darkMode ? "bg-rose-900" : "bg-rose-200"}`} />
                <ArrowUpRight className={`absolute top-3 right-3 w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? "text-gray-500" : "text-rose-300"}`} />
              </div>
            </Link>

            {/* Balance */}
            <div className={`rounded-xl p-4 relative overflow-hidden ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-sky-50 border border-sky-100"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`text-xs font-medium uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-sky-500"}`}>
                  Balance
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className={`${darkMode ? "text-gray-600 hover:text-gray-400" : "text-sky-300 hover:text-sky-500"} transition-colors`}
                >
                  {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className={`text-2xl font-semibold tracking-tight ${balance >= 0 ? (darkMode ? "text-sky-400" : "text-sky-700") : (darkMode ? "text-rose-400" : "text-rose-600")}`}>
                {showBalance ? formatCurrency(animatedValues.balance) : "••••••"}
              </div>
              <div className={`text-xs mt-1 ${darkMode ? "text-gray-600" : "text-sky-400"}`}>
                {balance >= 0 ? "Healthy balance" : "Monitor spending"}
              </div>
              <div className={`absolute bottom-0 left-0 h-0.5 w-full ${darkMode ? "bg-sky-900" : "bg-sky-200"}`} />
            </div>
          </div>

          {/* ── Controls ──────────────────────────────────────────────── */}
          <div className={`flex flex-wrap gap-2 mb-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="relative flex-1 min-w-40">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${mutedText}`} />
              <input
                type="text"
                placeholder="Search…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full h-9 pl-9 pr-3 rounded-lg text-sm outline-none transition-colors ${inputCls}`}
              />
            </div>

            {[
              { id: "cat", value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), opts: categories },
              { id: "sort", value: sortCriteria, onChange: (e) => setSortCriteria(e.target.value), opts: null },
              { id: "curr", value: currency, onChange: handleCurrencySelect, opts: null },
            ].map(({ id, value, onChange, opts }) => (
              <div key={id} className="relative">
                <select
                  value={value}
                  onChange={onChange}
                  className={`h-9 pl-3 pr-7 rounded-lg text-sm appearance-none cursor-pointer outline-none transition-colors ${inputCls}`}
                >
                  {id === "cat" && opts.map(o => <option key={o} value={o}>{o}</option>)}
                  {id === "sort" && <>
                    <option value="date-desc">Newest first</option>
                    <option value="date-asc">Oldest first</option>
                    <option value="amount-desc">Highest amount</option>
                    <option value="amount-asc">Lowest amount</option>
                  </>}
                  {id === "curr" && currencies.map(c => (
                    <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 ${mutedText} pointer-events-none`} />
              </div>
            ))}
          </div>

          {/* ── Transaction list ──────────────────────────────────────── */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium uppercase tracking-widest ${secondaryText}`}>
                  Transactions
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400"}`}>
                  {filteredAndSortedTransactions.length}
                </span>
              </div>

              {transactions.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadCSV(convertToCSV(transactions))}
                    className={`flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs transition-colors ${darkMode ? "text-gray-400 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    <Download className="w-3 h-3" />
                    CSV
                  </button>
                  <PDFDownloadLink document={<TransactionPDF transactions={transactions} />} fileName="transactions.pdf">
                    {() => (
                      <button className={`flex items-center gap-1.5 h-7 px-3 rounded-lg text-xs transition-colors ${darkMode ? "text-gray-400 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"}`}>
                        <Download className="w-3 h-3" />
                        PDF
                      </button>
                    )}
                  </PDFDownloadLink>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className={`h-px mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`} />

            {transactions.length === 0 ? (
              <div className="text-center py-16">
                <p className={`text-sm mb-6 ${secondaryText}`}>No transactions yet — add one to get started.</p>
                <EnhancedEmptyState onAddTransaction={() => setShowModal(true)} />
              </div>
            ) : (
              <div className="space-y-1">
                {filteredAndSortedTransactions.map((txn, i) => (
                  <div
                    key={txn.id}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${darkMode ? "hover:bg-gray-900" : "hover:bg-gray-50"}`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${txn.type === "Income"
                      ? (darkMode ? "bg-emerald-950 text-emerald-400" : "bg-emerald-50 text-emerald-600")
                      : (darkMode ? "bg-rose-950 text-rose-400" : "bg-rose-50 text-rose-500")
                      }`}>
                      {getTransactionIcon(txn.category)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                        {txn.note?.trim() || (txn.type === "Income" ? "Money received" : "Money spent")}
                      </div>
                      <div className={`flex items-center gap-2 text-xs mt-0.5 ${mutedText}`}>
                        <span>{txn.category}</span>
                        <span>·</span>
                        <span>{txn.date}</span>
                      </div>
                      {/* Bar */}
                      <div className={`mt-2 h-0.5 rounded-full overflow-hidden ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${txn.type === "Income" ? "bg-emerald-400" : "bg-rose-400"}`}
                          style={{ width: `${Math.min((txn.amount / maxAmount) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Amount */}
                    <div className={`text-sm font-semibold flex-shrink-0 ${txn.type === "Income"
                      ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                      : (darkMode ? "text-rose-400" : "text-rose-500")
                      }`}>
                      {txn.type === "Expense" ? "−" : "+"}{formatCurrency(txn.amount)}
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(txn.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 ${darkMode ? "text-gray-600 hover:text-rose-400 hover:bg-rose-950" : "text-gray-300 hover:text-rose-500 hover:bg-rose-50"}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Scroll to top ──────────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-5 z-50 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"} ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600 border border-gray-200"}`}
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      <Footer />
      <AddTransactionModal showModal={showModal} setShowModal={setShowModal} darkMode={darkMode} />
      <ConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm deletion"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        darkMode={darkMode}
      />
    </div>
  );
}