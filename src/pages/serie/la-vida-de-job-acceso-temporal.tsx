import React, { useState, useEffect } from 'react';
// IMPORTACIONES SINCRONIZADAS CON TUS IMÁGENES
import LaVidaDeJobPC from '../../components/series/LaVidaDeJobAccesoTemporal/LaVidaDeJobAccesoTemporalPc';
import LaVidaDeJobMobile from '../../components/series/LaVidaDeJobAccesoTemporal/LaVidaDeJobAccesoTemporalMobile';

const LaVidaDeJobPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Función para detectar el ancho de pantalla
    const checkDevice = () => {
      // Se mantiene el estándar de 1024px para separar Mobile/Tablet de PC
      setIsMobile(window.innerWidth < 1024);
    };

    // Ejecución inicial
    checkDevice();

    // Listener para cambios de tamaño de ventana
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Evita el error de hidratación renderizando un fondo negro mientras detecta el dispositivo
  if (isMobile === null) {
    return <div className="bg-black min-h-screen" />;
  }

  return isMobile ? <LaVidaDeJobMobile /> : <LaVidaDeJobPC />;
};

export default LaVidaDeJobPage;
