import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS (ID: 17) ---
const pabloEpisodes = [
  { id: 1, title: "YO SOY FARISEO", dur: "48:15", thumb: "https://static.wixstatic.com/media/859174_bc7bb5bca3b945679b42140b328190bb~mv2.jpg", url: "https://ok.ru/videoembed/15046009489920" },
  { id: 2, title: "NO TE CULPES POR ESO", dur: "46:45", thumb: "https://static.wixstatic.com/media/859174_e02a7db2f26647ddafb20e721182fb56~mv2.jpg", url: "https://ok.ru/videoembed/15046314297856" },
  { id: 3, title: "IR EN CONTRA DE DIOS", dur: "45:09", thumb: "https://static.wixstatic.com/media/859174_59d8754b1047471cab6eb4e2e4bc5ed9~mv2.jpg", url: "https://ok.ru/videoembed/15055683062272" },
  { id: 4, title: "¿POR QUÉ ME PERSIGUES?", dur: "45:03", thumb: "https://static.wixstatic.com/media/859174_ef5088ba6ca04f129a6929e2a35d69b4~mv2.jpg", url: "https://ok.ru/videoembed/15055683521024" },
  { id: 5, title: "NUESTRO PAN DE CADA DÍA", dur: "52:30", thumb: "https://static.wixstatic.com/media/859174_75104984b2d342f2b2560964c0288ce4~mv2.jpg", url: "https://ok.ru/videoembed/15055762885120" },
  { id: 6, title: "LLÁMAME PABLO", dur: "50:08", thumb: "https://static.wixstatic.com/media/859174_fdd82b41ec0c444a9a8a64590cd46f63~mv2.jpg", url: "https://ok.ru/videoembed/15055987870208" },
  { id: 7, title: "A MI LADO", dur: "36:47", thumb: "https://static.wixstatic.com/media/859174_5bd0d8d2c6684bc6971655334e95e6ca~mv2.jpg", url: "https://ok.ru/videoembed/15055988394496" },
  { id: 8, title: "¿PUEDO EXPLICAR, FAMILIA?", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_ed162d2336b94bacaecaa933701e29b2~mv2.jpg", url: "https://ok.ru/videoembed/15055988656640" },
  { id: 9, title: "PETICIÓN DE PERDÓN", dur: "43:45", thumb: "https://static.wixstatic.com/media/859174_0c91524b65a74f5e87f3cb50e7148d2f~mv2.jpg", url: "https://ok.ru/videoembed/15055988853248" },
  { id: 10, title: "YO LLEGARÉ PRIMERO", dur: "41:44", thumb: "https://static.wixstatic.com/media/859174_6a22ea0a0917448cbbd5c91f19310a48~mv2.jpg", url: "https://ok.ru/videoembed/15055989049856" },
  { id: 11, title: "HAY UNA CRIATURA EN ÉL", dur: "45:14", thumb: "https://static.wixstatic.com/media/859174_a78129abb97d4917b2c0b91474280bb5~mv2.jpg", url: "https://ok.ru/videoembed/15055989312000" },
  { id: 12, title: "JÚPITER Y MERCURIO", dur: "39:39", thumb: "https://static.wixstatic.com/media/859174_e3c3ca6abe4c405ebf6635963912faa9~mv2.jpg", url: "https://ok.ru/videoembed/15055989639680" },
  { id: 13, title: "LA CUESTIÓN DE LA CIRCUNCISIÓN", dur: "48:11", thumb: "https://static.wixstatic.com/media/859174_3268d80fdb63432c8c0ccd51e454d005~mv2.jpg", url: "https://ok.ru/videoembed/15055989770752" },
  { id: 14, title: "¿POR QUÉ, PEDRO?", dur: "44:51", thumb: "https://static.wixstatic.com/media/859174_fd5467fe1e384aa3be14dabf9baecce7~mv2.jpg", url: "https://ok.ru/videoembed/15080759822848" },
  { id: 15, title: "¡MARCOS NO VA!", dur: "45:05", thumb: "https://static.wixstatic.com/media/859174_351a542876c048278d86c2989359d880~mv2.jpg", url: "https://ok.ru/videoembed/15080760084992" },
  { id: 16, title: "HOLA, LUCAS", dur: "49:03", thumb: "https://static.wixstatic.com/media/859174_77aa8aba96ab45f78dab6118caa7e65c~mv2.jpg", url: "https://ok.ru/videoembed/15080760347136" },
  { id: 17, title: "SÍ, YO SOY NERO", dur: "48:09", thumb: "https://static.wixstatic.com/media/859174_264ee56696b042dba62dbf6470cd9456~mv2.jpg", url: "https://ok.ru/videoembed/15080760478208" },
  { id: 18, title: "QUITA DE MÍ ESTE DESEO", dur: "48:09", thumb: "https://static.wixstatic.com/media/859174_b57dbd2a47ff485d8c32d6f278adb6be~mv2.jpg", url: "https://ok.ru/videoembed/15080760674816" },
  { id: 19, title: "¡UN TERREMOTO!", dur: "58:16", thumb: "https://static.wixstatic.com/media/859174_2d7e61bd557a49e4810bc6f0bd04dc10~mv2.jpg", url: "https://ok.ru/videoembed/15166752164352" },
  { id: 20, title: "¿ME AMAS?", dur: "51:15", thumb: "https://static.wixstatic.com/media/859174_80645a67b00a47e78cfb1442d995dbad~mv2.jpg", url: "https://ok.ru/videoembed/15166754130432" },
  { id: 21, title: "PABLO EN ATENAS", dur: "51:12", thumb: "https://static.wixstatic.com/media/859174_b39b759c2fed4959aaee0dac58a773be~mv2.jpg", url: "https://ok.ru/videoembed/15231880333824" },
  { id: 22, title: "¡VIVE PARA MÍ!", dur: "56:06", thumb: "https://static.wixstatic.com/media/859174_02a5725c44af4de986b52eb8b185a279~mv2.jpg", url: "https://ok.ru/videoembed/15231880530432" },
  { id: 23, title: "JUEGOS ÍSTMICOS", dur: "43:03", thumb: "https://static.wixstatic.com/media/859174_89ece7d660e94146af8d1438b75b6d80~mv2.jpg", url: "https://ok.ru/videoembed/15231881054720" },
  { id: 24, title: "REUNIÓN EN CORINTO", dur: "55:19", thumb: "https://static.wixstatic.com/media/859174_430ad0ce03d64760a9ecccd910045005~mv2.jpg", url: "https://ok.ru/videoembed/15231881972224" },
  { id: 25, title: "PASCUA", dur: "35:38", thumb: "https://static.wixstatic.com/media/859174_7356ff96dba440aa960a5364d0599986~mv2.jpg", url: "https://ok.ru/videoembed/15231882562048" },
  { id: 26, title: "ESPINA EN LA CARNE", dur: "40:58", thumb: "https://static.wixstatic.com/media/859174_8e5469e76e894c4296dfda6af10010e3~mv2.jpg", url: "https://ok.ru/videoembed/15231882955264" },
  { id: 27, title: "HECHOS DE LOS APÓSTOLES", dur: "47:03", thumb: "https://static.wixstatic.com/media/859174_80e260df21454203a7b0d4b8210b7c88~mv2.jpg", url: "https://ok.ru/videoembed/15231883282944" },
  { id: 28, title: "¿QUIÉN ES APOLO?", dur: "41:08", thumb: "https://static.wixstatic.com/media/859174_b9340379a4f24c1699182b5994ceb466~mv2.jpg", url: "https://ok.ru/videoembed/15231883676160" },
  { id: 29, title: "IGLESIA DE CORINTO", dur: "38:40", thumb: "https://static.wixstatic.com/media/859174_e95ac02e68e941b0a3ca28e0b43ae94b~mv2.jpg", url: "https://ok.ru/videoembed/15231945083392" },
  { id: 30, title: "ARENA DE LOS LEONES", dur: "31:55", thumb: "https://static.wixstatic.com/media/859174_7cfcde08f3f445db92ae3652870dc2e3~mv2.jpg", url: "https://ok.ru/videoembed/15231946197504" },
  { id: 31, title: "MÁS GRANDE QUE DIANA", dur: "40:51", thumb: "https://static.wixstatic.com/media/859174_43ef8a2b33244ca0816e6b980d28ed98~mv2.jpg", url: "https://ok.ru/videoembed/15232133040640" },
  { id: 32, title: "CARTA A LOS CORINTIOS", dur: "43:57", thumb: "https://static.wixstatic.com/media/859174_b2c28dc377934cf89c42837aed4e487e~mv2.jpg", url: "https://ok.ru/videoembed/15232133564928" },
  { id: 33, title: "LOS HIJOS DE CEVA", dur: "40:03", thumb: "https://static.wixstatic.com/media/859174_4b8209c89f82418bb2ce47ca9d1d05b1~mv2.jpg", url: "https://ok.ru/videoembed/15232133827072" },
  { id: 34, title: "PABLO Y APOLOS", dur: "47:50", thumb: "https://static.wixstatic.com/media/859174_577dbc6820bd4b9fa6d07bf5a4ec5e31~mv2.jpg", url: "https://ok.ru/videoembed/15232539429376" },
  { id: 35, title: "MOTÍN EN ÉFESO", dur: "48:13", thumb: "https://static.wixstatic.com/media/859174_715571cdfabe40d3bef042e9801f1b9d~mv2.jpg", url: "https://ok.ru/videoembed/15232540150272" },
  { id: 36, title: "BERNABÉ Y MARCOS", dur: "47:49", thumb: "https://static.wixstatic.com/media/859174_1582217171704cb7b41f1223b3a59e27~mv2.jpg", url: "https://ok.ru/videoembed/15232540477952" },
  { id: 37, title: "CAÍDA DE EUTICO", dur: "46:31", thumb: "https://static.wixstatic.com/media/859174_4343e13148d64f1d8ca6e2cf64ac00d2~mv2.jpg", url: "https://ok.ru/videoembed/15232541329920" },
  { id: 38, title: "COMO EL CÍMBALO", dur: "43:31", thumb: "https://static.wixstatic.com/media/859174_7577484f57334c70a1a7de9469da6a29~mv2.jpg", url: "https://ok.ru/videoembed/15232541919744" },
  { id: 39, title: "DESPEDIDA EN MILETO", dur: "42:27", thumb: "https://static.wixstatic.com/media/859174_b7d5d69cc8cc4db79d529226ca2954cf~mv2.jpg", url: "https://ok.ru/videoembed/15232542247424" },
  { id: 40, title: "LLEGADA A JERUSALÉN", dur: "46:21", thumb: "https://static.wixstatic.com/media/859174_d2a0b4e69cc7427bb54ecda2b2657732~mv2.jpg", url: "https://ok.ru/videoembed/15232542640640" },
  { id: 41, title: "PRISIÓN EN JERUSALÉN", dur: "56:12", thumb: "https://static.wixstatic.com/media/859174_50e8cdd261a541ff83a77abd4ea64edb~mv2.jpg", url: "https://ok.ru/videoembed/15232686164480" },
  { id: 42, title: "ANTE EL SANEDRÍN", dur: "50:13", thumb: "https://static.wixstatic.com/media/859174_e5776b3e3033427982e2440dc7c3e6c4~mv2.jpg", url: "https://ok.ru/videoembed/15323825637888" },
  { id: 43, title: "PRISIÓN EN CESAREA", dur: "55:36", thumb: "https://static.wixstatic.com/media/859174_e4cedfffe1f840629952b7e9ba6aa64d~mv2.jpg", url: "https://ok.ru/videoembed/15323826227712" },
  { id: 44, title: "DOS AÑOS DESPUÉS", dur: "50:42", thumb: "https://static.wixstatic.com/media/859174_012d0754ca9e46d98445548726b4c460~mv2.jpg", url: "https://ok.ru/videoembed/15392795986432" },
  { id: 45, title: "AGRIPA Y PABLO", dur: "39:57", thumb: "https://static.wixstatic.com/media/859174_dae6f69bc28c4ef88b3208a86d9fe8d5~mv2.jpg", url: "https://ok.ru/videoembed/15392796248576" },
  { id: 46, title: "NAUFRAGIO", dur: "36:05", thumb: "https://static.wixstatic.com/media/859174_132383fd0c584ed7b3f3fc55f08e265d~mv2.jpg", url: "https://ok.ru/videoembed/15392796707328" },
  { id: 47, title: "LA VÍBORA", dur: "37:03", thumb: "https://static.wixstatic.com/media/859174_5c1999eb78184a6caa74be444eb8aeb7~mv2.jpg", url: "https://ok.ru/videoembed/15392796969472" },
  { id: 48, title: "MUERTE EN JERUSALÉN", dur: "46:21", thumb: "https://static.wixstatic.com/media/859174_969d22d6b7db4bd588c753b8348bbac2~mv2.jpg", url: "https://ok.ru/videoembed/15392797362688" },
  { id: 49, title: "EL JUICIO DE PABLO", dur: "54:23", thumb: "https://static.wixstatic.com/media/859174_8e0784c1cc3b46e5b765f7a38372444c~mv2.jpg", url: "https://ok.ru/videoembed/10221145623103" },
  { id: 50, title: "EL FIN", dur: "70:07", thumb: "https://static.wixstatic.com/media/859174_feda1b846fad4ae0b3a7aec08be13a76~mv2.jpg", url: "https://ok.ru/videoembed/10221146540607" }
];

const PabloElApostol_Mobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 17;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('pablo_mobile_last_ep');
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
        pablo: ['pablo', 'apostol', 'cristo', 'saulo', 'roma', 'hechos'],
        biblia: ['biblia', 'continua', 'testamento', 'milagros', 'hechos']
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
    setSelectedVideo(pabloEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('pablo_mobile_last_ep', idx.toString());
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
        <Head><title>REPRODUCIENDO: {pabloEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">SERIE: PABLO, EL APÓSTOL</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              EP. {pabloEpisodes[currentIdx].id} <span className="text-white/20 mx-1">|</span> {pabloEpisodes[currentIdx].title}
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
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#FF8A00] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">ANTERIOR</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#FF8A00]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">EPISODIOS</span>
            </button>
            <button disabled={currentIdx === pabloEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#FF8A00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,138,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#FF8A00]">SIGUIENTE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] text-left">
      <Head><title>PABLO, EL APÓSTOL — ESTUDIOS 421</title></Head>
      
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

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />RESULTADOS: "{searchQuery}"</h2>
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
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">IDIOMA</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/pablo-el-apostol'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/paul-the-apostle'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/paulo-o-apostolo'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_f01cdd77f3ed433d994505ae828c5db1~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${pabloEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest">❤ DONAR</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">EPISODIOS DISPONIBLES</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left">
          {pabloEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 active:scale-95 transition-all" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#FF8A00] shadow-[0_0_15px_rgba(255,138,0,0.2)]' : 'border-white/5'}`}>
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
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8 text-left">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
          <p className="text-[9px] leading-relaxed text-gray-600 font-medium tracking-tight text-justify">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro para la difusión de contenido bíblico.</p>
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

export default PabloElApostol_Mobile;
