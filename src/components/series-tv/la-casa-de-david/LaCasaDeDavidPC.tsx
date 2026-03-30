import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 40) ---
const davidEpisodes = [
  // TEMPORADA 1
  { id: 1, season: 1, title: "T1 E1 — Pastor y rey", desc: "Mil años antes de Cristo, Saúl, el primer rey de Israel, pierde la gracia de Dios y, en consecuencia, también la cordura. Mientras tanto, lejos del palacio, el legendario vidente Samuel se da cuenta de la existencia de un joven y talentoso pastor llamado David.", thumb: "https://static.wixstatic.com/media/859174_8b4989cffc044ac69fc7766f9ee2268c~mv2.webp", url: "https://drive.google.com/file/d/1yv8h923_RnwiaFEnLMLJWJ7ZKXxIYXTO/preview" },
  { id: 2, season: 1, title: "T1 E2 — Un abismo llama a otro abismo", desc: "La familia de Saúl observa con gran preocupación el deterioro del estado mental del rey y está dispuesta a hacer todo lo que esté a su alcance para defender su reinado. David sueña con una vida fuera de su hogar, pero lo que encuentra supera sus expectativas.", thumb: "https://static.wixstatic.com/media/859174_007f7c4183c74677b17e86e0f7cc4218~mv2.webp", url: "https://drive.google.com/file/d/1oVCAvsPuSMKLJiSGr-1OCBofJO68WPg3/preview" },
  { id: 3, season: 1, title: "T1 E3 — La unción", desc: "La corte debe lidiar con las consecuencias de la locura de Saúl; Samuel huye de un agente siniestro y una sombra nefasta reúne a un aliado legendario en su plan para conquistar Israel. David tiene un encuentro que cambiará el curso de la historia.", thumb: "https://static.wixstatic.com/media/859174_570af26a7bc449c1bf7c60c750866748~mv2.webp", url: "https://drive.google.com/file/d/1SsO6jnrjohGu1580dT3zAckyn7HWYus3/preview" },
  { id: 4, season: 1, title: "T1 E4 — El cántico de Moisés", desc: "Un miembro del palacio enfrenta serias acusaciones que obligan a la familia real a reaccionar. Samuel sufre una grave pérdida y se ve confrontado con las consecuencias de su profecía. David descubre un nuevo mundo de secretos y peligros.", thumb: "https://static.wixstatic.com/media/859174_b385a043c11c45d8a5870377676c51ff~mv2.webp", url: "https://drive.google.com/file/d/1IHZXZPCxKxfzZLA0mZR40zbKXuPsrxzm/preview" },
  { id: 5, season: 1, title: "T1 E5 — El lobo y el león", desc: "La reina Ahinoam organiza una fiesta para dar la bienvenida a un importante grupo de invitados. La política en la corte está llena de engaños. David aprende a navegar por su nueva vida y se acerca un paso más a su destino.", thumb: "https://static.wixstatic.com/media/859174_99024d73744540678c8edf4ecfb359b2~mv2.webp", url: "https://drive.google.com/file/d/1ho4K0yAjtqLljLggorpxSEh93cOE48_X/preview" },
  { id: 6, season: 1, title: "T1 E6 — El despertar de los gigantes", desc: "Los poderes oscuros se fortalecen fuera del reino de Saúl mientras enemigos de Israel invocan guerreros legendarios. Una relación en la corte complica la vida de los héroes y la reina Ahinoam debe tomar medidas drásticas.", thumb: "https://static.wixstatic.com/media/859174_0b0512122127407e9b32ace5ba286a08~mv2.webp", url: "https://drive.google.com/file/d/1Ev-3KU7jB3CcXKuufBs5ishkrSr99jWv/preview" },
  { id: 7, season: 1, title: "T1 E7 — David y Goliat — Parte 1", desc: "Reyes, héroes y villanos luchan por la corona en un enfrentamiento final. La guerra es inevitable y los jugadores se preparan para una pelea colosal que decidirá el destino de Israel para siempre.", thumb: "https://static.wixstatic.com/media/859174_27eb74f4ef644c88979549413b337c79~mv2.webp", url: "https://drive.google.com/file/d/1CkJvv2ZhZ_Dk-8qpMiiJCwupqhcgROTW/preview" },
  { id: 8, season: 1, title: "T1 E8 — David y Goliat — Parte 2", desc: "Un épico choque de fuerzas pone a prueba una profecía. Se avecina una de las batallas más legendarias y los héroes deben enfrentarse a sus enemigos más letales. ¿Quién saldrá victorioso?", thumb: "https://static.wixstatic.com/media/859174_4b40f2423c914e4389b206d2c6100d2a~mv2.webp", url: "https://drive.google.com/file/d/1LlbKb8PYzVmMeKI9HHoW7h6o9E7MUvKi/preview" },
  
  // TEMPORADA 2 (ESTRENO)
  { id: 9, season: 2, title: "T2 E1 — Una historia de dos espadas", desc: "Goliat ha caído. Mientras los ejércitos chocan, David queda atrapado en el centro de la tormenta. Jonatán lucha en medio del caos, mientras Saúl enfrenta a sus demonios. Una lucha por la supervivencia.", thumb: "https://static.wixstatic.com/media/859174_5978c9d08c2e427b86eafa286dbae70c~mv2.jpg", url: "https://drive.google.com/file/d/1NSFWwtPmRVugg8MM1XdYfM6F36_bfiou/preview", isNew: true },
  { id: 10, season: 2, title: "T2 E2 — Un viaje a casa", desc: "El ejército de Saúl regresa a Guibeá triunfante. David, celebrado como el «matagigantes», comienza a ganarse el corazón del pueblo mientras fortalece su vínculo con Jonatán. Surgen secretos tras los muros.", thumb: "https://static.wixstatic.com/media/859174_270268ce0e4341d698685ee3d8d87364~mv2.jpg", url: "https://drive.google.com/file/d/1MvGA1Sg8crTOGs2DNh-j3vMcGCAQ84Ek/preview", isNew: true },
  { id: 11, season: 2, title: "T2 E3 — El camino intermedio", desc: "Jonatán entrena a David mientras aumentan las tensiones entre Saúl y Ajinoam. La influencia de David inquieta a la corte y en Gat, Aquis lucha por recuperar fuerzas. Alianzas empiezan a moverse.", thumb: "https://static.wixstatic.com/media/859174_49a90b4238624b89994d800a64cfbe14~mv2.jpg", url: "https://drive.google.com/file/d/1vKRcdxuV0ZWm2dpp568EZe8asV5Hhros/preview", isNew: true },
  { id: 12, season: 2, title: "T2 E4 — Camino hacia la expiación", desc: "La caravana real viaja al Tabernáculo para el Día de la Expiación. El valor de David es puesto a prueba cuando un pueblo es atacado por filisteos. Samuel realiza el ritual sagrado.", thumb: "https://static.wixstatic.com/media/859174_69c51664022b45cdaf76505b5b1fa5d6~mv2.webp", url: "https://drive.google.com/file/d/1CzH51XVPBJdrulRYOK5-joobh2UJ-iKa/preview", isNew: true },
  { id: 13, season: 2, title: "T2 E5 — Dios de las espadas", desc: "David se reencuentra con Jonatán, pero las tensiones aumentan cuando Abner los lleva a Endor en busca de conocimiento prohibido. Un misterioso herrero y la Hechicera revelan secretos oscuros.", thumb: "https://static.wixstatic.com/media/859174_49f65c6eb81041a1b461b8b880553ec4~mv2.jpg", url: "https://drive.google.com/file/d/1I5XsTgr_0szLDNcGX7fRZuNoP33ykCll/preview", isNew: true },
  { id: 14, season: 2, title: "T2 E6 — Forjado en el fuego", desc: "Saúl se obsesiona con el poder de David y Ajinoam idea un plan mortal. Para ganar la mano de Mical, David debe cumplir una orden sangrienta contra los filisteos. Un banquete termina en tragedia.", thumb: "https://static.wixstatic.com/media/859174_8c5c6395dd9946e18dafc5f0871671c4~mv2.jpg", url: "https://drive.google.com/file/d/1VabUK7MlCTMA4rYEeDFHxG0u_ffnOM4t/preview", isNew: true },
  { id: 15, season: 2, title: "T2 E7 — Una boda real", desc: "La familia real se fractura por las decisiones de Saúl mientras el reino sufre hambre. Es-baal propone una alianza con Edom y Adriel da su paso cuando se revela al ungido.", thumb: "https://static.wixstatic.com/media/859174_772c7e032d02464d8a144a286123d3a8~mv2.webp", url: "https://drive.google.com/file/d/1unF0BDAwi79sBlGFjF3mcEIObqit3bmh/preview", isNew: true },
  { id: 16, season: 2, title: "T2 E8 — La verdad revelada", desc: "La paranoia de Saúl estalla en guerra abierta contra David. Mical debe elegir entre amor y lealtad. Entre fuego y traición, la profecía y el poder chocan en un final que cambiará el reino.", thumb: "https://static.wixstatic.com/media/859174_1039ec57f90649689f2996b78c989da6~mv2.webp", url: "https://drive.google.com/file/d/1cOFAjxz8_ltpJWuTgMDhZMZdAntg1zU/preview", isNew: true },
];

const HouseOfDavidPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(8); // Por defecto inicia en T2 E1
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 40;

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

    const savedEp = localStorage.getItem('david_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < davidEpisodes.length) setCurrentIdx(idx);
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
        moises: ['moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'ester', 'persia', 'casa de david'],
        david: ['david', 'casa de david', 'reyes', 'goliat', 'saul', 'betseba'],
        biblia: ['biblia', 'milagros']
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
    // Para Google Drive, la reproducción automática forzada no es estándar, 
    // pero configuramos la carga del iframe de manera directa.
    setSelectedVideo(davidEpisodes[idx].url);
    localStorage.setItem('david_last_ep', idx.toString());
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
      <Head><title>La Casa de David — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/la-casa-de-david' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/house-of-david' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/casa-de-davi' }].map((l) => (
              <Link key={l.n} href={l.p}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" alt="idioma" /></Link>
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
        <img src="https://static.wixstatic.com/media/859174_6c9b19e53a554d6ab748a2bb44f1f9c4~mv2.jpg" className="w-full h-full object-cover" alt="Banner La Casa de David" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 8 ? "▶ Ver Estreno T2" : `▶ Continuar Ep. ${davidEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> En Mi Lista</> : '+ Mi Lista'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {davidEpisodes.map((ep, index) => (
            <div key={index} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-black border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-white/5 hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" alt={ep.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-80" />
                
                {/* Etiqueta de Estreno para T2 */}
                {ep.isNew && (
                  <div className="absolute top-2 right-2 bg-[#FF8A00] px-2 py-0.5 rounded text-[9px] font-black text-black uppercase tracking-tighter">NUEVO</div>
                )}

                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span className="text-[11px] font-black uppercase text-white">Temporada <span className="text-[#FF8A00]">{ep.season}</span></span>
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

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in text-left">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: La Casa de David</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">{davidEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Salir del video</span>
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl shadow-black">
                <IoChevronBack className="text-2xl" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all">
              <IoList size={28} className="text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === davidEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all shadow-black">
                <IoChevronForward className="text-4xl" />
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

export default HouseOfDavidPC;
