import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import { TransactionProvider } from "./components/TransactionContext";
import { Toaster } from "react-hot-toast";
import { CurrencyProvider } from "./components/CurrencyContext";

import UndoTransaction from "./components/undoTransactions";

import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import GoalsPage from './components/GoalsPage';
import IncomeHistoryPage from './components/IncomeHistoryPage';
import ExpenseHistoryPage from "./components/ExpenseHistoryPage";
import TrackExpenses from './components/TrackExpenses';
import SmartAnalytics from './components/SmartAnalytics';
import BudgetGoals from './components/BudgetGoals';
import VisualReports from './components/VisualReports';

export default function App() {
  return (
    <TransactionProvider>
      <CurrencyProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/income-history" element={<IncomeHistoryPage />} />
            <Route path="/expense-history" element={<ExpenseHistoryPage />} />
            <Route path="/track-expenses" element={<TrackExpenses />} /> 
            <Route path="/smart-analytics" element={<SmartAnalytics />} /> 
            <Route path="/budget-goals" element={<BudgetGoals />} /> 
            <Route path="/visual-reports" element={<VisualReports />} />
          </Routes>
        </Router>
        <UndoTransaction />
      </CurrencyProvider>
    </TransactionProvider>
  );
}
