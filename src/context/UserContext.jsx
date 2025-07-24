import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ value, children }) {
  let caught = false;
  try {
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  } catch (err) {
    console.error('[CRASH sniffer][UserProvider]', err);
    if (!caught) {
      caught = true;
      document.body.innerHTML = `<pre style='font-size:14px;white-space:pre-wrap;color:red'>[UserProvider crash]:\n${err && err.stack ? err.stack : err}</pre>`;
    }
    throw err;
  }
}

export function useUser() {
  return useContext(UserContext);
} 