import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReyDavidPC = dynamic(() => import('../../components/series/rey-david/ReyDavidPC'), { ssr: false });
const ReyDavidMobile = dynamic(() => import('../../components/series/rey-david/ReyDavidMobile'), { ssr: false });
const ReyDavidTV = dynamic(() => import('../../components/series/rey-david/ReyDavidTV'), { ssr: false });

const ReyDavidPage = () => {
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

  return isMobile ? <ReyDavidMobile /> : <ReyDavidPC />;
};

export default ReyDavidPage;
