import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { IoPlay, IoRefresh, IoList } from 'react-icons/io5';

// ─── THROTTLE PARA EVITAR LAG ──────────────────────────────────────────────
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ─── EPISODIOS ────────────────────────────────────────────────────────────────
const jobEpisodes = [
  { id: 1,  title: "La Juventud",           dur: "51 min",  thumb: "https://static.wixstatic.com/media/859174_6e9c9f95017d48fab10979c79bbe504b~mv2.jpg",  url: "https://ok.ru/videoembed/14200848714240", desc: "Al recibir un aviso urgente, Job causa revuelo en la recepción de José y su familia en Gosén." },
  { id: 2,  title: "La Tentación",          dur: "64 min",  thumb: "https://static.wixstatic.com/media/859174_df9b08a7fe524e1a93f8e5ecec085ecd~mv2.jpg",  url: "https://ok.ru/videoembed/14200848845312", desc: "En una conversación con José, Jacob le hace jurar una promesa. Job recibe una propuesta tentadora." },
  { id: 3,  title: "La Conquista",          dur: "55 min",  thumb: "https://static.wixstatic.com/media/859174_47e64b4383a4413bb12eab9d0a687ca6~mv2.jpg",  url: "https://ok.ru/videoembed/14200849500672", desc: "Job le hace una declaración a Sera. En Egipto, Raquel toma una decisión sobre su futuro." },
  { id: 4,  title: "Su Héroe",              dur: "46 min",  thumb: "https://static.wixstatic.com/media/859174_c4fad81c36344fe2abe3a497187800b1~mv2.jpg",  url: "https://ok.ru/videoembed/14200850942464", desc: "Raquel toma una decisión arriesgada. Con la desaparición de Sera, Job es confrontado por Aser." },
  { id: 5,  title: "La Noche de Bodas",     dur: "62 min",  thumb: "https://static.wixstatic.com/media/859174_56d5fd4a00c6424381e4c8672ff26369~mv2.jpg",  url: "https://ok.ru/videoembed/14200851270144", desc: "El campamento celebra la unión de Job y Raquel. Jacob se sorprende con una revelación." },
  { id: 6,  title: "La Boda",              dur: "49 min",  thumb: "https://static.wixstatic.com/media/859174_4942bf39205a491a9148ab8acbca19fc~mv2.jpg",  url: "https://ok.ru/videoembed/14201569937920", desc: "Job y Raquel interrumpen su paseo. Sera no pierde la oportunidad de provocar intrigas." },
  { id: 7,  title: "La Muerte",            dur: "50 min",  thumb: "https://static.wixstatic.com/media/859174_089119311ae24c9c863e7b93fa4fdf39~mv2.jpg",  url: "https://ok.ru/videoembed/14201570855424", desc: "Los hijos de Jacob se sorprenden con un reencuentro. La situación de Job y Raquel llega al límite." },
  { id: 8,  title: "El Pastoreo",          dur: "48 min",  thumb: "https://static.wixstatic.com/media/859174_b11d6df6c7a2408ebb19573c25998db4~mv2.jpg",  url: "https://ok.ru/videoembed/14201572231680", desc: "La conversación entre Dotán y Job se ve interrumpida. José reacciona al mensaje de sus hermanos." },
  { id: 9,  title: "La Partida de Job",    dur: "49 min",  thumb: "https://static.wixstatic.com/media/859174_4f8186d2cb194a829772fa61f345b4cd~mv2.jpg",  url: "https://ok.ru/videoembed/14201572624896", desc: "Raquel toma una decisión impulsiva. Isacar decide el futuro de su hijo por el bien de la familia." },
  { id: 10, title: "La Llegada a Uz",      dur: "55 min",  thumb: "https://static.wixstatic.com/media/859174_53753f743f3643258ade5db11ed53945~mv2.jpg",  url: "https://ok.ru/videoembed/14216478919168", desc: "Job se enfrenta a una situación crítica en Uz. Raquel se entera del pasado de Dina." },
  { id: 11, title: "La Familia de Job",    dur: "46 min",  thumb: "https://static.wixstatic.com/media/859174_1a255930c7024f31bd80efd27d110ec2~mv2.jpg",  url: "https://ok.ru/videoembed/14216479115776", desc: "Job confronta a sus hijos sobre sus intenciones. Efraín revela su inseguridad respecto a Sera." },
  { id: 12, title: "Los hijos de Job",     dur: "44 min",  thumb: "https://static.wixstatic.com/media/859174_e1b1efd205bf47be83c39eec48955430~mv2.jpg",  url: "https://ok.ru/videoembed/14216479640064", desc: "Raquel recibe una dolorosa noticia. Job hace un descubrimiento decepcionante sobre sus hijos." },
  { id: 13, title: "La Reunión en el Cielo", dur: "44 min", thumb: "https://static.wixstatic.com/media/859174_37825499779b46b08ec2d33d39151853~mv2.jpg", url: "https://ok.ru/videoembed/14216479836672", desc: "Sera sorprende a Raquel con una revelación. El diablo propone a Dios una prueba sobre Job." },
  { id: 14, title: "La Prueba de Job",     dur: "61 min",  thumb: "https://static.wixstatic.com/media/859174_398e5c11b8204a6a8b96b592aa926065~mv2.jpg",  url: "https://ok.ru/videoembed/14216479050240", desc: "Job es confrontado por los habitantes de Uz. Raquel plantea preguntas sobre sus pérdidas." },
  { id: 15, title: "Job en el Sheol",      dur: "56 min",  thumb: "https://static.wixstatic.com/media/859174_a53a91fb9c7042a29cf0d65b31161238~mv2.jpg",  url: "https://ok.ru/videoembed/14216479312384", desc: "Job sufre los efectos de las úlceras. Raquel llega a una conclusión equivocada sobre el pasado." },
  { id: 16, title: "Amigos de Job",        dur: "62 min",  thumb: "https://static.wixstatic.com/media/859174_2b315227c5de4bb0ae66c8146fd3c1e0~mv2.jpg",  url: "https://ok.ru/videoembed/14216479246848", desc: "Job reacciona a las acusaciones de sus amigos. Efraín toma una medida arriesgada." },
  { id: 17, title: "Dios y Job",           dur: "40 min",  thumb: "https://static.wixstatic.com/media/859174_fd0323d4042a4a929b467ed39cc19134~mv2.jpg",  url: "https://ok.ru/videoembed/14216479443456", desc: "Dios cuestiona a Job mostrando sus creaciones. Sus amigos se conmueven con un reencuentro." },
  { id: 18, title: "Un Nuevo Comienzo",    dur: "44 min",  thumb: "https://static.wixstatic.com/media/859174_a68b9018fbb6433398fc4c324c83ef3f~mv2.jpg",  url: "https://ok.ru/videoembed/14216479771136", desc: "Sera y Eliú buscan a Efraín. Raquel comparte con Job una experiencia transformadora." },
  { id: 19, title: "La Restitución",       dur: "42 min",  thumb: "https://static.wixstatic.com/media/859174_662812f95f0b428da053bf35fbb7e143~mv2.jpg",  url: "https://ok.ru/videoembed/14216479574528", desc: "Job recibe una petición de perdón. Sera confronta a Efraín y se sorprende con una confesión." },
  { id: 20, title: "La Continuación del Fin", dur: "53 min", thumb: "https://static.wixstatic.com/media/859174_83e339dc10f04a53b4361f4f4b321d3c~mv2.jpg", url: "https://ok.ru/videoembed/14216479377920", desc: "Job recibe visitas especiales. Gabriel entrega un mensaje de Dios a una joven mujer." },
];

