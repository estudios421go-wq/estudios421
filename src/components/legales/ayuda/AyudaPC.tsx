import React, { useEffect } from 'react';
import Head from 'next/head';
import { IoShieldCheckmarkOutline, IoChatbubbleEllipsesOutline, IoWarningOutline } from 'react-icons/io5';

const AyudaPC = () => {
  // Inicialización del SDK de Facebook para que cargue el chat/comentarios
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans">
      <Head>
        <title>Centro de Ayuda — Estudios 421</title>
        {/* Script necesario para que Facebook funcione */}
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v18.0"></script>
      </Head>

      <main className="max-w-6xl mx-auto pt-24 pb-20 px-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-1 bg-[#F09800]" />
          <h1 className="text-white text-4xl font-black uppercase italic">Centro de Ayuda</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LADO IZQUIERDO: NORMAS */}
          <div className="space-y-8">
            <section className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h2 className="text-[#F09800] font-bold flex items-center gap-2 mb-4 uppercase text-sm tracking-widest">
                <IoShieldCheckmarkOutline /> Normas de la Comunidad
              </h2>
              <ul className="text-xs space-y-4 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-[#F09800] font-bold">01.</span>
                  <p>Respeto mutuo: Queda prohibido cualquier insulto o discurso de odio.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#F09800] font-bold">02.</span>
                  <p>No Spam: Enlaces externos o publicidad no autorizada serán eliminados inmediatamente.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#F09800] font-bold">03.</span>
                  <p>Privacidad: No compartas datos personales propios o de terceros en el chat.</p>
                </li>
              </ul>
            </section>

            <div className="p-6 bg-amber-900/10 border border-amber-900/20 rounded-2xl">
              <h3 className="text-white text-xs font-bold flex items-center gap-2 mb-2 uppercase">
                <IoWarningOutline className="text-[#F09800]" /> Sistema de Moderación
              </h3>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Estudios 421 utiliza moderación activa vía Facebook. El administrador tiene la facultad de bloquear cuentas que incumplan estas normas.
              </p>
            </div>
          </div>

          {/* LADO DERECHO: CHAT / COMENTARIOS PROFESIONAL */}
          <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden min-h-[500px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="bg-[#F09800] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <IoChatbubbleEllipsesOutline className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Canal de Soporte Directo</p>
                  <p className="text-white/70 text-[10px] uppercase font-medium">Moderado por Estudios 421</p>
                </div>
              </div>
            </div>

            {/* AQUÍ SE RENDERIZA EL PLUGIN DE FACEBOOK */}
            <div className="p-4 bg-white">
              <div 
                className="fb-comments" 
                data-href="https://estudios421.com/ayuda" 
                data-width="100%" 
                data-numposts="10" 
                data-colorscheme="light">
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AyudaPC;
