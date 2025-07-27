import { useEffect, useState } from "react";
import { useTransactions } from "./TransactionContext";

export default function BudgetGoals() {
  const { transactions ,income , expense} = useTransactions();

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("budgetGoals");
    return saved ? JSON.parse(saved) : [];
  });

  const [newGoal, setNewGoal] = useState({
    category: "",
    amount: "",
    duration: "Monthly",
  });

  useEffect(() => {
    localStorage.setItem("budgetGoals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (!newGoal.category || !newGoal.amount) return;
    setGoals([...goals, { ...newGoal, id: Date.now() }]);
    setNewGoal({ category: "", amount: "", duration: "Monthly" });
  };

  const calculateSpent = (category, duration) => {
    const now = new Date();
    let filtered = transactions.filter((t) => t.category === category);

    if (duration === "Monthly") {
      filtered = filtered.filter((t) => {
        const [dd, mm, yyyy] = t.date.split("/");
        return (
          parseInt(mm) === now.getMonth() + 1 && parseInt(yyyy) === now.getFullYear()
        );
      });
    } else if (duration === "Weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = filtered.filter((t) => {
        const [dd, mm, yyyy] = t.date.split("/");
        const txDate = new Date(`${yyyy}-${mm}-${dd}`);
        return txDate >= oneWeekAgo && txDate <= now;
      });
    }
    return filtered.reduce((sum, t) => {
        console.log(t);
    const amount = Number(t.amount);
    if (t.type=== "Expense"){
        console.log(sum+amount);
        return sum + amount;
    } 
    if (t.type === "Income"){
        console.log(sum+amount);
        return sum - amount;
    } 
    return sum;
    

  }, 0);

  };

  const handleDelete = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🎯 Budget Goals</h2>

      {/* Add New Goal Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Set a New Goal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newGoal.category}
            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
            placeholder="Category"
            className="px-4 py-3 rounded-xl border border-gray-300"
          />
          <input
            type="number"
            value={newGoal.amount}
            onChange={(e) => setNewGoal({ ...newGoal, amount: e.target.value })}
            placeholder="Amount (₹)"
            className="px-4 py-3 rounded-xl border border-gray-300"
          />
          <select
            value={newGoal.duration}
            onChange={(e) => setNewGoal({ ...newGoal, duration: e.target.value })}
            className="px-4 py-3 rounded-xl border border-gray-300"
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
        <button
          onClick={handleAddGoal}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
          Add Goal
        </button>
      </div>

      {/* List Goals */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const spent = calculateSpent(goal.category, goal.duration);
          const percent = Math.min((spent / goal.amount) * 100, 100);

          return (
            <div
              key={goal.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {goal.category} ({goal.duration})
                  </h4>
                  <p className="text-sm text-gray-500">
                    ₹{goal.amount-spent} remaining from  ₹{goal.amount}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ✖
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    percent < 100 ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>🚫 No budget goals set. Start by adding one above.</p>
        </div>
      )}
    </div>
  );
}
