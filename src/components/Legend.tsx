import React from 'react';

export const Legend: React.FC = () => {
  return (
    <div className="bg-gray-800/50 p-3 rounded-lg shadow-lg mb-6 max-w-xs mx-auto">
      <div className="text-sm text-gray-400 mb-2 text-center">Price Change</div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-300">Positive</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-300">Negative</span>
        </div>
      </div>
    </div>
  );
};