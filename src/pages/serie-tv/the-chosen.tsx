import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importación dinámica para optimizar la carga según el dispositivo
const TheChosenPC = dynamic(() => import('../../../components/series-tv/the-chosen/TheChosenPC'));
const TheChosenMobile = dynamic(() => import('../../../components/series-tv/the-chosen/TheChosenMobile'));
const TheChosenTV = dynamic(() => import('../../../components/series-tv/the-chosen/TheChosenTV'));

const TheChosenPage = () => {
  const [view, setView] = useState<'pc' | 'mobile' | 'tv' | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
    const isTV = /smart-tv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos|viera|roku|tizen/g.test(userAgent);

    if (isTV) {
      setView('tv');
    } else if (isMobile) {
      setView('mobile');
    } else {
      setView('pc');
    }
  }, []);

  if (!view) return <div className="bg-black min-h-screen" />;

  return (
    <>
      {view === 'pc' && <TheChosenPC />}
      {view === 'mobile' && <TheChosenMobile />}
      {view === 'tv' && <TheChosenTV />}
    </>
  );
};

export default TheChosenPage;
