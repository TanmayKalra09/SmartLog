import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail } from 'lucide-react';
import Footer from '../components/Footer'; 

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10); 
    return () => clearTimeout(timer); 
  }, []); 

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900
    }`}>
      <main className="flex-1 w-full p-6 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          
          <div 
            className={`p-8 md:p-12 rounded-2xl shadow-2xl border transition-all duration-1000 bg-white/70 border-gray-200 backdrop-blur-sm
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            
            <h1 
              className={`text-4xl text-center font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }} 
            >
              About SmartLog
            </h1>
            
            <p 
              className={`text-lg text-center mb-8 transition-all duration-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              style={{ transitionDelay: '400ms' }}
            >
              SmartLog is a modern, intuitive application designed to help you effortlessly track your expenses and manage your finances. Our goal is to provide a clean, simple, and powerful tool that gives you clear insights into your spending habits.
            </p>

            <div 
              className={`border-t my-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            ></div>

            <div 
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <h2 className="text-2xl font-bold text-center mb-6">Developer Details</h2>
              <div className={`flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-700`}>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-400" />
                  <span>Tanmay Kalra</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>tanmaykalra0910@gmail.com</span>
                </div>
              </div>
            </div>

            <div 
              className={`text-center mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '1000ms' }}
            >
              <Link
                to="/dashboard"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors duration-200 text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300`}
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;