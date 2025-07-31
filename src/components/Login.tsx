/*Created Login Icon Component*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'blueimp-md5';
import { toast } from 'react-hot-toast';
import './Login.css';

type LoginProps = {
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [gravatarUrl, setGravatarUrl] = useState<string | null>(null);

  
  const validatePassword = (pwd: string): string[] => {
    const errors: string[] = [];
    if (pwd.length < 8) errors.push('at least 8 characters');
    if (!/[A-Z]/.test(pwd)) errors.push('one uppercase letter');
    if (!/[a-z]/.test(pwd)) errors.push('one lowercase letter');
    if (!/[0-9]/.test(pwd)) errors.push('one digit');
    if (!/[!@#$%^&*()_\-+=~`[\]{}|\\:;"\'<>,.?/]/.test(pwd))
      errors.push('one special character');
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(`Password must contain ${passwordErrors.join(', ')}.`);
      return;
    }

    setError('');

    try {
      
      await new Promise((res) => setTimeout(res, 1000));

      
      const computedGravatarUrl = `https://www.gravatar.com/avatar/${md5(
        email.trim().toLowerCase()
      )}?s=64&d=identicon`;
      setGravatarUrl(computedGravatarUrl);
      localStorage.setItem('token', 'fake-jwt-token');

      
      toast.success('Login successful! Welcome back.');

      
      setShowGreeting(true);
      setTimeout(() => {
        setShowGreeting(false);
        onClose();
        navigate('/');
      }, 2000);
    } catch {
      setError('Login failed due to server error. Please try again later.');
    }
  };

  return (
    <div
      className="login-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div className="login-card">
        {showGreeting && gravatarUrl ? (
          <div
            style={{
              textAlign: 'center',
              margin: '2.2rem 0 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={gravatarUrl}
              alt="User avatar"
              width={64}
              height={64}
              style={{
                borderRadius: '50%',
                marginBottom: '10px',
                border: '2px solid #2563eb',
                userSelect: 'none',
              }}
            />
            <div
              style={{
                fontWeight: 700,
                fontSize: '1.6rem',
                color: '#222a44',
                userSelect: 'none',
              }}
            >
              Hi, {email.split('@')[0] || email}!
            </div>
            <span style={{ color: '#2563eb', fontWeight: 500, fontSize: '1.06rem' }}>
              Welcome back!
            </span>
          </div>
        ) : (
          <>
            {/* Logo and heading */}
            <div
              className="login-header"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.95rem',
                marginBottom: '1.5rem',
              }}
            >
              <svg
                className="login-logo-attractive"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="42"
                height="42"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <radialGradient
                    id="userGlow"
                    cx="32"
                    cy="20"
                    r="18"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="90%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#0b3e91" />
                  </radialGradient>
                </defs>
                <circle cx="32" cy="20" r="10" fill="url(#userGlow)" />
                <ellipse cx="32" cy="44" rx="17" ry="8" fill="#e2edfc" />
                <path
                  d="M48,58c0-8-16-8-16-8s-16,0-16,8v6h32Z"
                  fill="#2563eb"
                  opacity=".88"
                />
                <rect
                  x="42"
                  y="32"
                  width="12"
                  height="14"
                  rx="3"
                  fill="#fff"
                  stroke="#1e40af"
                  strokeWidth="2"
                />
                <path
                  d="M45 32v-6a5 5 0 0 1 10 0v6"
                  stroke="#1e40af"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="48" cy="40" r="2" fill="#1e40af" />
                <filter
                  id="userShadow"
                  x="0"
                  y="0"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="4"
                    floodColor="#60a5fa"
                    floodOpacity="0.25"
                  />
                </filter>
              </svg>
              <h2 className="login-attractive-title" id="login-title">
                Login
              </h2>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-describedby="email-desc"
              />
              <small id="email-desc" className="sr-only">
                Enter your email address
              </small>

              <label htmlFor="password">Password</label>
              <div
                style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              >
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  aria-describedby="password-desc"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    marginLeft: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#2563eb',
                    userSelect: 'none',
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <small id="password-desc" className="sr-only">
                Password must be at least 8 characters and include uppercase, lowercase,
                digit, and special character.
              </small>

              {error && (
                <div
                  className="login-error"
                  role="alert"
                  style={{ marginBottom: '1rem' }}
                >
                  {error}
                </div>
              )}

              <button type="submit" className="login-submit-btn" aria-label="Submit login form">
                Login
              </button>
            </form>
          </>
        )}

        {/* Close button */}
        <button
          type="button"
          className="login-close"
          onClick={onClose}
          aria-label="Close Login form"
          style={{ marginTop: '1rem' }}
          disabled={showGreeting} 
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Login;





















