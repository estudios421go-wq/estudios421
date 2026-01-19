import React, { useState } from 'react';

const LeaMobile = () => {
  const [play, setPlay] = useState(false);
  const videoUrl = "https://ok.ru/videoembed/14199373957632";

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      {!play ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px' }}>TEST MÓVIL</h2>
          <button 
            onClick={() => setPlay(true)}
            style={{ backgroundColor: '#F09800', color: '#000', border: 'none', padding: '15px 30px', borderRadius: '5px', fontWeight: 'bold', marginTop: '20px' }}
          >
            PROBAR PANTALLA COMPLETA
          </button>
        </div>
      ) : (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999 }}>
          <button 
            onClick={() => setPlay(false)}
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10000, background: '#333', color: '#fff', border: 'none', padding: '10px' }}
          >
            CERRAR X
          </button>
          <iframe 
            src={videoUrl + "?autoplay=1"} 
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default LeaMobile;
