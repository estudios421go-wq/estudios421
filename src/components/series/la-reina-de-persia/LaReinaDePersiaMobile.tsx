import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const persiaEpisodes = [
  { id: 1, title: "¿CÓMO TE LLAMAS?", dur: "50:57", thumb: "https://static.wixstatic.com/media/859174_bb24b7b013194cd48103df1e39666a8c~mv2.jpg", url: "https://ok.ru/videoembed/14939719141888" },
  { id: 2, title: "ESTÁ HECHO", dur: "44:33", thumb: "https://static.wixstatic.com/media/859174_b27c907cb6f44475a260677acfc56e95~mv2.jpg", url: "https://ok.ru/videoembed/14940330920448" },
  { id: 3, title: "LA NECESITO", dur: "45:08", thumb: "https://static.wixstatic.com/media/859174_d4a8295575144c0092eae77cd6776a7d~mv2.jpg", url: "https://ok.ru/videoembed/14940545223168" },
  { id: 4, title: "¿Y AHORA?", dur: "49:55", thumb: "https://static.wixstatic.com/media/859174_6bba3949853a4228a8ce7c7f2243ea43~mv2.jpg", url: "https://ok.ru/videoembed/14940738750976" },
  { id: 5, title: "¿LO ENTENDIERON AHORA?", dur: "48:27", thumb: "https://static.wixstatic.com/media/859174_060f835264d24e48987d7c0d1578a12c~mv2.jpg", url: "https://ok.ru/videoembed/14941476817408" },
  { id: 6, title: "UNA DE DOS COSAS", dur: "44:18", thumb: "https://static.wixstatic.com/media/859174_382cc0ab57fd4adcb3b3fe0e70c4021d~mv2.jpg", url: "https://ok.ru/videoembed/14941478324736" },
  { id: 7, title: "¿HAS SOÑADO ALGUNA VEZ CON EL REY?", dur: "43:46", thumb: "https://static.wixstatic.com/media/859174_e5c96fd4320440199aceeb2fe1203abc~mv2.jpg", url: "https://ok.ru/videoembed/14941479766528" },
  { id: 8, title: "SI LO CONOCIERAN DE VERDAD", dur: "43:56", thumb: "https://static.wixstatic.com/media/859174_9c57747bdefb410fa1a0197d59856ba7~mv2.jpg", url: "https://ok.ru/videoembed/14943377689088" },
  { id: 9, title: "¡HE AQUÍ LA NUEVA REINA!", dur: "40:27", thumb: "https://static.wixstatic.com/media/859174_ff7bc1f3ca734479b9e78fc6e4550149~mv2.jpg", url: "https://ok.ru/videoembed/14943378737664" },
  { id: 10, title: "NADIE TIENE QUE SABERLO", dur: "48:56", thumb: "https://static.wixstatic.com/media/859174_d8471ef5b07b4a01bdb31df5531168ec~mv2.jpg", url: "https://ok.ru/videoembed/14943382473216" },
  { id: 11, title: "NO SEAS CURIOSA", dur: "44:40", thumb: "https://static.wixstatic.com/media/859174_86d7dbfe40cc498cbf439a7130b1930f~mv2.jpg", url: "https://ok.ru/videoembed/14971640416768" },
  { id: 12, title: "UN CASO DE VIDA O MUERTE", dur: "47:41", thumb: "https://static.wixstatic.com/media/859174_cc0e5052aa8b407ca3bf4bdd8afffb3c~mv2.jpg", url: "https://ok.ru/videoembed/14971641530880" },
  { id: 13, title: "¿POR QUÉ ERES ASÍ?", dur: "36:55", thumb: "https://static.wixstatic.com/media/859174_00cef21a70a246dba0ba13d77de578c7~mv2.jpg", url: "https://ok.ru/videoembed/14971643103744" },
  { id: 14, title: "ERES DIFERENTE", dur: "43:22", thumb: "https://static.wixstatic.com/media/859174_ab6a038a5e2040f68e49f8cae427366e~mv2.jpg", url: "https://ok.ru/videoembed/14971647035904" },
  { id: 15, title: "ESTAMOS A MANO", dur: "46:37", thumb: "https://static.wixstatic.com/media/859174_18a1bd77ce504e0b93e4e89eb93d7407~mv2.jpg", url: "https://ok.ru/videoembed/14973197486592" },
  { id: 16, title: "NUNCA LO VAS A ENTENDER", dur: "53:37", thumb: "https://static.wixstatic.com/media/859174_4d1e71aef9d94f2a8682e5c2d51e3f95~mv2.jpg", url: "https://ok.ru/videoembed/14973197814272" },
  { id: 17, title: "EN EL DECIMOTERCER DÍA", dur: "45:08", thumb: "https://static.wixstatic.com/media/859174_076a07d11152470b9c8dbf487e0aaf73~mv2.jpg", url: "https://ok.ru/videoembed/14973198141952" },
  { id: 18, title: "ENTONCES, ¿ERES HADASSAH?", dur: "44:25", thumb: "https://static.wixstatic.com/media/859174_8b1d9a993b734ac79d50d9149c7ba84f~mv2.jpg", url: "https://ok.ru/videoembed/14973198535168" },
  { id: 19, title: "NO VOY A MORIR", dur: "46:44", thumb: "https://static.wixstatic.com/media/859174_9243597cb05b46a88014fd145b9b781c~mv2.jpg", url: "https://ok.ru/videoembed/14973198731776" },
  { id: 20, title: "¿CUÁL ES TU PEDIDO?", dur: "45:06", thumb: "https://static.wixstatic.com/media/859174_e71dfd724abf4442aa2e32775097f33c~mv2.jpg", url: "https://ok.ru/videoembed/14973199059456" },
  { id: 21, title: "NO ESPERAR NADA", dur: "38:43", thumb: "https://static.wixstatic.com/media/859174_997eecbb23864da48f48a46cfa8b2799~mv2.jpg", url: "https://ok.ru/videoembed/14973199190528" },
  { id: 22, title: "ES UNA LARGA HISTORIA", dur: "49:43", thumb: "https://static.wixstatic.com/media/859174_2b316ab7ccff4907921d3531b33c52e2~mv2.jpg", url: "https://ok.ru/videoembed/14973199518208" },
  { id: 23, title: "VUELVE A MÍ", dur: "43:41", thumb: "https://static.wixstatic.com/media/859174_046da0e08c794c33b1c93b07d28db11f~mv2.jpg", url: "https://ok.ru/videoembed/14973199911424" },
  { id: 24, title: "¿CÓMO VOY A SOPORTAR ESTO?", dur: "40:55", thumb: "https://static.wixstatic.com/media/859174_2290f046f1b548ef8a76435987a623cf~mv2.jpg", url: "https://ok.ru/videoembed/14973200370176" },
  { id: 25, title: "AÚN NO LO SABES", dur: "51:32", thumb: "https://static.wixstatic.com/media/859174_83a0eb5648294c1cb14e2f707b49649c~mv2.jpg", url: "https://ok.ru/videoembed/14973200566784" },
  { id: 26, title: "¡AUXILIO!", dur: "44:47", thumb: "https://static.wixstatic.com/media/859174_479ea1c0b7e64f94bd2860011c178159~mv2.jpg", url: "https://ok.ru/videoembed/14973200828928" },
  { id: 27, title: "SUCEDIÓ LO CONTRARIO", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_6dc176dd45b9494eb320a698ae97e493~mv2.jpg", url: "https://ok.ru/videoembed/14973200894464" },
  { id: 28, title: "TENGO QUE IRME", dur: "43:16", thumb: "https://static.wixstatic.com/media/859174_3ea091c141164d378d5176f59dccada1~mv2.jpg", url: "https://ok.ru/videoembed/14973201025536" },
  { id: 29, title: "ME ENGAÑARON", dur: "54:10", thumb: "https://static.wixstatic.com/media/859174_6d1125235d20420ca6c3e621bf635b07~mv2.jpg", url: "https://ok.ru/videoembed/14973201549824" },
  { id: 30, title: "MI REY LEÓN", dur: "50:34", thumb: "https://static.wixstatic.com/media/859174_289d76ff709647cba249df69d39ab5f9~mv2.jpg", url: "https://ok.ru/videoembed/14973201746432" }
];

const ReinaPersiaMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 13;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('persia_mobile_last_ep');
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
        moises: ['moises', 'diez mandamientos', 'testamento', 'egipto', 'exodo', 'tierra prometida', 'sanson', 'david'],
        egipto: ['jose', 'moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'hijo de dios', 'vida publica', 'magdalena', 'pablo', 'apocalipsis'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen', 'division', 'jezabel', 'el rico', 'ester', 'persia'],
        ester: ['ester', 'reina de persia', 'persia', 'nehemias', 'artajerjes'],
        pablo: ['pablo', 'apostol', 'cristo', 'saulo'],
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
    setSelectedVideo(persiaEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('persia_mobile_last_ep', idx.toString());
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
        <Head><title>REPRODUCIENDO: {persiaEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">SERIE: LA REINA DE PERSIA</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              EP. {persiaEpisodes[currentIdx].id} <span className="text-white/20 mx-1">|</span> {persiaEpisodes[currentIdx].title}
            </h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full aspect-video border-none shadow-[0_0_50px_rgba(0,0,0,1)]" allow="autoplay; fullscreen" allowFullScreen />
          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#F09800] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">ANTERIOR</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#F09800]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">EPISODIOS</span>
            </button>
            <button disabled={currentIdx === persiaEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
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
      <Head><title>LA REINA DE PERSIA — ESTUDIOS 421</title></Head>
      
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
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">SeriesS Tv</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">IDIOMA</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/la-reina-de-persia'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/la-reina-de-persia'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/la-reina-de-persia'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_569b703977e44e3d88611b7d8e63a2dc~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${persiaEpisodes[currentIdx].id}`}
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
          {persiaEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 active:scale-95 transition-all" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#F09800] shadow-[0_0_15px_rgba(240,152,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
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

export default ReinaPersiaMobile;
