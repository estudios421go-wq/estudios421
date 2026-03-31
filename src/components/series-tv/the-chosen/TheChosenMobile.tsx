import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 46) ---
const chosenEpisodes = [
  // TEMPORADA 1
  { id: 1, season: 1, title: "TE LLAMÉ POR TU NOMBRE", thumb: "https://static.wixstatic.com/media/859174_5f63429ca9ad46bfb9985ef6920f973b~mv2.jpg", url: "https://drive.google.com/file/d/1vr_79yKpRJH0iyvtbtil-_y3jZ83Qaqw/preview" },
  { id: 2, season: 1, title: "SABBAT", thumb: "https://static.wixstatic.com/media/859174_f5d1006bc7b6468ebe0c5d6977da510a~mv2.jpg", url: "https://drive.google.com/file/d/1O_dX84viLF1D1vtrSL5ZCx_tzx8JscXQ/preview" },
  { id: 3, season: 1, title: "JESÚS AMA A LOS NIÑOS", thumb: "https://static.wixstatic.com/media/859174_fcdd3a3408bc4a9f9d3e29b055af1446~mv2.jpg", url: "https://drive.google.com/file/d/1dr18c0Oa2-JUmB95R-eaaFjhbBMKZ9jo/preview" },
  { id: 4, season: 1, title: "LA ROCA SOBRE LA CUAL SE CONSTRUYE", thumb: "https://static.wixstatic.com/media/859174_18a2a22ce0a4457185a2f3232a06a73b~mv2.jpg", url: "https://drive.google.com/file/d/1Pnvzs7SxM1QWjRdiBze-XWBKRv0vIFE8/preview" },
  { id: 5, season: 1, title: "EL REGALO DE BODA", thumb: "https://static.wixstatic.com/media/859174_47a03d8ffe34421380b94e84329a14b3~mv2.jpg", url: "https://drive.google.com/file/d/1FGJNAeywTlSZ8pr0m-F513NpRsdNaiwo/preview" },
  { id: 6, season: 1, title: "COMPASIÓN INDESCRIPTIBLE", thumb: "https://static.wixstatic.com/media/859174_cf3c45031e3a4da59794a922c19dd240~mv2.jpg", url: "https://drive.google.com/file/d/1TOL1tDyoPK0O_xbfFZdyG7C23Qzgl2WC/preview" },
  { id: 7, season: 1, title: "INVITACIONES", thumb: "https://static.wixstatic.com/media/859174_d31adafb238c4eb7a90587e22f1becf2~mv2.jpg", url: "https://drive.google.com/file/d/1Kvv-678YUj7YtWWmLxiN8eYc3vVenE6S/preview" },
  { id: 8, season: 1, title: "YO SOY ÉL", thumb: "https://static.wixstatic.com/media/859174_3d76d9776dce431a9c1ad97879d1a128~mv2.jpg", url: "https://drive.google.com/file/d/1b-rp0298Ov0SXzN39h00xj0eh6amdKbI/preview" },
  
  // TEMPORADA 2
  { id: 9, season: 2, title: "TRUENO", thumb: "https://static.wixstatic.com/media/859174_537d781664ca4d2ea43fa922df151aee~mv2.jpg", url: "https://drive.google.com/file/d/1s_Lv1smKUoO8z06CxftcVqXQUj8iDc7R/preview" },
  { id: 10, season: 2, title: "TE VI", thumb: "https://static.wixstatic.com/media/859174_2eee141f2b1a423cb58e365ff1af16fd~mv2.jpg", url: "https://drive.google.com/file/d/1FVx3QX7tTlRxbU7XEfzgTLKFhWSMNQRE/preview" },
  { id: 11, season: 2, title: "MATEO 4:24", thumb: "https://static.wixstatic.com/media/859174_0e59ed117bca471e8f06efcda0047e70~mv2.jpg", url: "https://drive.google.com/file/d/1SmjiGIoNdGs6mVBGigCscpUkj8x4tvL7/preview" },
  { id: 12, season: 2, title: "LA OPORTUNIDAD PERFECTA", thumb: "https://static.wixstatic.com/media/859174_77e2d14a7edd466db70d9c1f815d557f~mv2.jpg", url: "https://drive.google.com/file/d/19F_sZaf8hLd-qsZYOCF7PLBjdC5kUjGJ/preview" },
  { id: 13, season: 2, title: "ESPÍRITU", thumb: "https://static.wixstatic.com/media/859174_8f1eb55aa6bc4e789affbb9cc9396658~mv2.jpg", url: "https://drive.google.com/file/d/1xvTO4BKuACHs5jrIVMIACYd5RVyscrSo/preview" },
  { id: 14, season: 2, title: "ILEGAL", thumb: "https://static.wixstatic.com/media/859174_15e010af0e134644b9a0db8c5041f71d~mv2.jpg", url: "https://drive.google.com/file/d/1h8OfzxZr2FMrmTrdD8b6qKaQtNTnc8eZ/preview" },
  { id: 15, season: 2, title: "ENFRENTAMIENTO", thumb: "https://static.wixstatic.com/media/859174_f7437509c5f54fe6a3cf5689ccf39bf3~mv2.jpg", url: "https://drive.google.com/file/d/1kuThzchyQ-YQ0BKjVtcN7UWjn5JqIPi5/preview" },
  { id: 16, season: 2, title: "MÁS ALLÁ DE LAS MONTAÑAS", thumb: "https://static.wixstatic.com/media/859174_15bbfda48dce4725b1b3a52f76dc671a~mv2.jpg", url: "https://drive.google.com/file/d/1waouC96jCrJ7eTQ7vlxv1ZEJkdXILrCW/preview" },

  // TEMPORADA 3
  { id: 17, season: 3, title: "BIENVENIDA", thumb: "https://static.wixstatic.com/media/859174_44469e1b65b34a449d5486b7954fbce1~mv2.jpg", url: "https://drive.google.com/file/d/13ykl6PLvchJ4uHjIted3hrSwI3aBVM5N/preview" },
  { id: 18, season: 3, title: "DE DOS EN DOS", thumb: "https://static.wixstatic.com/media/859174_1edf6b4750b94a3b8fa858ac11fef44f~mv2.jpg", url: "https://drive.google.com/file/d/1j4PMA_xOqzo8zE4IGwa0_sA1GRoKkIAB/preview" },
  { id: 19, season: 3, title: "MÉDICO; SÁNATE A TI MISMO", thumb: "https://static.wixstatic.com/media/859174_2847057a452d4ae3ac57b331b77dacc6~mv2.jpg", url: "https://drive.google.com/file/d/1Hw9417h-40tqwcT8ajwA0JO7dMDiOFWS/preview" },
  { id: 20, season: 3, title: "LIMPIOS", thumb: "https://static.wixstatic.com/media/859174_bc6bee5df38448e198d1669f679a09a9~mv2.jpg", url: "https://drive.google.com/file/d/1J3jIRljPOXt3Q7BLySIo8gGprmBMIqFp/preview" },
  { id: 21, season: 3, title: "LIMPIOS (PARTE II)", thumb: "https://static.wixstatic.com/media/859174_39648f03968a4049ab33c2c3663b7b7f~mv2.jpg", url: "https://drive.google.com/file/d/1QaXXp0k6TDFQqXAwy0ANzm-wE-Y8ZIJA/preview" },
  { id: 22, season: 3, title: "INTENSIDAD EN EL CAMPAMENTO", thumb: "https://static.wixstatic.com/media/859174_4af841f241e74b6ab63dbfb51a9f2ee8~mv2.jpg", url: "https://drive.google.com/file/d/1GUgx39Rh5fRlEi89c3Jt_4Z_dP7q2RsM/preview" },
  { id: 23, season: 3, title: "OÍDOS PARA OÍR", thumb: "https://static.wixstatic.com/media/859174_62fceadb7155401fadcdfd034036e25d~mv2.jpg", url: "https://drive.google.com/file/d/_YiyDGCeRmNu6Far3lp3rL32nBKBClBd/preview" },
  { id: 24, season: 3, title: "SUSTENTO", thumb: "https://static.wixstatic.com/media/859174_c822b114835a40ff96be3d1bfdad4e41~mv2.jpg", url: "https://drive.google.com/file/d/1JFc4ceUHwkAvPT0q1OQXglku4t6mla18/preview" },

  // TEMPORADA 4
  { id: 25, season: 4, title: "PROMESAS", thumb: "https://static.wixstatic.com/media/859174_78f11d7d91264c3094db84a6f679ee92~mv2.jpg", url: "https://drive.google.com/file/d/1b7kd8tlWHHxHT2Vs3U4zbwriw2yVA3TO/preview" },
  { id: 26, season: 4, title: "CONFESIONES", thumb: "https://static.wixstatic.com/media/859174_02b49dd5020541d7923662cc3ba8b599~mv2.jpg", url: "https://drive.google.com/file/d/1AtYRE3zFgnAmrE9TL6ogkKja_COk1cDk/preview" },
  { id: 27, season: 4, title: "LUNA Y SANGRE", thumb: "https://static.wixstatic.com/media/859174_e4252cd71fe6443a862429d4c1f588b2~mv2.jpg", url: "https://drive.google.com/file/d/12k_ZRjSlv6MkSnK5GLlTrcfBGh7AI_oU/preview" },
  { id: 28, season: 4, title: "LA CALMA PREVIA", thumb: "https://static.wixstatic.com/media/859174_cec76b31d2d141f890e33956fb650700~mv2.jpg", url: "https://drive.google.com/file/d/1O0pnNIY0cfXw5jcPD433JKmAltDQ-qGd/preview" },
  { id: 29, season: 4, title: "SENTARSE; SERVIR; CONFABULAR", thumb: "https://static.wixstatic.com/media/859174_8117841842c443baa6eb465d06dd684a~mv2.jpg", url: "https://drive.google.com/file/d/1CROg-G4lM1vDCLF7oZR7pYifv1TyznKn/preview" },
  { id: 30, season: 4, title: "DEDICACIÓN", thumb: "https://static.wixstatic.com/media/859174_bde1f30ceeea41938f34eaa7315f4b06~mv2.jpg", url: "https://drive.google.com/file/d/1LJ_kybMsSrRInbUujm4h-xfzE4VIk3rD/preview" },
  { id: 31, season: 4, title: "LA ÚLTIMA SEÑAL", thumb: "https://static.wixstatic.com/media/859174_b1420ed1552d4154bc337dbd5f946d8b~mv2.jpg", url: "https://drive.google.com/file/d/1kkhIENurh5oEqHOLKzlxBAsPSm4S8sIm/preview" },
  { id: 32, season: 4, title: "HUMILDAD", thumb: "https://static.wixstatic.com/media/859174_556982894cf44506a5d0ca4119639aa8~mv2.jpg", url: "https://drive.google.com/file/d/1tXfoBq2WHWE_ZlGHwaHvRfpfL6p9EKax/preview" },

  // TEMPORADA 5
  { id: 33, season: 5, title: "LLEGADA", thumb: "https://static.wixstatic.com/media/859174_740d36b6579d4693a75004b641587b6c~mv2.jpg", url: "https://drive.google.com/file/d/1eC0sJBpfaVRmd3nQiOBl8bNVgqjvdkYe/preview" },
  { id: 34, season: 5, title: "JUEGO DE PODER", thumb: "https://static.wixstatic.com/media/859174_20e2da631f88461dbf2daf9b885983f3~mv2.jpg", url: "https://drive.google.com/file/d/1mtJF-i4sGnQvS496spfC7ZmYkv50oPq2/preview" },
  { id: 35, season: 5, title: "PENAS", thumb: "https://static.wixstatic.com/media/859174_c68f06adff594a27b519f9168185b0c5~mv2.jpg", url: "https://drive.google.com/file/d/1VdGxjRCT-D_dQVdLG6mA7OlQr20KSz4j/preview" },
  { id: 36, season: 5, title: "LA MISMA MONEDA", thumb: "https://static.wixstatic.com/media/859174_ff47aae2fcab4e31819e7d47c0b4f3db~mv2.jpg", url: "https://drive.google.com/file/d/1gtxAqMu9WNju8BgycFgn3yH5d7-sbB34/preview" },
  { id: 37, season: 5, title: "POR CULPA MÍA", thumb: "https://static.wixstatic.com/media/859174_969c322581a141fda6343a46b67789b9~mv2.jpg", url: "https://drive.google.com/file/d/14urv7yH4IPkahAlypKjePfrfc5S9iQ5T/preview" },
  { id: 38, season: 5, title: "REUNIONES", thumb: "https://static.wixstatic.com/media/859174_419515ba35444e0789b10b6de0e63b8e~mv2.jpg", url: "https://drive.google.com/file/d/1SSzngVIAFfFNllIrKUZf6hITO5EcsLGL/preview" },
  { id: 39, season: 5, title: "LA HABITACIÓN DE ARRIBA - PARTE I", thumb: "https://static.wixstatic.com/media/859174_aafbb24f1532420cb559269543686c01~mv2.jpg", url: "https://drive.google.com/file/d/1JNgAeJdTw5t11Hjc65fe5GH7ChpDZPlp/preview" },
  { id: 40, season: 5, title: "LA HABITACIÓN DE ARRIBA - PARTE II", thumb: "https://static.wixstatic.com/media/859174_8dedc068d2c54b2297c5834d5e8c9431~mv2.jpg", url: "https://drive.google.com/file/d/14eRBHaROua4YCQdCqeXenua68uYZDQRe/preview" },
];

const TheChosenMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 46;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('chosen_mobile_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto', 'exodo'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen', 'casa de david'],
        david: ['david', 'casa de david', 'reyes', 'goliat', 'saul'],
        ester: ['ester', 'reina de persia', 'persia'],
        jesus: ['jesus', 'the chosen', 'elegidos', 'mesias', 'cristo'],
        biblia: ['biblia', 'continua', 'testamento', 'milagros']
      };
      const relatedTerms = new Set<string>();
      relatedTerms.add(term);
      Object.entries(themeMap).forEach(([key, values]) => {
        if (term.includes(key) || key.includes(term)) values.forEach(v => relatedTerms.add(v));
      });
      const filtered = allSeries.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return Array.from(relatedTerms).some(t => titleNormalized.includes(t)) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    setSelectedVideo(chosenEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('chosen_mobile_last_ep', idx.toString());
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { 
      list = list.filter((id: any) => id !== SERIES_ID); 
      setInMyList(false); 
    } else { 
      list.push(SERIES_ID); 
      setInMyList(true); 
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  if (selectedVideo) {
    return (
      <div className="fixed inset-0 z-[2000] bg-[#050608] flex flex-col overflow-hidden text-left">
        <Head><title>REPRODUCIENDO: {chosenEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">SERIE: THE CHOSEN</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              T.{chosenEpisodes[currentIdx].season} | {chosenEpisodes[currentIdx].title}
            </h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center">
          <iframe src={selectedVideo} className="w-full aspect-video border-none shadow-[0_0_50px_rgba(0,0,0,1)]" allow="autoplay; fullscreen" allowFullScreen />
          
          {/* INSTRUCCIÓN DRIVE PANTALLA COMPLETA */}
          <div className="mt-6 px-8 text-center">
            <p className="text-[#FF8A00] font-black text-sm leading-tight uppercase animate-pulse">
              TOCA DOS VECES EL VIDEO PARA ACTIVAR/SALIR DE PANTALLA COMPLETA
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#F09800] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">ANTERIOR</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#F09800]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">EPISODIOS</span>
            </button>
            <button disabled={currentIdx === chosenEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#F09800] text-black flex items-center justify-center shadow-[0_0_20px_rgba(240,152,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#F09800]">SIGUIENTE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800] text-left">
      <Head><title>THE CHOSEN — ESTUDIOS 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#F09800] transition-all" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#F09800]" />RESULTADOS: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">NAVEGACIÓN</p>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Inicio</Link>
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series Bíblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">IDIOMA</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/series-tv/the-chosen'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/the-choosen'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/os-escolhidos'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_15eead65a9a54011b14ad274056ecd56~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${chosenEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest">❤ DONAR</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">EPISODIOS DISPONIBLES</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left">
          {chosenEpisodes.map((ep, index) => (
            <div key={index} className="flex flex-col gap-2.5 active:scale-95 transition-all" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#F09800] shadow-[0_0_15px_rgba(240,152,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-1.5 left-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">
                  T.{ep.season}
                </div>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
          <p className="text-[9px] leading-relaxed text-gray-600 font-medium tracking-tight">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro para la difusión de contenido bíblico.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">POLÍTICA DE PRIVACIDAD</Link>
          <Link href="/terminos-de-uso">TÉRMINOS DE USO</Link>
          <Link href="/cookies">CONFIGURACIÓN DE COOKIES</Link>
          <Link href="/anuncios">ESPECIFICACIONES DE ANUNCIOS</Link>
          <Link href="/ayuda">CENTRO DE AYUDA</Link>
        </div>
      </footer>
    </div>
  );
};

export default TheChosenMobile;
