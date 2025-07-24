import { useEffect, useState } from 'react';
import { UserProvider } from '../context/UserContext';

export default function WebAppGuard({ children }) {
  const [ready, setReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const [debug, setDebug] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      setReady(true);
      setUserData(null);
      setDebug({ error: 'window.Telegram.WebApp не найден', tg: window.Telegram });
      return;
    }
    tg.ready();
    const initData = tg.initData || '';
    const initDataUnsafe = tg.initDataUnsafe || {};
    const chat_id = initDataUnsafe?.user?.id || null;
    setUserData({ initData, chat_id, user: initDataUnsafe.user || null });
    setDebug({ initData, initDataUnsafe, chat_id, user: initDataUnsafe.user });
    setReady(true);
  }, []);

  if (!ready) return <div className="loading">Telegram WebApp подключается…</div>;
  if (!userData || !userData.chat_id) return (
    <div className="error">
      Откройте приложение через Telegram-бота
      <pre style={{textAlign:'left',fontSize:12,background:'#eee',padding:8,marginTop:12,overflowX:'auto'}}>
        {JSON.stringify(debug, null, 2)}
      </pre>
    </div>
  );

  return <UserProvider value={userData}>{children}</UserProvider>;
} 