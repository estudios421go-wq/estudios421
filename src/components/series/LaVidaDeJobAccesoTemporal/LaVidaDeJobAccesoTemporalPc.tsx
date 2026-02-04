import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const jobEpisodes = [
  { id: 1, title: "La Juventud", dur: "00:51:35", desc: "Al recibir un aviso urgente, Job causa revuelo en la recepción de José y su familia en Gosén.", thumb: "https://static.wixstatic.com/media/859174_6e9c9f95017d48fab10979c79bbe504b~mv2.jpg", url: "https://ok.ru/videoembed/9978970639031" },
  { id: 2, title: "La Tentación", dur: "01:04:28", desc: "En una conversación con José, Jacob le hace jurar una promesa. Job recibe una propuesta tentadora.", thumb: "https://static.wixstatic.com/media/859174_df9b08a7fe524e1a93f8e5ecec085ecd~mv2.jpg", url: "https://ok.ru/videoembed/9982843488951" },
  { id: 3, title: "La Conquista", dur: "00:55:36", desc: "Job le hace una declaración a Sera. En Egipto, Raquel toma una decisión sobre su futuro.", thumb: "https://static.wixstatic.com/media/859174_47e64b4383a4413bb12eab9d0a687ca6~mv2.jpg", url: "https://ok.ru/videoembed/9982902274743" },
  { id: 4, title: "Su Héroe", dur: "00:46:41", desc: "Raquel toma una decisión arriesgada. Con la desaparición de Sera, Job es confrontado por Aser.", thumb: "https://static.wixstatic.com/media/859174_c4fad81c36344fe2abe3a497187800b1~mv2.jpg", url: "https://ok.ru/videoembed/9982935894711" },
  { id: 5, title: "La Noche de Bodas", dur: "01:02:36", desc: "El campamento celebra la unión de Job y Raquel. Jacob se sorprende con una revelación.", thumb: "https://static.wixstatic.com/media/859174_56d5fd4a00c6424381e4c8672ff26369~mv2.jpg", url: "https://ok.ru/videoembed/9982935960247" },
  { id: 6, title: "La Boda", dur: "00:49:40", desc: "Job y Raquel interrumpen su paseo. Sera no pierde la oportunidad de provocar intrigas.", thumb: "https://static.wixstatic.com/media/859174_4942bf39205a491a9148ab8acbca19fc~mv2.jpg", url: "https://ok.ru/videoembed/9982938909367" },
  { id: 7, title: "La Muerte", dur: "00:50:20", desc: "Los hijos de Jacob se sorprenden con un reencuentro. La situación de Job y Raquel llega al límite.", thumb: "https://static.wixstatic.com/media/859174_089119311ae24c9c863e7b93fa4fdf39~mv2.jpg", url: "https://ok.ru/videoembed/9982948215479" },
  { id: 8, title: "El Pastoreo", dur: "00:48:02", desc: "La conversación entre Dotán y Job se ve interrumpida. José reacciona al mensaje de sus hermanos.", thumb: "https://static.wixstatic.com/media/859174_b11d6df6c7a2408ebb19573c25998db4~mv2.jpg", url: "https://ok.ru/videoembed/9983013882551" },
  { id: 9, title: "La Partida de Job", dur: "00:49:50", desc: "Raquel toma una decisión impulsiva. Isacar decide el futuro de su hijo por el bien de la familia.", thumb: "https://static.wixstatic.com/media/859174_4f8186d2cb194a829772fa61f345b4cd~mv2.jpg", url: "https://ok.ru/videoembed/9983014079159" },
  { id: 10, title: "La Llegada a Uz", dur: "00:55:58", desc: "Job se enfrenta a una situación crítica en Uz. Raquel se entera del pasado de Dina.", thumb: "https://static.wixstatic.com/media/859174_53753f743f3643258ade5db11ed53945~mv2.jpg", url: "https://ok.ru/videoembed/9986941455031" },
  { id: 11, title: "La Familia de Job", dur: "00:46:37", desc: "Job confronta a sus hijos sobre sus intenciones. Efraín revela su inseguridad respecto a Sera.", thumb: "https://static.wixstatic.com/media/859174_1a255930c7024f31bd80efd27d110ec2~mv2.jpg", url: "https://ok.ru/videoembed/9986941782711" },
  { id: 12, title: "Los hijos de Job", dur: "00:44:49", desc: "Raquel recibe una dolorosa noticia. Job hace un descubrimiento decepcionante sobre sus hijos.", thumb: "https://static.wixstatic.com/media/859174_e1b1efd205bf47be83c39eec48955430~mv2.jpg", url: "https://ok.ru/videoembed/9986941913783" },
  { id: 13, title: "La Reunión en el Cielo", dur: "00:44:30", desc: "Sera sorprende a Raquel con una revelación. El diablo propone a Dios una prueba sobre Job.", thumb: "https://static.wixstatic.com/media/859174_37825499779b46b08ec2d33d39151853~mv2.jpg", url: "https://ok.ru/videoembed/9987150318263" },
  { id: 14, title: "La Prueba de Job", dur: "01:01:02", desc: "Job es confrontado por los habitantes de Uz. Raquel plantea preguntas sobre sus pérdidas.", thumb: "https://static.wixstatic.com/media/859174_398e5c11b8204a6a8b96b592aa926065~mv2.jpg", url: "https://ok.ru/videoembed/10000307522231" },
  { id: 15, title: "Job en el Sheol", dur: "00:56:48", desc: "Job sufre los efectos de las úlceras. Raquel llega a una conclusión equivocada sobre el pasado.", thumb: "https://static.wixstatic.com/media/859174_a53a91fb9c7042a29cf0d65b31161238~mv2.jpg", url: "https://ok.ru/videoembed/10000307915447" },
  { id: 16, title: "Amigos de Job", dur: "01:02:19", desc: "Job reacciona a las acusaciones de sus amigos. Efraín toma una medida arriesgada.", thumb: "https://static.wixstatic.com/media/859174_2b315227c5de4bb0ae66c8146fd3c1e0~mv2.jpg", url: "https://ok.ru/videoembed/10000308243127" },
  { id: 17, title: "Dios y Job", dur: "00:40:55", desc: "Dios cuestiona a Job mostrando sus creaciones. Sus amigos se conmueven con un reencuentro.", thumb: "https://static.wixstatic.com/media/859174_fd0323d4042a4a929b467ed39cc19134~mv2.jpg", url: "https://ok.ru/videoembed/9987156085431" },
  { id: 18, title: "Un Nuevo Comienzo", dur: "00:44:12", desc: "Sera y Eliú buscan a Efraín. Raquel comparte con Job una experiencia transformadora.", thumb: "https://static.wixstatic.com/media/859174_a68b9018fbb6433398fc4c324c83ef3f~mv2.jpg", url: "https://ok.ru/videoembed/9991167675063" },
  { id: 19, title: "La Restitución", dur: "00:42:45", desc: "Job recibe una petición de perdón. Sera confronta a Efraín y se sorprende con una confesión.", thumb: "https://static.wixstatic.com/media/859174_662812f95f0b428da053bf35fbb7e143~mv2.jpg", url: "https://ok.ru/videoembed/9991473728183" },
  { id: 20, title: "La Continuación del Fin", dur: "00:53:36", desc: "Job recibe visitas especiales. Gabriel entrega un mensaje de Dios a una joven mujer.", thumb: "https://static.wixstatic.com/media/859174_83e339dc10f04a53b4361f4f4b321d3c~mv2.jpg", url: "https://ok.ru/videoembed/9993645853367" }
];

