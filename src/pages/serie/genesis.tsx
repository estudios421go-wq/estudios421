import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const GenesisPC = dynamic(() => import('../../components/series/genesis/GenesisPC'));
const GenesisMobile = dynamic(() => import('../../components/series/genesis/GenesisMobile'));

const GenesisPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <GenesisMobile /> : <GenesisPC />;
};

export default GenesisPage;
