import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SeriesTVPC = dynamic(() => import('../components/series-tv/SeriesTVPC'), { ssr: false });
const SeriesTVMobile = dynamic(() => import('../components/series-tv/SeriesTVMobile'), { ssr: false });
const SeriesTVTV = dynamic(() => import('../components/series-tv/SeriesTVTV'), { ssr: false });

export default function SeriesTVPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | 'tv' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else setDevice('pc');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!device) return <div className="bg-black min-h-screen" />;

  if (device === 'mobile') return <SeriesTVMobile />;
  return <SeriesTVPC />;
}
