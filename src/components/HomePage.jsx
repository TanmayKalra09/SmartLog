import { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, PieChart, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickEffect, setClickEffect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 600);
    navigate('/dashboard');
    console.log('Navigating to dashboard...');
  };

  const features = [
    { icon: IndianRupee, title: 'Track Expenses', desc: 'Monitor every rupee', color: 'from-green-400 to-blue-500' },
    { icon: TrendingUp, title: 'Smart Analytics', desc: 'Insights that matter', color: 'from-blue-400 to-purple-500' },
    { icon: PieChart, title: 'Visual Reports', desc: 'See your spending', color: 'from-purple-400 to-pink-500' },
    { icon: BarChart3, title: 'Budget Goals', desc: 'Stay on track', color: 'from-pink-400 to-red-500' }
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


          <div className="mb-6">
            <div className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-4 animate-pulse">
              Ready to take control?
            </div>
          </div>

          <div className="relative group mb-16">
            <button
              onClick={handleGetStarted}
              className={`relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold px-16 py-5 rounded-full text-xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/30 hover:scale-105 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-purple-500/50 ${clickEffect ? 'animate-pulse scale-95' : ''}`}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Journey
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </span>


              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
            </button>


            <div className="absolute -top-4 -right-4 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-0 left-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === index;
              return (
                <div
                  key={index}
                  className={`group p-6 rounded-3xl backdrop-blur-lg transition-all duration-500 cursor-pointer transform hover:scale-110 hover:-translate-y-2 ${isHovered
                      ? 'bg-white/20 shadow-2xl border border-white/30 shadow-purple-500/20'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  style={{
                    animationDelay: `${0.3 + index * 0.15}s`,
                    animation: isVisible ? 'slideUp 0.8s ease-out forwards' : 'none'
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform transition-all duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.desc}</p>


                  <div className={`mt-3 h-0.5 bg-gradient-to-r ${feature.color} rounded-full transform transition-all duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-full'>
        </div>
      </div>


      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        @keyframes shimmer {
          to { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes expandWidth {
          to { transform: scaleX(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

    </div>

      </main>
      <Footer />
    </div>
  );
}