import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 23) ---
const reyesEleccionEpisodes = [
  { id: 1, title: "Muy amado", dur: "00:50:47", desc: "Cuidando del rebaño, David debe tomar una postura valiente ante un ataque salvaje. Años atrás, una ocasión festiva marca el inicio de Jesse y Haviva.", thumb: "https://static.wixstatic.com/media/859174_8579c07fbbe24c8c8119f89f3e32ff98~mv2.jpg", url: "https://ok.ru/videoembed/15502027131392" },
  { id: 2, title: "Dolor de codo", dur: "00:47:02", desc: "Tras ser víctima del deseo de venganza de sus hermanos, una ayuda inesperada deja a David intrigado. Zeruia se muda a Belén con sus hijos.", thumb: "https://static.wixstatic.com/media/859174_660fc25bc76b4c8baf2532c51f6712ce~mv2.jpg", url: "https://ok.ru/videoembed/15502028704256" },
  { id: 3, title: "No es un cualquiera", dur: "00:45:06", desc: "Con dudas sobre el pasado saliendo a la luz, el matrimonio de Adgail y Jéter comienza a tener roces. Al regresar a casa, David se sorprende con una petición de Ahinoam.", thumb: "https://static.wixstatic.com/media/859174_230db4df10784a41a672cdbb5b67c908~mv2.jpg", url: "https://ok.ru/videoembed/15502444595712" },
  { id: 4, title: "Soy el mayor", dur: "00:44:50", desc: "En un ambiente romántico, David y Ainoã pasean juntos. Al llegar sin ser notado, Eliabe escucha una confesión de Zeruia.", thumb: "https://static.wixstatic.com/media/859174_438460d143124e449d05910e332d313f~mv2.jpg", url: "https://ok.ru/videoembed/15506359257600" },
  { id: 5, title: "¿Y ahora?", dur: "00:46:11", desc: "Discutiendo con Alon y Hayim, Eliabe expone a David frente a todos. Causando tensión y desconfianza, Zeruia le pide a la familia que la ayude con su perseguidor.", thumb: "https://static.wixstatic.com/media/859174_9dac8033d31b4c329ce3a32d6996f848~mv2.jpg", url: "https://ok.ru/videoembed/15506360830464" },
  { id: 6, title: "Aquel que Yo indique", dur: "00:45:58", desc: "Para proteger su rebaño, el sentido de responsabilidad coloca a David en un feroz enfrentamiento. Al recibir una misión, Samuel escucha la voz de Dios.", thumb: "https://static.wixstatic.com/media/859174_afec6aae435c4001b85a871b9859f4e4~mv2.jpg", url: "https://ok.ru/videoembed/15506363517440" },
  { id: 7, title: "¿Se han acabado tus hijos?", dur: "00:44:26", desc: "Conociendo a la familia de Aser, Zeruya y sus hijos reciben un nuevo comienzo. Ante los hijos de Jesé, Samuel unge al elegido de Dios.", thumb: "https://static.wixstatic.com/media/859174_ba66087674794ef3a797902c816b2808~mv2.jpg", url: "https://ok.ru/videoembed/15506365680128" },
  { id: 8, title: "Las cosas van a cambiar", dur: "00:45:59", desc: "Impulsado por motivaciones cuestionables, Saúl se incomoda con los gabaonitas. Durante una conversación con Amasa, David expone su punto de vista.", thumb: "https://static.wixstatic.com/media/859174_8b6948d46218416d8350808feaad4c4a~mv2.jpg", url: "https://ok.ru/videoembed/15506368498176" },
  { id: 9, title: "¡Ayúdenme!", dur: "00:45:01", desc: "Después del ataque a los gabaonitas, Saúl sorprende a todos con su reacción a una acción de Jonatán. Mientras pastorea las ovejas, David encuentra a una mujer inconsciente.", thumb: "https://static.wixstatic.com/media/859174_665e61ec858e4d1f951201641b3cc691~mv2.jpg", url: "https://ok.ru/videoembed/15506370005504" },
  { id: 10, title: "¿Me estás llamando cobarde?", dur: "00:44:30", desc: "David lleva a Talya a casa, sin imaginar que también saldrá a la luz un secreto de Haviva. Aquis opta por una nueva táctica.", thumb: "https://static.wixstatic.com/media/859174_07865d5222124ee39ebe60a1a41d3131~mv2.jpg", url: "https://ok.ru/videoembed/15506371643904" },
  { id: 11, title: "Pobrecito", dur: "00:45:32", desc: "Listo para escuchar la verdad, Jessé le pide a Haviva que cuente sobre su pasado. Mientras se mudan, Saúl y su familia entran en la nueva casa.", thumb: "https://static.wixstatic.com/media/859174_a75bd8ba2ecd406cab71fcc7ec427de5~mv2.jpg", url: "https://ok.ru/videoembed/15511264496128" },
  { id: 12, title: "Por qué estoy enviando", dur: "00:46:06", desc: "Después de una reacción violenta, Laís sugiere a Saúl que traigan a un arpista para ayudarlo. En busca de respuestas, Jonatán acude a Samuel.", thumb: "https://static.wixstatic.com/media/859174_82e87afcada14ec29cc2d070611a8b82~mv2.jpg", url: "https://ok.ru/videoembed/15512190519808" },
  { id: 13, title: "Esperando ansiosamente", dur: "00:45:53", desc: "En medio de la preocupación de todos por Saúl, David llega para tocar. Abi y Malquisua se sorprenden por un mensaje de los filisteos.", thumb: "https://static.wixstatic.com/media/859174_15e2c6c618bf4b8f990566989394786d~mv2.jpg", url: "https://ok.ru/videoembed/15512191240704" },
  { id: 14, title: "Mejor que nosotros", dur: "00:46:32", desc: "Movido por los celos, Eliab busca pelea en la posada. En Belén, una muerte repentina sacude a la familia de David.", thumb: "https://static.wixstatic.com/media/859174_ce1bbad9515744ffb11acefb8944692f~mv2.jpg", url: "https://ok.ru/videoembed/15512470030848" },
  { id: 15, title: "Porque yo voy", dur: "00:49:57", desc: "Llevando provisiones para los hermanos, David escucha los insultos de Goliat. Ante la reacción de los filisteos, Israel se prepara.", thumb: "https://static.wixstatic.com/media/859174_86052773b58b4899a21575e6b01e831c~mv2.jpg", url: "https://ok.ru/videoembed/15512471865856" },
  { id: 16, title: "Decenas de Miles", dur: "00:55:17", desc: "En medio de la celebración del pueblo, David se reencuentra con una persona especial. El canto de las mujeres despierta desconfianza en Saúl.", thumb: "https://static.wixstatic.com/media/859174_1b571add7a794d77b023e142d5e1d0f3~mv2.jpg", url: "https://ok.ru/videoembed/15512601692672" },
];

const ReyesEleccionPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 23;

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

    const savedEp = localStorage.getItem('reyes_eleccion_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < reyesEleccionEpisodes.length) setCurrentIdx(idx);
    }

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
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto', 'exodo'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'rechazo', 'eleccion'],
        jesus: ['jesus', 'milagros', 'pasion']
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
    setCurrentIdx(idx);
    setSelectedVideo(reyesEleccionEpisodes[idx].url);
    localStorage.setItem('reyes_eleccion_last_ep', idx.toString());
  };

  const closePlayer = () => setSelectedVideo(null);

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

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>Reyes: La Elección — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/" className="relative group text-white text-[15px] font-medium tracking-wide">Inicio<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-biblicas" className="relative group text-white text-[15px] font-medium tracking-wide">Series Biblicas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/series-tv" className="relative group text-white text-[15px] font-medium tracking-wide">Series TV<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/peliculas" className="relative group text-white text-[15px] font-medium tracking-wide">Peliculas<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/reyes-la-eleccion' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/kings-the-choosing' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/reis-a-escolha' }].map((l) => (
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

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_12a38d34df824a2399432a632688f86e~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reyes: La Elección" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${currentIdx + 1}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      {/* --- SECCIÓN DE EPISODIOS PREMIUM --- */}
      <div className="px-16 mb-20 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {reyesEleccionEpisodes.map((ep, index) => (
            <div key={ep.id} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] opacity-60" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <span className="text-[10px] font-bold text-white">{ep.dur}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className="font-bold text-base truncate uppercase group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8 text-justify">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-16 mb-32 flex justify-center">
          <Link href="/serie/reyes-la-persecucion">
            <button className="group relative bg-[#FF8A00] text-black font-black py-6 px-20 rounded-xl text-xl uppercase tracking-tighter hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,138,0,0.4)] overflow-hidden">
                <span className="relative z-10">Ver Siguiente Temporada</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </Link>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: Reyes: La Elección</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Capítulo {reyesEleccionEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {reyesEleccionEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                <IoChevronBack size={24} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all">
              <IoList size={28} className="text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Lista de Capítulos</span>
            </button>
            <button disabled={currentIdx === reyesEleccionEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward size={32} />
              </div>
            </button>
          </div>
        </div>
      )}

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
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.</p>
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
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default ReyesEleccionPC;
