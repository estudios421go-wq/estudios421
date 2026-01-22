import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MilagrosPC = dynamic(() => import('../../components/series/los-milagros-de-jesus/LosMilagrosDeJesusPC'), { ssr: false });
const MilagrosMobile = dynamic(() => import('../../components/series/los-milagros-de-jesus/LosMilagrosDeJesusMobile'), { ssr: false });
const MilagrosTV = dynamic(() => import('../../components/series/los-milagros-de-jesus/LosMilagrosDeJesusTV'), { ssr: false });

const MilagrosDeJesusPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  if (isMobile === null) return <div className="bg-black min-h-screen" />;
  return isMobile ? <MilagrosMobile /> : <MilagrosPC />;
};
export default MilagrosDeJesusPage;
