import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './components/TransactionContext';
import UndoTransaction from './components/undoTransactions'; // ✅ Add this

export default function App() {
  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <UndoTransaction /> {/* ✅ Render it globally so it shows on all pages */}
    </TransactionProvider>
  );
}
