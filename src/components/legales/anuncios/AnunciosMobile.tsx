import React from 'react';
import Head from 'next/head';
import { IoMegaphoneOutline, IoHeartOutline } from 'react-icons/io5';

const AnunciosMobile = () => {
  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans">
      <Head><title>Anuncios — Móvil</title></Head>
      
      <main className="px-6 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <IoMegaphoneOutline className="text-[#F09800] text-3xl" />
          <h1 className="text-white text-2xl font-black uppercase tracking-tight">Publicidad</h1>
        </div>

        <p className="text-sm leading-relaxed mb-8">
          Estudios 421 es un proyecto comunitario. Para mantenernos en línea sin cuotas de suscripción, aplicamos la siguiente política:
        </p>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5 mb-8">
          <h2 className="text-[#F09800] font-bold text-lg mb-3 flex items-center gap-2">
            <IoHeartOutline /> Sostenibilidad
          </h2>
          <p className="text-xs leading-relaxed text-gray-400">
            Los anuncios aparecen <span className="text-white font-bold italic text-[11px]">únicamente</span> cuando las donaciones del mes no alcanzan para cubrir el costo del servidor.
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-widest text-[10px]">Transparencia</h3>
            <p className="text-xs leading-relaxed">
              Si ves publicidad, es porque el fondo de emergencia está activo. En cuanto se logre la meta mediante donaciones, la publicidad se retira para todos.
            </p>
          </section>

          <section className="pt-6 border-t border-white/5">
            <button className="w-full bg-[#F09800] text-white font-bold py-3 rounded-lg text-sm shadow-lg active:scale-95 transition-transform">
              Apoyar el Proyecto
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AnunciosMobile;
