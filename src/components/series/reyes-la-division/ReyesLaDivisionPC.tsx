import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCheckmarkCircle, IoPlayCircleOutline, IoAlertCircleOutline } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const ReyesDivisionPC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Estados para la Encuesta y Contador
  const [votosSi, setVotosSi] = useState(0);
  const [votosNo, setVotosNo] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 0, seconds: 0 });

  const SERIES_ID = 30; 
  const VIDEO_TEST_URL = "https://ok.ru/videoembed/15751107119616";

  useEffect(() => {
    // --- BLINDAJE TOTAL ---
    const handleGlobalPrevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleGlobalPrevent);
    document.addEventListener('dragstart', handleGlobalPrevent);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || (e.metaKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || e.key === 'F12') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Inicializar votos locales para simulación
    const savedSi = localStorage.getItem('votos_si_test');
    const savedNo = localStorage.getItem('votos_no_test');
    if (savedSi) setVotosSi(parseInt(savedSi));
    if (savedNo) setVotosNo(parseInt(savedNo));

    const myListData = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myListData.includes(SERIES_ID)) setInMyList(true);

    // --- LÓGICA DEL CONTADOR (14 HORAS) ---
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent);
      document.removeEventListener('dragstart', handleGlobalPrevent);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  // --- BUSCADOR ---
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const filtered = allSeries.filter(serie => normalize(serie.title).includes(term));
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { list = list.filter((i: number) => i !== SERIES_ID); setInMyList(false); }
    else { list.push(SERIES_ID); setInMyList(true); }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  const handleVoto = (tipo: 'si' | 'no') => {
    if (tipo === 'si') {
      const nuevoTotal = votosSi + 1;
      setVotosSi(nuevoTotal);
      localStorage.setItem('votos_si_test', nuevoTotal.toString());
    } else {
      const nuevoTotal = votosNo + 1;
      setVotosNo(nuevoTotal);
      localStorage.setItem('votos_no_test', nuevoTotal.toString());
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>Prueba de Conectividad — Estudios 421</title></Head>

      {/* --- NAVEGACIÓN --- */}
      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/" className="relative group text-white text-[15px] font-medium tracking-wide">Inicio<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-biblicas" className="relative group text-white text-[15px] font-medium tracking-wide">Series Bíblicas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-tv" className="relative group text-white text-[15px] font-medium tracking-wide">Series TV<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/peliculas" className="relative group text-white text-[15px] font-medium tracking-wide">Películas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/reyes-la-division' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/kings-the-division' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/reis-a-divisao' }].map((l) => (
              <Link key={l.n} href={l.p}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* --- BANNER --- */}
      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_8ccb6683bc06431d9cd0c56fa070ce80~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reyes: La División" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[20px] left-16 flex flex-col gap-4 z-20 items-start">
          <div className="bg-[#FF8A00] text-black font-black py-2 px-6 rounded-md text-3xl shadow-2xl flex gap-4 font-mono">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <div className="flex gap-6">
            <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
          </div>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      {/* --- SECCIÓN DE ENCUESTA Y VIDEO (NUEVA) --- */}
      <div className="px-16 mb-40 relative z-10 flex flex-col items-center">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4 w-full">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Control de Calidad de Video</h2>
        </header>

        <div className="max-w-5xl w-full bg-[#111] border border-white/10 rounded-[40px] p-12 shadow-3xl text-center">
            <h3 className="text-5xl font-black uppercase mb-4 text-white tracking-tighter">LEA Y ENTIENDA BIEN</h3>
            <p className="text-lg text-gray-400 font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
                Debido a reportes de algunos usuarios que no pueden visualizar el contenido, estamos realizando esta encuesta técnica. Por favor, intente reproducir el video de abajo y vote según su resultado.
            </p>

            <div className="flex justify-center gap-8 mb-16">
                <button 
                  onClick={() => handleVoto('si')}
                  className="group flex-1 bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-green-500 transition-all transform hover:scale-105"
                >
                    <span className="block text-4xl font-black text-green-500 mb-2">{votosSi}</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-white">SÍ puedo ver el video</span>
                </button>

                <button 
                  onClick={() => handleVoto('no')}
                  className="group flex-1 bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-red-500 transition-all transform hover:scale-105"
                >
                    <span className="block text-4xl font-black text-red-500 mb-2">{votosNo}</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-white">NO puedo ver el video</span>
                </button>
            </div>

            {/* VIDEO DE PRUEBA */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,138,0,0.2)] bg-black border border-white/5">
                <iframe 
                    src={VIDEO_TEST_URL} 
                    className="absolute inset-0 w-full h-full" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen 
                />
            </div>
            <p className="mt-6 text-gray-500 text-xs italic flex items-center justify-center gap-2">
                <IoAlertCircleOutline size={16} /> Pruebe la reproducción antes de emitir su voto.
            </p>
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start md:justify-end gap-6 mb-10 text-xl">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max" target="_blank" rel="noreferrer" className="hover:text-white"><FaYoutube /></a>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-10 text-justify italic italic-none">
            Aviso: Esta encuesta es temporal para optimizar la experiencia de usuario en Reyes: La División.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <Link href="/politica-de-privacidad" className="hover:text-white">Política de privacidad</Link>
            <Link href="/terminos-de-uso" className="hover:text-white">Términos de uso</Link>
            <Link href="/ayuda" className="hover:text-white">Centro de ayuda</Link>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default ReyesDivisionPC;
