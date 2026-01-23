import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PabloElApostolDeCristoPC = dynamic(() => import('../../components/peliculas/pablo-el-apostol-de-cristo/PabloElApostolDeCristoPC'), { ssr: false });
const PabloElApostolDeCristoMobile = dynamic(() => import('../../components/peliculas/pablo-el-apostol-de-cristo/PabloElApostolDeCristoMobile'), { ssr: false });

const PabloElApostolDeCristoPage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile === null) return <div className="bg-black min-h-screen" />;

  return isMobile ? <PabloElApostolDeCristoMobile /> : <PabloElApostolDeCristoPC />;
};

export default PabloElApostolDeCristoPage;
