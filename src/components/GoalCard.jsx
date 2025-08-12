import React from 'react';
import { useCurrency } from "../context/CurrencyContext";
import { Trash2, PiggyBank } from 'lucide-react';

const GoalCard = ({ goal, darkMode, onDelete, onContribute }) => {
    const { currency, locale } = useCurrency();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

    return (
        <div className={`group p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 border ${darkMode
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white/80 border-gray-100 hover:border-gray-200"
            }`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className={`font-bold text-lg mb-1 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                        {goal.name}
                    </h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <span className="font-semibold text-blue-500 dark:text-blue-400">{formatCurrency(goal.currentAmount)}</span> of {formatCurrency(goal.targetAmount)}
                    </p>
                </div>
                <button
                    onClick={() => onDelete(goal.id)}
                    className={`ml-2 transition-colors ${darkMode ? "text-gray-500 hover:text-red-500" : "text-gray-400 hover:text-red-600"
                        }`} title="Delete Goal">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            <div className={`w-full rounded-full h-2.5 mb-4 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="flex justify-between items-center">
                <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {progress.toFixed(0)}% Complete
                </span>
                <button
                    onClick={() => onContribute(goal.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${darkMode
                            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                >
                    <PiggyBank className="w-4 h-4" />
                    Contribute
                </button>
            </div>
        </div>
    );
};

export default GoalCard;
