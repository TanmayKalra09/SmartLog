import { useState, useEffect } from "react";
import { useCurrency } from "./CurrencyContext";
import { useTransactions } from "./TransactionContext";
import toast from "react-hot-toast";
import { X, Loader2 } from "lucide-react";

export default function AddGoalModal({
  showModal = true,
  setShowModal = () => {},
  darkMode = false,
}) {
  const { addGoal } = useTransactions();
  const { currency, locale } = useCurrency();

  const [form, setForm] = useState({ name: "", targetAmount: "" });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!form.name.trim()) newErrors.name = "Goal name is required";
    if (!form.targetAmount || parseFloat(form.targetAmount) <= 0)
      newErrors.targetAmount = "Enter a valid amount";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    addGoal({
      ...form,
      id: Date.now(),
      targetAmount: parseFloat(form.targetAmount),
      savedAmount: 0,
    });
    toast.success("Goal added");
    setForm({ name: "", targetAmount: "" });
    setErrors({});
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowModal(false), 250);
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
  const inputCls = (hasError) =>
    `w-full h-10 px-3 rounded-xl text-sm outline-none transition-colors font-sans ${
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
            Add goal
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
          {/* Name */}
          <div>
            <label className={labelCls}>Goal name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={inputCls(errors.name)}
              placeholder="New laptop, vacation…"
            />
            {errors.name && <p className={errorCls}>{errors.name}</p>}
          </div>

          {/* Target amount */}
          <div>
            <label className={labelCls}>Target amount</label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}>
                {getCurrencySymbol()}
              </span>
              <input
                type="number"
                step="0.01"
                value={form.targetAmount}
                onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                className={`${inputCls(errors.targetAmount)} pl-7`}
                placeholder="0"
              />
            </div>
            {errors.targetAmount && <p className={errorCls}>{errors.targetAmount}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 pb-5">
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
            } ${darkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white"}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Adding…
              </>
            ) : (
              "Add goal"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}