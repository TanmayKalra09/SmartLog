import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TransactionProvider } from './context/TransactionContext';
import { CurrencyProvider } from "./context/CurrencyContext";
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GoalsPage from './pages/GoalsPage';

export default function App() {

  return (
    <TransactionProvider>
      <CurrencyProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
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