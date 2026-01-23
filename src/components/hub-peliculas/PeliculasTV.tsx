import React from 'react';

const PeliculasTV = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-[#F09800] text-7xl font-black uppercase mb-2">Películas</h1>
      <p className="text-white/20 text-3xl font-light tracking-[0.8em] mb-12">SMART TV BOX</p>
      <div className="flex gap-6 opacity-5">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="w-40 h-60 bg-white rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default PeliculasTV;
