import React, { useState } from 'react';

const LeaMobile = () => {
  const [play, setPlay] = useState(false);
  const videoUrl = "https://ok.ru/videoembed/14199373957632";

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      {!play ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>PRUEBA TÉCNICA #2</h2>
          <p style={{ fontSize: '12px', color: '#888', margin: '15px 0' }}>Validando confianza de Chrome</p>
          <button 
            onClick={() => setPlay(true)}
            style={{ backgroundColor: '#F09800', color: '#000', border: 'none', padding: '15px 30px', borderRadius: '5px', fontWeight: 'bold' }}
          >
            REPRODUCIR Y PROBAR FULLSCREEN
          </button>
        </div>
      ) : (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px' }}>
            <button 
              onClick={() => setPlay(false)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '30px' }}
            >
              &times;
            </button>
          </div>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <iframe 
              src={videoUrl + "?autoplay=1"} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaMobile;
