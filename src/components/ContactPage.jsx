import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Placeholder, navigation is handled by props
import { Send, User, Mail } from 'lucide-react';
import Footer from './Footer';

const ContactPage = ({ darkMode, navigateTo }) => {
  // State to control the animations
  const [isVisible, setIsVisible] = useState(false);

  // useEffect to trigger the animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Main container with dynamic background
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100" 
        : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900"
    }`}>
      <main className="flex-1 w-full p-6 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          
          {/* Animated content card */}
          <div 
            className={`p-8 md:p-12 rounded-2xl shadow-2xl border transition-all duration-1000 ${
              darkMode
                ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm'
                : 'bg-white/70 border-gray-200 backdrop-blur-sm'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            
            {/* Animated Title */}
            <h1 
              className={`text-4xl text-center font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Get In Touch
            </h1>
            
            {/* Animated Description */}
            <p 
              className={`text-lg text-center mb-8 transition-all duration-1000 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              Have a question or feedback? We'd love to hear from you.
            </p>

            {/* Clickable Mailto Link, styled as a button */}
            <div 
              className={`text-center mt-8 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=jrjtXPTrDpfWVhGcfxnCjtMfGPgSjfqgwcLCXQWdRdPgdsMznKqkwxHgvPJfZwbzGTlGjdnM"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                target='_blank'
                rel="noopener noreferrer"
              >
                <Send size={20} />
                Send us an Email
              </a>
            </div>

            <div 
              className={`border-t my-8 transition-opacity duration-1000 ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            ></div>

            {/* Developer Details */}
            <div 
              className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                This project is maintained by:
              </p>
              <div className={`inline-flex items-center gap-3 text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <User size={20} className="text-purple-400" />
                <span>Tanmay Kalra</span>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default ContactPage;