const LaVidaDeJobPC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    // BLINDAJE CON TIPADO PARA TYPESCRIPT
    const handleGlobalPrevent = (e: MouseEvent | DragEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleGlobalPrevent as any);
    document.addEventListener('dragstart', handleGlobalPrevent as any);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || 
          (e.metaKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || 
          e.key === 'F12') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const savedEp = localStorage.getItem('job_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < jobEpisodes.length) setCurrentIdx(idx);
    }

    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent as any);
      document.removeEventListener('dragstart', handleGlobalPrevent as any);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const filtered = allSeries.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return titleNormalized.includes(term) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    localStorage.setItem('job_last_ep', idx.toString());
    window.open(jobEpisodes[idx].url, '_blank');
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
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

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_f2663a3ee1e64c0e872790d28c7f659e~mv2.jpg" className="w-full h-full object-cover" alt="Banner Job" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${jobEpisodes[currentIdx].id}`}
          </button>
          <button className="border py-4 px-10 rounded-sm bg-white/5 border-white/10 text-white/40 cursor-not-allowed uppercase font-bold">+ Mi Lista</button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donar</button>
        </div>
      </div>

      <div className="px-16 mt-32 mb-32 relative z-10">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-4 gap-8">
          {jobEpisodes.map((ep, index) => (
            <div key={ep.id} className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 border-transparent hover:border-[#FF8A00]" onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
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

      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start md:justify-end gap-6 mb-10 text-xl">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4">
            <p className="text-xs">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
            <p className="text-[10px] text-gray-600">Aviso Legal: El contenido audiovisual pertenece a sus respectivos propietarios. Estudios 421 es una plataforma sin fines de lucro.</p>
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

export default LaVidaDeJobPC;
