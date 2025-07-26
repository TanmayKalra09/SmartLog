import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './components/TransactionContext';
import { Toaster } from 'react-hot-toast';
import { CurrencyProvider } from "./components/CurrencyContext";
import RecurringExpenses from "../../SmartLog.gssoc25/src/components/RecurringExpenses";
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import GoalsPage from './components/GoalsPage';

export default function App() {

  return (
    <TransactionProvider>
      <CurrencyProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/recurring-expenses" element={<RecurringExpenses />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/goals" element={<GoalsPage />} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </TransactionProvider>
  );
}