import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { TransactionProvider } from './components/TransactionContext';
import { Toaster } from 'react-hot-toast';
import { CurrencyProvider } from "./components/CurrencyContext";
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import GoalsPage from './components/GoalsPage';
import Login from './components/Login';


export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <TransactionProvider>
      <CurrencyProvider>
        <Router>
          <Toaster />

          {/* Header with only Login button */}
          <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', background: '#f5f5f5' }}>
            <button
              onClick={() => setShowLogin(true)}
              style={{
                padding: '8px 16px',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '4px',
                border: '1px solid #2563eb',
                backgroundColor: '#2563eb',
                color: 'white',
              }}
            >
              Login
            </button>
          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/goals" element={<GoalsPage />} />
          </Routes>

          {/* Login Modal */}
          {showLogin && (
            <div
              className="modal-overlay"
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              }}
            >
              <div
                className="modal-content"
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  position: 'relative',
                  minWidth: '340px',
                  maxWidth: '400px',
                }}
              >
                <Login 
                  onClose={() => setShowLogin(false)} 
                />
                <button
                  onClick={() => setShowLogin(false)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#555',
                  }}
                  aria-label="Close Login"
                >
                  ×
                </button>
              </div>
            </div>
          )}

        </Router>
      </CurrencyProvider>
    </TransactionProvider>
  );
}

