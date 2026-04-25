import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { MiniApp } from './components/MiniApp';
import { useTelegram } from './hooks/useTelegram';
import { Smartphone } from 'lucide-react';

const TMAGuard = ({ children }: { children: React.ReactNode }) => {
  const { isTMA } = useTelegram();
  
  if (!isTMA && process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-[2rem] flex items-center justify-center mb-8 text-indigo-600">
          <Smartphone size={40} />
        </div>
        <h1 className="text-3xl font-display font-black text-slate-900 mb-4 tracking-tighter">
          Открыть в Telegram
        </h1>
        <p className="text-slate-600 max-w-xs mx-auto mb-8 font-medium">
          Это приложение доступно только внутри Telegram. Пожалуйста, откройте бота нашей школы.
        </p>
        <a 
          href="https://t.me/uniclub_bot" 
          className="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100"
        >
          Перейти в Telegram
        </a>
      </div>
    );
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
