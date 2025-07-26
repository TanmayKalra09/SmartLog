import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { features } from '../constants/index';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-12">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-white mb-6"
      >
        Smart Expense Management
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
      >
        Track expenses, visualize your spending, and stay financially healthy with our smart tools.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300 mb-12"
      >
        Get Started
      </motion.button>

      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group p-6 rounded-3xl backdrop-blur-lg transition-all duration-500 cursor-pointer transform hover:scale-110 hover:-translate-y-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:shadow-2xl hover:border-white/30"
              style={{
                animationDelay: `${0.3 + index * 0.15}s`,
                animation: isVisible ? 'slideUp 0.8s ease-out forwards' : 'none',
              }}
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-bold text-white mb-2 text-sm md:text-base">
                {feature.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden transition-[max-height] duration-300">
                {feature.desc}
              </p>

              <div
                className={`mt-3 h-0.5 bg-gradient-to-r ${feature.color} rounded-full transform transition-all duration-300 group-hover:scale-x-100 scale-x-0`}
              />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
