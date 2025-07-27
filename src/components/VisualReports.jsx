import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import { useTransactions } from "./TransactionContext";
import { motion, scale } from "motion/react";

const COLORS = ["#10b981", "#f97316", "#6366f1", "#ec4899", "#facc15", "#3b82f6", "#f43f5e", "#8b5cf6"];

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
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 via-sky-50 to-pink-50">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">Visual Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-xl rounded-2xl p-6"
        >
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Expense Distribution</h2>
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
                isAnimationActive={true}
                animationDuration={1000}
              >
                {expenseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-white shadow-xl rounded-2xl p-6"
        >
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Income by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                fill="#10b981"
                isAnimationActive={true}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
};

export default VisualReports;
