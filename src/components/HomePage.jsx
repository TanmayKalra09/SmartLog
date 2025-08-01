import { useState, useEffect } from 'react';
import {
  IndianRupee,
  TrendingUp,
  PieChart,
  BarChart3,
  Sparkles,
  ArrowRight,

} from 'lucide-react';
  Sun,
  Moon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import Footer from './Footer';
import AuthModal from './AuthModal';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGetStarted = () => navigate('/dashboard');

  const features = [
    {
      icon: IndianRupee,
      title: 'Track Expenses',
      desc: 'Monitor every rupee',
      bgColor: 'bg-blue-500',
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      desc: 'Insights that matter',
      bgColor: 'bg-gradient-to-br from-purple-400 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Budget Goals',
      desc: 'Stay on track',
      bgColor: 'bg-gradient-to-br from-pink-400 to-red-500',
    },
    {
      icon: PieChart,
      title: 'Visual Reports',
      desc: 'See your spending',
      bgColor: 'bg-gradient-to-br from-green-400 to-blue-500',
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900'
      }`}
    >
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="flex items-center justify-between mb-20">
          <div className="flex-1 max-w-lg ml-16">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-black text-gray-800 mb-4">SmartLog</h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Transform your financial future with AI-powered insights,
                beautiful visualizations, and smart automation.
              </p>
        {/* Dark Mode Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20">
          {/* Left Side - Branding */}
          <div
            className={`flex-1 max-w-lg lg:ml-16 mb-8 lg:mb-0 text-center lg:text-left ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}
          >
            <div className="mb-8">
              {/* Logo */}
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1
                  className="
                    text-5xl font-extrabold mb-4 leading-tight tracking-tight
                    bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500
                    bg-clip-text text-transparent
                  "
                >
                  SmartLog
                </h1>
                <p className={`text-xl leading-relaxed max-w-lg`}>
                  {darkMode ? (
                    <span className="text-gray-100">
                      Transform your financial future with AI-powered insights, beautiful visualizations, and smart automation.
                    </span>
                  ) : (
                    <span className="text-gray-700">
                      Transform your financial future with AI-powered insights, beautiful visualizations, and smart automation.
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Get Started</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <img
              src="/laptop_mobile_mockup.png"
              alt="SmartLog Mobile and Laptop Mockup"
              className="w-auto h-[500px] object-contain"

          {/* Right Side - Device Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src="/laptop_mobile_mockup.png"
              alt="SmartLog Mobile and Laptop Mockup"
              className="w-auto h-[300px] md:h-[400px] lg:h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Features Section */}
        {/* Feature Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: {
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                className="group p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-center text-xl">{feature.title}</h3>
                <p className="text-base text-gray-500 text-center group-hover:text-gray-600 transition-colors duration-300">
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                className={`group p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
                }`}
              >
                <motion.div
                  className={`${feature.bgColor} w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white`}
                  whileHover={{
                    scale: 1.08,
                    rotate: 3,
                    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3
                  className={`text-center text-xl font-bold tracking-wide ${
                    darkMode ? 'text-gray-100' : 'text-gray-700'
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-base text-center leading-snug mt-2 ${
                    darkMode ? 'text-gray-100' : 'text-gray-600'
                  }`}
                >
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      <Footer />
    </div>
  );
}
