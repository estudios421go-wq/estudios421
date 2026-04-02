import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCheckmarkCircle, IoPlay } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE LA PELÍCULA (ID: 60) ---
const MOVIE_DATA = {
  id: 60,
  title: "La Pasión De Cristo",
  titleEn: "The Passion of the Christ",
  titlePt: "A Paixão de Cristo",
  url: "https://drive.google.com/file/d/1Ny9P8IUje_RZmsbkDrPBClV9Pmn0_7ol/preview",
  banner: "https://static.wixstatic.com/media/859174_d865ffa84f264770bbd4b4e86487fb89~mv2.jpg",
  desc: "Una representación visualmente impactante y profundamente conmovedora de las últimas doce horas en la vida de Jesús de Nazaret. Dirigida por Mel Gibson, la película narra con detalle el sacrificio, la fe y el camino hacia la crucifixión, convirtiéndose en una obra maestra del cine bíblico."
};

const LaPasionDeCristoPC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [randomMovies, setRandomMovies] = useState<any[]>([]);

  useEffect(() => {
    // Seguridad y Scroll
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

    // Mi Lista
    const myListData = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myListData.includes(MOVIE_DATA.id)) setInMyList(true);

    // Lógica de Recomendaciones Aleatorias (Filtra películas excepto la actual)
    const moviesOnly = allSeries.filter(s => s.category === 'Película' && s.id !== MOVIE_DATA.id);
    const shuffled = [...moviesOnly].sort(() => 0.5 - Math.random());
    setRandomMovies(shuffled.slice(0, 3));

    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent);
      document.removeEventListener('dragstart', handleGlobalPrevent);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Buscador
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const filtered = allSeries.filter(serie => normalize(serie.title).includes(term) || normalize(serie.category || "").includes(term));
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { 
      list = list.filter((i: number) => i !== MOVIE_DATA.id); 
      setInMyList(false); 
    } else { 
      list.push(MOVIE_DATA.id); 
      setInMyList(true); 
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>{MOVIE_DATA.title} — Estudios 421</title></Head>

      {/* NAVBAR (Deducción de idiomas incluida) */}
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
            <Link href={`/pelicula/${MOVIE_DATA.title.toLowerCase().replace(/ /g, '-')}`}><img src="https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" alt="ES" /></Link>
            <Link href={`/en/movie/${MOVIE_DATA.titleEn.toLowerCase().replace(/ /g, '-')}`}><img src="https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e~mv2.png" className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" alt="EN" /></Link>
            <Link href={`/pt/filme/${MOVIE_DATA.titlePt.toLowerCase().replace(/ /g, '-')}`}><img src="https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc~mv2.png" className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" alt="PT" /></Link>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* SEARCH RESULTS */}
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

      {/* HERO SECTION - REPRODUCTOR FIJO */}
      <div className="relative w-full h-[90vh] bg-black">
        {!showPlayer ? (
          <>
            <img src={MOVIE_DATA.banner} className="w-full h-full object-cover animate-fade-in" alt={MOVIE_DATA.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-16 z-20 max-w-2xl">
              <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter italic">{MOVIE_DATA.title}</h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed text-justify">{MOVIE_DATA.desc}</p>
              <div className="flex gap-4">
                <button onClick={() => setShowPlayer(true)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 flex items-center gap-2 uppercase tracking-tighter">
                  <IoPlay size={24}/> Ver Ahora
                </button>
                <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
                  {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
                </button>
                <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full pt-[80px]">
             <iframe src={MOVIE_DATA.url} className="w-full h-full border-none shadow-[0_0_50px_rgba(255,138,0,0.1)]" allow="fullscreen" allowFullScreen />
          </div>
        )}
      </div>

      {/* RECOMENDACIONES ALEATORIAS */}
      <div className="px-16 py-20 bg-black">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Te puede interesar también</h2>
        </header>
        <div className="grid grid-cols-3 gap-10">
          {randomMovies.map((movie) => (
            <Link key={movie.id} href={movie.path}>
              <div className="group cursor-pointer relative overflow-hidden rounded-lg aspect-video border border-white/5 hover:border-[#FF8A00]/50 transition-all duration-500">
                <Image src={movie.banner} alt={movie.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-[#FF8A00] transition-colors">{movie.title}</h3>
                  <span className="text-[10px] bg-[#FF8A00] text-black px-2 py-0.5 font-bold rounded mt-2 inline-block uppercase">Película</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER (Intocable) */}
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
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <Link href="/politica-de-privacidad" className="hover:text-white transition-colors">Política de privacidad</Link>
            <Link href="/terminos-de-uso" className="hover:text-white transition-colors">Términos de uso</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Configuración de cookies</Link>
            <Link href="/anuncios" className="hover:text-white transition-colors">Especificaciones de anuncios</Link>
            <Link href="/ayuda" className="hover:text-white transition-colors">Centro de ayuda</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .unselectable { -webkit-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
        .animate-fade-in { animation: fadeIn 1.2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default LaPasionDeCristoPC;
