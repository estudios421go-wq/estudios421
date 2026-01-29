import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaPlay } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
import { allSeries } from '../../data/series';

const InicioMobile = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [myList, setMyList] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState({ url: "", path: "" });

  // --- DATOS DE INICIO (Extraídos de PC) ---
  const dataEstrenos = [
    { title: "Reyes La Decadencia", banner: "https://static.wixstatic.com/media/859174_844bdbe858b74adab24665964be596b1~mv2.jpg", path: "serie/reyes-la-decadencia", audio: "Latino" },
    { title: "Pablo El Apóstol", banner: "https://static.wixstatic.com/media/859174_1a4c34a2bb8a495bad6ea09b5da366dd~mv2.jpg", path: "serie/pablo-el-apostol", audio: "Latino" },
    { title: "La Casa De David", banner: "https://static.wixstatic.com/media/859174_bc1b97a10d3247e097ff4bbdda56e973~mv2.jpg", path: "serie-tv/la-casa-de-david", audio: "Subtitulado" },
    { title: "La Reina De Persia", banner: "https://static.wixstatic.com/media/859174_25430a5b5d74415f8a6ad729958081d2~mv2.jpg", path: "serie/la-reina-de-persia", audio: "Latino" },
    { title: "La Vida De Job", banner: "https://static.wixstatic.com/media/859174_d0095ad0db584be09c815e43b4bd1c39~mv2.jpg", path: "serie/la-vida-de-job", audio: "Subtitulado" },
    { title: "El Señor Y La Sierva", banner: "https://static.wixstatic.com/media/859174_9e32bbc02d864ed9842fb43173bfd1e3~mv2.jpg", path: "serie/el-senor-y-la-sierva", audio: "Subtitulado" },
    { title: "Reyes La Sucesión", banner: "https://static.wixstatic.com/media/859174_2960f93a729e41df96813820c93b80eb~mv2.jpg", path: "serie/reyes-la-sucesion", audio: "Latino" },
    { title: "Nehemías", banner: "https://static.wixstatic.com/media/859174_fb1b30a68bcd427fa813140bd095f259~mv2.jpg", path: "serie/nehemias", audio: "Latino" }
  ];

  const dataBiblicas = allSeries.filter(s => s.category === 'Serie Bíblica');
  
  const banners = [
    { id: 1, path: "/serie/la-reina-de-persia", trailer: "https://ok.ru/videoembed/14703414348288", bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
    { id: 2, path: "/serie/reyes-la-decadencia", trailer: "https://ok.ru/videoembed/14703415134720", bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "El reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan." },
    { id: 3, path: "/serie/pablo-el-apostol", trailer: "https://ok.ru/videoembed/14703417887232", bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "Vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios." }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Recomendados aleatorios
    setRecommended([...allSeries].sort(() => 0.5 - Math.random()).slice(0, 8));
    
    // Mi Lista desde LocalStorage
    const saved = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(allSeries.filter(s => saved.includes(s.id)));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Buscador Avanzado (Lógica PC adaptada)
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const filtered = allSeries.filter(serie => normalize(serie.title).includes(term) || normalize(serie.category || "").includes(term));
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const MovieRow = ({ title, movies }: any) => {
    if (movies.length === 0) return null;
    const settings = { dots: false, infinite: false, speed: 500, slidesToShow: 2.5, slidesToScroll: 2, arrows: false };
    return (
      <div className="mb-10 px-4 overflow-hidden">
        <h2 className="text-white text-sm font-black mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-1 h-4 bg-[#FF8A00]" />{title}
        </h2>
        <Slider {...settings}>
          {movies.map((m: any, idx: number) => (
            <div key={idx} className="px-1.5 outline-none active:scale-95 transition-transform">
              <Link href={m.path || '#'}>
                <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-xl border border-white/5">
                  <Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized />
                  <div className="absolute bottom-1.5 left-1.5">
                    <span className="text-[7px] font-black px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-white">
                      {m.audio === 'Latino' ? 'LAT' : 'SUB'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] text-left unselectable">
      <Head>
        <title>Estudios 421 — La Fe En Pantalla</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>

      {/* NAVBAR GEMELA (Adaptada de Lea) */}
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#FF8A00] transition-all" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {/* MENÚ LATERAL (Rutas de Inicio) */}
      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-[#FF8A00]">Inicio</Link>
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series Bíblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Idioma</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* BÚSQUEDA MÓVIL */}
      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />Resultados: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      {/* BANNERS ADAPTADOS (Aspect Ratio 4/3 para móvil) */}
      <section className="relative w-full aspect-[4/3] bg-black mb-14">
        <Slider {...{ dots: true, infinite: true, speed: 800, autoplay: true, autoplaySpeed: 5000, arrows: false, dotsClass: "slick-dots mobile-dots" }}>
          {banners.map((item) => (
            <div key={item.id} className="relative w-full aspect-[4/3] outline-none">
              <Image src={item.bg} alt="Banner" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12">
                <div className="relative w-[180px] h-[70px] mb-3"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" unoptimized /></div>
                <p className="text-[11px] text-gray-200 line-clamp-2 mb-4 max-w-[80%]">{item.desc}</p>
                <div className="flex gap-3">
                  <button onClick={() => router.push(item.path)} className="bg-[#FF8A00] text-white px-6 py-2 rounded font-black text-[10px] flex items-center gap-2 active:scale-95 transition-transform"><FaPlay size={10}/> VER</button>
                  <button onClick={() => {setActiveTrailer({url: item.trailer, path: item.path}); setShowModal(true)}} className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded font-black text-[10px] border border-white/20 active:scale-95 transition-transform">INFO</button>
                  <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="bg-black/40 text-white px-4 py-2 rounded font-black text-[10px] border border-[#FF8A00]/50 active:scale-95 transition-transform flex items-center gap-2"><BiDonateHeart className="text-[#FF8A00]"/> DONAR</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* FILAS DE CONTENIDO */}
      <div className="relative z-30 -mt-8 pb-10">
        {myList.length > 0 && <MovieRow title="Mi Lista" movies={myList} />}
        <MovieRow title="Estrenos" movies={dataEstrenos} />
        <MovieRow title="Series Bíblicas" movies={dataBiblicas} />
        <MovieRow title="Recomendados" movies={recommended} />
        <MovieRow title="Series TV" movies={allSeries.filter(s => s.category === 'Serie de TV')} />
        <MovieRow title="Películas" movies={allSeries.filter(s => s.category === 'Película')} />
      </div>

      {/* FOOTER ADAPTADO (Gemelo de Lea) */}
      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño.</p>
          <p className="text-[9px] leading-relaxed text-gray-600">El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/terminos-de-uso">Términos de uso</Link>
          <Link href="/cookies">Configuración de cookies</Link>
          <Link href="/anuncios">Especificaciones de anuncios</Link>
          <Link href="/ayuda">Centro de ayuda</Link>
        </div>
      </footer>

      {/* MODAL DE TRAILER (Adaptado) */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 z-[210] text-[#FF8A00]"><IoCloseOutline size={30} /></button>
            <iframe src={`${activeTrailer.url}?autoplay=1`} className="w-full h-full" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}

      <style jsx global>{`
        .mobile-dots { bottom: 15px !important; }
        .mobile-dots li button:before { color: white !important; font-size: 6px !important; opacity: 0.3; }
        .mobile-dots li.slick-active button:before { color: #FF8A00 !important; opacity: 1; }
        .unselectable { -webkit-user-select: none; user-select: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
      `}</style>
    </div>
  );
};

export default InicioMobile;
