import React from 'react';
import Head from 'next/head';
import { IoQrCodeOutline, IoLogoFacebook } from 'react-icons/io5';

const AyudaTV = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-20 font-sans">
      <Head><title>Ayuda — Smart TV</title></Head>
      
      <div className="max-w-6xl w-full grid grid-cols-2 gap-20 items-center">
        {/* INFORMACIÓN */}
        <div>
          <h1 className="text-white text-6xl font-black uppercase mb-6 italic">Centro de <span className="text-[#F09800]">Ayuda</span></h1>
          <p className="text-2xl text-gray-400 leading-relaxed mb-10">
            Para garantizar la mejor experiencia, nuestro chat de soporte requiere inicio de sesión en <span className="text-white font-bold">Facebook</span>.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xl">
              <div className="w-3 h-3 bg-[#F09800] rounded-full" />
              <p>Moderación activa por Estudios 421</p>
            </div>
            <div className="flex items-center gap-4 text-xl">
              <div className="w-3 h-3 bg-[#F09800] rounded-full" />
              <p>Denuncia de fallos técnicos en tiempo real</p>
            </div>
          </div>
        </div>

        {/* ACCESO QR (Más práctico para TV) */}
        <div className="bg-white p-12 rounded-[40px] flex flex-col items-center text-center shadow-[0_0_60px_rgba(240,152,0,0.3)]">
          <IoQrCodeOutline className="text-black text-[200px] mb-6" />
          <p className="text-black font-black text-2xl uppercase mb-2 italic">Escanea para Chatear</p>
          <p className="text-gray-500 text-lg mb-6">Usa la cámara de tu celular para abrir el soporte directo</p>
          <div className="flex items-center gap-2 bg-[#1877F2] text-white px-6 py-2 rounded-full font-bold">
            <IoLogoFacebook /> Messenger
          </div>
        </div>
      </div>
    </div>
  );
};

export default AyudaTV;
