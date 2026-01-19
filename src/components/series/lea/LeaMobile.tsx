import React, { useState } from 'react';

const LeaMobile = () => {
  const [testVideo, setTestVideo] = useState<string | null>(null);

  // Usamos el primer episodio para la prueba técnica
  const videoUrl = "https://ok.ru/videoembed/14199373957632";

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      {!testVideo ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>MODO PRUEBA: MÓVIL</h2>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '30px' }}>
            Esta es una plantilla básica para testear la Pantalla Completa.
          </p>
          <button 
            onClick={() => setTestVideo(videoUrl)}
            style={{ backgroundColor: '#F09800', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '5px', fontWeight: 'bold', fontSize: '14px' }}
          >
            REPRODUCIR TEST
          </button>
        </div>
      ) : (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          {/* Cabecera mínima para cerrar */}
          <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px', borderBottom: '1px solid #333' }}>
            <button 
              onClick={() => setTestVideo(null)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '30px' }}
            >
              &times;
            </button>
          </div>

          {/* El Iframe en su estado más puro posible */}
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe 
              src={testVideo + "?autoplay=1"} 
              style={{ width: '100%', aspectVideo: '16/9', border: 'none' }}
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
