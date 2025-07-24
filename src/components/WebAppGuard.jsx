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
    platform: tg?.platform,
    env: {
      botUrl: window.location.href,
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
    <div style={{position:'fixed',top:10,left:10,zIndex:99999,maxWidth:600,background:'#fff',padding:16,border:'3px solid #c00',fontSize:16,color:'#222',boxShadow:'0 4px 24px #0002'}}>
      <div style={{fontWeight:'bold',color:'#c00',fontSize:20,marginBottom:8}}>❗ Нет пользователя Telegram (user == null)</div>
      <div style={{marginBottom:8}}>Откройте приложение через Telegram-бота.<br/>Если вы уже в Telegram, пришлите этот скриншот разработчику.</div>
      <div style={{fontSize:14,marginBottom:8}}><b>platform:</b> {debug?.platform || '—'}</div>
      <div style={{fontSize:14,marginBottom:8}}><b>userAgent:</b> {debug?.env?.userAgent || '—'}</div>
      <div style={{fontSize:14,marginBottom:8}}><b>origin:</b> {debug?.env?.origin || '—'}</div>
      <div style={{fontSize:14,marginBottom:8}}><b>botUrl:</b> {debug?.env?.botUrl || '—'}</div>
      <div style={{fontSize:14,marginBottom:8}}><b>auth_date:</b> {debug?.auth_date || '—'} <b>expired:</b> {String(debug?.expired)}</div>
      <div style={{fontSize:14,marginBottom:8}}><b>hash:</b> {debug?.hash || '—'}</div>
      <div style={{fontSize:14,marginBottom:8}}><b>rawInitData:</b> <span style={{wordBreak:'break-all'}}>{debug?.rawInitData || '—'}</span></div>
      <div style={{fontSize:14,marginBottom:8}}><b>initDataUnsafe:</b> <pre style={{fontSize:12,background:'#eee',padding:8,overflowX:'auto',maxHeight:200}}>{JSON.stringify(debug?.initDataUnsafe, null, 2)}</pre></div>
      <div style={{fontSize:14,marginBottom:8}}><b>user:</b> <pre style={{fontSize:12,background:'#eee',padding:8,overflowX:'auto',maxHeight:200}}>{JSON.stringify(debug?.user, null, 2)}</pre></div>
    </div>
  );

  return <UserProvider value={userData}>{children}</UserProvider>;
} 