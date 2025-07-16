import { useEffect, useState } from 'react';
export default function WebAppGuard({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return setReady(true);
    tg.ready();
    setReady(true);
  }, []);

  return ready ? children : <div className="loading">Telegram WebApp подключается…</div>;
} 