import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IndianRupee,
  TrendingUp,
  PieChart,
  BarChart3,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from './Footer';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGetStarted = () => navigate('/dashboard');

  const cardVariants = {
    initial: { opacity: 0, y: 80, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: {
      scale: 1.06,
      y: -6,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.12,
      rotate: 2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const features = [
    {
      icon: IndianRupee,
      title: 'Track Expenses',
      desc: 'Monitor every rupee',
      bgColor: 'bg-blue-500',
      link: '/track-expenses',
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      desc: 'Insights that matter',
      bgColor: 'bg-gradient-to-br from-purple-400 to-pink-500',
      link: '/smart-analytics',
    },
    {
      icon: BarChart3,
      title: 'Budget Goals',
      desc: 'Stay on track',
      bgColor: 'bg-gradient-to-br from-pink-400 to-red-500',
      link: '/budget-goals',
    },
    {
      icon: PieChart,
      title: 'Visual Reports',
      desc: 'See your spending',
      bgColor: 'bg-gradient-to-br from-green-400 to-blue-500',
      link: '/visual-reports',
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900'
        }`}
    >
      <div className="relative z-10 container mx-auto px-6 py-8">

        {/* Single-line Navbar with Dark Mode Toggle */}
        <nav className="flex justify-between items-center py-4 mb-12 border-b border-gray-300 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500  bg-clip-text text-transparent">SmartLog</span>
          </div>

          {/* Links + Dark Mode Toggle */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link to="/" className="hover:text-purple-500 transition">Home</Link>
            <Link to="/about" className="hover:text-purple-500 transition">About</Link>
            <Link to="/contact" className="hover:text-purple-500 transition">Contact</Link>
            <Link
              to="/login"
              className="px-4 py-1 border rounded-lg hover:bg-purple-100 dark:hover:bg-green-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-purple-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Sign Up
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-300 ${darkMode
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20">
          {/* Left Side */}
          <div className={`flex-1 max-w-lg lg:ml-16 mb-8 lg:mb-0 text-center lg:text-left ${darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1
                className="
                  text-5xl font-extrabold mb-4 leading-tight tracking-tight
                  bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500
                  bg-clip-text text-transparent
                  transition duration-300 hover:scale-105 hover:text-purple-500
                "
              >
                SmartLog
              </h1>
              <p className="text-xl leading-relaxed max-w-lg">
                Transform your financial future with AI-powered insights, beautiful visualizations, and smart automation.
              </p>
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src="/laptop_mobile_mockup.png"
              alt="SmartLog Mobile and Laptop Mockup"
              className="w-auto h-[300px] md:h-[400px] lg:h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link to={feature.link} key={index}>
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`group p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-100 cursor-pointer ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
                    }`}
                >
                  <motion.div
                    variants={logoVariants}
                    className={`${feature.bgColor} w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-center text-xl font-bold tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-base text-center leading-snug mt-2">
                    {feature.desc}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
