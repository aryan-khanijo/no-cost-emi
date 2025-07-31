import React from 'react';

const PageTitle = ({ isDarkMode }) => {
  return (
    <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
      <span className="text-4xl">💰</span>
      <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
        isDarkMode
          ? 'from-purple-400 to-cyan-400'
          : 'from-indigo-600 to-purple-600'
      }`}>
        EMI Calculator
      </span>
    </h1>
  );
};

export default PageTitle;
