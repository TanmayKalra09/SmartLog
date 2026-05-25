import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Sparkles, LineChart, BarChart3, Star } from 'lucide-react';
import Footer from './Footer';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      text: "SmartLog has completely changed how I see my money. The visuals are amazing and make budgeting feel effortless!",
      author: "Priya S.",
    },
    {
      text: "I love the simplicity and clean design. Tracking expenses has never been this easy.",
      author: "Amit K.",
    },
    {
      text: "The insights are a game-changer. I finally feel in control of my finances. Highly recommend!",
      author: "Neha R.",
    },
  ];

  const faqs = [
    {
      question: "Is SmartLog free to use?",
      answer: "SmartLog offers a powerful free tier that includes all core features. We also have premium plans for advanced analytics and features.",
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, your data is our top priority. We use industry-standard encryption and security protocols to ensure your information is always safe.",
    },
    {
      question: "Can I sync with my bank account?",
      answer: "Currently, SmartLog supports manual expense tracking. We are working on adding secure bank synchronization in a future update.",
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-900`}>
      <main className="flex-1 w-full p-6 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          
          <div 
            className={`p-8 md:p-12 rounded-2xl shadow-2xl border transition-all duration-1000 bg-white/70 border-gray-200 backdrop-blur-sm
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            
            {/* Main Title */}
            <h1 
              className={`text-4xl text-center font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }} 
            >
              About SmartLog
            </h1>
            
            {/* Introduction */}
            <p 
              className={`text-lg text-center mb-8 transition-all duration-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              style={{ transitionDelay: '400ms' }}
            >
              SmartLog is a modern, intuitive application designed to help you effortlessly track your expenses and manage your finances. We believe that **financial wellness should be accessible to everyone**, and our goal is to provide a clean, simple, and powerful tool that gives you clear insights into your spending habits.
            </p>

            <div 
              className={`border-t border-gray-200 my-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            ></div>

            {/* Core Philosophy Section */}
            <div 
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '700ms' }}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">Our Core Philosophy</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-100/50">
                  <Sparkles className="w-10 h-10 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Simplicity</h3>
                  <p className="text-sm">We've built SmartLog to be intuitive and easy to use, so you can focus on what matters.</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-100/50">
                  <LineChart className="w-10 h-10 text-purple-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Clarity</h3>
                  <p className="text-sm">Get clear, actionable insights through beautiful visualizations and smart analytics.</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-100/50">
                  <BarChart3 className="w-10 h-10 text-pink-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Empowerment</h3>
                  <p className="text-sm">Our tools help you set goals and track progress to take full control of your finances.</p>
                </div>

              </div>
            </div>

            <div 
              className={`border-t border-gray-200 my-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '1000ms' }}
            ></div>

            {/* Testimonials Section */}
            <div 
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1200ms' }}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">What Our Users Say</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-100/50 p-6 rounded-xl shadow-inner">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="italic text-sm mb-3">"{testimonial.text}"</p>
                    <p className="font-semibold text-sm">- {testimonial.author}</p>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className={`border-t border-gray-200 my-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '1400ms' }}
            ></div>

            {/* FAQ Section */}
            <div 
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1600ms' }}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">Frequently Asked Questions</h2>
              <div className="space-y-4 text-gray-700">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-100/50">
                    <h3 className="font-bold text-md mb-1">{faq.question}</h3>
                    <p className="text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className={`border-t border-gray-200 my-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '1800ms' }}
            ></div>

            {/* Developer Details */}
            <div 
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '2000ms' }}
            >
              <h2 
                className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                Meet the Developer
              </h2>
              <div className={`flex flex-col items-center gap-4 text-gray-700`}>
                <p className="text-center max-w-2xl mx-auto">
                  SmartLog was created with a passion for building effective tools that simplify everyday tasks. Your feedback is invaluable, so please don't hesitate to reach out with any questions or suggestions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-purple-400" />
                    <span>Tanmay Kalra</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <a href="mailto:tanmaykalra0910@gmail.com" className="hover:underline">tanmaykalra0910@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div 
              className={`text-center mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '2200ms' }}
            >
              <Link
                to="/login"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-300 text-sm font-semibold text-white 
                bg-gradient-to-r from-purple-500 to-pink-500
                hover:from-purple-600 hover:to-pink-600 
                hover:shadow-lg hover:scale-105`}
              >
                <ArrowLeft size={16} />
                Want to start the journey
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