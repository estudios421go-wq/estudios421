import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCheckmarkCircle, IoShareSocialOutline, IoCopyOutline } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const ReyesDivisionPC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const SERIES_ID = 30; // ID para La División
  const SHARE_URL = "https://estudios421.com/serie/reyes-la-division";

  useEffect(() => {
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

    const myListData = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myListData.includes(SERIES_ID)) setInMyList(true);

    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent);
      document.removeEventListener('dragstart', handleGlobalPrevent);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    if (inMyList) {
      list = list.filter((i: number) => i !== SERIES_ID);
      setInMyList(false);
    } else {
      list.push(SERIES_ID);
      setInMyList(true);
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Reyes: La División',
          text: '¡Mira la nueva temporada de Reyes en Estudios 421!',
          url: SHARE_URL,
        });
      } catch (err) { console.log("Error compartiendo"); }
    } else {
      navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>Reyes: La División — Estudios 421</title></Head>

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
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/reyes-la-division' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/reyes-la-division' }].map((l) => (
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

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[120] pt-24 px-16 overflow-y-auto pb-20">
          <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Resultados: "{searchQuery}"</h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-10">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      {/* --- HERO BANNER --- */}
      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_b76e27a9221147f4850e047321e06e30~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reyes: La División" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black py-4 px-12 rounded-sm text-lg shadow-2xl uppercase select-none">
            ⏳ Gran Estreno Pronto
          </div>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-40 bg-black"></div>

      {/* --- SECCIÓN PRINCIPAL: COMPARTIR --- */}
      <div className="px-16 mb-40 relative z-10 flex flex-col items-center text-center">
        <header className="flex flex-col items-center gap-4 mb-16">
            <span className="text-[#FF8A00] font-black tracking-[0.4em] uppercase text-sm">Temporada 11</span>
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-tight">Reyes: La División</h2>
            <div className="w-24 h-1.5 bg-[#FF8A00] mt-4"></div>
        </header>

        <div className="max-w-4xl bg-white/[0.03] border border-white/10 rounded-[40px] p-16 shadow-2xl backdrop-blur-sm">
            <p className="text-2xl text-gray-300 font-medium leading-relaxed mb-12">
                Estamos preparando los episodios más impactantes de la historia de Israel. Ayúdanos a llevar este mensaje a más personas compartiendo el sitio oficial.
            </p>
            
            <div className="flex flex-col gap-6">
                <button 
                  onClick={handleShare}
                  className="group relative bg-[#FF8A00] text-black font-black py-8 px-20 rounded-2xl text-2xl uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_60px_rgba(255,138,0,0.3)] overflow-hidden"
                >
                    <span className="relative z-10 flex items-center justify-center gap-4">
                        <IoShareSocialOutline size={32} />
                        {copied ? "¡ENLACE COPIADO!" : "Compartir este Sitio"}
                    </span>
                    <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                </button>

                <div className="flex justify-center gap-8 mt-4 text-gray-400">
                    <button onClick={() => window.open(`https://api.whatsapp.com/send?text=${SHARE_URL}`, '_blank')} className="hover:text-[#25D366] transition-colors flex flex-col items-center gap-2">
                        <FaWhatsapp size={40} /><span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
                    </button>
                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`, '_blank')} className="hover:text-[#1877F2] transition-colors flex flex-col items-center gap-2">
                        <FaFacebookF size={35} /><span className="text-[10px] font-bold uppercase tracking-widest">Facebook</span>
                    </button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${SHARE_URL}`, '_blank')} className="hover:text-white transition-colors flex flex-col items-center gap-2">
                        <FaXTwitter size={35} /><span className="text-[10px] font-bold uppercase tracking-widest">X / Twitter</span>
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start md:justify-end gap-6 mb-10">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico.</p>
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
