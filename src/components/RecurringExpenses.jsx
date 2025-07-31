// src/components/RecurringExpenses.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const RecurringExpenses = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    totalRecurring: 0,
    recurringList: [],
    recurringByCategory: {},
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/expenses/recurring-breakdown");
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch recurring expenses", error);
    }
  };

  useEffect(() => {
    if (open) fetchData();
  }, [open]);

  const chartData = Object.entries(data.recurringByCategory || {}).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#F3E8FF] to-[#E0D6FF]">
        <div
          onClick={() => setOpen(true)}
          className="bg-gradient-to-br from-[#9B5DE5] to-[#6A4C93] text-white px-10 py-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center w-full max-w-md"
        >
          <h2 className="text-2xl font-bold tracking-wide">
            Recurring Expenses
          </h2>
          <p className="text-lg mt-3 font-medium">
            Total: ₹{data.totalRecurring}
          </p>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Recurring Expense Breakdown
            </Dialog.Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <PieChart width={300} height={300}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">
                  Detected Reccuring Expenses !
                </h3>
                <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {data?.recurringList?.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-white shadow-sm hover:shadow-md rounded-xl px-4 py-3 border-l-4 border-blue-500 transition-shadow duration-200"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.amount} • {item.category}
                        </p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {item.frequency}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 text-sm text-gray-600">
              <p>
                💡 Tip: Review inactive or duplicate subscriptions to save
                money.
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default RecurringExpenses;
