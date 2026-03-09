import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoHeart } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// IMPORTANTE: Asegúrate de que esta ruta sea la correcta en tu estructura
import { allSeries } from '../../data/series'; 

const SeriesBiblicasPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const bibleSeries = [
    { id: 1, title: "Génesis", path: "/serie/genesis", banner: "https://static.wixstatic.com/media/859174_cb6e3b25765e45c6ae58bc0fc1b74217~mv2.jpg" },
    { id: 2, title: "Lea", path: "/serie/lea", banner: "https://static.wixstatic.com/media/859174_f60859f86c8b433c98ac32aeab2eb9f6~mv2.jpg" },
    { id: 3, title: "La Vida de Job", path: "/serie/la-vida-of-job", banner: "https://static.wixstatic.com/media/859174_d44fd5197e95499f82ecbfcbcd9edd0f~mv2.jpg" },
    { id: 4, title: "José de Egipto", path: "/serie/jose-de-egipto", banner: "https://static.wixstatic.com/media/859174_c758bbc293a64584a5c0f6618c774438~mv2.jpg" },
    { id: 5, title: "Moisés y los Diez Mandamientos", path: "/serie/moises-y-los-diez-mandamientos", banner: "https://static.wixstatic.com/media/859174_3c12a4bdb6554faf8f6a98f9192a4495~mv2.jpg" },
    { id: 6, title: "La Tierra Prometida", path: "/serie/la-tierra-prometida", banner: "https://static.wixstatic.com/media/859174_8bc7796b62004142b6305588765b4bb1~mv2.jpg" },
    { id: 7, title: "Sansón y Dalila", path: "/serie/sanson-y-dalila", banner: "https://static.wixstatic.com/media/859174_69bb9036874f4f35a49fd6aa965c1500~mv2.jpg" },
    { id: 10, title: "Rey David", path: "/serie/rey-david", banner: "https://static.wixstatic.com/media/859174_d35b71896faa44f9a2c0bfa811e3cf82~mv2.jpg" },
    { id: 11, title: "Reyes", path: "/serie/reyes", banner: "https://static.wixstatic.com/media/859174_a28c5101e4564259b50a9fe023f838ce~mv2.jpg" },
    { id: 12, title: "Reyes: La Decepción", path: "/serie/reyes-la-decepcion", banner: "https://static.wixstatic.com/media/859174_ccfb663fa47547dab8373e765ca93a8a~mv2.jpg" },
    { id: 13, title: "Reyes: La Ingratitud", path: "/serie/reyes-la-ingratitud", banner: "https://static.wixstatic.com/media/859174_d0892b21f08a446289fcb6051c475fbf~mv2.jpg" },
    { id: 14, title: "Reyes: El Rechazo", path: "/serie/reyes-el-rechazo", banner: "https://static.wixstatic.com/media/859174_982040e56f8649d490b0ecf567fc77c9~mv2.jpg" },
    { id: 15, title: "Reyes: La Elección", path: "/serie/reyes-la-eleccion", banner: "https://static.wixstatic.com/media/859174_62d05f6085dd4bea8d08b135634b314f~mv2.jpg" },
    { id: 16, title: "Reyes: La Persecución", path: "/serie/reyes-la-persecucion", banner: "https://static.wixstatic.com/media/859174_ba78426c27984b31830ab16e514f256f~mv2.jpg" },
    { id: 17, title: "Reyes: La Conquista", path: "/serie/reyes-la-conquista", banner: "https://static.wixstatic.com/media/859174_2b873570496245d58d8ca8d2a8dbc73a~mv2.jpg" },
    { id: 18, title: "Reyes: El Pecado", path: "/serie/reyes-el-pecado", banner: "https://static.wixstatic.com/media/859174_cc6c3522c6cb4c178cf040802a5388c8~mv2.jpg" },
    { id: 19, title: "Reyes: La Consecuencia", path: "/serie/reyes-la-consecuencia", banner: "https://static.wixstatic.com/media/859174_06deb8a1a83b44859ab3c289d7865063~mv2.jpg" },
    { id: 20, title: "Reyes: La Sucesión", path: "/serie/reyes-la-sucesion", banner: "https://static.wixstatic.com/media/859174_6d0d17cdb39949fbbd1b4300ae546fee~mv2.jpg" },
    { id: 21, title: "Reyes: La Decadencia", path: "/serie/reyes-la-decadencia", banner: "https://static.wixstatic.com/media/859174_adaa8cfdfa56490b9a6749ad043c4668~mv2.jpg" },
    { id: 22, title: "Reyes: La División", path: "/serie/reyes-la-division", banner: "https://static.wixstatic.com/media/859174_3b898ed4b04a482c95689301a9c1cd3e~mv2.jpg" },
    { id: 23, title: "Reyes: La Emboscada", path: "/serie/reyes-la-emboscada", banner: "https://static.wixstatic.com/media/859174_89d8a7ac07d346069a8612cfa602a479~mv2.jpg" },
    { id: 24, title: "Reyes: La Esperanza", path: "/serie/reyes-la-esperanza", banner: "https://static.wixstatic.com/media/859174_357e2e8b38f0470a851f5faa71a629b5~mv2.jpg" },
    { id: 25, title: "La Ira del Heredero", path: "/serie/la-ira-del-heredero", banner: "https://static.wixstatic.com/media/859174_179fc20557b44a55bc7cedb6932a4578~mv2.jpg" },
    { id: 26, title: "Jezabel", path: "/serie/jezabel", banner: "https://static.wixstatic.com/media/859174_66eb8f0ad7f24f74ba18dbf425a45255~mv2.jpg" },
    { id: 27, title: "El Rico y Lázaro", path: "/serie/el-rico-y-lazaro", banner: "https://static.wixstatic.com/media/859174_f0e5feba039845ac8c6ffd643050e1ed~mv2.jpg" },
    { id: 28, title: "La Historia de la Reina Ester", path: "/serie/la-historia-de-la-reina-ester", banner: "https://static.wixstatic.com/media/859174_0ae505b5c0fb47aeb7827bae9ebf540a~mv2.jpg" },
    { id: 29, title: "La Reina de Persia", path: "/serie/la-reina-de-persia", banner: "https://static.wixstatic.com/media/859174_eda5b6193b5f4ed4ae09a9c98f4f7293~mv2.jpg" },
    { id: 30, title: "Nehemías", path: "/serie/nehemias", banner: "https://static.wixstatic.com/media/859174_2e1dffea06924a9e8977cb84438875a6~mv2.jpg" },
    { id: 31, title: "Ben-Hur", path: "/serie/ben-hur", banner: "https://static.wixstatic.com/media/859174_cfffd361a6e8406fa68569cc5faa1b24~mv2.jpg" },
    { id: 32, title: "Amor en Ruinas", path: "/serie/amor-en-ruinas", banner: "https://static.wixstatic.com/media/859174_687d454e04a24acc862a9ad504d840a9~mv2.jpg" },
    { id: 33, title: "Las Siete Marías", path: "/serie/las-siete-marias", banner: "https://static.wixstatic.com/media/859174_986e6f3436e24b5f956a772279b8dcee~mv2.jpg" },
    { id: 34, title: "Los Milagros de Jesús", path: "/serie/los-milagros-de-jesus", banner: "https://static.wixstatic.com/media/859174_64541a4eacef47ba992f046d8bfc3865~mv2.jpg" },
    { id: 35, title: "Jesús", path: "/serie/jesus", banner: "https://static.wixstatic.com/media/859174_154d4f2abd5d421b84a7ef68b77a920e~mv2.jpg" },
    { id: 36, title: "Pablo, el Apóstol", path: "/serie/pablo-el-apostol", banner: "https://static.wixstatic.com/media/859174_56a68908538942b487a749ee1f631902~mv2.jpg" },
    { id: 37, title: "El Señor y la Sierva", path: "/serie/el-senor-y-la-sierva", banner: "https://static.wixstatic.com/media/859174_ad52f6af4b2d4dd690a0c657a96c3f97~mv2.jpg" },
    { id: 38, title: "Apocalipsis", path: "/serie/apocalipsis", banner: "https://static.wixstatic.com/media/859174_a5c676997f794e52a0670baff3b3966c~mv2.jpg" },
  ];

  useEffect(() => {
    const handleGlobalPrevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleGlobalPrevent);
    document.addEventListener('dragstart', handleGlobalPrevent);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent);
      document.removeEventListener('dragstart', handleGlobalPrevent);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // BUSCADOR MEJORADO (AMPLIO Y SENSIBLE)
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);

      // Mapa de relaciones amplias para mejorar la búsqueda
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto', 'liberacion'],
        jesus: ['jesus', 'milagros', 'pasion', 'galilea', 'maestro'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen', 'israel'],
        ester: ['ester', 'reina de persia', 'persia', 'jerjes', 'hadassah'],
        biblia: ['biblia', 'sagrada', 'antiguo', 'nuevo']
      };

      const relatedTerms = new Set<string>();
      relatedTerms.add(term);

      Object.entries(themeMap).forEach(([key, values]) => {
        if (term.includes(key) || key.includes(term)) {
          values.forEach(v => relatedTerms.add(v));
        }
      });

      const filtered = allSeries.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return Array.from(relatedTerms).some(t => 
          titleNormalized.includes(t) || categoryNormalized.includes(term)
        );
      });

      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>Series Bíblicas — Estudios 421</title></Head>

      {/* NAV REPLICADA DE SERIE MAESTRA */}
      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/" className="relative group text-white text-[15px] font-medium tracking-wide">Inicio<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-biblicas" className="relative group text-white text-[15px] font-medium tracking-wide font-bold text-[#FF8A00]">Series Bíblicas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-full" /></Link>
            <Link href="/series-tv" className="relative group text-white text-[15px] font-medium tracking-wide">Series TV<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/peliculas" className="relative group text-white text-[15px] font-medium tracking-wide">Películas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc' }].map((l) => (
              <Link key={l.n} href={l.n === '' ? '/series-biblicas' : `/${l.n}/series-biblicas`}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" alt="Idioma" /></Link>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* BUSCADOR */}
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="pt-32 px-16 pb-32">
        <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-8">
          <div className="flex items-center gap-6">
            <div className="w-2 h-10 bg-[#FF8A00] shadow-[0_0_20px_rgba(255,138,0,0.5)]" />
            <h1 className="text-5xl font-black uppercase tracking-tighter">Series Bíblicas</h1>
          </div>
          <button 
            onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')}
            className="flex items-center gap-3 bg-[#FF8A00] text-black font-black px-8 py-3 rounded-sm hover:bg-white transition-all transform hover:scale-105 active:scale-95 uppercase text-sm"
          >
            <IoHeart size={20} /> apoyar al sitio web
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12">
          {bibleSeries.map((serie) => (
            <Link key={serie.id} href={serie.path}>
              <div className="group cursor-pointer relative">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:z-50 shadow-2xl group-hover:shadow-[0_0_30px_rgba(255,138,0,0.3)] group-hover:border-[#FF8A00]/50">
                  <Image src={serie.banner} alt={serie.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                </div>
                <h3 className="mt-4 text-[13px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#FF8A00] transition-colors text-center truncate px-2">
                  {serie.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER RESTAURADO (IDÉNTICO A REINA DE PERSIA) */}
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
      `}</style>
    </div>
  );
};

export default SeriesBiblicasPC;
