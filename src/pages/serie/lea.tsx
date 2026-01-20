import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LeaPC = dynamic(() => import('../../components/series/lea/LeaPC'));
const LeaMobile = dynamic(() => import('../../components/series/lea/LeaMobile'));

const LeaPage = () => {
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

  return isMobile ? <LeaMobile /> : <LeaPC />;
};

export default LeaPage;
