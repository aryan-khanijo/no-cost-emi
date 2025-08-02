import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'error', isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles = 'fixed top-4 right-4 max-w-md w-full bg-white border-l-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-50';
    
    switch (type) {
      case 'error':
        return `${baseStyles} border-red-500`;
      case 'success':
        return `${baseStyles} border-green-500`;
      case 'warning':
        return `${baseStyles} border-yellow-500`;
      case 'info':
        return `${baseStyles} border-blue-500`;
      default:
        return `${baseStyles} border-gray-500`;
    }
  };

  const getIconAndColors = () => {
    switch (type) {
      case 'error':
        return {
          icon: '❌',
          titleColor: 'text-red-800',
          textColor: 'text-red-600',
          bgColor: 'bg-red-50'
        };
      case 'success':
        return {
          icon: '✅',
          titleColor: 'text-green-800',
          textColor: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      case 'warning':
        return {
          icon: '⚠️',
          titleColor: 'text-yellow-800',
          textColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50'
        };
      case 'info':
        return {
          icon: 'ℹ️',
          titleColor: 'text-blue-800',
          textColor: 'text-blue-600',
          bgColor: 'bg-blue-50'
        };
      default:
        return {
          icon: '📢',
          titleColor: 'text-gray-800',
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-50'
        };
    }
  };

  const { icon, titleColor, textColor, bgColor } = getIconAndColors();

  return (
    <div className={getToastStyles()}>
      <div className={`p-4 ${bgColor} rounded-lg`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-xl">{icon}</span>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-medium ${titleColor}`}>
              {type === 'error' ? 'PDF Export Error' : 
               type === 'success' ? 'Success' :
               type === 'warning' ? 'Warning' : 'Information'}
            </p>
            <p className={`mt-1 text-sm ${textColor}`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`rounded-md inline-flex ${textColor} hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full ${
                type === 'error' ? 'bg-red-500' :
                type === 'success' ? 'bg-green-500' :
                type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
