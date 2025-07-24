import React, { useState } from 'react';
import './FeatureCard.css';

export default function FeatureCard({ icon: Icon, title, desc, color, detailedDesc }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={`group p-6 rounded-3xl backdrop-blur-lg transition-all duration-500 cursor-pointer transform hover:scale-110 hover:-translate-y-2 ${showDetail
          ? 'bg-white/20 shadow-2xl border border-white/30 shadow-purple-500/20'
          : 'bg-white/5 hover:bg-white/10 border border-white/10'
        }`}
      onClick={() => setShowDetail(!showDetail)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transform transition-all duration-300 ${showDetail ? 'scale-110 rotate-6' : ''}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-white mb-2 text-sm md:text-base">{title}</h3>
      <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {showDetail ? detailedDesc : desc}
      </p>

      <div className={`mt-3 h-0.5 bg-gradient-to-r ${color} rounded-full transform transition-all duration-300 ${showDetail ? 'scale-x-100' : 'scale-x-0'}`}></div>
    </div>
  );
}
