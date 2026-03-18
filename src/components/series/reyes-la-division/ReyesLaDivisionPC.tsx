import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS REAL (ID: 30) ---
const reyesDivisionEpisodes = [
  { id: 1, title: "EP. 01 | Me quedé solo", dur: "00:57:20", desc: "Con un vistazo al futuro, una mujer de notable opulencia comienza a narrar la historia a un oyente enigmático. Aún lidiando con la muerte de sus padres, Roboam es confrontado por los gobernadores, y una pequeña.", thumb: "https://static.wixstatic.com/media/859174_5620b12cd0754f39894b8e2bc2b35fd2~mv2.jpg", url: "https://ok.ru/videoembed/15777259588096", available: true },
  { id: 2, title: "EP. 02 | No te traiciones a ti mismo", dur: "00:42:13", desc: "Procedente de una infancia conflictiva, el pasado de Jeroboam es revelado y fragmentos inéditos de su historia muestran cómo el elegido para ser el nuevo rey llegó hasta aquí. Superando el impacto", thumb: "https://static.wixstatic.com/media/859174_9240fb8b57bf4d6a88b33d369aa29746~mv2.jpg", url: "https://ok.ru/videoembed/15796254607872", available: true },
  { id: 3, title: "EP. 03 | ¿De quién es Israel?", dur: "00:48:35", desc: "En Siquem, Jeroboam hace una propuesta decisiva al pueblo y al rey. Decidido a no fallar más a Dios ni a su esposa, Roboam comunica su decisión a Maaca, pero la llegada de Maalat toma a ambos por sorpresa.", thumb: "https://static.wixstatic.com/media/859174_92933f124d1d47088e8fa079feb9e528~mv2.jpg", url: "https://ok.ru/videoembed/15847004244480", available: true },
  { id: 4, title: "EP. 04 | ¡Hacia una nueva nación!", dur: "00:32:59", desc: "En Siquem, Roboam pronuncia un discurso decisivo y el cumplimiento de la profecía finalmente se hace realidad. Fuera de los muros de Jerusalén, un antiguo sacerdote encuentra su redención.", thumb: "https://static.wixstatic.com/media/859174_1852ff5af52640ec9b3b963208eb36ce~mv2.jpg", url: "https://ok.ru/videoembed/15875085634048", available: true },
  { id: 5, title: "EP. 05 | Una reunión de serpientes", dur: "00:40:29", desc: "Después de resolver su conflicto familiar, Roboam inicia los preparativos para una reacción ofensiva contra Jeroboam. Desesperada, Maaca acepta una propuesta tentadora.", thumb: "https://static.wixstatic.com/media/859174_8baf86dedc3f4ff19b0642370fe43acb~mv2.jpg", url: "https://ok.ru/videoembed/15907665676800", available: true },
  { id: 6, title: "EP. 06 | ¿Soy o no soy el rey?", dur: "00:36:47", desc: "Con todo el ejército de Judá y Benjamín listo para partir, Semaías profetiza a Roboam, quien se enfrenta a una elección definitiva. Tafet y Basemat inician su huida, pero las cosas no salen como se esperaba.", thumb: "https://static.wixstatic.com/media/859174_bc84c278b1a94b85ac7ad7dc75c3acf0~mv2.jpg", url: "https://ok.ru/videoembed/16024452729344", available: true },
  { id: 7, title: "EP. 07 | Me acostumbraré", dur: "00:34:31", desc: "En una ceremonia ante las personalidades del reino, Roboam presenta a su hijo con Maaca, Abías. Sintiéndose amenazado, Jeroboam hace una propuesta peligrosa a los gobernadores.", thumb: "https://static.wixstatic.com/media/859174_86b2e631972a400bbb8fad2188339dd4~mv2.jpg", url: "https://ok.ru/videoembed/16058433276416", available: true },
  { id: 8, title: "EP. 08 Me irritas", dur: "00:53:52", desc: "Dejando el palacio bajo tensión, una persona del pasado de Roboam decide hacer una visita. Siguiendo con el plan de evitar que el pueblo vaya a Jerusalén, Jeroboam anuncia la fiesta de los hijos de Israel.", thumb: "https://static.wixstatic.com/media/859174_03b83bd91ff949b79697902a856cb303~mv2.jpg", url: "https://ok.ru/videoembed/16059254639104", available: true },
  { id: 9, title: "EP. 09 | Libertad de las cadenas", dur: "00:46:26", desc: "Después de un intenso conflicto fuera de los muros de Jerusalén, en el palacio Roboam se preocupa por el estado de Abías. En Dan, Jeroboam revela los becerros de oro.", thumb: "https://static.wixstatic.com/media/859174_708e23d17b4a42c7b40643e95a652406~mv2.jpg", url: "https://ok.ru/videoembed/16059255294464", available: true },
  { id: 10, title: "EP. 10 | ¿Satisfecho ahora?", dur: "00:38:35", desc: "Con las miradas del pueblo llenas de expectativa, Iddo profetiza contra Jeroboam. Atrapada en la tumba de Nebset, Tafeta confronta a Ben-Simei sobre sus verdaderos sentimientos.", thumb: "https://static.wixstatic.com/media/859174_6097d9e18b6146608c20aba4e04e4060~mv2.jpg", url: "https://ok.ru/videoembed/16059256605184", available: true },
  { id: 11, title: "EP. 11 | De huérfano a huérfano", dur: "00:41:32", desc: "Con el empeoramiento del estado de Abías, Jeroboam hace una petición peligrosa a Raquel. Convencido por Maaca, Roboam va al Monte de los Olivos para ofrecer un ritual a Aserá, encontrándose con una gran sorpresa.", thumb: "https://static.wixstatic.com/media/859174_ef4eb8ef50244e8a955296e4c54155cf~mv2.jpg", url: "https://ok.ru/videoembed/16059259357696", available: true },
  { id: 12, title: "EP. 12 | Parece un parásito", dur: "00:47:00", desc: "Aturdido al descubrir cómo funcionan los rituales a Aserá, Roboam se ve obligado a seguir un nuevo camino. En un intento de engañar al profeta Ahías, Raquel regresa a casa con una respuesta, pero también con una profecía.", thumb: "https://static.wixstatic.com/media/859174_a4cc78e48cd244bca26e16625e112fcc~mv2.jpg", url: "https://ok.ru/videoembed/16061125626368", available: true },
  { id: 13, title: "EP. 13 | ¿Te gustó la sorpresa?", dur: "00:49:36", desc: "Desconcertado por el ataque sorpresa de Sisac, Roboam se humilla ante Dios y recibe una respuesta. Años después, la dinámica entre los hijos del sucesor de Salomón ya revela posibles conflictos.", thumb: "https://static.wixstatic.com/media/859174_d55d949485ab4ab6b1a1043c4a0d904d~mv2.jpg", url: "https://ok.ru/videoembed/16061126937088", available: true },
  { id: 14, title: "ESTRENO EL 19 DE MARZO", dur: "00:46:33", desc: "Roboam celebra una fiesta en alta mar para anunciar a su hijo elegido, y un giro de la naturaleza intensifica el caos. Desolados, Semaías y Amalia sufren por la decisión inesperada de su hija.", thumb: "https://static.wixstatic.com/media/859174_a0cf01916d504c709520ee0f7ce610f5~mv2.jpg", url: "https://ok.ru/videoembed/16061128772096", available: true },
  { id: 15, title: "ESTRENO EL 20 DE MARZO", dur: "00:44:20", desc: "En una conversación con Jehús, Maalat revela un antiguo secreto sobre Maaca. En medio de una discusión acalorada, Roboam revela ante todos que Abías es su sucesor, y el desarrollo del enfrentamiento se sale de", thumb: "https://static.wixstatic.com/media/859174_f708519ca27947b28d89a438b2ae336f~mv2.jpg", url: "https://ok.ru/videoembed/16061129427456", available: true },
  { id: 16, title: "ESTRENO EL 23 DE MARZO", dur: "00:42:56", desc: "Después del incidente en la sala del trono, Maalat cuida de Roboam y, movido por la alabanza, el rey le pide que se quede. Sin saber el paradero de Asa, Maaca se desespera.", thumb: "https://static.wixstatic.com/media/859174_0e33347809ac404b9cead95e01c8ec85~mv2.jpg", url: "https://ok.ru/videoembed/16061130213888", available: true },
  { id: 17, title: "ESTRENO EL 24 DE MARZO", dur: "00:42:46", desc: "En una reunión secreta con Jeroboam, los ánimos de los hijos de Roboam se alteran ante la propuesta de un acuerdo que cambiaría el destino de toda la nación. Como un acto de misericordia, Miguel aparece al rey.", thumb: "https://static.wixstatic.com/media/859174_2ab275e32dc3421b91e3e298178c11e4~mv2.jpg", url: "https://ok.ru/videoembed/16061131328000", available: true },
  { id: 18, title: "ESTRENO EL 25 DE MARZO", dur: "00:38:18", desc: "Acompañando a Miguel, Roboam se enfrenta a grandes revelaciones. Aprovechando la ausencia de Maaca, Abda lleva a Asa a la tumba de Nebset y le confía un secreto importante.", thumb: "https://static.wixstatic.com/media/859174_26537bde4bb04ae4a99f954c30ad3979~mv2.jpg", url: "https://ok.ru/videoembed/16061134277120", available: true },
  { id: 19, title: "ESTRENO EL 26 DE MARZO", dur: "00:38:38", desc: "Como sucesor de Roboam, Abías busca consejo de Semaías, pero sale a la luz la culpa por su relación con Joela. En las puertas de Jerusalén, Jeroboam pone en marcha su plan.", thumb: "https://static.wixstatic.com/media/859174_286593b61f58427dac87a3b7e0162b3d~mv2.jpg", url: "https://ok.ru/videoembed/16061145352704", available: true },
];

const ReyesDivisionPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 30;

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

    const savedEp = localStorage.getItem('reyes_division_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < reyesDivisionEpisodes.length && reyesDivisionEpisodes[idx].available) setCurrentIdx(idx);
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

  // --- BUSCADOR COMPLETO ---
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto', 'exodo'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'division', 'decadencia', 'jerusalen'],
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
    if (!reyesDivisionEpisodes[idx].available) return;
    setCurrentIdx(idx);
    setSelectedVideo(reyesDivisionEpisodes[idx].url || null);
    localStorage.setItem('reyes_division_last_ep', idx.toString());
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
        <img src="https://static.wixstatic.com/media/859174_8ccb6683bc06431d9cd0c56fa070ce80~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reyes: La División" />
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

      <div className="px-16 mb-20 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8 text-left">
          {reyesDivisionEpisodes.map((ep, index) => (
            <div key={ep.id} className={`group rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${ep.available ? (currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20 cursor-pointer' : 'border-transparent hover:border-white/20 cursor-pointer') : 'border-white/5 opacity-60 cursor-default'}`} 
                 onClick={() => ep.available && openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                {ep.available ? (
                   <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                ) : (
                   <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <span className="text-[#FF8A00] font-black text-4xl opacity-20">{ep.id}</span>
                   </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] opacity-60" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-left">
                    <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                </div>
                {ep.available && (
                   <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                     <span className="text-[10px] font-bold text-white">{ep.dur}</span>
                   </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-1 text-left">
                <h3 className={`font-bold text-base truncate uppercase ${ep.available ? 'group-hover:text-[#FF8A00]' : 'text-gray-500'}`}>{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8 text-justify">
                  {ep.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-16 mb-32 flex justify-center">
          <Link href="/serie/reyes-la-emboscada">
            <button className="group relative bg-[#FF8A00] text-black font-black py-6 px-20 rounded-xl text-xl uppercase tracking-tighter hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,138,0,0.4)] overflow-hidden">
                <span className="relative z-10">Ver Siguiente Temporada</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </button>
          </Link>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in text-left">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Reyes: La División</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">{reyesDivisionEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Cerrar</span>
              <IoClose size={24} className="group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
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
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === reyesDivisionEpisodes.length - 1 || !reyesDivisionEpisodes[currentIdx + 1].available} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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
          <div className="flex justify-start md:justify-end gap-6 mb-10 text-left">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4 text-left">
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

export default ReyesDivisionPC;
