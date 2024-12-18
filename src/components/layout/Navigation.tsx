import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-center space-x-8">
      <Link to="/" className="hover:text-blue-400">Honeycomb</Link>
      <Link to="/network" className="hover:text-blue-400">Network</Link>
      <Link to="/radial" className="hover:text-blue-400">Radial</Link>
    </div>
  </nav>
);