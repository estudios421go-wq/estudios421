import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const jobEpisodes = [
  { id: 1, title: "La Juventud", dur: "00:51:35", desc: "Al recibir un aviso urgente, Job causa revuelo en la recepción de José y su familia en Gosén.", thumb: "https://static.wixstatic.com/media/859174_6e9c9f95017d48fab10979c79bbe504b~mv2.jpg", url: "https://ok.ru/videoembed/14200848714240" },
  { id: 2, title: "La Tentación", dur: "01:04:28", desc: "En una conversación con José, Jacob le hace jurar una promesa. Job recibe una propuesta tentadora.", thumb: "https://static.wixstatic.com/media/859174_df9b08a7fe524e1a93f8e5ecec085ecd~mv2.jpg", url: "https://ok.ru/videoembed/14200848845312" },
  { id: 3, title: "La Conquista", dur: "00:55:36", desc: "Job le hace una declaración a Sera. En Egipto, Raquel toma una decisión sobre su futuro.", thumb: "https://static.wixstatic.com/media/859174_47e64b4383a4413bb12eab9d0a687ca6~mv2.jpg", url: "https://ok.ru/videoembed/14200849500672" },
  { id: 4, title: "Su Héroe", dur: "00:46:41", desc: "Raquel toma una decisión arriesgada. Con la desaparición de Sera, Job es confrontado por Aser.", thumb: "https://static.wixstatic.com/media/859174_c4fad81c36344fe2abe3a497187800b1~mv2.jpg", url: "https://ok.ru/videoembed/14200850942464" },
  { id: 5, title: "La Noche de Bodas", dur: "01:02:36", desc: "El campamento celebra la unión de Job y Raquel. Jacob se sorprende con una revelación.", thumb: "https://static.wixstatic.com/media/859174_56d5fd4a00c6424381e4c8672ff26369~mv2.jpg", url: "https://ok.ru/videoembed/14200851270144" },
  { id: 6, title: "La Boda", dur: "00:49:40", desc: "Job y Raquel interrumpen su paseo. Sera no pierde la oportunidad de provocar intrigas.", thumb: "https://static.wixstatic.com/media/859174_4942bf39205a491a9148ab8acbca19fc~mv2.jpg", url: "https://ok.ru/videoembed/14201569937920" },
  { id: 7, title: "La Muerte", dur: "00:50:20", desc: "Los hijos de Jacob se sorprenden con un reencuentro. La situación de Job y Raquel llega al límite.", thumb: "https://static.wixstatic.com/media/859174_089119311ae24c9c863e7b93fa4fdf39~mv2.jpg", url: "https://ok.ru/videoembed/14201570855424" },
  { id: 8, title: "El Pastoreo", dur: "00:48:02", desc: "La conversación entre Dotán y Job se ve interrumpida. José reacciona al mensaje de sus hermanos.", thumb: "https://static.wixstatic.com/media/859174_b11d6df6c7a2408ebb19573c25998db4~mv2.jpg", url: "https://ok.ru/videoembed/14201572231680" },
  { id: 9, title: "La Partida de Job", dur: "00:49:50", desc: "Raquel toma una decisión impulsiva. Isacar decide el futuro de su hijo por el bien de la familia.", thumb: "https://static.wixstatic.com/media/859174_4f8186d2cb194a829772fa61f345b4cd~mv2.jpg", url: "https://ok.ru/videoembed/14201572624896" },
  { id: 10, title: "La Llegada a Uz", dur: "00:55:58", desc: "Job se enfrenta a una situación crítica en Uz. Raquel se entera del pasado de Dina.", thumb: "https://static.wixstatic.com/media/859174_53753f743f3643258ade5db11ed53945~mv2.jpg", url: "https://ok.ru/videoembed/14216478919168" },
  { id: 11, title: "La Familia de Job", dur: "00:46:37", desc: "Job confronta a sus hijos sobre sus intenciones. Efraín revela su inseguridad respecto a Sera.", thumb: "https://static.wixstatic.com/media/859174_1a255930c7024f31bd80efd27d110ec2~mv2.jpg", url: "https://ok.ru/videoembed/14216479115776" },
  { id: 12, title: "Los hijos de Job", dur: "00:44:49", desc: "Raquel recibe una dolorosa noticia. Job hace un descubrimiento decepcionante sobre sus hijos.", thumb: "https://static.wixstatic.com/media/859174_e1b1efd205bf47be83c39eec48955430~mv2.jpg", url: "https://ok.ru/videoembed/14216479640064" },
  { id: 13, title: "La Reunión en el Cielo", dur: "00:44:30", desc: "Sera sorprende a Raquel con una revelación. El diablo propone a Dios una prueba sobre Job.", thumb: "https://static.wixstatic.com/media/859174_37825499779b46b08ec2d33d39151853~mv2.jpg", url: "https://ok.ru/videoembed/14216479836672" },
  { id: 14, title: "La Prueba de Job", dur: "01:01:02", desc: "Job es confrontado por los habitantes de Uz. Raquel plantea preguntas sobre sus pérdidas.", thumb: "https://static.wixstatic.com/media/859174_398e5c11b8204a6a8b96b592aa926065~mv2.jpg", url: "https://ok.ru/videoembed/14216479050240" },
  { id: 15, title: "Job en el Sheol", dur: "00:56:48", desc: "Job sufre los efectos de las úlceras. Raquel llega a una conclusión equivocada sobre el pasado.", thumb: "https://static.wixstatic.com/media/859174_a53a91fb9c7042a29cf0d65b31161238~mv2.jpg", url: "https://ok.ru/videoembed/14216479312384" },
  { id: 16, title: "Amigos de Job", dur: "01:02:19", desc: "Job reacciona a las acusaciones de sus amigos. Efraín toma una medida arriesgada.", thumb: "https://static.wixstatic.com/media/859174_2b315227c5de4bb0ae66c8146fd3c1e0~mv2.jpg", url: "https://ok.ru/videoembed/14216479246848" },
  { id: 17, title: "Dios y Job", dur: "00:40:55", desc: "Dios cuestiona a Job mostrando sus creaciones. Sus amigos se conmueven con un reencuentro.", thumb: "https://static.wixstatic.com/media/859174_fd0323d4042a4a929b467ed39cc19134~mv2.jpg", url: "https://ok.ru/videoembed/14216479443456" },
  { id: 18, title: "Un Nuevo Comienzo", dur: "00:44:12", desc: "Sera y Eliú buscan a Efraín. Raquel comparte con Job una experiencia transformadora.", thumb: "https://static.wixstatic.com/media/859174_a68b9018fbb6433398fc4c324c83ef3f~mv2.jpg", url: "https://ok.ru/videoembed/14216479771136" },
  { id: 19, title: "La Restitución", dur: "00:42:45", desc: "Job recibe una petición de perdón. Sera confronta a Efraín y se sorprende con una confesión.", thumb: "https://static.wixstatic.com/media/859174_662812f95f0b428da053bf35fbb7e143~mv2.jpg", url: "https://ok.ru/videoembed/14216479574528" },
  { id: 20, title: "La Continuación del Fin", dur: "00:53:36", desc: "Job recibe visitas especiales. Gabriel entrega un mensaje de Dios a una joven mujer.", thumb: "https://static.wixstatic.com/media/859174_83e339dc10f04a53b4361f4f4b321d3c~mv2.jpg", url: "https://ok.ru/videoembed/14216479377920" }
];

