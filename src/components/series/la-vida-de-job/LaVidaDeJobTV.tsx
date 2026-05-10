import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoChevronBack, IoChevronForward, IoClose, IoPlay, IoList } from 'react-icons/io5';

const jobEpisodes = [
  { id: 1, title: "La Juventud", dur: "00:51:35", thumb: "https://static.wixstatic.com/media/859174_6e9c9f95017d48fab10979c79bbe504b~mv2.jpg", url: "https://ok.ru/videoembed/14200848714240" },
  { id: 2, title: "La Tentación", dur: "01:04:28", thumb: "https://static.wixstatic.com/media/859174_df9b08a7fe524e1a93f8e5ecec085ecd~mv2.jpg", url: "https://ok.ru/videoembed/14200848845312" },
  { id: 3, title: "La Conquista", dur: "00:55:36", thumb: "https://static.wixstatic.com/media/859174_47e64b4383a4413bb12eab9d0a687ca6~mv2.jpg", url: "https://ok.ru/videoembed/14200849500672" },
  { id: 4, title: "Su Héroe", dur: "00:46:41", thumb: "https://static.wixstatic.com/media/859174_c4fad81c36344fe2abe3a497187800b1~mv2.jpg", url: "https://ok.ru/videoembed/14200850942464" },
  { id: 5, title: "La Noche de Bodas", dur: "01:02:36", thumb: "https://static.wixstatic.com/media/859174_56d5fd4a00c6424381e4c8672ff26369~mv2.jpg", url: "https://ok.ru/videoembed/14200851270144" },
  { id: 6, title: "La Boda", dur: "00:49:40", thumb: "https://static.wixstatic.com/media/859174_4942bf39205a491a9148ab8acbca19fc~mv2.jpg", url: "https://ok.ru/videoembed/14201569937920" },
  { id: 7, title: "La Muerte", dur: "00:50:20", thumb: "https://static.wixstatic.com/media/859174_089119311ae24c9c863e7b93fa4fdf39~mv2.jpg", url: "https://ok.ru/videoembed/14201570855424" },
  { id: 8, title: "El Pastoreo", dur: "00:48:02", thumb: "https://static.wixstatic.com/media/859174_b11d6df6c7a2408ebb19573c25998db4~mv2.jpg", url: "https://ok.ru/videoembed/14201572231680" },
  { id: 9, title: "La Partida de Job", dur: "00:49:50", thumb: "https://static.wixstatic.com/media/859174_4f8186d2cb194a829772fa61f345b4cd~mv2.jpg", url: "https://ok.ru/videoembed/14201572624896" },
  { id: 10, title: "La Llegada a Uz", dur: "00:55:58", thumb: "https://static.wixstatic.com/media/859174_53753f743f3643258ade5db11ed53945~mv2.jpg", url: "https://ok.ru/videoembed/14216478919168" },
  { id: 11, title: "La Familia de Job", dur: "00:46:37", thumb: "https://static.wixstatic.com/media/859174_1a255930c7024f31bd80efd27d110ec2~mv2.jpg", url: "https://ok.ru/videoembed/14216479115776" },
  { id: 12, title: "Los hijos de Job", dur: "00:44:49", thumb: "https://static.wixstatic.com/media/859174_e1b1efd205bf47be83c39eec48955430~mv2.jpg", url: "https://ok.ru/videoembed/14216479640064" },
  { id: 13, title: "La Reunión en el Cielo", dur: "00:44:30", thumb: "https://static.wixstatic.com/media/859174_37825499779b46b08ec2d33d39151853~mv2.jpg", url: "https://ok.ru/videoembed/14216479836672" },
  { id: 14, title: "La Prueba de Job", dur: "01:01:02", thumb: "https://static.wixstatic.com/media/859174_398e5c11b8204a6a8b96b592aa926065~mv2.jpg", url: "https://ok.ru/videoembed/14216479050240" },
  { id: 15, title: "Job en el Sheol", dur: "00:56:48", thumb: "https://static.wixstatic.com/media/859174_a53a91fb9c7042a29cf0d65b31161238~mv2.jpg", url: "https://ok.ru/videoembed/14216479312384" },
  { id: 16, title: "Amigos de Job", dur: "01:02:19", thumb: "https://static.wixstatic.com/media/859174_2b315227c5de4bb0ae66c8146fd3c1e0~mv2.jpg", url: "https://ok.ru/videoembed/14216479246848" },
  { id: 17, title: "Dios y Job", dur: "00:40:55", thumb: "https://static.wixstatic.com/media/859174_fd0323d4042a4a929b467ed39cc19134~mv2.jpg", url: "https://ok.ru/videoembed/14216479443456" },
  { id: 18, title: "Un Nuevo Comienzo", dur: "00:44:12", thumb: "https://static.wixstatic.com/media/859174_a68b9018fbb6433398fc4c324c83ef3f~mv2.jpg", url: "https://ok.ru/videoembed/14216479771136" },
  { id: 19, title: "La Restitución", dur: "00:42:45", thumb: "https://static.wixstatic.com/media/859174_662812f95f0b428da053bf35fbb7e143~mv2.jpg", url: "https://ok.ru/videoembed/14216479574528" },
  { id: 20, title: "La Continuación del Fin", dur: "00:53:36", thumb: "https://static.wixstatic.com/media/859174_83e339dc10f04a53b4361f4f4b321d3c~mv2.jpg", url: "https://ok.ru/videoembed/14216479377920" }
];

