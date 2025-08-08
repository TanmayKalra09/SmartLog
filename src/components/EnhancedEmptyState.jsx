import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/empty_state.json";

export default function EnhancedEmptyState({ onAddTransaction }) {
  const steps = [
    { label: "Add your first income", done: false },
    { label: "Add your first expense", done: false },
    { label: "Set a savings goal", done: false },
  ];

  const progress = (steps.filter(s => s.done).length / steps.length) * 100;

  return (
    <div className="max-w-xl mx-auto p-8 rounded-3xl 
  bg-white/70 dark:bg-gray-900/60 
  backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 
  shadow-lg transition-colors duration-300 text-center">

      {/* Lottie Animation */}
      <div className="w-48 mx-auto mb-6">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        Welcome to SmartLog 🎉
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Let’s get you started with just a few steps.
      </p>

      {/* Steps */}
      <ul className="text-left space-y-3 mb-6">
        {steps.map((step, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              step.done ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <span className={`w-6 h-6 flex items-center justify-center rounded-full ${
              step.done ? "bg-green-500 text-white" : "bg-gray-400 text-white"
            }`}>
              {step.done ? "✓" : i + 1}
            </span>
            <span className="text-gray-700 dark:text-gray-200">{step.label}</span>
          </li>
        ))}
      </ul>

     

      {/* Button */}
      <button
        onClick={onAddTransaction}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:scale-105 transition-all"
      >
        ➕ Add Your First Transaction
      </button>
    </div>
  );
}
