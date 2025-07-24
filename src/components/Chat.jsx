import React from 'react';

export default function Chat() {
  return (
    <>
      <div style={{position:'fixed',top:0,left:0,right:0,background:'#faa',height:'20vh',zIndex:1000}}>TEST BAR</div>
      <div style={{display:'flex',flexDirection:'column',flex:1,minHeight:'100vh',background:'#efe',padding:16}}>
        {/* real content would go here */}
      </div>
    </>
  );
} 