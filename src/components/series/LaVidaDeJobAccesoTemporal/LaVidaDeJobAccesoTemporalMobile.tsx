import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { allSeries } from '../../../data/series';

const jobEpisodes = [
  { id: 1, title: "La Juventud", dur: "51:35", thumb: "https://static.wixstatic.com/media/859174_6e9c9f95017d48fab10979c79bbe504b~mv2.jpg", url: "https://ok.ru/videoembed/9978970639031" },
  { id: 2, title: "La Tentación", dur: "1:04:28", thumb: "https://static.wixstatic.com/media/859174_df9b08a7fe524e1a93f8e5ecec085ecd~mv2.jpg", url: "https://ok.ru/videoembed/9982843488951" },
  { id: 3, title: "La Conquista", dur: "55:36", thumb: "https://static.wixstatic.com/media/859174_47e64b4383a4413bb12eab9d0a687ca6~mv2.jpg", url: "https://ok.ru/videoembed/9982902274743" },
  { id: 4, title: "Su Héroe", dur: "46:41", thumb: "https://static.wixstatic.com/media/859174_c4fad81c36344fe2abe3a497187800b1~mv2.jpg", url: "https://ok.ru/videoembed/9982935894711" },
  { id: 5, title: "La Noche de Bodas", dur: "1:02:36", thumb: "https://static.wixstatic.com/media/859174_56d5fd4a00c6424381e4c8672ff26369~mv2.jpg", url: "https://ok.ru/videoembed/9982935960247" },
  { id: 6, title: "La Boda", dur: "49:40", thumb: "https://static.wixstatic.com/media/859174_4942bf39205a491a9148ab8acbca19fc~mv2.jpg", url: "https://ok.ru/videoembed/9982938909367" },
  { id: 7, title: "La Muerte", dur: "50:20", thumb: "https://static.wixstatic.com/media/859174_089119311ae24c9c863e7b93fa4fdf39~mv2.jpg", url: "https://ok.ru/videoembed/9982948215479" },
  { id: 8, title: "El Pastoreo", dur: "48:02", thumb: "https://static.wixstatic.com/media/859174_b11d6df6c7a2408ebb19573c25998db4~mv2.jpg", url: "https://ok.ru/videoembed/9983013882551" },
  { id: 9, title: "La Partida de Job", dur: "49:50", thumb: "https://static.wixstatic.com/media/859174_4f8186d2cb194a829772fa61f345b4cd~mv2.jpg", url: "https://ok.ru/videoembed/9983014079159" },
  { id: 10, title: "La Llegada a Uz", dur: "55:58", thumb: "https://static.wixstatic.com/media/859174_53753f743f3643258ade5db11ed53945~mv2.jpg", url: "https://ok.ru/videoembed/9986941455031" },
  { id: 11, title: "La Familia de Job", dur: "46:37", thumb: "https://static.wixstatic.com/media/859174_1a255930c7024f31bd80efd27d110ec2~mv2.jpg", url: "https://ok.ru/videoembed/9986941782711" },
  { id: 12, title: "Los hijos de Job", dur: "44:49", thumb: "https://static.wixstatic.com/media/859174_e1b1efd205bf47be83c39eec48955430~mv2.jpg", url: "https://ok.ru/videoembed/9986941913783" },
  { id: 13, title: "La Reunión en el Cielo", dur: "44:30", thumb: "https://static.wixstatic.com/media/859174_37825499779b46b08ec2d33d39151853~mv2.jpg", url: "https://ok.ru/videoembed/9987150318263" },
  { id: 14, title: "La Prueba de Job", dur: "1:01:02", thumb: "https://static.wixstatic.com/media/859174_398e5c11b8204a6a8b96b592aa926065~mv2.jpg", url: "https://ok.ru/videoembed/10000307522231" },
  { id: 15, title: "Job en el Sheol", dur: "56:48", thumb: "https://static.wixstatic.com/media/859174_a53a91fb9c7042a29cf0d65b31161238~mv2.jpg", url: "https://ok.ru/videoembed/10000307915447" },
  { id: 16, title: "Amigos de Job", dur: "1:02:19", thumb: "https://static.wixstatic.com/media/859174_2b315227c5de4bb0ae66c8146fd3c1e0~mv2.jpg", url: "https://ok.ru/videoembed/10000308243127" },
  { id: 17, title: "Dios y Job", dur: "40:55", thumb: "https://static.wixstatic.com/media/859174_fd0323d4042a4a929b467ed39cc19134~mv2.jpg", url: "https://ok.ru/videoembed/9987156085431" },
  { id: 18, title: "Un Nuevo Comienzo", dur: "44:12", thumb: "https://static.wixstatic.com/media/859174_a68b9018fbb6433398fc4c324c83ef3f~mv2.jpg", url: "https://ok.ru/videoembed/9991167675063" },
  { id: 19, title: "La Restitución", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_662812f95f0b428da053bf35fbb7e143~mv2.jpg", url: "https://ok.ru/videoembed/9991473728183" },
  { id: 20, title: "La Continuación del Fin", dur: "53:36", thumb: "https://static.wixstatic.com/media/859174_83e339dc10f04a53b4361f4f4b321d3c~mv2.jpg", url: "https://ok.ru/videoembed/9993645853367" }
];

const LaVidaDeJobMobile = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // BLINDAJE CON TIPADO PARA TYPESCRIPT
    const handlePrevent = (e: MouseEvent | DragEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handlePrevent as any);
    document.addEventListener('dragstart', handlePrevent as any);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    const saved = localStorage.getItem('job_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handlePrevent as any);
      document.removeEventListener('dragstart', handlePrevent as any);
    };
  }, []);

  const openEpisode = (idx: number) => {
    setCurrentIdx(idx);
    localStorage.setItem('job_last_ep', idx.toString());
    window.open(jobEpisodes[idx].url, '_blank');
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans text-left unselectable">
      <Head><title>La vida de Job — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <button className="text-white text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
        <Link href="/"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        <form className="flex-grow relative">
          <IoSearchOutline size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none" />
        </form>
      </nav>

      {/* Menú Lateral */}
      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
          <Link href="/" className="text-xl font-bold">Inicio</Link>
          <Link href="/series-biblicas" className="text-xl font-bold">Series Bíblicas</Link>
          <div className="flex gap-4 mt-4">
             {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776'}].map((lang) => (
                <div key={lang.l} className="flex flex-col items-center gap-2">
                  <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} className="w-10 h-10" /><span className="text-[10px]">{lang.l}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <div className="w-full aspect-[4/3] relative">
          <img src="https://static.wixstatic.com/media/859174_f2663a3ee1e64c0e872790d28c7f659e~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-white text-black font-black py-4 rounded-md text-sm uppercase shadow-2xl">
            {currentIdx === 0 ? "▶ Ver Ahora" : `▶ Continuar Ep. ${jobEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button className="flex-1 py-3.5 rounded-md text-[10px] font-black border border-white/5 bg-white/5 text-white/30 cursor-not-allowed uppercase">+ MI LISTA</button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 py-3.5 rounded-md text-[10px] font-black border border-white/10 uppercase">❤ Donar</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#F09800]"></div>
          <h2 className="text-[11px] font-black text-white/50 uppercase tracking-widest">Episodios Disponibles</h2>
        </header>
        <div className="grid grid-cols-2 gap-5">
          {jobEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5" onClick={() => openEpisode(index)}>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5">
                <img src={ep.thumb} className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase text-white/90">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5">
        <div className="flex gap-6 mb-8 text-xl">
          <FaFacebookF /><FaInstagram /><FaTiktok /><FaYoutube /><FaXTwitter />
        </div>
        <p className="text-[10px]">© {new Date().getFullYear()} Estudios 421. Todos los derechos reservados.</p>
      </footer>

      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        img { pointer-events: none !important; }
      `}</style>
    </div>
  );
};

export default LaVidaDeJobMobile;
