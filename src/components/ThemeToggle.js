import React from 'react';

const ThemeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className={`flex items-center space-x-4 p-4 rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-105 border ${
        isDarkMode 
          ? 'bg-slate-800/30 border-slate-700/50 shadow-lg shadow-slate-900/20' 
          : 'bg-white/20 border-white/30 shadow-lg shadow-indigo-200/20'
      }`}>
        {/* Animated Light Label */}
        <div className="relative">
          <span className={`text-sm font-medium transition-all duration-500 transform ${
            isDarkMode 
              ? 'text-slate-400 scale-95 opacity-70' 
              : 'text-slate-700 scale-105 opacity-100 font-semibold'
          }`}>
            ☀️ Light
          </span>
          {!isDarkMode && (
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-md animate-pulse"></div>
          )}
        </div>

        {/* Enhanced Toggle Button */}
        <div className="relative">
          {/* Outer Glow Ring */}
          <div className={`absolute -inset-1 rounded-full transition-all duration-700 ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 animate-glow'
              : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-bounce'
          }`}></div>

          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-500 focus:outline-none focus:ring-4 transform hover:scale-110 active:scale-95 ${
              isDarkMode
                ? 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80 focus:ring-purple-400/30 shadow-lg shadow-purple-500/25'
                : 'bg-gradient-to-r from-slate-300/80 to-slate-400/80 focus:ring-orange-300/30 shadow-lg shadow-orange-400/25'
            }`}
          >
            {/* Animated Background Wave */}
            <div className={`absolute inset-0 rounded-full overflow-hidden`}>
              <div className={`absolute inset-0 transition-all duration-1000 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-400/15 to-purple-400/15 animate-pulse' 
                  : 'bg-gradient-to-r from-yellow-200/25 to-orange-200/25'
              }`}></div>
            </div>
            
            {/* Floating Particles */}
            <div className={`absolute top-2 left-2 w-1 h-1 rounded-full transition-all duration-500 ${
              isDarkMode ? 'bg-cyan-300/70 animate-bounce' : 'bg-yellow-500/70 animate-pulse'
            }`}></div>
            <div className={`absolute bottom-2 right-2 w-1 h-1 rounded-full transition-all duration-700 ${
              isDarkMode ? 'bg-purple-300/70 animate-pulse' : 'bg-orange-500/70 animate-bounce'
            }`}></div>
            
            {/* Enhanced Sliding Circle */}
            <span
              className={`relative inline-block h-6 w-6 transform rounded-full shadow-lg transition-all duration-500 ease-out z-10 ${
                isDarkMode ? 'translate-x-7 rotate-180' : 'translate-x-1 rotate-0'
              }`}
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #475569, #64748b, #94a3b8)'
                  : 'linear-gradient(135deg, #ffffff, #f8fafc, #e2e8f0)',
                boxShadow: isDarkMode 
                  ? '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 10px rgba(147, 51, 234, 0.2)'
                  : '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 10px rgba(251, 146, 60, 0.2)'
              }}
            >
              {/* Inner Glow Ring */}
              <span className={`absolute inset-0.5 rounded-full transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-200/25 to-indigo-200/25 animate-pulse' 
                  : 'bg-gradient-to-br from-yellow-100/50 to-orange-100/50'
              }`}></span>
              
              {/* Sparkle Effect */}
              <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 transition-all duration-300 ${
                isDarkMode ? 'animate-ping' : 'animate-bounce'
              }`}>
                <div className={`w-full h-full rounded-full ${
                  isDarkMode ? 'bg-purple-400/40' : 'bg-yellow-400/40'
                }`}></div>
              </div>
              
              {/* Icon with Enhanced Animation */}
              <span className={`flex items-center justify-center h-full w-full text-xs relative z-10 transition-all duration-500 transform ${
                isDarkMode ? 'scale-110 rotate-12 text-slate-200' : 'scale-100 rotate-0 text-slate-600'
              }`}>
                <span className={`transition-all duration-300 filter ${
                  isDarkMode ? 'drop-shadow-md animate-pulse' : 'drop-shadow-sm animate-bounce'
                }`}>
                  {isDarkMode ? '🌙' : '☀️'}
                </span>
              </span>
            </span>
            
            {/* Enhanced Trailing Effect */}
            <div className={`absolute top-1 h-6 w-6 rounded-full transition-all duration-1000 opacity-40 ${
              isDarkMode 
                ? 'left-1 bg-gradient-to-r from-purple-400/30 to-indigo-400/20 animate-ping' 
                : 'right-1 bg-gradient-to-r from-yellow-400/30 to-orange-400/20 animate-pulse'
            }`}></div>

            {/* Moving Light Effect */}
            <div className={`absolute inset-0 rounded-full overflow-hidden ${
              isDarkMode ? 'opacity-60' : 'opacity-40'
            }`}>
              <div className={`absolute w-full h-full transition-all duration-2000 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-transparent via-purple-300/20 to-transparent animate-pulse'
                  : 'bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent'
              }`} 
              style={{
                transform: isDarkMode ? 'translateX(-100%)' : 'translateX(100%)',
                animation: isDarkMode ? 'slideRight 3s ease-in-out infinite' : 'slideLeft 3s ease-in-out infinite'
              }}></div>
            </div>
          </button>
        </div>

        {/* Animated Dark Label */}
        <div className="relative">
          <span className={`text-sm font-medium transition-all duration-500 transform ${
            isDarkMode 
              ? 'text-slate-300 scale-105 opacity-100 font-semibold' 
              : 'text-slate-500 scale-95 opacity-70'
          }`}>
            🌙 Dark
          </span>
          {isDarkMode && (
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-md animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
