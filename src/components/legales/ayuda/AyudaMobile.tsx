import React, { useEffect } from 'react';
import Head from 'next/head';
import { IoShieldCheckmarkOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

const AyudaMobile = () => {
  useEffect(() => {
    if (window.FB) window.FB.XFBML.parse();
  }, []);

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans pb-10">
      <Head>
        <title>Soporte — Móvil</title>
        <script async defer src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v18.0"></script>
      </Head>

      <main className="px-6 pt-20">
        <h1 className="text-white text-3xl font-black uppercase mb-6 italic">Ayuda</h1>

        {/* NORMAS RESUMIDAS */}
        <div className="bg-zinc-900/80 p-5 rounded-2xl border border-white/5 mb-8">
          <h2 className="text-[#F09800] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <IoShieldCheckmarkOutline /> Normas de Chat
          </h2>
          <p className="text-[11px] text-gray-400 leading-relaxed italic">
            Prohibido el spam, insultos o enlaces externos. Todo comentario es moderado vía Facebook para garantizar un ambiente sano.
          </p>
        </div>

        {/* CONTENEDOR DE CHAT MÓVIL */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-[#F09800] p-4 flex items-center gap-3">
            <IoChatbubbleEllipsesOutline className="text-white text-2xl" />
            <span className="text-white font-bold text-sm">Chat de Soporte</span>
          </div>
          
          <div className="p-2 min-h-[400px]">
            <div 
              className="fb-comments" 
              data-href="https://estudios421.com/ayuda" 
              data-width="100%" 
              data-numposts="5" 
              data-colorscheme="light">
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AyudaMobile;
