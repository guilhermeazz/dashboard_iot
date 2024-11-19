import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dados from '../pages/dados';
import Graficos from '../pages/graficos';
import Geral from '../pages/geral';
import Historico from '../pages/historico';
import Thresholds from '../pages/thresholds';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dados />} />
      <Route path="/graficos" element={<Graficos />} />
      <Route path="/geral" element={<Geral />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/thresholds" element={<Thresholds />} />
    </Routes>
  );
};

export default AppRoutes;
