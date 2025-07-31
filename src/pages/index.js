import React, { useState } from "react";
import axios from "axios";
import EmiResult from "@/components/emiresult";
import "@/styles/globals.css";

const EmiCalculator = () => {
  const [formData, setFormData] = useState({
    price: 55899,
    roi: 14,
    numoi: 12,
    nocostemi: true,
    fee: 199,
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/emicalc", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch EMI data.");
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen py-8 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      <div className="w-full container mx-auto p-6">
        {/* Theme Toggle Slider */}
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

        <h1 className={`text-4xl font-bold text-center mb-8 bg-gradient-to-r bg-clip-text text-transparent ${
          isDarkMode
            ? 'from-purple-400 to-cyan-400'
            : 'from-indigo-600 to-purple-600'
        }`}>
          💰 EMI Calculator
        </h1>
        <form
          onSubmit={handleSubmit}
          className={`shadow-xl rounded-2xl p-8 w-full border mb-8 backdrop-blur-sm transition-all duration-300 ${
            isDarkMode
              ? 'bg-slate-800/90 border-slate-600/50'
              : 'bg-white/80 border-white/20'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className={`block font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                💸 Price:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-4 transition-all duration-200 focus:ring-4 ${
                  isDarkMode
                    ? 'border-indigo-600 focus:border-indigo-400 text-white bg-slate-700 focus:bg-slate-700 focus:ring-indigo-500/30 placeholder-slate-400'
                    : 'border-indigo-200 focus:border-indigo-500 text-slate-900 bg-white focus:bg-white focus:ring-indigo-100 placeholder-slate-500'
                }`}
                placeholder="Enter product price"
              />
            </div>
            <div className="space-y-2">
              <label className={`block font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                📈 Interest Rate (%):
              </label>
              <input
                type="number"
                name="roi"
                value={formData.roi}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-4 transition-all duration-200 focus:ring-4 ${
                  isDarkMode
                    ? 'border-emerald-600 focus:border-emerald-400 text-white bg-slate-700 focus:bg-slate-700 focus:ring-emerald-500/30 placeholder-slate-400'
                    : 'border-emerald-200 focus:border-emerald-500 text-slate-900 bg-white focus:bg-white focus:ring-emerald-100 placeholder-slate-500'
                }`}
                placeholder="Annual interest rate"
              />
            </div>
            <div className="space-y-2">
              <label className={`block font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                📅 Number of Installments:
              </label>
              <input
                type="number"
                name="numoi"
                value={formData.numoi}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-4 transition-all duration-200 focus:ring-4 ${
                  isDarkMode
                    ? 'border-purple-600 focus:border-purple-400 text-white bg-slate-700 focus:bg-slate-700 focus:ring-purple-500/30 placeholder-slate-400'
                    : 'border-purple-200 focus:border-purple-500 text-slate-900 bg-white focus:bg-white focus:ring-purple-100 placeholder-slate-500'
                }`}
                placeholder="Number of months"
              />
            </div>
            <div className="space-y-2">
              <label className={`block font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                💳 Processing Fee:
              </label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl p-4 transition-all duration-200 focus:ring-4 ${
                  isDarkMode
                    ? 'border-amber-600 focus:border-amber-400 text-white bg-slate-700 focus:bg-slate-700 focus:ring-amber-500/30 placeholder-slate-400'
                    : 'border-amber-200 focus:border-amber-500 text-slate-900 bg-white focus:bg-white focus:ring-amber-100 placeholder-slate-500'
                }`}
                placeholder="Processing fee amount"
              />
            </div>
            <div className={`col-span-1 md:col-span-2 flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-cyan-600'
                : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200'
            }`}>
              <input
                type="checkbox"
                name="nocostemi"
                checked={formData.nocostemi}
                onChange={handleChange}
                className={`mr-3 w-5 h-5 rounded focus:ring-4 ${
                  isDarkMode
                    ? 'text-cyan-400 border-2 border-cyan-500 focus:ring-cyan-400/30 bg-slate-700'
                    : 'text-cyan-600 border-2 border-cyan-300 focus:ring-cyan-500'
                }`}
              />
              <label className={`font-semibold text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                🎯 No Cost EMI Option
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0 focus:ring-4 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white focus:ring-purple-400/30'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white focus:ring-indigo-300'
            }`}
          >
            🧮 Calculate EMI
          </button>
        </form>

        {error && (
          <div className={`border-l-4 p-4 rounded-lg mb-6 transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-red-900/50 to-rose-900/50 border-red-500'
              : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-400'
          }`}>
            <div className={`font-semibold text-center ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
              ⚠️ {error}
            </div>
          </div>
        )}

        {response && <EmiResult data={response} isDarkMode={isDarkMode} />}
      </div>
    </div>
  );
};

export default EmiCalculator;
