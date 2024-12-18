import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NetworkGraph } from '../components/visualizations/NetworkGraph';
import { RadialChart } from '../components/visualizations/RadialChart';
import { CryptoData, TimeRange } from '../types';

interface AppRoutesProps {
  data: CryptoData[];
  timeRange: TimeRange;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ data, timeRange }) => (
  <Routes>
    <Route path="/" element={<Navigate to="/network" replace />} />
    <Route path="/network" element={<NetworkGraph data={data} timeRange={timeRange} />} />
    <Route path="/radial" element={<RadialChart data={data} timeRange={timeRange} />} />
  </Routes>
);