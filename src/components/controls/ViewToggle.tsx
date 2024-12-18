import React from 'react';

interface Props {
  showGraph: boolean;
  onToggle: () => void;
}

export const ViewToggle: React.FC<Props> = ({ showGraph, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
    >
      {showGraph ? 'Show Bubbles' : 'Show Graph'}
    </button>
  );
};