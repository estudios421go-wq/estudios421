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

  const dataEstrenos = [
    { title: "Reyes La Decadencia", banner: "https://static.wixstatic.com/media/859174_844bdbe858b74adab24665964be596b1~mv2.jpg", path: "serie/reyes-la-decadencia", audio: "Latino" },
    { title: "Pablo El Apóstol", banner: "https://static.wixstatic.com/media/859174_1a4c34a2bb8a495bad6ea09b5da366dd~mv2.jpg", path: "serie/pablo-el-apostol", audio: "Latino" },
    { title: "La Casa De David", banner: "https://static.wixstatic.com/media/859174_bc1b97a10d3247e097ff4bbdda56e973~mv2.jpg", path: "serie-tv/la-casa-de-david", audio: "Subtitulado" },
    { title: "La Reina De Persia", banner: "https://static.wixstatic.com/media/859174_25430a5b5d74415f8a6ad729958081d2~mv2.jpg", path: "serie/la-reina-de-persia", audio: "Latino" },
    { title: "La Vida De Job", banner: "https://static.wixstatic.com/media/859174_d0095ad0db584be09c815e43b4bd1c39~mv2.jpg", path: "serie/la-vida-de-job", audio: "Subtitulado" },
    { title: "El Señor Y La Sierva", banner: "https://static.wixstatic.com/media/859174_9e32bbc02d864ed9842fb43173bfd1e3~mv2.jpg", path: "serie/el-senor-y-la-sierva", audio: "Subtitulado" }
  ];

  const banners = [
    { id: 1, path: "/serie/la-reina-de-persia", trailer: "https://ok.ru/videoembed/14703414348288", bg: "https://static.wixstatic.com/media/859174_8880c8a667894fd1af103a0336171721~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_6eb0c42c44e340d2a314f7be009d6e8a~mv2.png", desc: "Inspirada en el libro de Ester, esta historia revela cómo una joven guiada por su fe es llevada al corazón del imperio persa para cumplir un propósito divino." },
    { id: 2, path: "/serie/reyes-la-decadencia", trailer: "https://ok.ru/videoembed/14703415134720", bg: "https://static.wixstatic.com/media/859174_298156d13007436bade3f3219dac7771~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png", desc: "En una etapa de corrupción espiritual, el reino de Israel se hunde bajo decisiones alejadas de Dios. Idolatría y guerras se entrelazan." },
    { id: 3, path: "/serie/pablo-el-apostol", trailer: "https://ok.ru/videoembed/14703417887232", bg: "https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png", desc: "De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso. Una fe inquebrantable que desafía imperios." },
    { id: 4, path: "/serie/la-vida-de-job", trailer: "https://ok.ru/videoembed/14703420508672", bg: "https://static.wixstatic.com/media/859174_b9159dfbf8cc403eb180531c8338589e~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_57a3f59e3dc44abc96ad1508f1ecf6db~mv2.png", desc: "La fe de un hombre justo es llevada al límite tras perderlo todo. En medio del dolor, Job enfrenta preguntas profundas sobre el sufrimiento." },
    { id: 5, path: "/serie-tv/la-casa-de-david", trailer: "https://ok.ru/videoembed/14703421032960", bg: "https://static.wixstatic.com/media/859174_25f3802c3bc0432b85c91bed4f588599~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png", desc: "De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes y batallas marcan el camino de un líder conforme al corazón de Dios." },
    { id: 6, path: "/serie/el-senor-y-la-sierva", trailer: "https://ok.ru/videoembed/14703422867968", bg: "https://static.wixstatic.com/media/859174_d16e8080cf4043e5a7b17a2538f8dcf5~mv2.jpg", logo: "https://static.wixstatic.com/media/859174_4f27eb2a8b7741f69eccead2e7fd0dcf~mv2.png", desc: "En el Imperio romano, surge un amor imposible entre Elisa y Cayo. Las persecuciones ponen a prueba su relación y su esperanza." }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    setRecommended([...allSeries].sort(() => 0.5 - Math.random()).slice(0, 8));
    const saved = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(allSeries.filter(s => saved.includes(s.id)));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'testamento', 'egipto', 'exodo', 'tierra prometida', 'sanson', 'david'],
        egipto: ['jose', 'moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'hijo de dios', 'vida publica', 'magdalena', 'pablo', 'apocalipsis'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen', 'division', 'jezabel', 'el rico', 'ester', 'persia']
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

  const MovieRow = ({ title, movies }: any) => {
    if (movies.length === 0) return null;
    return (
      <div className="mb-10 px-4 overflow-hidden">
        <h2 className="text-white text-[11px] font-black mb-4 uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="w-1 h-4 bg-[#FF8A00]" />{title}
        </h2>
        <Slider dots={false} infinite={false} speed={500} slidesToShow={2.5} slidesToScroll={2} arrows={false}>
          {movies.map((m: any, idx: number) => (
            <div key={idx} className="px-1.5 outline-none active:scale-95 transition-transform">
              <Link href={m.path || '#'}>
                <div className="relative aspect-[2/3] rounded-md overflow-hidden border border-white/5">
                  <Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized />
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

      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-500 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:border-[#FF8A00]" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/98 z-[100] flex flex-col pt-24 px-8 gap-8 animate-fade-in">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
          {['Inicio', 'Series Bíblicas', 'Series TV', 'Películas'].map((n) => (
            <Link key={n} href={n === 'Inicio' ? '/' : `/${n.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold ${n === 'Inicio' ? 'text-[#FF8A00]' : 'text-white'}`}>{n}</Link>
          ))}
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Idioma</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2"><img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span></Link>
            ))}
          </div>
        </div>
      )}

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />Resultados: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <section className="relative w-full aspect-[4/3] bg-black mb-14 overflow-hidden">
        <Slider dots={true} infinite={true} speed={800} autoplay={true} autoplaySpeed={5000} arrows={false} dotsClass="slick-dots mobile-dots">
          {banners.map((item) => (
            <div key={item.id} className="relative w-full aspect-[4/3] outline-none bg-black">
              <Image src={item.bg} alt="Banner" fill className="object-contain" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-end px-5 pb-8">
                <div className="relative w-[140px] h-[55px] mb-1.5"><Image src={item.logo} alt="Logo" fill className="object-contain object-left" unoptimized /></div>
                {/* Descripción Compacta a la Izquierda */}
                <p className="text-[9px] leading-tight text-gray-300 mb-4 max-w-[85%] text-left font-medium opacity-90">{item.desc}</p>
                <div className="flex gap-2">
                  <button onClick={() => router.push(item.path)} className="bg-[#FF8A00] text-white px-5 py-2 rounded font-black text-[9px] flex items-center gap-1.5 active:scale-95"><FaPlay size={8}/> VER</button>
                  <button onClick={() => {setActiveTrailer({url: item.trailer, path: item.path}); setShowModal(true)}} className="bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded font-black text-[9px] border border-white/20 active:scale-95">INFO</button>
                  <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="bg-black/40 text-white px-4 py-2 rounded font-black text-[9px] border border-[#FF8A00]/50 active:scale-95 flex items-center gap-1.5"><BiDonateHeart className="text-[#FF8A00]"/> DONAR</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <div className="relative z-30 -mt-12 pb-10">
        {myList.length > 0 && <MovieRow title="Mi Lista" movies={myList} />}
        <MovieRow title="Estrenos" movies={dataEstrenos} />
        <MovieRow title="Series Bíblicas" movies={allSeries.filter(s => s.category === 'Serie Bíblica')} />
        <MovieRow title="Recomendados" movies={recommended} />
        <MovieRow title="Series TV" movies={allSeries.filter(s => s.category === 'Serie de TV')} />
        <MovieRow title="Películas" movies={allSeries.filter(s => s.category === 'Película')} />
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8 text-[10px]">
          <p>© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/terminos-de-uso">Términos de uso</Link>
          <Link href="/cookies">Configuración de cookies</Link>
          <Link href="/anuncios">Especificaciones de anuncios</Link>
          <Link href="/ayuda">Centro de ayuda</Link>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-lg border border-white/10 flex flex-col">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-[#FF8A00] z-[220]"><IoCloseOutline size={30} /></button>
            <div className="flex-grow relative">
              <iframe src={`${activeTrailer.url}?autoplay=1`} className="w-full h-full" frameBorder="0" allowFullScreen />
            </div>
            {/* Botón VER AHORA Elegante dentro del Modal */}
            <div className="p-4 flex justify-center bg-black">
               <button onClick={() => router.push(activeTrailer.path)} className="w-full bg-[#FF8A00] text-white py-3 rounded-md font-black text-xs flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg">
                 <FaPlay size={10} /> VER SERIE COMPLETA
               </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .mobile-dots { bottom: 10px !important; }
        .mobile-dots li button:before { color: white !important; font-size: 6px !important; }
        .mobile-dots li.slick-active button:before { color: #FF8A00 !important; }
        .unselectable { -webkit-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default InicioMobile;
