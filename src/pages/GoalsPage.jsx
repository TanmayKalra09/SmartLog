import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import { useTransactions } from "../context/TransactionContext";
import AddGoalModal from '../components/AddGoalModal';
import Footer from '../components/Footer';
import GoalCard from '../components/GoalCard';
import { Plus } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import ContributeToGoalModal from '../components/ContributeToGoalModal';

export default function GoalsPage() {
  const { goals, setGoals } = useTransactions();
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  // 2. Add state for animation visibility
  const [isVisible, setIsVisible] = useState(false);

  // 3. Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = id => {
    setGoalToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setGoals(prev => prev.filter(g => g.id !== goalToDelete));
    setShowDeleteModal(false);
    setGoalToDelete(null);
  };

  const handleOpenContributeModal = (goalId) => {
    setSelectedGoalId(goalId);
    setShowContributeModal(true);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
        : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900"
      }`}>
      <main className="flex-1 w-full p-6">
        <div className="max-w-6xl mx-auto">

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Financial Goals
            </h1>
            <p className={`transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
              Set, track, and achieve your savings goals.
            </p>
          </div>

          <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
              Add New Goal
            </button>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              Your Goals
              <span className={`text-sm font-normal px-3 py-1 rounded-full ${darkMode ? "text-gray-300 bg-gray-700" : "text-gray-500 bg-gray-100"}`}>
                {goals.length}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal, index) => (
                <div key={goal.id} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${500 + index * 100}ms` }}>
                  <GoalCard
                    goal={goal}
                    darkMode={darkMode}
                    onDelete={handleDelete}
                    onContribute={handleOpenContributeModal}
                  />
                </div>
              ))}

              {goals.length === 0 && (
                <div className="col-span-full text-center py-12">
                  {/* ... placeholder content ... */}
                </div>
              )}
            </div>
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
        title={"Confirm Deletion"}
        message={'Are you sure you want to delete this goal? This action cannot be undone.'}
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
