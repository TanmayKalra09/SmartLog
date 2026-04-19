import React, { useEffect, useState } from "react";
import { useTransactions } from "./TransactionContext";
import { useCurrency } from "./CurrencyContext";
import Footer from "./Footer";
import { ArrowLeft, Calendar, Tag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IncomeHistoryPage() {
  const { transactions, deleteTransaction } = useTransactions();
  const { currency, locale } = useCurrency();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Stay in sync if dark mode is toggled from Dashboard
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const incomeTransactions = transactions.filter(
    (t) => t.type.toLowerCase() === "income"
  );

  const total = incomeTransactions.reduce((s, t) => s + t.amount, 0);
  const maxAmount = Math.max(...incomeTransactions.map((t) => t.amount), 1);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    const d = new Date(`${year}-${month}-${day}`);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getIcon = (category) => {
    const icons = {
      Food: "🍽️", Entertainment: "🎬", Utilities: "⚡", Income: "💰",
      Transport: "🚗", Shopping: "🛍️", Health: "🏥", Education: "📚", Savings: "🏦",
    };
    return icons[category] || "📝";
  };

  // ── shared style helpers ──────────────────────────────────────────────────
  const base = darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";
  const mutedText = darkMode ? "text-gray-500" : "text-gray-400";
  const secondaryText = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${base}`}>
      <main className="flex-1 w-full px-5 py-8 mb-24">
        <div className="max-w-4xl mx-auto">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className={`flex items-center gap-3 mb-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}>
            <button
              onClick={() => navigate("/dashboard")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                darkMode
                  ? "bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200"
                  : "bg-white border border-gray-100 text-gray-400 hover:text-gray-700"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Income history</h1>
              <p className={`text-sm mt-0.5 ${secondaryText}`}>
                {incomeTransactions.length} transaction{incomeTransactions.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Total pill */}
            {incomeTransactions.length > 0 && (
              <div className={`ml-auto px-3 py-1.5 rounded-xl text-sm font-semibold ${
                darkMode
                  ? "bg-emerald-950 text-emerald-400"
                  : "bg-emerald-50 text-emerald-700"
              }`}>
                {formatCurrency(total)}
              </div>
            )}
          </div>

          {/* ── Divider ─────────────────────────────────────────────────── */}
          <div className={`h-px mb-6 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`} />

          {/* ── List ────────────────────────────────────────────────────── */}
          <div className={`transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            {incomeTransactions.length === 0 ? (
              <div className={`text-center py-16 text-sm ${secondaryText}`}>
                No income transactions found.
              </div>
            ) : (
              <div className="space-y-1">
                {incomeTransactions.map((txn, i) => {
                  const pct = Math.round((txn.amount / maxAmount) * 100);
                  return (
                    <div
                      key={txn.id}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150 ${
                        darkMode ? "hover:bg-gray-900" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
                        darkMode ? "bg-emerald-950 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {getIcon(txn.category)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}>
                          {txn.note?.trim() || txn.title || "Money received"}
                        </div>
                        <div className={`flex items-center gap-2 text-xs mt-0.5 ${mutedText}`}>
                          <span>{txn.category || "Others"}</span>
                          <span>·</span>
                          <span>{formatDate(txn.date)}</span>
                        </div>
                        {/* Bar */}
                        <div className={`mt-2 h-0.5 rounded-full overflow-hidden ${
                          darkMode ? "bg-gray-800" : "bg-gray-100"
                        }`}>
                          <div
                            className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Amount */}
                      <div className={`text-sm font-semibold flex-shrink-0 ${
                        darkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}>
                        +{formatCurrency(txn.amount)}
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => deleteTransaction(txn.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150 ${
                          darkMode
                            ? "text-gray-600 hover:text-rose-400 hover:bg-rose-950"
                            : "text-gray-300 hover:text-rose-500 hover:bg-rose-50"
                        }`}
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}