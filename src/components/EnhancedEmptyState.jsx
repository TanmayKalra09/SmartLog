import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/empty_state.json";
import { Plus } from "lucide-react";

const steps = [
  { label: "Add your first income" },
  { label: "Add your first expense" },
  { label: "Set a savings goal" },
];

export default function EnhancedEmptyState({ onAddTransaction, darkMode = false }) {
  return (
    <div className={`max-w-sm mx-auto rounded-2xl p-8 text-center transition-colors duration-200 ${
      darkMode
        ? "bg-gray-900 border border-gray-800"
        : "bg-white border border-gray-100"
    }`}>

      {/* Lottie */}
   

      {/* Heading */}
      <h2 className={`text-base font-semibold mb-1 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
        Welcome to SmartLog
      </h2>
      <p className={`text-sm mb-6 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
        A few steps to get you set up.
      </p>

      {/* Steps */}
      <ul className="space-y-2 mb-7 text-left">
        {steps.map((step, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
              darkMode
                ? "bg-gray-700 text-gray-400"
                : "bg-gray-200 text-gray-500"
            }`}>
              {i + 1}
            </span>
            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
              {step.label}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onAddTransaction}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80 ${
          darkMode
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-900 text-white"
        }`}
      >
        <Plus className="w-3.5 h-3.5" />
        Add your first transaction
      </button>
    </div>
  );
}