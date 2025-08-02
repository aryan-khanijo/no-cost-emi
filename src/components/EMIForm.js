import React from 'react';

const EMIForm = ({ formData, handleChange, handleSubmit, isDarkMode }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-8 w-full mb-8 transition-all duration-300`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Price Input */}
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

        {/* Interest Rate Input */}
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

        {/* Number of Installments Input */}
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

        {/* Processing Fee Input */}
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

        {/* No Cost EMI Toggle */}
        <div 
          onClick={() => handleChange({ 
            target: { 
              name: 'nocostemi', 
              type: 'checkbox', 
              checked: !formData.nocostemi 
            } 
          })}
          className={`col-span-1 md:col-span-2 flex items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
            formData.nocostemi
              ? (isDarkMode
                  ? 'bg-gradient-to-r from-cyan-600/80 to-blue-600/80 border-cyan-400 shadow-lg shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-cyan-400/80 to-blue-400/80 border-cyan-500 shadow-lg shadow-cyan-400/25')
              : (isDarkMode
                  ? 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-slate-600 hover:border-cyan-600'
                  : 'bg-gradient-to-r from-slate-100/50 to-slate-200/50 border-slate-300 hover:border-cyan-400')
          }`}
        >
          <div className="flex items-center justify-center">
            {/* Label */}
            <span className={`font-semibold text-lg transition-all duration-300 ${
              formData.nocostemi
                ? 'text-white'
                : (isDarkMode ? 'text-slate-300' : 'text-slate-700')
            }`}>
              🎯 No Cost EMI Option
            </span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
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
  );
};

export default EMIForm;
