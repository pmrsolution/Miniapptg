import React from 'react';

export default function Sidebar() {
  console.log('[Sidebar] render');
  return (
    <>
      <div className="debug-sidebar" style={{position:'fixed',top:0,left:0,width:3,height:'20vh',background:'blue',zIndex:9999}}/>
      <div style={{padding:16}}>Sidebar alive</div>
    </>
  );
} 