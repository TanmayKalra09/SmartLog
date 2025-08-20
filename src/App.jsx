import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Contexts
import { TransactionProvider } from "./components/TransactionContext";
import { CurrencyProvider } from "./components/CurrencyContext";

// Pages
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import GoalsPage from "./components/GoalsPage";
import IncomeHistoryPage from "./components/IncomeHistoryPage";
import ExpenseHistoryPage from "./components/ExpenseHistoryPage";
import TrackExpenses from "./components/TrackExpenses";
import SmartAnalytics from "./components/SmartAnalytics";
import BudgetGoals from "./components/BudgetGoals";
import VisualReports from "./components/VisualReports";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

// ⭐ Import chatbot
import Chatbot from "./components/Chatbot";

// Optional: Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Example check
  return isAuthenticated ? children : <LoginPage />;
};

// Not Found Page
const NotFoundPage = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default function App() {
  return (
    <TransactionProvider>
      <CurrencyProvider>
        <Router>
          {/* Toast Notifications */}
          <Toaster position="top-right" reverseOrder={false} />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <GoalsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/income-history"
              element={
                <ProtectedRoute>
                  <IncomeHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expense-history"
              element={
                <ProtectedRoute>
                  <ExpenseHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/track-expenses"
              element={
                <ProtectedRoute>
                  <TrackExpenses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/smart-analytics"
              element={
                <ProtectedRoute>
                  <SmartAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget-goals"
              element={
                <ProtectedRoute>
                  <BudgetGoals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visual-reports"
              element={
                <ProtectedRoute>
                  <VisualReports />
                </ProtectedRoute>
              }
            />

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* ⭐ Chatbot visible everywhere */}
          <Chatbot />
        </Router>
      </CurrencyProvider>
    </TransactionProvider>
  );
}
