import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 29) ---
const reyesDecadenciaEpisodes = [
  { id: 1, title: "El Día Siguiente", dur: "00:48:11", desc: "En un escenario que refleja paz y armonía, Salomón disfruta de la compañía de su familia. En Damasco, se encarga un ritual al dios Nergal...", thumb: "https://static.wixstatic.com/media/859174_07288c0a3d8e4891b810a15ce13ba86b~mv2.jpg", url: "https://ok.ru/videoembed/14918896323072", available: true },
  { id: 2, title: "La Venganza del Duelo", dur: "00:42:15", desc: "Sin imaginar lo que le costaría, Naamã acepta la ayuda de una persona querida de su pasado. Con la tensión casi palpable...", thumb: "https://static.wixstatic.com/media/859174_c6e9b142404b4136be7ef6b7afb8f553~mv2.jpg", url: "https://ok.ru/videoembed/14918896454144", available: true },
  { id: 3, title: "Intento de Comenzar de Nuevo", dur: "00:51:45", desc: "En la incansable búsqueda de los bebés secuestrados, los soldados se encuentran con una posibilidad aún más aterradora.", thumb: "https://static.wixstatic.com/media/859174_b0de23d52b1244398f856ca3e330795f~mv2.jpg", url: "https://ok.ru/videoembed/14945256147456", available: true },
  { id: 4, title: "Una Nueva en su Lugar", dur: "00:50:04", desc: "De camino a Jerusalén, Salomón es sorprendido por una persona peculiar. En el palacio, Nebset es atormentada por sus preocupaciones.", thumb: "https://static.wixstatic.com/media/859174_52aaae224ab5423cb243db8ee1074f14~mv2.jpg", url: "https://ok.ru/videoembed/14973211183616", available: true },
  { id: 5, title: "Él volvió, Ella se perdió", dur: "00:47:38", desc: "En medio de un banquete real, Salomón recibe un regalo muy especial. Con el interés de Kéfira en el rey, Hiram hace una propuesta.", thumb: "https://static.wixstatic.com/media/859174_d7964bdc7d37438ebeb8fcb700dcc44b~mv2.jpg", url: "https://ok.ru/videoembed/15003115915776", available: true },
  { id: 6, title: "La Fiesta de la Sabiduría", dur: "00:54:00", desc: "En compañía de Mazaab y Kéfira, Naamá prueba una costumbre de las mujeres extranjeras. Con Jerusalén de fiesta, Salomón habla sobre la sabiduría.", thumb: "https://static.wixstatic.com/media/859174_40e24fc08ed443e0a15a973d3ea212ca~mv2.jpg", url: "https://ok.ru/videoembed/15030437612032", available: true },
  { id: 7, title: "La Inauguración del Bosque", dur: "00:42:52", desc: "En Sabá, llega una invitación especial para la reina. Para saciar la curiosidad de todos, Salomón inaugura la Casa del Líbano.", thumb: "https://static.wixstatic.com/media/859174_3fa658019e914e1caf9b41b3216e9a65~mv2.jpg", url: "https://ok.ru/videoembed/15136793037312", available: true },
  { id: 8, title: "Verdades Dolorosas", dur: "00:54:36", desc: "Aterrada ante la posibilidad de que Sisac le cuente la verdad a Salomón, Nebset recurre a un viejo truco. Sin haber sido llamada,", thumb: "https://static.wixstatic.com/media/859174_4e06dd7944614ab3b76fd63dce4b9b8d~mv2.jpg", url: "https://ok.ru/videoembed/15137032178176", available: true },
  { id: 9, title: "Giro Bruscos", dur: "00:44:59", desc: "En un ambiente de reconciliación, Salomón y Naamá pasan la mañana juntos. Intentando convencer a Jeroboam de aceptar la alianza,", thumb: "https://static.wixstatic.com/media/859174_8491d466715a4469ab69b19b02378b62~mv2.jpg", url: "https://ok.ru/videoembed/15168962890240", available: true },
  { id: 10, title: "La Reina de Sabá", dur: "00:37:03", desc: "En un viaje a Neftalí, Salomón lleva a Basemate para conocer a su pretendiente. En una aparición inédita, Jerusalén recibe una visita sorpresa.", thumb: "https://static.wixstatic.com/media/859174_51b15aa4a4a14991b5a6031dc0ef3ca8~mv2.jpg", url: "https://ok.ru/videoembed/15202729331200", available: true },
  { id: 11, title: "Interacción Peligrosa", dur: "00:55:03", desc: "Completamente fascinado, Salomón escucha a Makeda contar el motivo de su visita. Reunido con los reyes de Siria, Rezom recibe noticias de Naamá.", thumb: "https://static.wixstatic.com/media/859174_25b6db2ff4ca475c94aac9a5b1cf5e1a~mv2.jpg", url: "https://ok.ru/videoembed/15233382812160", available: true },
  { id: 12, title: "Siendo Único", dur: "00:43:21", desc: "Llenas de celos, las mujeres del harén no pasan desapercibidas ante Salomón y Makeda. Indignado, Jeroboam expresa lo que piensa después de un accidente", thumb: "https://static.wixstatic.com/media/859174_0e277c465e4d4d43a9e43e6e6c5db055~mv2.jpg", url: "https://ok.ru/videoembed/15323206781440", available: true },
  { id: 13, title: "Se Queda para Siempre", dur: "00:52:05", desc: "Encantados el uno con el otro, Salomón y Makeda comparten un momento especial. Indignados por las contribuciones que envían a Jerusalén, los", thumb: "https://static.wixstatic.com/media/859174_d5fececdf8b444aa92dbff946c6ec831~mv2.jpg", url: "https://ok.ru/videoembed/15375883307520", available: true },
  { id: 14, title: "Mar Rojo", dur: "00:50:54", desc: "Con celos del rey, Naamá no pierde la oportunidad de humillar a la reina de Saba. Después de un paseo especial, Salomón es sorprendido por una decisión", thumb: "https://static.wixstatic.com/media/859174_8eff6c4739524e95b6af2472ab9c1b9f~mv2.jpg", url: "https://ok.ru/videoembed/15406760200704", available: true },
  { id: 15, title: "Él me Quiere", dur: "00:43:48", desc: "En conversación con Adoniram, Jeroboam se enfurece al descubrir al verdadero comprador del lugar. Completamente agobiada por todo lo que ha ocurrido", thumb: "https://static.wixstatic.com/media/859174_a072c65ce1944532ad0cc9c6b8e064cf~mv2.jpg", url: "https://ok.ru/videoembed/15425348700672", available: true },
  { id: 16, title: "El Inicio de la Ruina", dur: "00:55:59", desc: "Lleno de esperanza, Salomón decide viajar al reino de Saba. En una conversación con Roboam y las esposas del rey, Naamá demuestra señales de su cambio.", thumb: "https://static.wixstatic.com/media/859174_cd58be30737d485ba76009067a7fb31a~mv2.jpg", url: "https://ok.ru/videoembed/15458861124096", available: true },
  { id: 17, title: "Sin Vuelta Atrás", dur: "00:43:10", desc: "Afectado por la visita repentina de la reina de Saba, Salomón la invita a una enérgica presentación con el rey de Egipto. Asustado, Roboam se desespera al", thumb: "https://static.wixstatic.com/media/859174_b32fc9badb62428bb3d7a89d24e19202~mv2.jpg", url: "https://ok.ru/videoembed/15553873709568", available: true },
  { id: 18, title: "Ya no eres él", dur: "00:43:37", desc: "Con la fiesta aún en marcha, Nebset recibe un mensaje que amenaza con revelar su mayor secreto. Al partir de Jerusalén, Jeroboam es abordado y recibe una", thumb: "https://static.wixstatic.com/media/859174_269abf36e5c34a969506d479a3dd09b4~mv2.jpg", url: "https://ok.ru/videoembed/15586327398912", available: true },
  { id: 19, title: "Otros Altares", dur: "00:52:32", desc: "Influenciado por su reina, Salomón cede a una petición peligrosa. En conflicto por la presencia de Maacá, se revela más sobre el pasado de la hija de", thumb: "https://static.wixstatic.com/media/859174_aef616ad4cbe405299e43f72dbe99ba4~mv2.jpg", url: "https://ok.ru/videoembed/15391903456768", available: true },
  { id: 20, title: "Casa Dividida", dur: "00:57:49", desc: "Al no gustarle la presencia del profeta Ahías, Salomón se intriga con la revelación de quién fue elegido para ser el nuevo rey. En la recta final de su plan", thumb: "https://static.wixstatic.com/media/859174_7383861e0d3240a69fa985f670cebcd2~mv2.jpg", url: "https://ok.ru/videoembed/15391903456768", available: true },
  { id: 21, title: "Conclusiones", dur: "01:11:12", desc: "Al llegar a una conclusión sobre su vida, Salomón sufre un arrebato. Al ver a Roboam angustiado por los últimos acontecimientos, Maacá intenta apoyarlo", thumb: "https://static.wixstatic.com/media/859174_a28ffd421b17470b82be7e646167e565~mv2.jpg", url: "https://ok.ru/videoembed/15391903456768", available: true },
];

const ReyesDecadenciaPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 29;

  useEffect(() => {
    // --- BLINDAJE TOTAL ACTIVADO ---
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

    const savedEp = localStorage.getItem('reyes_decadencia_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < reyesDecadenciaEpisodes.length && reyesDecadenciaEpisodes[idx].available) setCurrentIdx(idx);
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

  // --- BUSCADOR COMPLETO RESTAURADO ---
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
    // if (!reyesDecadenciaEpisodes[idx].available) return;
    setCurrentIdx(idx);
    setSelectedVideo(reyesDecadenciaEpisodes[idx].url || null);
    localStorage.setItem('reyes_decadencia_last_ep', idx.toString());
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
      <Head><title>Reyes: La Decadencia — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/reyes-la-decadencia' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/serie/reyes-la-decadencia' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/serie/reyes-la-decadencia' }].map((l) => (
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
        <img src="https://static.wixstatic.com/media/859174_90605155f6794a45aa7ccb10598eeff0~mv2.jpg" className="w-full h-full object-cover" alt="Banner Reyes: La Decadencia" />
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

      <div className="px-16 mb-20 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {reyesDecadenciaEpisodes.map((ep, index) => (
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
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span className="text-[11px] font-black uppercase text-white">Episodio <span className="text-[#FF8A00]">{ep.id}</span></span>
                </div>
                {ep.available && (
                   <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                     <span className="text-[10px] font-bold text-white">{ep.dur}</span>
                   </div>
                )}
              </div>
              <div className="p-5 flex flex-col gap-1">
                <h3 className={`font-bold text-base truncate uppercase ${ep.available ? 'group-hover:text-[#FF8A00]' : 'text-gray-500'}`}>{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">
                  {ep.available ? ep.desc : "Próximamente disponible"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-16 mb-32 flex justify-center">
          <Link href="/serie/reyes-la-division">
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
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Reyes: La Decadencia</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">{reyesDecadenciaEpisodes[currentIdx].title}</h2>
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
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === reyesDecadenciaEpisodes.length - 1 || !reyesDecadenciaEpisodes[currentIdx + 1].available} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
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

      {/* --- FOOTER MAESTRO RESTAURADO AL 100% --- */}
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
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default ReyesDecadenciaPC;
