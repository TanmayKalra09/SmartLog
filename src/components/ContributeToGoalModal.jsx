import { useState, useEffect } from 'react';
import { useCurrency } from "../context/CurrencyContext";
import { useTransactions } from '../context/TransactionContext';
import toast from 'react-hot-toast';

export default function ContributeToGoalModal({ showModal, setShowModal, darkMode, goalId }) {
    const { contributeToGoal } = useTransactions();
    const [amount, setAmount] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { currency, locale } = useCurrency();
    const [error, setError] = useState("");

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
        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        contributeToGoal(goalId, parseFloat(amount));

        toast.success('Contribution Added Successfully!');
        setAmount("");
        setError("");
        setIsSubmitting(false);
        handleClose();
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowModal(false);
            setAmount(""); 
            setError("");   
        }, 300);
    };

    if (!showModal) return null;

    return (
        <div
            className={`fixed inset-0 w-full h-screen z-50 overflow-y-auto transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={handleClose}
        >
            <div className={`fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ${darkMode ? 'bg-black/30' : 'bg-black/20'
                } ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="flex items-center justify-center min-h-full p-4 py-8 relative">
                <div
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 my-auto ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl ${darkMode ? 'dark:from-blue-800 dark:to-purple-800' : ''
                        }`}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Contribute to Goal</h2>
                            <button onClick={handleClose} className="text-white transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-20 hover:text-red-700 cursor-pointer">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Contribution Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">{getCurrencySymbol(currency, locale)}</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error
                                            ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-700 dark:text-white'
                                        }`}
                                    placeholder="0.00"
                                />
                            </div>
                            {error && <p className="text-red-500 dark:text-red-400 text-sm animate-pulse">{error}</p>}
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
                                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${isSubmitting
                                        ? 'bg-blue-400 dark:bg-blue-500 text-white cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Contributing...
                                    </div>
                                ) : (
                                    "Contribute"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