// ─── NORMALIZACIÓN DE TECLAS (SOLO key, sin keyCode) ──────────────────────
const getNavKey = (e: KeyboardEvent): string | null => {
  const k = e.key;
  
  // Direccionales
  if (k === 'ArrowUp') return 'UP';
  if (k === 'ArrowDown') return 'DOWN';
  if (k === 'ArrowLeft') return 'LEFT';
  if (k === 'ArrowRight') return 'RIGHT';
  
  // OK / Enter / Select
  if (k === 'Enter' || k === 'Accept' || k === ' ') return 'OK';
  
  // BACK / Escape / Volver
  if (k === 'Escape' || k === 'GoBack' || k === 'Backspace') return 'BACK';
  
  return null;
};

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────
const LaVidaDeJobTV = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [vista, setVista] = useState<'detalle' | 'episodios' | 'player'>('detalle');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [detalleBtn, setDetalleBtn] = useState(0);
  const [epFoco, setEpFoco] = useState(0);
  const epRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── FOCO AUTOMÁTICO OPTIMIZADO ──
  useEffect(() => {
    const forzarFoco = () => {
      containerRef.current?.focus({ preventScroll: true });
    };
    
    forzarFoco();
    const timeout = setTimeout(forzarFoco, 500);
    
    document.addEventListener('visibilitychange', forzarFoco);
    window.addEventListener('focus', forzarFoco);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', forzarFoco);
      window.removeEventListener('focus', forzarFoco);
    };
  }, []);

  // Reenfocar al cambiar de vista
  useEffect(() => {
    const t = setTimeout(() => containerRef.current?.focus({ preventScroll: true }), 50);
    return () => clearTimeout(t);
  }, [vista]);

  // Cargar último episodio
  useEffect(() => {
    try {
      const saved = localStorage.getItem('job_last_ep');
      if (saved) {
        const idx = parseInt(saved);
        if (!isNaN(idx) && idx < jobEpisodes.length) setCurrentIdx(idx);
      }
    } catch (_) {}
  }, []);

  // Scroll al episodio enfocado (optimizado sin smooth)
  useEffect(() => {
    if (vista === 'episodios') {
      epRefs.current[epFoco]?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }
  }, [epFoco, vista]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedUrl(jobEpisodes[idx].url);
    try { localStorage.setItem('job_last_ep', idx.toString()); } catch (_) {}
    setVista('player');
  };

  // ── CONTROL REMOTO CORREGIDO ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const nav = getNavKey(e);
      if (!nav) return;

      // SOLO preventDefault (sin stopPropagation)
      e.preventDefault();

      // ── PLAYER ──
      if (vista === 'player') {
        if (nav === 'BACK') {
          setVista('detalle');
          return;
        }
        if (nav === 'RIGHT' && currentIdx < jobEpisodes.length - 1) {
          const next = currentIdx + 1;
          setCurrentIdx(next);
          setSelectedUrl(jobEpisodes[next].url);
          try { localStorage.setItem('job_last_ep', next.toString()); } catch (_) {}
          return;
        }
        if (nav === 'LEFT' && currentIdx > 0) {
          const prev = currentIdx - 1;
          setCurrentIdx(prev);
          setSelectedUrl(jobEpisodes[prev].url);
          try { localStorage.setItem('job_last_ep', prev.toString()); } catch (_) {}
          return;
        }
        return;
      }

      // ── DETALLE ──
      if (vista === 'detalle') {
        if (nav === 'DOWN') { setDetalleBtn(b => Math.min(b + 1, 2)); return; }
        if (nav === 'UP')   { setDetalleBtn(b => Math.max(b - 1, 0)); return; }
        if (nav === 'OK') {
          if (detalleBtn === 0) openEpisode(currentIdx);
          if (detalleBtn === 1) openEpisode(0);
          if (detalleBtn === 2) { setEpFoco(currentIdx); setVista('episodios'); }
          return;
        }
        return;
      }

      // ── EPISODIOS ──
      if (vista === 'episodios') {
        if (nav === 'DOWN') { setEpFoco(p => Math.min(p + 1, jobEpisodes.length - 1)); return; }
        if (nav === 'UP')   { setEpFoco(p => Math.max(p - 1, 0)); return; }
        if (nav === 'OK')   { openEpisode(epFoco); return; }
        if (nav === 'BACK') { setVista('detalle'); return; }
        return;
      }
    };

    // Aplicar throttle de 100ms para evitar lag
    const throttledHandleKey = throttle(handleKey, 100);
    
    // SOLO UN LISTENER (sin duplicar)
    window.addEventListener('keydown', throttledHandleKey);

    return () => {
      window.removeEventListener('keydown', throttledHandleKey);
    };
  }, [vista, detalleBtn, epFoco, currentIdx]);

  const ep = jobEpisodes[currentIdx];

  // ── RENDER PLAYER ──
  if (vista === 'player') {
    return (
      <div ref={containerRef} tabIndex={0} className="fixed inset-0 bg-black outline-none z-50">
        <Head><title>{ep.title} — La Vida de Job</title></Head>

        <iframe
          src={selectedUrl + '?autoplay=1'}
          className="w-full h-full border-none"
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        {/* OVERLAY TRANSPARENTE SOBRE EL IFRAME */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10"
          style={{ pointerEvents: 'none', background: 'transparent' }}
        />

        {/* HUD info */}
        <div className="absolute top-6 left-8 z-20 bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex items-center gap-4">
          <div className="w-1.5 h-10 bg-[#F09800] rounded-full" />
          <div>
            <p className="text-xs text-[#F09800] font-black uppercase tracking-widest">La Vida de Job</p>
            <p className="text-white text-xl font-bold">Episodio {ep.id} — {ep.title}</p>
            <p className="text-gray-400 text-sm">{ep.dur}</p>
          </div>
        </div>

        {/* Controles navegación */}
        <div className="absolute bottom-8 inset-x-0 z-20 flex justify-between px-16 items-center">
          <button
            onClick={() => {
              if (currentIdx > 0) {
                const p = currentIdx - 1;
                setCurrentIdx(p);
                setSelectedUrl(jobEpisodes[p].url);
                try { localStorage.setItem('job_last_ep', p.toString()); } catch (_) {}
              }
            }}
            disabled={currentIdx === 0}
            className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-8 py-4 rounded-xl border border-white/10 disabled:opacity-20 text-white text-lg font-bold"
          >
            ← EP. {currentIdx > 0 ? jobEpisodes[currentIdx - 1].id : ''}
          </button>
          <button
            onClick={() => setVista('detalle')}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-10 py-4 rounded-xl border border-white/20 text-white text-lg font-bold"
          >
            <IoList size={24} className="text-[#F09800]" /> Volver
          </button>
          <button
            onClick={() => {
              if (currentIdx < jobEpisodes.length - 1) {
                const n = currentIdx + 1;
                setCurrentIdx(n);
                setSelectedUrl(jobEpisodes[n].url);
                try { localStorage.setItem('job_last_ep', n.toString()); } catch (_) {}
              }
            }}
            disabled={currentIdx === jobEpisodes.length - 1}
            className="flex items-center gap-3 bg-[#F09800] px-8 py-4 rounded-xl disabled:opacity-20 text-white text-lg font-bold"
          >
            EP. {currentIdx < jobEpisodes.length - 1 ? jobEpisodes[currentIdx + 1].id : ''} →
          </button>
        </div>

        <p className="absolute bottom-3 right-6 z-20 text-gray-600 text-xs tracking-widest">← → cambiar ep · ESC/BACK volver</p>

        <style jsx global>{`
          body { overflow: hidden; background: black; }
          * { -webkit-user-select: none; user-select: none; }
          *:focus { outline: none; }
        `}</style>
      </div>
    );
  }

  // ── RENDER EPISODIOS ──
  if (vista === 'episodios') {
    return (
      <div ref={containerRef} tabIndex={0} className="bg-black min-h-screen text-white flex outline-none">
        <Head><title>Episodios — La Vida de Job</title></Head>

        {/* Panel izquierdo */}
        <div className="w-[380px] flex-shrink-0 flex flex-col justify-center px-12 py-16 border-r border-white/10">
          <Image
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
            alt="Logo"
            width={180} height={50}
            className="object-contain mb-8"
            unoptimized
          />
          <h1 className="text-4xl font-black uppercase mb-3">La Vida de Job</h1>
          <p className="text-gray-400 text-lg mb-2">1 Temporada · 20 Episodios</p>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            La fe de un hombre justo llevada al límite. Job enfrenta el sufrimiento y la fidelidad a Dios.
          </p>
          <button
            onClick={() => setVista('detalle')}
            className="flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-white text-lg font-bold hover:bg-white/20 transition-all"
          >
            ← Volver
          </button>
          <p className="mt-8 text-gray-600 text-sm tracking-widest">↑ ↓ navegar · OK ver · ESC/BACK volver</p>
        </div>

        {/* Lista episodios */}
        <div className="flex-1 overflow-y-auto py-8 px-6" style={{ scrollbarWidth: 'none' }}>
          {jobEpisodes.map((ep, idx) => {
            const esFoco = epFoco === idx;
            const esActual = currentIdx === idx;
            return (
              <div
                key={ep.id}
                ref={el => { epRefs.current[idx] = el; }}
                onClick={() => openEpisode(idx)}
                className={`flex gap-5 mb-4 rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                  esFoco
                    ? 'bg-white/15 border-2 border-[#F09800] scale-[1.02]'
                    : esActual
                    ? 'bg-white/8 border-2 border-white/30'
                    : 'border-2 border-transparent hover:bg-white/8'
                }`}
              >
                <div className="relative flex-shrink-0 w-40 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                  {esActual && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <IoPlay className="text-[#F09800] text-3xl" />
                    </div>
                  )}
                  {esActual && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div className="h-full bg-[#F09800] w-1/3" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-sm font-black uppercase tracking-widest ${esFoco ? 'text-[#F09800]' : 'text-gray-500'}`}>
                      Episodio {ep.id}
                    </span>
                    <span className="text-gray-600 text-sm">· {ep.dur}</span>
                    {esActual && <span className="text-xs bg-[#F09800] text-white px-2 py-0.5 rounded font-black">▶ VIENDO</span>}
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${esFoco ? 'text-white' : 'text-gray-300'}`}>{ep.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{ep.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <style jsx global>{`
          body { overflow: hidden; background: black; }
          * { -webkit-user-select: none; user-select: none; }
          ::-webkit-scrollbar { display: none; }
          *:focus { outline: none; }
        `}</style>
      </div>
    );
  }

  // ── RENDER DETALLE ──
  const btnClasses = (idx: number) =>
    `flex items-center gap-4 px-8 py-5 rounded-xl text-xl font-bold transition-all duration-200 w-full ${
      detalleBtn === idx
        ? 'bg-white text-black scale-105 shadow-2xl'
        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
    }`;

  return (
    <div ref={containerRef} tabIndex={0} className="bg-black min-h-screen text-white flex outline-none overflow-hidden">
      <Head><title>La Vida de Job — Smart TV</title></Head>

      <div className="w-[45%] flex flex-col justify-center px-16 py-12 relative z-10">
        <Image
          src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
          alt="Logo"
          width={200} height={56}
          className="object-contain mb-8"
          unoptimized
        />
        <h1 className="text-6xl font-black uppercase leading-tight mb-3">La Vida de Job</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gray-400 text-lg">1 Temporada</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-400 text-lg">20 Episodios</span>
          <span className="text-gray-600">·</span>
          <span className="bg-white/10 border border-white/20 px-3 py-0.5 rounded text-sm font-bold">HD</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[#F09800] font-black text-lg">Episodio {ep.id}</span>
          <span className="text-gray-400 text-lg">— {ep.title}</span>
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-2">
          <div
            className="h-full bg-[#F09800] rounded-full"
            style={{ width: `${((currentIdx) / (jobEpisodes.length - 1)) * 100}%` }}
          />
        </div>
        <p className="text-gray-500 text-sm mb-8">{ep.dur} · {jobEpisodes.length - currentIdx - 1} episodios restantes</p>
        <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">{ep.desc}</p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <button onClick={() => openEpisode(currentIdx)} className={btnClasses(0)}>
            <IoPlay size={24} />
            {currentIdx === 0 ? 'Ver Ahora' : `Reanudar Ep. ${ep.id}`}
          </button>
          <button onClick={() => openEpisode(0)} className={btnClasses(1)}>
            <IoRefresh size={24} />
            Ver desde el inicio
          </button>
          <button onClick={() => { setEpFoco(currentIdx); setVista('episodios'); }} className={btnClasses(2)}>
            <IoList size={24} />
            Más episodios
          </button>
        </div>

        <p className="mt-10 text-gray-600 text-sm tracking-widest">↑ ↓ navegar · OK seleccionar</p>
      </div>

      <div className="w-[55%] relative">
        <img
          src="https://static.wixstatic.com/media/859174_f2663a3ee1e64c0e872790d28c7f659e~mv2.jpg"
          className="w-full h-full object-cover"
          alt="La Vida de Job"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-8 right-8 bg-black/70 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
          <p className="text-xs text-[#F09800] font-black uppercase tracking-widest mb-1">Viendo ahora</p>
          <p className="text-white text-lg font-bold">EP. {ep.id} — {ep.title}</p>
          <p className="text-gray-400 text-sm">{ep.dur}</p>
        </div>
      </div>

      <style jsx global>{`
        body { overflow: hidden; background: black; }
        img { pointer-events: none; -webkit-user-drag: none; }
        * { -webkit-user-select: none; user-select: none; }
        *:focus { outline: none; }
      `}</style>
    </div>
  );
};

export default LaVidaDeJobTV;
