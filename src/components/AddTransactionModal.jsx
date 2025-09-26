import { useState, useEffect } from 'react';
import { useCurrency } from "./CurrencyContext";
import { useTransactions } from './TransactionContext';
import toast from 'react-hot-toast';

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function AddTransactionModal({
  showModal = true,
  setShowModal = () => {},
  darkMode = false,
  transactionToEdit = null,
  setTransactionToEdit = null // optional, parent can pass to clear edit state on close
}) {
  // transaction functions from context (some apps expose different names)
  const {
    addTransaction,
    editTransaction,    // optional API name
    updateTransaction,  // optional API name
    setTransactions,    // optional fallback
    transactions        // optional fallback data
  } = useTransactions();

  const initialForm = {
    amount: "",
    category: "",
    type: "Expense",
    date: formatDate(new Date()),
    note: ""
  };

  const [form, setForm] = useState(initialForm);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currency, locale } = useCurrency();
  const [errors, setErrors] = useState({});
  const suggestedCategories = ['Food', 'Transport', 'Groceries', 'Entertainment', 'Bills', 'Shopping', 'Rent', 'Utilities', 'EMI', 'Others'];
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // currency symbol helper
  const getCurrencySymbol = (currency, locale) => {
    try {
      return (0).toLocaleString(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replace(/\d/g, "").trim();
    } catch {
      return "";
    }
  };

  // show/hide animation state
  useEffect(() => {
    if (showModal) setIsVisible(true);
    else setIsVisible(false);
  }, [showModal]);

  // prefill when editing (or reset when switching to add)
  useEffect(() => {
    if (transactionToEdit) {
      setForm({
        amount: transactionToEdit.amount != null ? String(transactionToEdit.amount) : "",
        category: transactionToEdit.category || "",
        type: transactionToEdit.type || "Expense",
        date: transactionToEdit.date || formatDate(new Date()),
        note: transactionToEdit.note || ""
      });
    } else if (showModal) {
      setForm(initialForm);
    }
    // clear validation when transaction changes
    setErrors({});
  }, [transactionToEdit, showModal]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
 
    if (!form.category || !form.category.trim()) {

    if (form.type==="Expense" && !form.category.trim()) {
 
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    let newValue = value;
    if (field === "date") {
      // value from <input type="date"> is YYYY-MM-DD, convert to DD/MM/YYYY
      newValue = formatDate(new Date(value));
    }

    if (field === "category") {
      const input = value.toLowerCase();
      const filtered = suggestedCategories.filter(cat =>
        cat.toLowerCase().includes(input) && input
      );
      setCategorySuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }

    setForm(prev => ({ ...prev, [field]: newValue }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleClose = () => {
    setIsVisible(false);
    // small delay to let animation run (matches your CSS timing)
    setTimeout(() => {
      setShowModal(false);
      if (typeof setTransactionToEdit === "function") setTransactionToEdit(null);
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        amount: parseFloat(form.amount),
        date: form.date || formatDate(new Date())
      };

      if (transactionToEdit && transactionToEdit.id != null) {
        // EDIT flow
        const updated = { ...payload, id: transactionToEdit.id };

        if (typeof editTransaction === "function") {
          // if your context exposes a named edit function
          editTransaction(updated);
        } else if (typeof updateTransaction === "function") {
          // alternative API: updateTransaction(id, data)
          updateTransaction(updated.id, updated);
        } else if (typeof setTransactions === "function" && Array.isArray(transactions)) {
          // fallback: mutate list directly in context
          setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
        } else {
          // last fallback: call addTransaction (creates duplicate if no update available)
          addTransaction(updated);
        }

        toast.success("Transaction updated");
      } else {
        // ADD flow
        const newTransaction = { ...payload, id: Date.now() };
        addTransaction(newTransaction);
        toast.success("Transaction added");
      }

      // reset & close
      setForm(initialForm);
      handleClose();
    } catch (err) {
      console.error("Failed to save transaction:", err);
      toast.error("Could not save transaction. Try again.");
    } finally {
      setIsSubmitting(false);
      setErrors({});
    }
  };

  if (!showModal) return null;

  const isEditMode = !!(transactionToEdit && transactionToEdit.id != null);

  return (
    <div
      className={`fixed inset-0 w-full h-screen z-50 overflow-y-auto transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleClose}
    >
      <div className={`fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ${darkMode ? 'bg-black/30' : 'bg-black/20'} ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="flex items-center justify-center min-h-full p-4 py-8 relative">
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 my-auto ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`bg-gradient-to-r ${isEditMode ? 'from-green-600 to-emerald-500' : 'from-blue-600 to-purple-600'} text-white p-6 rounded-t-2xl`}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{isEditMode ? 'Edit Transaction' : 'Add Transaction'}</h2>
              <button onClick={handleClose} className="text-white transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-20 cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Amount*</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">{getCurrencySymbol(currency, locale)}</span>
                <input
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={e => handleInputChange("amount", e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${errors.amount ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'}`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{errors.amount}</p>}
            </div>


            <div className="space-y-2 relative">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Category*</label>
              <input
                type="text"
                value={form.category}
                onChange={e => handleInputChange("category", e.target.value)}
                onFocus={() => setShowSuggestions(categorySuggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${errors.category ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'}`}
                placeholder="e.g., Food, Transport, Entertainment"
              />
              {errors.category && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{errors.category}</p>}

              {showSuggestions && (
                <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl max-h-48 overflow-auto shadow-lg">
                  {categorySuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onMouseDown={() => {
                        setForm(prev => ({ ...prev, category: suggestion }));
                        setShowSuggestions(false);
                        setCategorySuggestions([]);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 text-gray-900 dark:text-white transition-colors"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>


            {form.type === "Expense" && (
              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Category*</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={e => handleInputChange("category", e.target.value)}
                  onFocus={() => setShowSuggestions(categorySuggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${
                    errors.category 
                      ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  placeholder="e.g., Food, Transport, Entertainment"
                />
                {errors.category && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{errors.category}</p>}

              {/* 💡 Suggestion Dropdown */}
                {showSuggestions && (
                  <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl max-h-48 overflow-auto shadow-lg">
                    {categorySuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onMouseDown={() => {
                          setForm(prev => ({ ...prev, category: suggestion }));
                          setShowSuggestions(false);
                          setCategorySuggestions([]);
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 text-gray-900 dark:text-white transition-colors"
                      >
                        {suggestion}
                      </li>

                    ))}
                  </ul>
                )}
              </div>
            )} 


            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Transaction type*</label>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                {['Income', 'Expense'].map((t) => (
                  <button
                    key={t}
                    type="button"

                    onClick={() => handleInputChange("type", t)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${form.type === t ? (t === 'Income' ? 'bg-green-500 text-white shadow-md transform scale-105 dark:bg-green-600' : 'bg-red-500 text-white shadow-md transform scale-105 dark:bg-red-600') : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}`}

                     onClick={() => handleInputChange("type", type)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      form.type === type
                        ? type === 'Income' 
                          ? 'bg-green-500 text-white shadow-md transform scale-100 dark:bg-green-600'
                          : 'bg-red-500 text-white shadow-md transform scale-100 dark:bg-red-600'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'
                    }`}

                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Date</label>
              <input
                type="date"
                value={() => {
                  // convert DD/MM/YYYY -> YYYY-MM-DD for input value
                  const [dd, mm, yyyy] = form.date.split('/');
                  return `${yyyy}-${mm}-${dd}`;
                } }
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white ${errors.date ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'}`}
              />
              {errors.date && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Note (Optional)</label>
              <textarea
                value={form.note}
                onChange={e => handleInputChange("note", e.target.value)}
                rows={3}
                maxLength={60}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add a note about this transaction..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${isSubmitting ? 'bg-blue-400 dark:bg-blue-500 text-white cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transform hover:scale-105 shadow-lg hover:shadow-xl'}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isEditMode ? 'Saving...' : 'Adding...'}
                  </div>
                ) : (
                  isEditMode ? 'Save Changes' : 'Add Transaction'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
