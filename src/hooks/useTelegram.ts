import { useEffect, useState } from 'react';
import { TelegramWebApp, TelegramUser } from '../types';

export function useTelegram() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      webApp.expand();
      setTg(webApp);
      setUser(webApp.initDataUnsafe?.user || null);
    }
  }, []);

  const onClose = () => {
    tg?.close();
  };

  return {
    tg,
    user,
    onClose,
    isTMA: !!window.Telegram?.WebApp?.initData,
  };
}
