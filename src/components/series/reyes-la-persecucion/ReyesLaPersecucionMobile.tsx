import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

// --- CONFIGURACIÓN DE EPISODIOS ACTUALIZADA (ID: 24) ---
const reyesPersecucionEpisodes = [
  { id: 1, title: "YA NO EXISTE", dur: "44:23", thumb: "https://static.wixstatic.com/media/859174_8e7b3ed6fcd04385acf8958f9e968ef6~mv2.jpg", url: "https://ok.ru/videoembed/15744937888256" },
  { id: 2, title: "SERÁN REDUCIDOS A NADA", dur: "46:01", thumb: "https://static.wixstatic.com/media/859174_5ba427b26112409981dc467ca6dd0b14~mv2.jpg", url: "https://ok.ru/videoembed/15745014761984" },
  { id: 3, title: "CON UNA CONDICIÓN", dur: "45:02", thumb: "https://static.wixstatic.com/media/859174_854072f3864b457f91f277d18ee10e62~mv2.jpg", url: "https://ok.ru/videoembed/16051222415872" },
  { id: 4, title: "COMO SI FUERA FÁCIL", dur: "45:31", thumb: "https://static.wixstatic.com/media/859174_cc923f56a9ca4088acf9afb0814c18a5~mv2.jpg", url: "https://ok.ru/videoembed/16051224250880" },
  { id: 5, title: "SIEMPRE AQUÍ PARA TI", dur: "45:06", thumb: "https://static.wixstatic.com/media/859174_31439bd81678475cb888dddc619695c9~mv2.jpg", url: "https://ok.ru/videoembed/16051226085888" },
  { id: 6, title: "ÉL ES UNA AMENAZA", dur: "44:28", thumb: "https://static.wixstatic.com/media/859174_8c31f2fbb1b9400392526684c900fbb9~mv2.jpg", url: "https://ok.ru/videoembed/16051229428224" },
  { id: 7, title: "¿NOS DAS UNA OPORTUNIDAD?", dur: "45:18", thumb: "https://static.wixstatic.com/media/859174_5d143dc73e6040ff878d10ff595a051c~mv2.jpg", url: "https://ok.ru/videoembed/16051230870016" },
  { id: 8, title: "¡VAMOS A CIRCUNCIDARLOS!", dur: "46:02", thumb: "https://static.wixstatic.com/media/859174_7352090196c84af9857be7de8f090d95~mv2.jpg", url: "https://ok.ru/videoembed/16051235260928" },
  { id: 9, title: "NO ES GRACIAS A TI", dur: "44:37", thumb: "https://static.wixstatic.com/media/859174_47638a391ad04496b727f31efc339dd3~mv2.jpg", url: "https://ok.ru/videoembed/16051237095936" },
  { id: 10, title: "MARIDO Y MUJER", dur: "45:40", thumb: "https://static.wixstatic.com/media/859174_375d0dd276f54ad49502a842c2468d7c~mv2.jpg", url: "https://ok.ru/videoembed/16051238799872" },
  { id: 11, title: "MATARLO", dur: "44:41", thumb: "https://static.wixstatic.com/media/859174_ae69cdf4befa4a30a35c72aa8e555e59~mv2.jpg", url: "https://ok.ru/videoembed/16051242142208" },
  { id: 12, title: "¿LISTO?", dur: "45:41", thumb: "https://static.wixstatic.com/media/859174_7756e45ace91413f9368c85f5e5d014f~mv2.jpg", url: "https://ok.ru/videoembed/16128596183552" },
  { id: 13, title: "ESTUVO CERCA", dur: "45:07", thumb: "https://static.wixstatic.com/media/859174_ce66d2a0492947969811b403406f8d30~mv2.jpg", url: "https://ok.ru/videoembed/16128596642304" },
  { id: 14, title: "¿ESTÁS SEGURO?", dur: "44:07", thumb: "https://static.wixstatic.com/media/859174_03eaf21b3d484d8db5d0eb5c8a6e9ef0~mv2.jpg", url: "https://ok.ru/videoembed/16128597297664" },
  { id: 15, title: "¿POR QUÉ VOLVISTE?", dur: "45:52", thumb: "https://static.wixstatic.com/media/859174_19403403816e467da89fd320ac7aa32a~mv2.jpg", url: "https://ok.ru/videoembed/16128597494272" },
  { id: 16, title: "MI HERMANO", dur: "45:58", thumb: "https://static.wixstatic.com/media/859174_5f14534379264f269bc640e69ab39e2e~mv2.jpg", url: "https://ok.ru/videoembed/16128599329280" },
  { id: 17, title: "TIENE QUE MORIR", dur: "44:31", thumb: "https://static.wixstatic.com/media/859174_70be94cc28b74698818da4c0b8df77ac~mv2.jpg", url: "https://ok.ru/videoembed/16128599656960" },
  { id: 18, title: "IDEA DESCABELLADA", dur: "44:54", thumb: "https://static.wixstatic.com/media/859174_c2dee7ebb1a64efab5549909303e2461~mv2.jpg", url: "https://ok.ru/videoembed/16128600312320" },
  { id: 19, title: "¡ESTE HOMBRE ESTÁ LOCO!", dur: "45:59", thumb: "https://static.wixstatic.com/media/859174_68f1f9c811364ee0869b7edad1669a3a~mv2.jpg", url: "https://ok.ru/videoembed/16128600640000" },
  { id: 20, title: "ESTAMOS CONTIGO", dur: "45:56", thumb: "https://static.wixstatic.com/media/859174_d3e87ac3f0284bb1abdd5e6c57247499~mv2.jpg", url: "https://ok.ru/videoembed/16128601098752" },
  { id: 21, title: "EL FAMOSO DAVID", dur: "45:54", thumb: "https://static.wixstatic.com/media/859174_5468906674404f9e8f1c48ddd2be447d~mv2.jpg", url: "https://ok.ru/videoembed/16128601623040" },
  { id: 22, title: "POBRE DE TI", dur: "45:28", thumb: "https://static.wixstatic.com/media/859174_fba73b78a0234bc1bebef0f433fcf120~mv2.jpg", url: "https://ok.ru/videoembed/16128602343936" },
  { id: 23, title: "¿QUIÉN VENDRÁ CONMIGO?", dur: "45:59", thumb: "https://static.wixstatic.com/media/859174_cce3f7f39ea74b2eb36e3ec5ab405db2~mv2.jpg", url: "https://ok.ru/videoembed/16128602999296" },
  { id: 24, title: "¿TODAVÍA ME AMA?", dur: "45:56", thumb: "https://static.wixstatic.com/media/859174_6c4fb5cf042040ff95f3a51da0a702d5~mv2.jpg", url: "https://ok.ru/videoembed/16128717949440" },
  { id: 25, title: "ESTE ES TU PROBLEMA", dur: "44:53", thumb: "https://static.wixstatic.com/media/859174_48166a8ce11341b0802ad88e6306b633~mv2.jpg", url: "https://ok.ru/videoembed/16128718342656" },
  { id: 26, title: "PIENSA UN POCO", dur: "45:31", thumb: "https://static.wixstatic.com/media/859174_609e69ac4f9c4820b6d8e18bbabd99e1~mv2.jpg", url: "https://ok.ru/videoembed/16148645808640" },
  { id: 27, title: "A MI MANERA, O NADA", dur: "46:02", thumb: "https://static.wixstatic.com/media/859174_5e2ff8d308e442c2b820989c0ecc328b~mv2.jpg", url: "https://ok.ru/videoembed/16148648036864" },
  { id: 28, title: "RECUÉRDAME", dur: "45:41", thumb: "https://static.wixstatic.com/media/859174_789cfbd8dee64fc8aaada3d4462c3677~mv2.jpg", url: "https://ok.ru/videoembed/16148650723840" },
  { id: 29, title: "COMO SIEMPRE LO MERECISTE", dur: "46:35", thumb: "https://static.wixstatic.com/media/859174_1581a16af6cd4422819a567a67417be5~mv2.jpg", url: "https://ok.ru/videoembed/16148652034560" },
  { id: 30, title: "PELIGROSO, ¿POR QUÉ?", dur: "49:00", thumb: "https://static.wixstatic.com/media/859174_551f0f5a2df340fa8d71a73982dd7617~mv2.jpg", url: "https://ok.ru/videoembed/16148653935104" },
  { id: 31, title: "COMO SIEMPRE HEMOS SIDO", dur: "47:16", thumb: "https://static.wixstatic.com/media/859174_aa9324c9801445229d235726eb467c45~mv2.jpg", url: "https://ok.ru/videoembed/16148656818688" },
  { id: 32, title: "FUISTE TODO PARA MÍ", dur: "47:09", thumb: "https://static.wixstatic.com/media/859174_737ef9c43b764a3c8c31a3784842cf3a~mv2.jpg", url: "https://ok.ru/videoembed/16148659177984" },
  { id: 33, title: "HASTA EL FINAL", dur: "47:36", thumb: "https://static.wixstatic.com/media/859174_3292733ad6034e8bb15111587c0bf966~mv2.jpg", url: "https://ok.ru/videoembed/16148660750848" },
  { id: 34, title: "¿ARREBATANDO MÁS CORAZONES?", dur: "48:30", thumb: "https://static.wixstatic.com/media/859174_346ae00844be48f5b2bb29525f76506d~mv2.jpg", url: "https://ok.ru/videoembed/16148662848000" },
  { id: 35, title: "SEAMOS CREATIVOS", dur: "49:56", thumb: "https://static.wixstatic.com/media/859174_de1ebedf235e42b084e8fc702fee9979~mv2.jpg", url: "https://ok.ru/videoembed/16148667501056" },
  { id: 36, title: "VOLVAMOS A CASA", dur: "48:44", thumb: "https://static.wixstatic.com/media/859174_074ba78482044f8ba6f0dd6cd11838a5~mv2.jpg", url: "https://ok.ru/videoembed/16148669598208" },
];

const ReyesPersecucionMobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 24;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const saved = localStorage.getItem('reyes_persecucion_mobile_last_ep');
    if (saved) {
        const idx = parseInt(saved);
        if (reyesPersecucionEpisodes[idx]) setCurrentIdx(idx);
    }
    
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- BUSCADOR COMPLETO Y EXTENSO (REPLICADO DE MAESTRA) ---
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);

      const themeMap: { [key: string]: string[] } = {
        moises: ['moises', 'diez mandamientos', 'egipto', 'exodo', 'tierra prometida', 'sanson', 'david'],
        egipto: ['jose', 'moises', 'diez mandamientos', 'egipto'],
        jesus: ['jesus', 'milagros', 'pasion', 'nazaret', 'hijo de dios', 'vida publica', 'magdalena', 'pablo', 'apocalipsis'],
        reyes: ['reyes', 'david', 'saul', 'salomon', 'jerusalen', 'division', 'jezabel', 'el rico', 'ester', 'persia', 'rechazo', 'eleccion', 'persecucion'],
        ester: ['ester', 'reina de persia', 'persia', 'nehemias', 'artajerjes'],
        pablo: ['pablo', 'apostol', 'cristo', 'saulo'],
        biblia: ['biblia', 'continua', 'testamento', 'milagros']
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

  const openEpisode = (idx: number) => {
    setSelectedVideo(reyesPersecucionEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('reyes_persecucion_mobile_last_ep', idx.toString());
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
        <Head><title>Reproduciendo: {reyesPersecucionEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#F09800] pl-4 py-1">
            <span className="text-[9px] font-black text-[#F09800] uppercase tracking-[0.3em] mb-1">Reyes: La Persecución</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">Ep. {reyesPersecucionEpisodes[currentIdx].id} | {reyesPersecucionEpisodes[currentIdx].title}</h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose size={24} />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full aspect-video border-none shadow-[0_0_50px_rgba(0,0,0,1)]" allow="autoplay; fullscreen" allowFullScreen />
          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#F09800] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Anterior</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#F09800]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Episodios</span>
            </button>
            <button disabled={currentIdx === reyesPersecucionEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#F09800] text-black flex items-center justify-center shadow-[0_0_20px_rgba(240,152,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#F09800]">Siguiente</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800] text-left">
      <Head><title>Reyes: La Persecución — Estudios 421</title></Head>
      
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
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Inicio</Link>
          <Link href="/series-biblicas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series Bíblicas</Link>
          <Link href="/series-tv" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Series TV</Link>
          <Link href="/peliculas" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Películas</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Idioma</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/reyes-la-persecucion'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/serie/kings-the-persecution'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/serie/reis-a-perseguicao'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_ccbfd31f76744490a6e324ca35f95c90~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${reyesPersecucionEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-[#F09800] border-[#F09800] text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA</> : '+ MI LISTA'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest text-center">❤ Donar</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left">
          {reyesPersecucionEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 transition-all active:scale-95" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#F09800] shadow-[0_0_15px_rgba(240,152,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" alt={ep.title} />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90">
                EP. {ep.id} {ep.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mb-24">
          <Link href="/serie/reyes-la-conquista">
              <button className="w-full bg-[#FF8A00] text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl">
                  Ver Siguiente Temporada
              </button>
          </Link>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaFacebookF /></a>
          <a href="https://www.tiktok.com/@estudios421_com" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max" target="_blank" rel="noreferrer" className="active:text-[#F09800] transition-colors"><FaYoutube /></a>
        </div>
        <div className="space-y-4 mb-8 text-[10px]">
          <p className="leading-relaxed">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.</p>
          <p className="leading-relaxed text-gray-600">Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro para la difusión de contenido bíblico.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/politica-de-privacidad">POLÍTICA DE PRIVACIDAD</Link>
          <Link href="/terminos-de-uso">TÉRMINOS DE USO</Link>
          <Link href="/cookies">CONFIGURACIÓN DE COOKIES</Link>
          <Link href="/ayuda">CENTRO DE AYUDA</Link>
        </div>
      </footer>
    </div>
  );
};

export default ReyesPersecucionMobile;
