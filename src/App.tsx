// FILE: src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RFactor from './pages/RFactor';
import Risk from './pages/Risk';
import Options from './pages/Options';
import Settings from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="r-factor" element={<RFactor />} />
          <Route path="risk" element={<Risk />} />
          <Route path="options" element={<Options />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
