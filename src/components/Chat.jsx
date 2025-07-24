import React from 'react';
import Messages from './Messages';

export default function Chat() {
  return (
    <>
      {/* lime-bar sentinel remains as before */}
      <div style={{
        position: 'fixed',
        inset: 0,
        height: '6px',
        background: 'lime',
        zIndex: 1000
      }} />
      <div style={{display:'flex',flexDirection:'column',flex:1}}>
        <div style={{background:'#ffa',padding:8}}>CHAT BODY</div>
        <Messages />
      </div>
    </>
  );
} 