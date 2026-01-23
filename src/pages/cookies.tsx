import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PC = dynamic(() => import('../components/legales/cookies/CookiesPC'), { ssr: false });
const Mobile = dynamic(() => import('../components/legales/cookies/CookiesMobile'), { ssr: false });

export default function CookiesPage() {
  const [device, setDevice] = useState<'mobile' | 'pc' | null>(null);
  useEffect(() => { setDevice(window.innerWidth < 768 ? 'mobile' : 'pc'); }, []);

  if (!device) return <div className="bg-black min-h-screen" />;
  return device === 'mobile' ? <Mobile /> : <PC />;
}
