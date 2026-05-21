import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { IoPlay, IoRefresh, IoList, IoChevronBack, IoChevronForward } from 'react-icons/io5';

// ─── EPISODIOS ────────────────────────────────────────────────────────────────
const leaEpisodes = [
  { id: 1,  title: "Hermanas del destino",       dur: "40 min", thumb: "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg", url: "https://ok.ru/videoembed/14199373957632", desc: "Lea y Raquel son hermanas con destinos muy diferentes. Sus vidas cambiarán para siempre cuando Jacob llega a su hogar." },
  { id: 2,  title: "El voto sagrado",             dur: "40 min", thumb: "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg", url: "https://ok.ru/videoembed/14199375071744", desc: "Un voto sagrado complica la vida de la familia. Las promesas hechas ante Dios tienen consecuencias inesperadas." },
  { id: 3,  title: "El engaño de Labán",          dur: "42 min", thumb: "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg", url: "https://ok.ru/videoembed/14199375989248", desc: "Labán trama un engaño que cambiará el destino de todos. Sus planes egoístas afectan a quienes más ama." },
  { id: 4,  title: "La boda equivocada",          dur: "41 min", thumb: "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg", url: "https://ok.ru/videoembed/14199376972288", desc: "La noche de bodas trae una sorpresa devastadora. Una decisión cambia para siempre la vida de tres personas." },
  { id: 5,  title: "Solo para Raquel",            dur: "43 min", thumb: "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg", url: "https://ok.ru/videoembed/14199377562112", desc: "Jacob deja claro que su amor es solo para Raquel. Lea debe encontrar su lugar en esta familia dividida." },
  { id: 6,  title: "Amor dividido",               dur: "40 min", thumb: "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg", url: "https://ok.ru/videoembed/14199378283008", desc: "El amor de Jacob está dividido y Lea sufre en silencio. Dios ve su dolor y actúa a su favor." },
  { id: 7,  title: "El dolor de la primogénita",  dur: "42 min", thumb: "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg", url: "https://ok.ru/videoembed/14199379134976", desc: "El dolor de Lea como primogénita se hace insoportable. Ella busca en Dios la fortaleza que los hombres no le dan." },
  { id: 8,  title: "Bendecido para partir",       dur: "40 min", thumb: "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg", url: "https://ok.ru/videoembed/14199380380160", desc: "Jacob recibe la bendición para partir. La familia enfrenta una nueva etapa llena de incertidumbre." },
  { id: 9,  title: "La noche del encuentro",      dur: "41 min", thumb: "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg", url: "https://ok.ru/videoembed/14199397812736", desc: "Una noche decisiva cambia el corazón de Jacob. El encuentro que nadie esperaba transforma la historia." },
  { id: 10, title: "Juicio en la familia",        dur: "41 min", thumb: "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg", url: "https://ok.ru/videoembed/14199398861312", desc: "La familia enfrenta un juicio que pondrá a prueba la fe y el amor de todos sus miembros." },
];

// ── VISTAS: 'detalle' | 'episodios' | 'player' ────────────────────────────────

