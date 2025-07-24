import {
  Brain,
  TrendingUp,
  Calendar,
  AlertCircle,
  Lightbulb,
  Target,
} from "lucide-react";
import { useTransactions } from "./TransactionContext";
import { useCurrency } from "./CurrencyContext";
import { useState, useEffect } from "react";

export default function AIInsights({ darkMode }) {
  const { transactions, income, expense } = useTransactions();
  const { currency, locale } = useCurrency();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const analyzeTransactions = () => {
    if (transactions.length === 0) {
      setInsights([]);
      setLoading(false);
      return;
    }

    const analysisResults = [];

    // 1. Spending Pattern Analysis
    const spendingByDay = {};
    const spendingByCategory = {};
    const expenseTransactions = transactions.filter(
      (t) => t.type === "Expense",
    );

    expenseTransactions.forEach((transaction) => {
      const date = new Date(transaction.date.split("/").reverse().join("-"));
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      spendingByDay[dayName] =
        (spendingByDay[dayName] || 0) + transaction.amount;
      spendingByCategory[transaction.category] =
        (spendingByCategory[transaction.category] || 0) + transaction.amount;
    });

    // Find highest spending day
    const highestSpendingDay = Object.entries(spendingByDay).reduce((a, b) =>
      spendingByDay[a[0]] > spendingByDay[b[0]] ? a : b,
    );

    if (highestSpendingDay) {
      analysisResults.push({
        type: "pattern",
        icon: <Calendar className="w-5 h-5" />,
        title: "Spending Pattern Insight",
        message: `You spend most on ${highestSpendingDay[0]}s (${formatCurrency(highestSpendingDay[1])}). Consider reviewing your ${highestSpendingDay[0].toLowerCase()} expenses for potential savings.`,
        color: "blue",
      });
    }

    // 2. Category Analysis & Smart Suggestions
    const topCategory = Object.entries(spendingByCategory).reduce((a, b) =>
      spendingByCategory[a[0]] > spendingByCategory[b[0]] ? a : b,
    );

    if (topCategory && topCategory[1] > 0) {
      const reduction = Math.round(topCategory[1] * 0.15);
      const savingsIncrease = Math.round(
        ((reduction * 12) / (income * 12)) * 100,
      );

      analysisResults.push({
        type: "suggestion",
        icon: <Lightbulb className="w-5 h-5" />,
        title: "Smart Savings Suggestion",
        message: `Your highest expense is ${topCategory[0]} (${formatCurrency(topCategory[1])}). Reducing this by just ${formatCurrency(reduction)}/month could increase your yearly savings by ${savingsIncrease}%.`,
        color: "green",
      });
    }

    // 3. Recurring Transaction Detection
    const recurringTransactions = findRecurringTransactions(transactions);
    if (recurringTransactions.length > 0) {
      const totalRecurring = recurringTransactions.reduce(
        (sum, t) => sum + t.amount,
        0,
      );
      analysisResults.push({
        type: "recurring",
        icon: <AlertCircle className="w-5 h-5" />,
        title: "Recurring Transactions Detected",
        message: `Found ${recurringTransactions.length} potential recurring transactions totaling ${formatCurrency(totalRecurring)}/month. Review subscriptions and automatic payments regularly.`,
        color: "orange",
        details: recurringTransactions
          .slice(0, 3)
          .map((t) => `${t.note} - ${formatCurrency(t.amount)}`),
      });
    }

    // 4. Savings Rate Analysis
    const balance = income - expense;
    const savingsRate = income > 0 ? (balance / income) * 100 : 0;

    if (savingsRate < 20 && income > 0) {
      analysisResults.push({
        type: "goal",
        icon: <Target className="w-5 h-5" />,
        title: "Savings Goal Insight",
        message: `Your current savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20% of income. Consider reducing expenses by ${formatCurrency(income * 0.2 - balance)} to reach this goal.`,
        color: "purple",
      });
    } else if (savingsRate >= 20) {
      analysisResults.push({
        type: "achievement",
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Great Job!",
        message: `Excellent! You're saving ${savingsRate.toFixed(1)}% of your income, which exceeds the recommended 20%. Keep up the great financial discipline!`,
        color: "green",
      });
    }

    // 5. Expense Trend Analysis
    if (expenseTransactions.length >= 5) {
      const recentTransactions = expenseTransactions.slice(-5);
      const avgRecent =
        recentTransactions.reduce((sum, t) => sum + t.amount, 0) / 5;
      const olderTransactions = expenseTransactions.slice(0, -5);

      if (olderTransactions.length > 0) {
        const avgOlder =
          olderTransactions.reduce((sum, t) => sum + t.amount, 0) /
          olderTransactions.length;
        const trendPercentage = ((avgRecent - avgOlder) / avgOlder) * 100;

        if (Math.abs(trendPercentage) > 15) {
          analysisResults.push({
            type: "trend",
            icon: <TrendingUp className="w-5 h-5" />,
            title: "Spending Trend Alert",
            message: `Your recent spending is ${trendPercentage > 0 ? "up" : "down"} ${Math.abs(trendPercentage).toFixed(1)}% compared to earlier transactions. ${trendPercentage > 0 ? "Consider reviewing recent purchases." : "Great job on reducing expenses!"}`,
            color: trendPercentage > 0 ? "red" : "green",
          });
        }
      }
    }

    setInsights(analysisResults);
    setLoading(false);
  };

  const findRecurringTransactions = (transactions) => {
    const potentialRecurring = [];
    const transactionMap = {};

    transactions.forEach((transaction) => {
      const key = `${transaction.note.toLowerCase()}-${transaction.amount}`;
      if (!transactionMap[key]) {
        transactionMap[key] = [];
      }
      transactionMap[key].push(transaction);
    });

    Object.entries(transactionMap).forEach(([key, transactions]) => {
      if (transactions.length >= 2) {
        const dates = transactions.map(
          (t) => new Date(t.date.split("/").reverse().join("-")),
        );
        dates.sort((a, b) => a - b);

        // Check if transactions occur roughly monthly (25-35 days apart)
        for (let i = 1; i < dates.length; i++) {
          const daysDiff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
          if (daysDiff >= 25 && daysDiff <= 35) {
            potentialRecurring.push(transactions[0]);
            break;
          }
        }
      }
    });

    return potentialRecurring;
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      analyzeTransactions();
    }, 1000); // Simulate AI processing time

    return () => clearTimeout(timer);
  }, [transactions, income, expense]);

  const getColorClasses = (color) => {
    const colors = {
      blue: darkMode
        ? "bg-blue-900/30 border-blue-700 text-blue-300"
        : "bg-blue-50 border-blue-200 text-blue-700",
      green: darkMode
        ? "bg-green-900/30 border-green-700 text-green-300"
        : "bg-green-50 border-green-200 text-green-700",
      orange: darkMode
        ? "bg-orange-900/30 border-orange-700 text-orange-300"
        : "bg-orange-50 border-orange-200 text-orange-700",
      purple: darkMode
        ? "bg-purple-900/30 border-purple-700 text-purple-300"
        : "bg-purple-50 border-purple-200 text-purple-700",
      red: darkMode
        ? "bg-red-900/30 border-red-700 text-red-300"
        : "bg-red-50 border-red-200 text-red-700",
    };
    return colors[color] || colors.blue;
  };

  if (transactions.length === 0) {
    return (
      <div
        className={`p-6 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white/80 border-gray-200"}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`p-2 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
          >
            <Brain
              className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            />
          </div>
          <h3
            className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}
          >
            AI Insights
          </h3>
        </div>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Add some transactions to get personalized financial insights powered
          by AI analysis.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white/80 border-gray-200"}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3
            className={`text-xl font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}
          >
            Smart Insights
          </h3>
          <p
            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Personalized analysis of your financial patterns
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`p-4 rounded-xl animate-pulse ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <div
                className={`h-4 rounded mb-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}
              ></div>
              <div
                className={`h-3 rounded w-3/4 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${getColorClasses(insight.color)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{insight.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{insight.title}</h4>
                  <p className="text-sm opacity-90">{insight.message}</p>
                  {insight.details && (
                    <div className="mt-2 space-y-1">
                      {insight.details.map((detail, i) => (
                        <div
                          key={i}
                          className="text-xs opacity-75 pl-2 border-l-2 border-current"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
