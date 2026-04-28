import React, { createContext, useContext, useEffect, useState } from 'react';
import { TelegramWebApp, TelegramUser } from '../types';

interface TelegramContextType {
  tg: TelegramWebApp | null;
  user: TelegramUser | null;
  isTMA: boolean;
  onClose: () => void;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isTMA, setIsTMA] = useState(() => {
    return !!(
      window.Telegram?.WebApp?.initData || 
      window.location.search.includes('tgWebApp') ||
      window.location.hash.includes('tgWebApp')
    );
  });

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      webApp.ready();
      webApp.expand();
      setTg(webApp);
      setUser(webApp.initDataUnsafe?.user || null);
      setIsTMA(true);
    }
  }, []);

  const onClose = () => {
    tg?.close();
  };

  return (
    <TelegramContext.Provider value={{ tg, user, isTMA, onClose }}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
}
