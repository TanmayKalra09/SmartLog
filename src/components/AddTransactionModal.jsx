const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

import { useState, useEffect } from "react";
import { useCurrency } from "./CurrencyContext";
import { useTransactions } from "./TransactionContext";
import toast from "react-hot-toast";
import { X, Loader2 } from "lucide-react";

const SUGGESTED_CATEGORIES = [
  "Food", "Transport", "Groceries", "Entertainment",
  "Bills", "Shopping", "Rent", "Utilities", "EMI", "Others",
];

export default function AddTransactionModal({
  showModal = true,
  setShowModal = () => {},
  darkMode = false,
}) {
  const { addTransaction } = useTransactions();
  const { currency, locale } = useCurrency();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "Expense",
    date: formatDate(new Date()),
    note: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (showModal) setIsVisible(true);
  }, [showModal]);

  const getCurrencySymbol = () =>
    (0)
      .toLocaleString(locale, { style: "currency", currency, minimumFractionDigits: 0 })
      .replace(/\d/g, "")
      .trim();

  const validateForm = () => {
    const newErrors = {};
    if (!form.amount || parseFloat(form.amount) <= 0)
      newErrors.amount = "Enter a valid amount";
    if (form.type === "Expense" && !form.category.trim())
      newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    try {
      addTransaction({ ...form, id: Date.now(), amount: parseFloat(form.amount) });
      toast.success("Transaction added");
      setForm({ amount: "", category: "", type: "Expense", date: formatDate(new Date()), note: "" });
      handleClose();
    } catch {
      toast.error("Could not add transaction. Please try again.");
    } finally {
      setIsSubmitting(false);
      setErrors({});
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowModal(false), 250);
  };

  const handleInputChange = (field, value) => {
    let newValue = field === "date" ? formatDate(value) : value;
    if (field === "category") {
      const filtered = SUGGESTED_CATEGORIES.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase()) && value
      );
      setCategorySuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
    setForm((prev) => ({ ...prev, [field]: newValue }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (!showModal) return null;

  // ── style helpers ─────────────────────────────────────────────────────────
  const overlay = darkMode ? "bg-black/50" : "bg-black/30";
  const modalBg = darkMode
    ? "bg-gray-900 border border-gray-800"
    : "bg-white border border-gray-100";
  const labelCls = `block text-xs font-medium uppercase tracking-widest mb-1.5 ${
    darkMode ? "text-gray-500" : "text-gray-400"
  }`;
  const inputBase = `w-full h-10 px-3 rounded-xl text-sm outline-none transition-colors font-sans`;
  const inputCls = (hasError) =>
    `${inputBase} ${
      hasError
        ? darkMode
          ? "bg-rose-950 border border-rose-800 text-rose-300 placeholder-rose-700"
          : "bg-rose-50 border border-rose-200 text-rose-700 placeholder-rose-300"
        : darkMode
        ? "bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-600 focus:border-gray-500"
        : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400"
    }`;
  const errorCls = `text-xs mt-1 ${darkMode ? "text-rose-400" : "text-rose-500"}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-250 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 backdrop-blur-sm ${overlay}`} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-sm rounded-2xl shadow-xl transform transition-all duration-250 ${
          isVisible ? "scale-100 translate-y-0" : "scale-97 translate-y-3"
        } ${modalBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${
          darkMode ? "border-gray-800" : "border-gray-100"
        }`}>
          <h2 className={`text-base font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
            Add transaction
          </h2>
          <button
            onClick={handleClose}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              darkMode
                ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4">

          {/* Type toggle */}
          <div>
            <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              {["Income", "Expense"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleInputChange("type", type)}
                  className={`flex-1 h-8 rounded-lg text-sm font-medium transition-all duration-150 ${
                    form.type === type
                      ? type === "Income"
                        ? darkMode
                          ? "bg-emerald-900 text-emerald-300"
                          : "bg-white text-emerald-700 shadow-sm border border-emerald-100"
                        : darkMode
                        ? "bg-rose-950 text-rose-300"
                        : "bg-white text-rose-600 shadow-sm border border-rose-100"
                      : darkMode
                      ? "text-gray-500 hover:text-gray-300"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className={labelCls}>Amount</label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className={`${inputCls(errors.amount)} pl-7`}
                placeholder="0"
              />
            </div>
            {errors.amount && <p className={errorCls}>{errors.amount}</p>}
          </div>

          {/* Category (expense only) */}
          {form.type === "Expense" && (
            <div className="relative">
              <label className={labelCls}>Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                onFocus={() => setShowSuggestions(categorySuggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                className={inputCls(errors.category)}
                placeholder="Food, Transport…"
              />
              {errors.category && <p className={errorCls}>{errors.category}</p>}

              {/* Suggestions */}
              {showSuggestions && (
                <ul className={`absolute z-10 w-full mt-1 rounded-xl overflow-hidden shadow-lg border text-sm ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-200"
                    : "bg-white border-gray-100 text-gray-700"
                }`}>
                  {categorySuggestions.map((s, i) => (
                    <li
                      key={i}
                      onMouseDown={() => {
                        setForm((prev) => ({ ...prev, category: s }));
                        setShowSuggestions(false);
                        setCategorySuggestions([]);
                      }}
                      className={`px-3 py-2 cursor-pointer transition-colors ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Date */}
          <div>
            <label className={labelCls}>Date</label>
            <input
              type="date"
              value={(() => {
                const [dd, mm, yyyy] = form.date.split("/");
                return `${yyyy}-${mm}-${dd}`;
              })()}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={inputCls(errors.date)}
            />
            {errors.date && <p className={errorCls}>{errors.date}</p>}
          </div>

          {/* Note */}
          <div>
            <label className={labelCls}>Note <span className={darkMode ? "text-gray-600" : "text-gray-300"}>(optional)</span></label>
            <textarea
              value={form.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
              rows={2}
              maxLength={30}
              className={`${inputBase} h-auto py-2.5 resize-none ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-600 focus:border-gray-500"
                  : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400"
              }`}
              placeholder="Add a note…"
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`flex gap-2 px-5 pb-5`}>
          <button
            type="button"
            onClick={handleClose}
            className={`flex-1 h-10 rounded-xl text-sm font-medium transition-colors ${
              darkMode
                ? "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 h-10 rounded-xl text-sm font-medium transition-opacity flex items-center justify-center gap-2 ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:opacity-85"
            } ${
              darkMode
                ? "bg-gray-100 text-gray-900"
                : "bg-gray-900 text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Adding…
              </>
            ) : (
              "Add transaction"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}