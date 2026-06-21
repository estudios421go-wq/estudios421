import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IoChevronBack, IoChevronForward, IoClose, IoPlay, IoList } from 'react-icons/io5';

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

const joseEpisodes = [
  { id: 1, title: "El nacimiento de José", dur: "00:42:50", thumb: "https://static.wixstatic.com/media/859174_b44bad1703f7498ab87ffc2899850ed7~mv2.jpg", url: "https://ok.ru/videoembed/14201500797440" },
  { id: 2, title: "Espadas desaparecidas", dur: "00:41:20", thumb: "https://static.wixstatic.com/media/859174_04e0e0290e5b4812a701e159ffdce225~mv2.jpg", url: "https://ok.ru/videoembed/14202233752064" },
  { id: 3, title: "Salvados por la tormenta", dur: "00:42:46", thumb: "https://static.wixstatic.com/media/859174_fa024efd1a9242e6911adc037fc17058~mv2.jpg", url: "https://ok.ru/videoembed/14202488490496" },
  { id: 4, title: "Privilegios y celos", dur: "00:42:50", thumb: "https://static.wixstatic.com/media/859174_d196ab94593b4992a2ec6fac714bb91e~mv2.jpg", url: "https://ok.ru/videoembed/14202491636224" },
  { id: 5, title: "Clemencia en el campo", dur: "00:42:08", thumb: "https://static.wixstatic.com/media/859174_85bf93bcc19647e19992cd6ba83fc345~mv2.jpg", url: "https://ok.ru/videoembed/14202493209088" },
  { id: 6, title: "El pozo del sufrimiento", dur: "00:41:59", thumb: "https://static.wixstatic.com/media/859174_f2232a43af444ac79066a4ebd9eabefc~mv2.jpg", url: "https://ok.ru/videoembed/14202495502848" },
  { id: 7, title: "Llegada a Egipto", dur: "00:43:36", thumb: "https://static.wixstatic.com/media/859174_d7cce2bce30141f8b88197247ca7eae3~mv2.jpg", url: "https://ok.ru/videoembed/14202701548032" },
  { id: 8, title: "Huida inesperada", dur: "00:43:17", thumb: "https://static.wixstatic.com/media/859174_30fa53f8486c45f2ba234f081e926ecb~mv2.jpg", url: "https://ok.ru/videoembed/14202703710720" },
  { id: 9, title: "Confesiones ocultas", dur: "00:43:19", thumb: "https://static.wixstatic.com/media/859174_d0cf09bdebe84778b1dc8c6594d77df7~mv2.jpg", url: "https://ok.ru/videoembed/14202705086976" },
  { id: 10, title: "Fidelidad puesta a prueba", dur: "00:42:42", thumb: "https://static.wixstatic.com/media/859174_d4b83ba525714ddab298a831494f4dd1~mv2.jpg", url: "https://ok.ru/videoembed/14202726844928" },
  { id: 11, title: "Decisiones prohibidas", dur: "00:43:18", thumb: "https://static.wixstatic.com/media/859174_56f0a2b0536f46eb96af799c073b4ae3~mv2.jpg", url: "https://ok.ru/videoembed/14540463606272" },
  { id: 12, title: "La verdad revelada", dur: "00:43:23", thumb: "https://static.wixstatic.com/media/859174_4a4c48e7687c437d91f94f83438c726f~mv2.jpg", url: "https://ok.ru/videoembed/14540464916992" },
  { id: 13, title: "Planes de traición", dur: "00:43:21", thumb: "https://static.wixstatic.com/media/859174_e49b213150b94ab987c2c960c2d3d89e~mv2.jpg", url: "https://ok.ru/videoembed/14540466620928" },
  { id: 14, title: "Sabiduría egipcia", dur: "00:41:21", thumb: "https://static.wixstatic.com/media/859174_b740a577b4e241b1ab9352239a0bd135~mv2.jpg", url: "https://ok.ru/videoembed/14556467038720" },
  { id: 15, title: "Sin noticias del pasado", dur: "00:43:21", thumb: "https://static.wixstatic.com/media/859174_8daae9eb494f435f8dc3a53b4a0eb9ee~mv2.jpg", url: "https://ok.ru/videoembed/14556484078080" },
  { id: 16, title: "Deseo y traición", dur: "00:42:11", thumb: "https://static.wixstatic.com/media/859174_f4968b0eae3443ee95950fc5e79bc800~mv2.jpg", url: "https://ok.ru/videoembed/14556484536832" },
  { id: 17, title: "El significado de los sueños", dur: "00:42:34", thumb: "https://static.wixstatic.com/media/859174_e655497fab594a7dbb9dc56028484568~mv2.jpg", url: "https://ok.ru/videoembed/14556636449280" },
  { id: 18, title: "Caída en desgracia", dur: "00:42:09", thumb: "https://static.wixstatic.com/media/859174_8427e058b1df4ce594242b23cb33a0e9~mv2.jpg", url: "https://ok.ru/videoembed/14556636908032" },
  { id: 19, title: "El precio de la verdad", dur: "00:42:02", thumb: "https://static.wixstatic.com/media/859174_6c7fc3ce3dac41f0aa7703f486074ad1~mv2.jpg", url: "https://ok.ru/videoembed/14556762999296" },
  { id: 20, title: "De esclavo a gobernador", dur: "00:42:09", thumb: "https://static.wixstatic.com/media/859174_74b0f8e6e0db46b69207a8a2f1046450~mv2.jpg", url: "https://ok.ru/videoembed/14556763654656" },
  { id: 21, title: "Revelaciones peligrosas", dur: "00:42:37", thumb: "https://static.wixstatic.com/media/859174_2ce9f56b09984eeb92356e3dba4f472e~mv2.jpg", url: "https://ok.ru/videoembed/14556764310016" },
  { id: 22, title: "Dolor y confesiones", dur: "00:42:31", thumb: "https://static.wixstatic.com/media/859174_8ae4948f1b8f4332874878c7a4d90d6c~mv2.jpg", url: "https://ok.ru/videoembed/14556764703232" },
  { id: 23, title: "Juicio y pesadillas", dur: "00:41:42", thumb: "https://static.wixstatic.com/media/859174_65288823091c423ead0a40284889c330~mv2.jpg", url: "https://ok.ru/videoembed/14556765030912" },
  { id: 24, title: "El poder de los sueños", dur: "00:43:36", thumb: "https://static.wixstatic.com/media/859174_f4b598fae5914ee7a1bb1615b1889e4d~mv2.jpg", url: "https://ok.ru/videoembed/14540486609408" },
  { id: 25, title: "Ascenso amenazado", dur: "00:39:00", thumb: "https://static.wixstatic.com/media/859174_d4e8dbf5e22a40a2ad7eadf1361388c0~mv2.jpg", url: "https://ok.ru/videoembed/14540488313344" },
  { id: 26, title: "Objetivo del traidor", dur: "00:42:42", thumb: "https://static.wixstatic.com/media/859174_018c912a00804ef9a9e7a7244f181428~mv2.jpg", url: "https://ok.ru/videoembed/14540489886208" },
  { id: 27, title: "Peligro en el palacio", dur: "00:42:25", thumb: "https://static.wixstatic.com/media/859174_770b78cf63b9488295dc20e0c0c4bd47~mv2.jpg", url: "https://ok.ru/videoembed/14540492507648" },
  { id: 28, title: "Hambre y castigo", dur: "00:42:37", thumb: "https://static.wixstatic.com/media/859174_d9cbbe9380894663bb2727450cda429f~mv2.jpg", url: "https://ok.ru/videoembed/14540494080512" },
  { id: 29, title: "En Egipto", dur: "00:42:29", thumb: "https://static.wixstatic.com/media/859174_21d59b65bd4a477b8e0afe08575a37f9~mv2.jpg", url: "https://ok.ru/videoembed/14556779842048" },
  { id: 30, title: "Reencuentro inesperado", dur: "00:42:29", thumb: "https://static.wixstatic.com/media/859174_c7baf40be24d4bb2bf254f921f5c1f8d~mv2.jpg", url: "https://ok.ru/videoembed/14540497029632" },
  { id: 31, title: "El dilema de José", dur: "00:42:30", thumb: "https://static.wixstatic.com/media/859174_f850e4ca54b741b3ab0aa845734af9f3~mv2.jpg", url: "https://ok.ru/videoembed/14540498471424" },
  { id: 32, title: "Padre tu hijo esta vivo", dur: "00:41:46", thumb: "https://static.wixstatic.com/media/859174_8acdce69414d43d7af92b43fbeaedd17~mv2.jpg", url: "https://ok.ru/videoembed/14540500240896" },
  { id: 33, title: "Amor y despedida", dur: "00:38:56", thumb: "https://static.wixstatic.com/media/859174_aabf06782221457f8f48f03c18e4403e~mv2.jpg", url: "https://ok.ru/videoembed/14540502272512" }
];

