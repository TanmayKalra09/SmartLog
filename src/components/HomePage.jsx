import { useState, useEffect } from "react";

import { MessageCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import {
  IndianRupee,
  TrendingUp,
  PieChart,
  BarChart3,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleGetStarted = () => navigate("/dashboard");

  const features = [
    {
      icon: IndianRupee,
      title: "Track Expenses",
      desc: "Monitor every rupee",
      bgColor: "bg-blue-500",
      link: "/track-expenses",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      desc: "Insights that matter",
      bgColor: "bg-gradient-to-br from-purple-400 to-pink-500",
      link: "/smart-analytics",
    },
    {
      icon: BarChart3,
      title: "Budget Goals",
      desc: "Stay on track",
      bgColor: "bg-gradient-to-br from-pink-400 to-red-500",
      link: "/budget-goals",
    },
    {
      icon: PieChart,
      title: "Visual Reports",
      desc: "See your spending",
      bgColor: "bg-gradient-to-br from-green-400 to-blue-500",
      link: "/visual-reports",
    },
  ];

  return (

      <div className="min-h-screen flex flex-col">
      <main className="flex-1">

    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `hsl(${200 + Math.random() * 100}, 70%, 60%)`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>


      <div
        className="fixed w-96 h-96 pointer-events-none transition-all duration-500 ease-out opacity-30"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>


          <div className="m-8 relative" style={{ animationDelay: '0.2s' }}>
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-2xl relative overflow-hidden">
              <Sparkles className="w-12 h-12 text-white animate-pulse relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full animate-[shimmer_2s_ease-in-out_infinite]"></div>
            </div>

            <div className="absolute top-2 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-8 right-4 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>


          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Smart
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Log
              </span>
              <div className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transform origin-left animate-[expandWidth_2s_ease-out_1s_forwards] scale-x-0"></div>
            </span>
          </h1>


          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Transform your financial future with
            <span className="text-blue-300 font-semibold animate-pulse"> AI-powered insights</span>,
            <br className="hidden md:block" />
            <span className="text-purple-300 font-semibold"> beautiful visualizations</span>, and
            <span className="text-pink-300 font-semibold animate-pulse"> smart automation</span>.
          </p>
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900"
      }`}
    >
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Dark Mode Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>


        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20">
          {/* Left Side - Branding */}
          <div
            className={`flex-1 max-w-lg lg:ml-16 mb-8 lg:mb-0 text-center lg:text-left ${
              darkMode ? "text-gray-100" : "text-gray-800"
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
                      Transform your financial future with AI-powered insights,
                      beautiful visualizations, and smart automation.
                    </span>
                  ) : (
                    <span className="text-gray-700">
                      Transform your financial future with AI-powered insights,
                      beautiful visualizations, and smart automation.
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

          {/* Right Side - Device Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src="/laptop_mobile_mockup.png"
              alt="SmartLog Mobile and Laptop Mockup"
              className="w-auto h-[300px] md:h-[400px] lg:h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Link to={feature.link} key={index}>
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
                  className={`group p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    darkMode
                      ? "bg-gray-900 text-gray-100"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <motion.div
                    className={`${feature.bgColor} w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white`}
                    whileHover={{
                      scale: 1.08,
                      rotate: 3,
                      transition: {
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3
                    className={`text-center text-xl font-bold tracking-wide ${
                      darkMode ? "text-gray-100" : "text-gray-700"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-base text-center leading-snug mt-2 ${
                      darkMode ? "text-gray-100" : "text-gray-600"
                    }`}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>

//         <div className='w-full'>
//         </div>
      </div>

        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{
            scale: 1.03,
            y: -8,
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          className={`p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer max-w-5xl mx-auto mb-16 text-center ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          {/* Testimonials */}
          <div className="flex justify-center items-center mb-6">
            <div className="bg-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mr-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">What Our Users Say</h3>
          </div>

          <p
            className={`${darkMode ? "text-gray-300" : "text-gray-600"} italic`}
          >
            "I love how SmartLog makes tracking my expenses effortless!"
          </p>
          <p
            className={`mt-2 font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            – Rahul M., Pune
          </p>


          <p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-600"
            } italic mt-4`}
          >
            "SmartLog helped me understand my spending patterns and save more."
          </p>
          <p
            className={`mt-2 font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            – Ananya K., Delhi
          </p>

          {/* Divider */}
          <div
            className={`my-8 border-t ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}
          ></div>

          {/* Security */}
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mr-4">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Bank-Level Security</h3>
          </div>

          <ul
            className={`space-y-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <li>✓ 256-bit encryption</li>
            <li>✓ No third-party data sharing</li>
            <li>✓ GDPR compliant</li>
          </ul>
        </motion.div>
      </div>
      <Footer />
    </div>

  );
}
