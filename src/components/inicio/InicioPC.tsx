import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { FaPlay, FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDonateHeart } from 'react-icons/bi';
import { allSeries } from '../../data/series';

const InicioPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [myList, setMyList] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState({ url: "", path: "" });

  // Listas de Estrenos para Exclusión
  const estrenoTitles = [
    "Reyes La Decadencia", "Pablo El Apóstol", "La Casa De David", 
    "La Reina De Persia", "La Vida De Job", "El Señor Y La Sierva", 
    "Reyes La Sucesión", "Nehemías"
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Generar Recomendados Aleatorios (Excluyendo Estrenos)
    const pool = allSeries.filter(s => !estrenoTitles.includes(s.title));
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setRecommended(shuffled.slice(0, 15));

    const saved = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(allSeries.filter(s => saved.includes(s.id)));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- MOTOR DE BÚSQUEDA INTELIGENTE ---
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const filtered = allSeries.filter(serie => normalize(serie.title).includes(term) || normalize(serie.category || "").includes(term));
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const openTrailer = (url: string, path: string) => {
    setActiveTrailer({ url, path });
    setShowModal(true);
  };

  const Navbar = (
    <nav className={`fixed top-0 w-full z-[110] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
      <div className="flex items-center gap-10">
        <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        <div className="flex gap-8">
          {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((name, idx) => {
            const paths = ['/', '/series-biblicas', '/series-tv', '/peliculas'];
            return (
              <Link key={name} href={paths[idx]} className="relative group text-white text-[15px] font-medium tracking-wide">
                {name}<span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 ${router.pathname === paths[idx] ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
          <IoSearchOutline className="text-white text-xl" />
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
        </form>
        <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
      </div>
    </nav>
  );

  const banners = [
    { id: 1, path: "/serie/la-reina-de-persia", trailer: "https://ok.ru/videoembed/14703414348288", bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
    { id: 2, path: "/serie/reyes-la-decadencia", trailer: "https://ok.ru/videoembed/14703415134720", bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan." },
    { id: 3, path: "/serie/pablo-el-apostol", trailer: "https://ok.ru/videoembed/14703417887232", bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios." },
    { id: 4, path: "/serie/la-vida-de-job", trailer: "https://ok.ru/videoembed/14703420508672", bg: "https://static.wixstatic.com/media/859174_b9159dfbf8cc403eb180531c8338589e~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_57a3f59e3dc44abc96ad1508f1ecf6db~mv2.png", desc: "La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor, Job enfrenta preguntas profundas sobre el sufrimiento." },
    { id: 5, path: "/serie-tv/la-casa-de-david", trailer: "https://ok.ru/videoembed/14703421032960", bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png", desc: "De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes y batallas marcan el camino de un líder conforme al corazón de Dios." },
    { id: 6, path: "/serie/el-senor-y-la-sierva", trailer: "https://ok.ru/videoembed/14703422867968", bg: "https://static.wixstatic.com/media/859174_d16e8080cf4043e5a7b17a2538f8dcf5~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4f27eb2a8b7741f69eccead2e7fd0dcf~mv2.png", desc: "En el Imperio romano, surge un amor imposible entre Elisa y Cayo. Las persecuciones ponen a prueba su relación y su esperanza." }
  ];

  const MovieRow = ({ title, movies }: any) => {
    if (movies.length === 0) return null;
    const settings = { dots: false, infinite: movies.length > 6, speed: 500, slidesToShow: 6, slidesToScroll: 3, arrows: true };
    return (
      <div className="mb-12 px-4 md:px-16 relative group/row">
        <h2 className="text-white text-xl font-bold mb-4 uppercase tracking-wider ml-2 flex items-center gap-3">
          <span className="w-1 h-6 bg-[#FF8A00]" />
          {title}
        </h2>
        <div className="relative slider-container">
          <Slider {...settings} className="movie-slider">
            {movies.map((m: any) => (
              <div key={m.id} className="px-1.5 outline-none py-4">
                <Link href={m.path || '#'}>
                  <div className="relative aspect-[2/3] rounded-md transition-all duration-300 hover:scale-110 hover:z-[100] cursor-pointer shadow-2xl group/poster">
                    <div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10 group-hover/poster:ring-2 group-hover/poster:ring-[#FF8A00]/50 transition-all">
                      <Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized />
                    </div>
                    <div className="absolute bottom-2 left-2 z-20">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-white/10 ${m.audio === 'Latino' ? 'bg-[#F09800] text-white' : 'bg-black/70 text-white backdrop-blur-md'}`}>
                        {m.audio === 'Latino' ? 'LAT' : 'SUB'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00]">
      <Head><title>Estudios 421 — La Fe En Pantalla</title></Head>
      {Navbar}
      
      <main className="relative">
        {/* BUSCADOR OVERLAY */}
        {searchQuery.length > 0 && (
          <div className="fixed inset-0 bg-black z-[120] pt-24 px-8 md:px-16 overflow-y-auto pb-20">
             <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Resultados: "{searchQuery}"</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
               {searchResults.map((m) => (
                 <Link key={m.id} href={m.path}>
                   <div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><div className="relative w-full h-full rounded-md overflow-hidden ring-1 ring-white/10"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></div>
                 </Link>
               ))}
             </div>
          </div>
        )}

        {/* MODAL DE TRAILER */}
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModal(false)} />
            <div className="relative w-full max-w-5xl aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(240,152,0,0.3)] border border-white/10">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-50 text-[#FF8A00] hover:scale-110 transition-transform"><IoCloseOutline size={45} /></button>
              <iframe src={`${activeTrailer.url}?autoplay=1`} className="w-full h-full" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
              <div className="absolute bottom-6 left-8 flex gap-4">
                <button onClick={() => router.push(activeTrailer.path)} className="bg-[#F09800] text-white px-8 py-3 rounded-md font-bold flex items-center gap-2 hover:scale-105 transition-transform"><FaPlay size={12} /> VER AHORA</button>
              </div>
            </div>
          </div>
        )}

        <section className="relative w-full h-[95vh] bg-black overflow-hidden mb-12">
          <Slider {...{ fade: true, dots: true, infinite: true, speed: 1000, autoplay: true, autoplaySpeed: 6000, pauseOnHover: false, arrows: false, dotsClass: "slick-dots custom-dots" }}>
            {banners.map((item) => (
              <div key={item.id} className="relative w-full h-[95vh] outline-none">
                <div className="relative w-full h-full"><Image src={item.bg} alt="Banner" fill className="object-cover" priority /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 w-2/3" />
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-20 pt-10">
                  <div className="relative w-[450px] h-[160px] mb-6 drop-shadow-2xl"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" /></div>
                  <p className="max-w-[550px] text-white text-[19px] font-medium mb-8 leading-relaxed text-justify opacity-90">{item.desc}</p>
                  <div className="flex items-center gap-5">
                    <button onClick={() => router.push(item.path)} className="bg-[#F09800] text-white px-9 py-3 rounded font-bold text-base shadow-[0_0_20px_rgba(240,152,0,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-2"><FaPlay size={12} /> VER AHORA</button>
                    <button onClick={() => openTrailer(item.trailer, item.path)} className="bg-white/10 text-white px-9 py-3 rounded font-bold backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"><HiOutlineInformationCircle size={22} /> MÁS INFORMACIÓN</button>
                    <a href="https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS" target="_blank" rel="noreferrer" className="bg-black/40 text-white px-6 py-3 rounded font-bold border border-[#F09800]/50 hover:border-[#F09800] hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm uppercase tracking-wider"><BiDonateHeart size={20} className="text-[#F09800]" /> Donar</a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <div className="relative z-30 pb-20">
          <MovieRow title="Estrenos" movies={allSeries.filter(s => estrenoTitles.includes(s.title))} />
          <MovieRow title="Recomendados" movies={recommended} />
          <MovieRow title="Series Bíblicas" movies={allSeries.filter(s => s.category === 'Serie Bíblica')} />
          <MovieRow title="Series TV" movies={allSeries.filter(s => s.category === 'Serie de TV')} />
          <MovieRow title="Películas" movies={allSeries.filter(s => s.category === 'Película')} />
        </div>
      </main>

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center md:justify-end gap-6 mb-10">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4 text-xs opacity-60">
            <p>© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
            <p>Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras. Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad.</p>
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
        .custom-dots { bottom: 60px !important; text-align: center !important; }
        .custom-dots li { margin: 0 5px !important; }
        .custom-dots li button:before { color: white !important; font-size: 8px !important; opacity: 0.5; }
        .custom-dots li.slick-active { width: 40px !important; }
        .custom-dots li.slick-active button:before { color: #F09800 !important; content: '' !important; background: #F09800; width: 40px; height: 4px; border-radius: 2px; top: 10px; opacity: 1; }
        .movie-slider .slick-list { overflow: visible !important; }
        .movie-slider .slick-prev, .movie-slider .slick-next { z-index: 100; width: 45px; height: 100%; background: rgba(0,0,0,0.5); opacity: 0 !important; transition: opacity 0.3s ease; }
        .group\/row:hover .movie-slider .slick-prev, .group\/row:hover .movie-slider .slick-next { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default InicioPC;
