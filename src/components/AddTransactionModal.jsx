const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

import { useState, useEffect } from 'react';
import { useCurrency } from "./CurrencyContext";
import { useTransactions } from './TransactionContext';
import toast from 'react-hot-toast';

export default function AddTransactionModal({ showModal = true, setShowModal = () => {}, darkMode = false }) {
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "Expense",
    date: formatDate(new Date()),
    note: " "
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currency, locale, setCurrency, setLocale } = useCurrency();
  const [errors, setErrors] = useState({});

  const getCurrencySymbol = (currency, locale) => {
    return (0).toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/\d/g, "").trim();
  };


  useEffect(() => {
    if (showModal) {
      setIsVisible(true);
    }
  }, [showModal]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.amount || parseFloat(form.amount) <= 0) {
     newErrors.amount = "Please enter a valid amount";
    }
    if (!form.category.trim()) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 800)); 

    try {
      
      addTransaction({
        ...form,
        id: Date.now(),
        amount: parseFloat(form.amount)
      });

      
      toast.success('Transaction Added Successfully!');

      
      setForm({
        amount: '',
        category: '',
        type: 'Expense',
        date: formatDate(new Date()),
        note: ''
      });
      handleClose(); 

    } catch (error) {
      
      console.error("Failed to add transaction:", error);
      toast.error('Could not add transaction. Please try again.');
    } finally {
      
      setIsSubmitting(false);
      setErrors({});
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowModal(false), 300);
  };

  const handleInputChange = (field, value) => {
    let newValue = value;
     if (field === "date") {
      newValue = formatDate(value);
    }
    setForm({ ...form, [field]: newValue });
    if (errors[field]) {
      setErrors({ ...errors, [field]: " " });
    }
  };

  if (!showModal) return null;

  return (
    <div 
          className={`fixed inset-0 w-full h-screen z-50 overflow-y-auto transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
            {/* Blurry overlay that shows the dashboard content */}
      <div className={`fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ${
        darkMode ? 'bg-black/30' : 'bg-black/20'
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="flex items-center justify-center min-h-full p-4 py-8 relative">
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 my-auto ${
            isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
         
          {/* Modal header */}
          <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl ${
            darkMode ? 'dark:from-blue-800 dark:to-purple-800' : ''
          }`}>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Add Transaction</h2>
              <button onClick={handleClose} className="text-white transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-20 hover:text-red-700 cursor-pointer ">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

       
          <div className="p-6 space-y-6">
           
            <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">{getCurrencySymbol(currency,locale)}</span>
                <input
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={e => handleInputChange("amount", e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.amount 
                      ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-700 dark:text-white'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{errors.amount}</p>}
            </div>


            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
              <input
                type="text"
                value={form.category}
                 onChange={e => handleInputChange("category", e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category 
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-700 dark:text-white'
                }`}
                placeholder="e.g., Food, Transport, Entertainment"
              />
              {errors.category && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{errors.category}</p>}
            </div>

    
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Type</label>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                {['Income', 'Expense'].map((type) => (
                  <button
                    key={type}
                    type="button"
                     onClick={() => handleInputChange("type", type)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      form.type === type
                        ? type === 'Income' 
                          ? 'bg-green-500 text-white shadow-md transform scale-105 dark:bg-green-600'
                          : 'bg-red-500 text-white shadow-md transform scale-105 dark:bg-red-600'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

           
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Date</label>
              <input
                type="date"
                value={
                  (() => {
                    
                    const [dd, mm, yyyy] = form.date.split('/');
                    return `${yyyy}-${mm}-${dd}`;
                  })()
                }
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.date 
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-700 dark:text-white'
                }`}
              />
               {errors.date && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{errors.date}</p>}
            </div>

            
            <div className="space-y-2">
               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Note (Optional)</label>
              <textarea
                value={form.note}
                onChange={e => handleInputChange("note", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                onClick={handleSubmit}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                  isSubmitting
                    ? 'bg-blue-400 dark:bg-blue-500 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding...
                  </div>
                ) : (
                   "Add Transaction"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}