import { useEffect, useState } from 'react';
import { UserProvider } from '../context/UserContext';

export default function WebAppGuard({ children }) {
  const [ready, setReady] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      setReady(true);
      setUserData(null);
      return;
    }
    tg.ready();
    const initData = tg.initData || '';
    const initDataUnsafe = tg.initDataUnsafe || {};
    const chat_id = initDataUnsafe?.user?.id || null;
    setUserData({ initData, chat_id, user: initDataUnsafe.user || null });
    setReady(true);
  }, []);

  if (!ready) return <div className="loading">Telegram WebApp подключается…</div>;
  if (!userData || !userData.chat_id) return <div className="error">Откройте приложение через Telegram-бота</div>;

  return <UserProvider value={userData}>{children}</UserProvider>;
} 