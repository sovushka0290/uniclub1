import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { MiniApp } from './components/MiniApp';
import { useTelegram } from './hooks/useTelegram';
import { Smartphone } from 'lucide-react';

const TMAGuard = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default function App() {
  const { isTMA } = useTelegram();

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage />} 
          />
          <Route 
            path="/app" 
            element={
              <TMAGuard>
                <MiniApp />
              </TMAGuard>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
