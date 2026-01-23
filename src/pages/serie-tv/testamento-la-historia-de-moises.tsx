import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TestamentoLaHistoriaDeMoisesPC = dynamic(() => import('../../components/series-tv/testamento-la-historia-de-moises/TestamentoLaHistoriaDeMoisesPC'), { ssr: false });
const TestamentoLaHistoriaDeMoisesMobile = dynamic(() => import('../../components/series-tv/testamento-la-historia-de-moises/TestamentoLaHistoriaDeMoisesMobile'), { ssr: false });

const TestamentoLaHistoriaDeMoisesPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <TestamentoLaHistoriaDeMoisesMobile /> : <TestamentoLaHistoriaDeMoisesPC />;
};

export default TestamentoLaHistoriaDeMoisesPage;
