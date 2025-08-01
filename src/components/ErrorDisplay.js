import React from 'react';

const ErrorDisplay = ({ error, isDarkMode }) => {
  if (!error) return null;

  return (
    <div className={`border-l-4 p-4 rounded-lg mb-6 transition-all duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-r from-red-900/50 to-rose-900/50 border-red-500'
        : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-400'
    }`}>
      <div className={`font-semibold text-center ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
        ⚠️ {error}
      </div>
    </div>
  );
};

export default ErrorDisplay;
