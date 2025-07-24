import { useEffect, useState } from 'react';
import { UserProvider } from '../context/UserContext';

function getDebugInfo() {
  const tg = window.Telegram?.WebApp;
  const d = tg?.initDataUnsafe || {};
  const authDate = d?.auth_date ? new Date(d.auth_date * 1000) : null;
  const now = new Date();
  const expired = authDate && (now - authDate > 2 * 60 * 1000); // 2 минуты TTL
  const debug = {
    isUserPresent: Boolean(d.user),
    rawInitData: tg?.initData,
    initDataUnsafe: d,
    user: d.user,
    auth_date: d.auth_date,
    hash: d.hash,
    expired,
    now: now.toISOString(),
    authDate: authDate?.toISOString(),
    env: {
      botUrl: location.href,
      origin: document.referrer,
      userAgent: navigator.userAgent
    }
  };
  window.TOTAL_INIT_DEBUG = debug;
  return debug;
}

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
    setDebug(getDebugInfo());
    setReady(true);
  }, []);

  if (!ready) return <div className="loading">Telegram WebApp подключается…</div>;
  if (!userData || !userData.chat_id) return (
    <div className="error">
      <div>Откройте приложение через Telegram-бота</div>
      {debug?.expired && <div style={{color:'red',margin:'8px 0'}}>Сессия устарела, <b>обновите страницу</b>!</div>}
      <pre style={{textAlign:'left',fontSize:12,background:'#eee',padding:8,marginTop:12,overflowX:'auto'}}>
        {JSON.stringify(debug, null, 2)}
      </pre>
    </div>
  );

  return <UserProvider value={userData}>{children}</UserProvider>;
} 