const LaVidaDeJobTV = () => {
  const [focusIndex, setFocusIndex] = useState(0); // 0 = Hero button, 1+ = episodios
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('job_last_ep');
    if (saved) {
      const idx = parseInt(saved);
      if (idx < jobEpisodes.length) setCurrentIdx(idx);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideo) {
        if (e.key === 'Backspace' || e.key === 'Escape') setSelectedVideo(null);
        if (e.key === 'ArrowRight' && currentIdx < jobEpisodes.length - 1) openEpisode(currentIdx + 1);
        if (e.key === 'ArrowLeft' && currentIdx > 0) openEpisode(currentIdx - 1);
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          setFocusIndex((prev) => Math.min(prev + 1, jobEpisodes.length));
          break;
        case 'ArrowLeft':
          setFocusIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'ArrowDown':
          setFocusIndex((prev) => Math.min(prev + 5, jobEpisodes.length));
          break;
        case 'ArrowUp':
          setFocusIndex((prev) => Math.max(prev - 5, 0));
          break;
        case 'Enter':
          if (focusIndex === 0) openEpisode(currentIdx);
          else openEpisode(focusIndex - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusIndex, selectedVideo, currentIdx]);

  useEffect(() => {
    if (focusIndex > 0) {
      episodeRefs.current[focusIndex - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }, [focusIndex]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(jobEpisodes[idx].url);
    localStorage.setItem('job_last_ep', idx.toString());
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-hidden">
      <Head><title>La Vida de Job — Smart TV</title></Head>

      {/* ── HERO SECTION ── */}
      <div className="relative w-full h-[70vh]">
        <img
          src="https://static.wixstatic.com/media/859174_f2663a3ee1e64c0e872790d28c7f659e~mv2.jpg"
          className="w-full h-full object-cover"
          alt="La Vida de Job"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="absolute left-20 top-1/2 -translate-y-1/2 max-w-2xl">
          <Image
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
            alt="Logo"
            width={320}
            height={90}
            className="mb-6 object-contain"
          />
          <h1 className="text-5xl font-black uppercase tracking-wider text-white mb-4">
            La Vida de Job
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
            La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor, Job enfrenta preguntas profundas sobre el sufrimiento y la fidelidad a Dios.
          </p>
          <button
            onClick={() => openEpisode(currentIdx)}
            className={`flex items-center gap-4 py-5 px-14 rounded-lg text-2xl font-black transition-all duration-300 ${
              focusIndex === 0
                ? 'bg-[#FF8A00] text-white scale-110 shadow-[0_0_30px_rgba(255,138,0,0.5)]'
                : 'bg-white text-black hover:bg-[#FF8A00] hover:text-white'
            }`}
          >
            <IoPlay className="text-3xl" />
            {currentIdx === 0 ? 'VER AHORA' : `CONTINUAR EP. ${jobEpisodes[currentIdx].id}`}
          </button>
        </div>

        {/* Indicador episodio actual */}
        <div className="absolute bottom-6 right-10 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
          <p className="text-xs font-black text-[#FF8A00] uppercase tracking-widest mb-1">Viendo</p>
          <p className="text-lg font-bold">EP. {jobEpisodes[currentIdx].id} — {jobEpisodes[currentIdx].title}</p>
        </div>
      </div>

      {/* ── GRID DE EPISODIOS ── */}
      <div className="px-20 -mt-6 relative z-10 pb-20">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-[#FF8A00] flex items-center gap-4">
          <span className="w-2 h-8 bg-[#FF8A00] rounded-full" />
          Capítulos
        </h2>
        <div className="grid grid-cols-5 gap-6">
          {jobEpisodes.map((ep, index) => {
            const isFocused = focusIndex === index + 1;
            const isCurrent = currentIdx === index;
            return (
              <div
                key={ep.id}
                ref={(el) => { episodeRefs.current[index] = el; }}
                onClick={() => openEpisode(index)}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border-4 ${
                  isFocused
                    ? 'border-[#FF8A00] scale-110 z-20 shadow-[0_0_30px_rgba(255,138,0,0.4)]'
                    : isCurrent
                    ? 'border-white/40 opacity-90'
                    : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <img src={ep.thumb} className="w-full aspect-video object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badge episodio */}
                <div className="absolute top-2 left-2 bg-[#FF8A00] px-2 py-0.5 rounded text-xs font-black">
                  EP {ep.id}
                </div>

                {/* Badge activo */}
                {isCurrent && (
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-xs font-black border border-white/30">
                    ▶ Actual
                  </div>
                )}

                <div className="p-3 bg-gradient-to-t from-black to-transparent">
                  <h3 className={`text-base font-bold truncate uppercase transition-colors ${isFocused ? 'text-[#FF8A00]' : 'text-white'}`}>
                    {ep.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-400">{ep.dur}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PLAYER TV ── */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black">
          <iframe
            src={selectedVideo + "?autoplay=1"}
            className="w-full h-full border-none"
            allow="autoplay; fullscreen"
            allowFullScreen
          />

          {/* HUD superior */}
          <div className="absolute top-8 left-10 flex items-center gap-4 bg-black/70 px-6 py-4 rounded-xl backdrop-blur-md border border-white/10">
            <div className="w-2 h-12 bg-[#FF8A00] rounded-full" />
            <div>
              <p className="text-xs font-black text-[#FF8A00] uppercase tracking-widest">La Vida de Job</p>
              <h2 className="text-2xl font-bold">Cap. {jobEpisodes[currentIdx].id} — {jobEpisodes[currentIdx].title}</h2>
              <p className="text-sm text-gray-400">{jobEpisodes[currentIdx].dur}</p>
            </div>
          </div>

          {/* Controles inferiores */}
          <div className="absolute bottom-8 inset-x-0 flex items-center justify-between px-16">
            <button
              disabled={currentIdx === 0}
              onClick={() => openEpisode(currentIdx - 1)}
              className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-8 py-4 rounded-xl border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-all"
            >
              <IoChevronBack className="text-3xl" />
              <div className="text-left">
                <p className="text-xs text-[#FF8A00] font-black uppercase tracking-widest">Anterior</p>
                <p className="text-sm font-bold">{currentIdx > 0 ? `EP. ${jobEpisodes[currentIdx - 1].id}` : ''}</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedVideo(null)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-10 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-sm font-black uppercase tracking-widest">Capítulos</span>
            </button>

            <button
              disabled={currentIdx === jobEpisodes.length - 1}
              onClick={() => openEpisode(currentIdx + 1)}
              className="flex items-center gap-4 bg-[#FF8A00] px-8 py-4 rounded-xl disabled:opacity-20 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,138,0,0.4)]"
            >
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest">Siguiente</p>
                <p className="text-sm font-bold">{currentIdx < jobEpisodes.length - 1 ? `EP. ${jobEpisodes[currentIdx + 1].id}` : ''}</p>
              </div>
              <IoChevronForward className="text-3xl" />
            </button>
          </div>

          {/* Indicador control remoto */}
          <div className="absolute bottom-8 right-6 text-gray-600 text-sm font-bold tracking-widest">
            ← → Episodios · ESC Salir
          </div>
        </div>
      )}

      <style jsx global>{`
        body { overflow: hidden; }
        img { pointer-events: none !important; -webkit-user-drag: none; }
        * { -webkit-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default LaVidaDeJobTV;
