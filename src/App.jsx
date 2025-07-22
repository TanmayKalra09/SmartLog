import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './components/TransactionContext';
import VisualReports from './components/VisualReports';

export default function App() {
  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<VisualReports/>} />
        </Routes>
      </Router>
    </TransactionProvider>
  );
}