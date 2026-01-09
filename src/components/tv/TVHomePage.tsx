import React from 'react';
import Navbar from './Navbar';

export default function TVHomePage() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">MODO TV ACTIVADO</h1>
        <p className="text-2xl text-gray-400">Si ves esto, el detector de Smart TV funciona.</p>
      </div>
    </div>
  );
}
