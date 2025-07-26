import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './components/TransactionContext';
import { CurrencyProvider } from "./components/CurrencyContext";
import RecurringExpenses from "../../SmartLog.gssoc25/src/components/RecurringExpenses";

export default function App() {
  return (
    <TransactionProvider>
      <CurrencyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/recurring-expenses" element={<RecurringExpenses />} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </TransactionProvider>
  );
}