const JoseDeEgiptoTV = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [focusIndex, setFocusIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  }, [selectedVideo]);

  // Cargar último episodio
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jose_last_ep');
      if (saved) {
        const idx = parseInt(saved);
        if (idx < joseEpisodes.length) setCurrentIdx(idx);
      }
    } catch (_) {}
  }, []);

  // Scroll al episodio enfocado (optimizado)
  useEffect(() => {
    if (focusIndex > 0 && !selectedVideo) {
      episodeRefs.current[focusIndex - 1]?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
    }
  }, [focusIndex, selectedVideo]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    setSelectedVideo(joseEpisodes[idx].url);
    try { localStorage.setItem('jose_last_ep', idx.toString()); } catch (_) {}
  };

  // ── CONTROL REMOTO CORREGIDO ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevenir scroll y comportamientos del navegador
      e.preventDefault();

      // ── PLAYER ACTIVO ──
      if (selectedVideo) {
        // BACK / Escape
        if (e.key === 'Backspace' || e.key === 'Escape') {
          setSelectedVideo(null);
          return;
        }
        // Siguiente episodio
        if (e.key === 'ArrowRight' && currentIdx < joseEpisodes.length - 1) {
          openEpisode(currentIdx + 1);
          return;
        }
        // Episodio anterior
        if (e.key === 'ArrowLeft' && currentIdx > 0) {
          openEpisode(currentIdx - 1);
          return;
        }
        return;
      }

      // ── NAVEGACIÓN PRINCIPAL ──
      // Navegación horizontal
      if (e.key === 'ArrowRight') {
        setFocusIndex((prev) => Math.min(prev + 1, joseEpisodes.length));
        return;
      }
      if (e.key === 'ArrowLeft') {
        setFocusIndex((prev) => Math.max(prev - 1, 0));
        return;
      }
      
      // Navegación vertical (salto de 4 en 4 para grid de 5 columnas)
      if (e.key === 'ArrowDown') {
        setFocusIndex((prev) => Math.min(prev + 4, joseEpisodes.length));
        return;
      }
      if (e.key === 'ArrowUp') {
        setFocusIndex((prev) => Math.max(prev - 4, 0));
        return;
      }
      
      // OK / Enter
      if (e.key === 'Enter') {
        if (focusIndex === 0) {
          openEpisode(currentIdx);
        } else {
          openEpisode(focusIndex - 1);
        }
        return;
      }
    };

    // Aplicar throttle de 100ms para evitar lag
    const throttledHandleKey = throttle(handleKeyDown, 100);
    
    // SOLO UN LISTENER (sin duplicar)
    window.addEventListener('keydown', throttledHandleKey);

    return () => {
      window.removeEventListener('keydown', throttledHandleKey);
    };
  }, [focusIndex, selectedVideo, currentIdx]);

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="bg-[#0a0a0a] min-h-screen text-white font-sans overflow-hidden outline-none"
      style={{ outline: 'none' }}
    >
      <Head><title>José de Egipto — Smart TV</title></Head>

      {/* ── HERO SECTION ── */}
      <div className="relative w-full h-[70vh]">
        <img
          src="https://static.wixstatic.com/media/859174_a13b7e8011764b4f815ab2438e7e0853~mv2.jpg"
          className="w-full h-full object-cover"
          alt="José de Egipto"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="absolute left-20 top-1/2 -translate-y-1/2 max-w-2xl">
          <Image
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
            alt="Logo"
            width={300}
            height={85}
            className="mb-6 object-contain"
            unoptimized
          />
          <h1 className="text-5xl font-black uppercase tracking-wider text-white mb-4">
            José de Egipto
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
            De esclavo a gobernador. La historia de un hombre cuya fe inquebrantable y sabiduría divina transformaron el destino de toda una nación.
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
            {currentIdx === 0 ? 'VER AHORA' : `CONTINUAR EP. ${joseEpisodes[currentIdx].id}`}
          </button>
        </div>

        {/* Indicador episodio actual */}
        <div className="absolute bottom-6 right-10 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
          <p className="text-xs font-black text-[#FF8A00] uppercase tracking-widest mb-1">Viendo</p>
          <p className="text-lg font-bold">EP. {joseEpisodes[currentIdx].id} — {joseEpisodes[currentIdx].title}</p>
        </div>
      </div>

      {/* ── GRID DE EPISODIOS ── */}
      <div className="px-20 -mt-6 relative z-10 pb-20">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-[#FF8A00] flex items-center gap-4">
          <span className="w-2 h-8 bg-[#FF8A00] rounded-full" />
          Capítulos
        </h2>
        <div className="grid grid-cols-5 gap-6">
          {joseEpisodes.map((ep, index) => {
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

                <div className="p-3">
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
        <div className="fixed inset-0 z-[1000] bg-black outline-none" tabIndex={0}>
          <iframe
            src={selectedVideo + "?autoplay=1"}
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

          {/* HUD superior */}
          <div className="absolute top-8 left-10 z-20 flex items-center gap-4 bg-black/70 px-6 py-4 rounded-xl backdrop-blur-md border border-white/10">
            <div className="w-2 h-12 bg-[#FF8A00] rounded-full" />
            <div>
              <p className="text-xs font-black text-[#FF8A00] uppercase tracking-widest">José de Egipto</p>
              <h2 className="text-2xl font-bold">Cap. {joseEpisodes[currentIdx].id} — {joseEpisodes[currentIdx].title}</h2>
              <p className="text-sm text-gray-400">{joseEpisodes[currentIdx].dur}</p>
            </div>
          </div>

          {/* Controles inferiores */}
          <div className="absolute bottom-8 inset-x-0 z-20 flex items-center justify-between px-16">
            <button
              disabled={currentIdx === 0}
              onClick={() => openEpisode(currentIdx - 1)}
              className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-8 py-4 rounded-xl border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-all"
            >
              <IoChevronBack className="text-3xl" />
              <div className="text-left">
                <p className="text-xs text-[#FF8A00] font-black uppercase tracking-widest">Anterior</p>
                <p className="text-sm font-bold">{currentIdx > 0 ? `EP. ${joseEpisodes[currentIdx - 1].id} — ${joseEpisodes[currentIdx - 1].title}` : ''}</p>
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
              disabled={currentIdx === joseEpisodes.length - 1}
              onClick={() => openEpisode(currentIdx + 1)}
              className="flex items-center gap-4 bg-[#FF8A00] px-8 py-4 rounded-xl disabled:opacity-20 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,138,0,0.4)]"
            >
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest">Siguiente</p>
                <p className="text-sm font-bold">{currentIdx < joseEpisodes.length - 1 ? `EP. ${joseEpisodes[currentIdx + 1].id} — ${joseEpisodes[currentIdx + 1].title}` : ''}</p>
              </div>
              <IoChevronForward className="text-3xl" />
            </button>
          </div>

          {/* Indicador control remoto */}
          <div className="absolute bottom-8 right-6 z-20 text-gray-600 text-sm font-bold tracking-widest">
            ← → Episodios · ESC Salir
          </div>
        </div>
      )}

      <style jsx global>{`
        body { overflow: hidden; background: #0a0a0a; }
        img { pointer-events: none !important; -webkit-user-drag: none; }
        * { -webkit-user-select: none; user-select: none; }
        *:focus { outline: none; }
      `}</style>
    </div>
  );
};

export default JoseDeEgiptoTV;
