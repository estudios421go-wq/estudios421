import React from 'react';

const SeriesTVTV = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-[#F09800] text-6xl font-black uppercase italic mb-2">Series TV</h1>
      <p className="text-white/30 text-2xl font-light tracking-[0.5em]">SMART TV INTERFACE</p>
      <div className="mt-20 flex gap-10 opacity-10">
        {[1,2,3].map(i => (
          <div key={i} className="w-64 h-36 bg-white rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default SeriesTVTV;
