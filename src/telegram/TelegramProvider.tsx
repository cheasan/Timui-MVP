import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
}

interface TelegramContextType {
  user: TelegramUser | null;
  theme: 'light' | 'dark';
  initDataRaw: string | null;
  isReady: boolean;
}

const TelegramContext = createContext<TelegramContextType | null>(null);

interface TelegramProviderProps {
  children: ReactNode;
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [initDataRaw, setInitDataRaw] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initTelegram = () => {
      const tg = (window as any).Telegram.WebApp;

      if (!tg) {
        console.warn('Telegram WebApp not found. Running in standalone mode.');
        setIsReady(true);
        return;
      }

      tg.ready();
      tg.expand();

      const tgTheme = tg.colorScheme || 'light';
      setTheme(tgTheme);

      const initData = tg.initData || null;
      setInitDataRaw(initData);

      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        setUser(tg.initDataUnsafe.user);
      }

      tg.onEvent('themeChanged', () => {
        setTheme(tg.colorScheme || 'light');
      });

      setIsReady(true);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTelegram);
    } else {
      initTelegram();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', initTelegram);
    };
  }, []);

  return (
    <TelegramContext.Provider value={{ user, theme, initDataRaw, isReady }}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within TelegramProvider');
  }
  return context;
}
