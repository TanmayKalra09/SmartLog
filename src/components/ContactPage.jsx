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
            <section className="w-full py-16 px-4 flex flex-col items-center text-center">
  {/* Stylish Heading */}
  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform duration-300">
    Get In Touch
  </h2>

  {/* Subheading */}
  <p className="text-gray-500 text-lg max-w-2xl mt-4 mb-10">
   Whether it's a question, suggestion, or feedback—drop us a line!
  </p>

  {/* Button with icon before text */}
  <button
    onClick={() => {
      window.open(
        "https://mail.google.com/mail/?view=cm&to=tanmaykalra0910@gmail.com&su=Feedback&body=Hi%20Tanmay%2C",
        "_blank"
      );
    }}
    className="bg-white text-slate-950 px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-400/40 hover:bg-gray-100 transition-all duration-300 text-base font-medium flex items-center gap-3 border border-gray-300"
  >
    <Send size={18} className="text-purple-600" />
    Send us an Email
  </button>
</section>



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