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
  console.log('[Guard] render start');
  return <>{children}</>;
} 