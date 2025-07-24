import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
// import { bootstrapTheme } from './theme';
// bootstrapTheme();

console.log(`⭐️ WebApp reached: ${Date.now()}`);
console.log(`TG env: ${window.Telegram?.WebApp?.platform || 'none'}`);
console.log(`User-Agent: ${navigator.userAgent}`);

const debugDiv = document.createElement('div');
debugDiv.innerHTML = '<div style="position:fixed;top:10px;left:10px;z-index:9999;background:#fff;padding:8px;border:2px solid #333;font-size:16px;">👋 JS loaded!<br/>TG env: ' + (window.Telegram?.WebApp?.platform || 'none') + '<br/>User-Agent: ' + navigator.userAgent + '</div>';
document.body.appendChild(debugDiv);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals(); 