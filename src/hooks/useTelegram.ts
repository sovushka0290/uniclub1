import { useEffect, useState } from 'react';
import { TelegramWebApp, TelegramUser } from '../types';

export function useTelegram() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isTMA, setIsTMA] = useState(false);

  useEffect(() => {
    const checkTMA = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.ready();
        webApp.expand();
        setTg(webApp);
        setUser(webApp.initDataUnsafe?.user || null);
        setIsTMA(true);
      }
    };

    checkTMA();
    // Fallback search param check
    if (window.location.search.includes('tgWebApp')) {
      setIsTMA(true);
    }
  }, []);

  const onClose = () => {
    tg?.close();
  };

  return {
    tg,
    user,
    onClose,
    isTMA,
  };
}