const LaVidaDeJobPC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // SERIES_ID según data/series.ts para Job
  const SERIES_ID = 3; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const savedEp = localStorage.getItem('job_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < jobEpisodes.length) setCurrentIdx(idx);
    }

    const myListData = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myListData.includes(SERIES_ID)) setInMyList(true);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // BUSCADOR COMPLETO
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
    setCurrentIdx(idx);
    setSelectedVideo(jobEpisodes[idx].url);
    localStorage.setItem('job_last_ep', idx.toString());
  };

  const closePlayer = () => {
    setSelectedVideo(null);
    setTimeout(() => {
      episodeRefs.current[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

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
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left">
      <Head><title>La vida de Job — Estudios 421</title></Head>

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
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc' }].map((l) => (
              <Link key={l.n} href={l.n === '' ? '/serie/la-vida-de-job' : `/${l.n}/serie/la-vida-de-job`}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
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
        <img src="https://static.wixstatic.com/media/859174_f2663a3ee1e64c0e872790d28c7f659e~mv2.jpg" className="w-full h-full object-cover" alt="Banner Job" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${jobEpisodes[currentIdx].id}`}
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
          {jobEpisodes.map((ep, index) => (
            <div key={ep.id} ref={(el) => { episodeRefs.current[index] = el; }} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20'}`} onClick={() => openEpisode(index)}>
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
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5">
            <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1">
              <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Serie: La vida de Job</span>
              <h2 className="text-2xl font-black tracking-tighter uppercase">Capítulo {jobEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {jobEpisodes[currentIdx].title}</h2>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Salir del video</span>
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] border-t border-white/5 flex items-center justify-between">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all">
                <IoChevronBack className="text-xl" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Anterior</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08]">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Capítulos</span>
            </button>
            <button disabled={currentIdx === jobEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Siguiente</span>
                <span className="text-sm font-bold uppercase text-white/80">Episodio {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward className="text-4xl" />
              </div>
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center md:justify-end gap-6 mb-10">
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
    </div>
  );
};

export default LaVidaDeJobPC;