const LeaTV = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vista, setVista] = useState<'detalle' | 'episodios' | 'player'>('detalle');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [detalleBtn, setDetalleBtn] = useState(0);
  const [epFoco, setEpFoco] = useState(0);
  const epRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── FOCO AUTOMÁTICO — crítico para control remoto desde el inicio ──
  useEffect(() => {
    const forzarFoco = () => containerRef.current?.focus();
    forzarFoco();
    document.addEventListener('visibilitychange', forzarFoco);
    window.addEventListener('focus', forzarFoco);
    return () => {
      document.removeEventListener('visibilitychange', forzarFoco);
      window.removeEventListener('focus', forzarFoco);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => containerRef.current?.focus(), 100);
  }, [vista]);

  // Cargar último episodio
  useEffect(() => {
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) {
      const idx = parseInt(saved);
      if (idx < leaEpisodes.length) setCurrentIdx(idx);
    }
  }, []);

  // Scroll al episodio enfocado
  useEffect(() => {
    if (vista === 'episodios') {
      epRefs.current[epFoco]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [epFoco, vista]);

  // Refs de estado — listener una sola vez
  const stateRef = useRef({ vista, detalleBtn, epFoco, currentIdx });
  useEffect(() => {
    stateRef.current = { vista, detalleBtn, epFoco, currentIdx };
  });

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedUrl(leaEpisodes[idx].url);
    localStorage.setItem('lea_last_ep', idx.toString());
    setVista('player');
  };

  // ── CONTROL REMOTO — UNA SOLA VEZ ─────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','Backspace','Escape'].includes(e.key)) {
        e.preventDefault();
      }

      // PLAYER
      if (s.vista === 'player') {
        if (e.key === 'Escape' || e.key === 'Backspace') setVista('detalle');
        if (e.key === 'ArrowRight' && s.currentIdx < leaEpisodes.length - 1) {
          const next = s.currentIdx + 1;
          setCurrentIdx(next);
          setSelectedUrl(leaEpisodes[next].url);
          localStorage.setItem('lea_last_ep', next.toString());
        }
        if (e.key === 'ArrowLeft' && s.currentIdx > 0) {
          const prev = s.currentIdx - 1;
          setCurrentIdx(prev);
          setSelectedUrl(leaEpisodes[prev].url);
          localStorage.setItem('lea_last_ep', prev.toString());
        }
        return;
      }

      // DETALLE
      if (s.vista === 'detalle') {
        if (e.key === 'ArrowDown') setDetalleBtn(b => Math.min(b + 1, 2));
        if (e.key === 'ArrowUp')   setDetalleBtn(b => Math.max(b - 1, 0));
        if (e.key === 'Enter') {
          if (s.detalleBtn === 0) openEpisode(s.currentIdx);
          if (s.detalleBtn === 1) openEpisode(0);
          if (s.detalleBtn === 2) { setEpFoco(s.currentIdx); setVista('episodios'); }
        }
        return;
      }

      // EPISODIOS
      if (s.vista === 'episodios') {
        if (e.key === 'ArrowDown') setEpFoco(p => Math.min(p + 1, leaEpisodes.length - 1));
        if (e.key === 'ArrowUp')   setEpFoco(p => Math.max(p - 1, 0));
        if (e.key === 'Enter')     openEpisode(s.epFoco);
        if (e.key === 'Backspace' || e.key === 'Escape') setVista('detalle');
        return;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const ep = leaEpisodes[currentIdx];

  // ── PLAYER ─────────────────────────────────────────────────────────────────
  if (vista === 'player') {
    return (
      <div ref={containerRef} tabIndex={0} className="fixed inset-0 bg-black outline-none z-50">
        <Head><title>{ep.title} — Lea</title></Head>
        <iframe src={selectedUrl + '?autoplay=1'} className="w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
        <div className="absolute top-6 left-8 bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex items-center gap-4">
          <div className="w-1.5 h-10 bg-[#F09800] rounded-full" />
          <div>
            <p className="text-xs text-[#F09800] font-black uppercase tracking-widest">Lea</p>
            <p className="text-white text-xl font-bold">Episodio {ep.id} — {ep.title}</p>
            <p className="text-gray-400 text-sm">{ep.dur}</p>
          </div>
        </div>
        <div className="absolute bottom-8 inset-x-0 flex justify-between px-16 items-center">
          <button
            onClick={() => { if (currentIdx > 0) { const p = currentIdx-1; setCurrentIdx(p); setSelectedUrl(leaEpisodes[p].url); localStorage.setItem('lea_last_ep', p.toString()); } }}
            disabled={currentIdx === 0}
            className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-8 py-4 rounded-xl border border-white/10 disabled:opacity-20 text-white text-lg font-bold"
          >
            <IoChevronBack size={24} /> EP. {currentIdx > 0 ? leaEpisodes[currentIdx-1].id : ''}
          </button>
          <button onClick={() => setVista('detalle')} className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-10 py-4 rounded-xl border border-white/20 text-white text-lg font-bold">
            <IoList size={24} className="text-[#F09800]" /> Volver
          </button>
          <button
            onClick={() => { if (currentIdx < leaEpisodes.length-1) { const n = currentIdx+1; setCurrentIdx(n); setSelectedUrl(leaEpisodes[n].url); localStorage.setItem('lea_last_ep', n.toString()); } }}
            disabled={currentIdx === leaEpisodes.length - 1}
            className="flex items-center gap-3 bg-[#F09800] px-8 py-4 rounded-xl disabled:opacity-20 text-white text-lg font-bold"
          >
            EP. {currentIdx < leaEpisodes.length-1 ? leaEpisodes[currentIdx+1].id : ''} <IoChevronForward size={24} />
          </button>
        </div>
        <p className="absolute bottom-3 right-6 text-gray-600 text-xs tracking-widest">← → cambiar ep · ESC volver</p>
        <style jsx global>{`body{overflow:hidden;background:black;} *{-webkit-user-select:none;user-select:none;} *:focus{outline:none;}`}</style>
      </div>
    );
  }

  // ── EPISODIOS ──────────────────────────────────────────────────────────────
  if (vista === 'episodios') {
    return (
      <div ref={containerRef} tabIndex={0} className="bg-black min-h-screen text-white flex outline-none">
        <Head><title>Episodios — Lea</title></Head>
        <div className="w-[380px] flex-shrink-0 flex flex-col justify-center px-12 py-16 border-r border-white/10">
          <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={180} height={50} className="object-contain mb-8" unoptimized />
          <h1 className="text-4xl font-black uppercase mb-3">Lea</h1>
          <p className="text-gray-400 text-lg mb-2">1 Temporada · 10 Episodios</p>
          <p className="text-gray-500 text-base leading-relaxed mb-10">La historia de Lea, la esposa olvidada de Jacob, y su fe inquebrantable en medio del dolor y el rechazo.</p>
          <button onClick={() => setVista('detalle')} className="flex items-center gap-3 bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-white text-lg font-bold hover:bg-white/20 transition-all">
            ← Volver
          </button>
          <p className="mt-8 text-gray-600 text-sm tracking-widest">↑ ↓ navegar · OK ver · ESC volver</p>
        </div>
        <div className="flex-1 overflow-y-auto py-8 px-6" style={{ scrollbarWidth: 'none' }}>
          {leaEpisodes.map((ep, idx) => {
            const esFoco = epFoco === idx;
            const esActual = currentIdx === idx;
            return (
              <div
                key={ep.id}
                ref={el => { epRefs.current[idx] = el; }}
                onClick={() => openEpisode(idx)}
                className={`flex gap-5 mb-4 rounded-2xl p-4 cursor-pointer transition-all duration-200 ${esFoco ? 'bg-white/15 border-2 border-[#F09800] scale-[1.02]' : esActual ? 'bg-white/8 border-2 border-white/30' : 'border-2 border-transparent hover:bg-white/8'}`}
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
                    <span className={`text-sm font-black uppercase tracking-widest ${esFoco ? 'text-[#F09800]' : 'text-gray-500'}`}>Episodio {ep.id}</span>
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
        <style jsx global>{`body{overflow:hidden;background:black;} *{-webkit-user-select:none;user-select:none;} ::-webkit-scrollbar{display:none;} *:focus{outline:none;}`}</style>
      </div>
    );
  }

  // ── DETALLE ────────────────────────────────────────────────────────────────
  const btnClasses = (idx: number) =>
    `flex items-center gap-4 px-8 py-5 rounded-xl text-xl font-bold transition-all duration-200 w-full ${detalleBtn === idx ? 'bg-white text-black scale-105 shadow-2xl' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`;

  return (
    <div ref={containerRef} tabIndex={0} className="bg-black min-h-screen text-white flex outline-none overflow-hidden">
      <Head><title>Lea — Smart TV</title></Head>

      {/* IZQUIERDA — info + botones */}
      <div className="w-[45%] flex flex-col justify-center px-16 py-12 relative z-10">
        <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={200} height={56} className="object-contain mb-8" unoptimized />
        <h1 className="text-6xl font-black uppercase leading-tight mb-3">Lea</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gray-400 text-lg">1 Temporada</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-400 text-lg">10 Episodios</span>
          <span className="text-gray-600">·</span>
          <span className="bg-white/10 border border-white/20 px-3 py-0.5 rounded text-sm font-bold">HD</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[#F09800] font-black text-lg">Episodio {ep.id}</span>
          <span className="text-gray-400 text-lg">— {ep.title}</span>
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-2">
          <div className="h-full bg-[#F09800] rounded-full" style={{ width: `${(currentIdx / (leaEpisodes.length - 1)) * 100}%` }} />
        </div>
        <p className="text-gray-500 text-sm mb-8">{ep.dur} · {leaEpisodes.length - currentIdx - 1} episodios restantes</p>
        <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">{ep.desc}</p>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button onClick={() => openEpisode(currentIdx)} className={btnClasses(0)}>
            <IoPlay size={24} />{currentIdx === 0 ? 'Ver Ahora' : `Reanudar Ep. ${ep.id}`}
          </button>
          <button onClick={() => openEpisode(0)} className={btnClasses(1)}>
            <IoRefresh size={24} />Ver desde el inicio
          </button>
          <button onClick={() => { setEpFoco(currentIdx); setVista('episodios'); }} className={btnClasses(2)}>
            <IoList size={24} />Más episodios
          </button>
        </div>
        <p className="mt-10 text-gray-600 text-sm tracking-widest">↑ ↓ navegar · OK seleccionar</p>
      </div>

      {/* DERECHA — imagen grande */}
      <div className="w-[55%] relative">
        <img src="https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg" className="w-full h-full object-cover" alt="Lea" />
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

export default LeaTV;
