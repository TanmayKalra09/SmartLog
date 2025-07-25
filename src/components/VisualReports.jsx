import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import { useTransactions } from "./TransactionContext";
import { motion } from "motion/react";

// Updated color palette (cool tones with neon vibes)
const COLORS = ["#06b6d4", "#3b82f6", "#7c3aed", "#4f46e5", "#0ea5e9", "#818cf8", "#22d3ee", "#6366f1"];

const VisualReports = () => {
  const { transactions } = useTransactions();

  const expenseData = transactions
    .filter(t => t.type === "Expense")
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  const incomeData = transactions
    .filter(t => t.type === "Income")
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <h1 className="text-4xl font-bold mb-12 text-center text-cyan-300 drop-shadow-lg">
        Visual Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Expense Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#1e1b4b] to-[#3730a3] rounded-2xl shadow-2xl p-6"
        >
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Expense Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {expenseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderColor: "#06b6d4",
                  color: "white",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Income Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-gradient-to-br from-[#1e1b4b] to-[#3730a3] rounded-2xl shadow-2xl p-6"
        >
          <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Income by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#0ea5e9",
                  color: "white",
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
};

export default VisualReports;
