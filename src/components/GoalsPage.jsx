import React, { useState, useEffect } from "react";
import { useTransactions } from "./TransactionContext";
import AddGoalModal from "./AddGoalModal";
import Footer from "./Footer";
import GoalCard from "./GoalCard";
import { Plus, ArrowLeft } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import ContributeToGoalModal from "./ContributeToGoalModal";
import { useNavigate } from "react-router-dom";

export default function GoalsPage() {
  const { goals, setGoals } = useTransactions();
  const navigate = useNavigate();
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleDelete = (id) => {
    setGoalToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setGoals((prev) => prev.filter((g) => g.id !== goalToDelete));
    setShowDeleteModal(false);
    setGoalToDelete(null);
  };

  const handleOpenContributeModal = (goalId) => {
    setSelectedGoalId(goalId);
    setShowContributeModal(true);
  };

  // ── style helpers ─────────────────────────────────────────────────────────
  const base = darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";
  const secondaryText = darkMode ? "text-gray-400" : "text-gray-500";

  // summary stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter(
    (g) => g.savedAmount >= g.targetAmount
  ).length;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${base}`}>
      <main className="flex-1 w-full px-5 py-8 mb-24">
        <div className="max-w-4xl mx-auto">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className={`flex items-center justify-between mb-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  darkMode
                    ? "bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200"
                    : "bg-white border border-gray-100 text-gray-400 hover:text-gray-700"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Goals</h1>
                <p className={`text-sm mt-0.5 ${secondaryText}`}>
                  {totalGoals} goal{totalGoals !== 1 ? "s" : ""}
                  {completedGoals > 0 && (
                    <span className={`ml-2 ${darkMode ? "text-emerald-500" : "text-emerald-600"}`}>
                      · {completedGoals} completed
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddGoalModal(true)}
              className={`flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium transition-opacity hover:opacity-80 ${
                darkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              Add goal
            </button>
          </div>

          {/* ── Divider ─────────────────────────────────────────────────── */}
          <div className={`h-px mb-6 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`} />

          {/* ── Goal grid ───────────────────────────────────────────────── */}
          <div className={`transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            {goals.length === 0 ? (
              <div className={`text-center py-16`}>
                <p className={`text-sm mb-4 ${secondaryText}`}>
                  No goals yet — add one to start tracking your savings.
                </p>
                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80 ${
                    darkMode ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add your first goal
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {goals.map((goal, index) => (
                  <div
                    key={goal.id}
                    className={`transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${150 + index * 60}ms` }}
                  >
                    <GoalCard
                      goal={goal}
                      darkMode={darkMode}
                      onDelete={handleDelete}
                      onContribute={handleOpenContributeModal}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />

      <AddGoalModal
        showModal={showAddGoalModal}
        setShowModal={setShowAddGoalModal}
        darkMode={darkMode}
      />

      <ConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm deletion"
        message="Are you sure you want to delete this goal? This action cannot be undone."
        darkMode={darkMode}
      />

      <ContributeToGoalModal
        showModal={showContributeModal}
        setShowModal={setShowContributeModal}
        darkMode={darkMode}
        goalId={selectedGoalId}
      />
    </div>
  );
}