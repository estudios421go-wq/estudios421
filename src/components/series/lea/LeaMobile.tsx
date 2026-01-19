import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  IoSearchOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoChevronBack,
  IoChevronForward,
  IoList,
  IoCheckmarkCircle
} from 'react-icons/io5';
import Footer from '../../Footer';

const LeaMobile = () => {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const leaEpisodes = [
    { id: 1, title: 'Hermanas del destino', dur: '00:40:06', thumb: 'https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg', url: 'https://ok.ru/videoembed/14199373957632' },
    { id: 2, title: 'El voto sagrado', dur: '00:39:26', thumb: 'https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg', url: 'https://ok.ru/videoembed/14199375071744' },
    { id: 3, title: 'El engaño de Labán', dur: '00:41:00', thumb: 'https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg', url: 'https://ok.ru/videoembed/14199375989248' },
    { id: 4, title: 'La boda equivocada', dur: '00:41:22', thumb: 'https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg', url: 'https://ok.ru/videoembed/14199376972288' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('lea_last_ep');
    if (saved) setCurrentIdx(parseInt(saved));
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes('lea')) setInMyList(true);

    // Detectar cambios en pantalla completa
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const playEpisode = (idx: number) => {
    setCurrentIdx(idx);
    localStorage.setItem('lea_last_ep', idx.toString());
    setShowPlayer(true);

    // Cambiar src SIN desmontar iframe
    setTimeout(() => {
      if (iframeRef.current) {
        // Usar replace para mantener el historial limpio
        iframeRef.current.src = leaEpisodes[idx].url + '?autoplay=1&fs=1';
      }
    }, 100);
  };

  const closePlayer = () => {
    // Salir de pantalla completa si está activa
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    
    setShowPlayer(false);
    if (iframeRef.current) {
      // Limpiar el src del iframe
      iframeRef.current.src = 'about:blank';
    }
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) {
      list = list.filter((id: string) => id !== 'lea');
      setInMyList(false);
    } else {
      list.push('lea');
      setInMyList(true);
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Head>
        <title>Lea — Estudios 421</title>
        {/* Importante para permitir pantalla completa en iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>

      {/* PLAYER (SIEMPRE MONTADO) */}
      <div 
        className={`fixed inset-0 z-[200] bg-black transition-all duration-300 ${
          showPlayer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } ${isFullscreen ? '' : ''}`}
        style={{
          transform: showPlayer ? 'translateY(0)' : 'translateY(100vh)'
        }}
      >
        <div className={`h-[10vh] flex items-center justify-between px-4 border-b border-white/10 ${
          isFullscreen ? 'hidden' : ''
        }`}>
          <span className="text-xs font-bold uppercase truncate">
            Ep. {leaEpisodes[currentIdx].id} — {leaEpisodes[currentIdx].title}
          </span>
          <button onClick={closePlayer} className="text-3xl">&times;</button>
        </div>

        <div className={`relative ${isFullscreen ? 'h-screen' : 'h-[75vh]'}`}>
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            // Importante para iOS
            playsInline
            // Mejorar compatibilidad con pantalla completa
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            // Estos atributos ayudan en móviles
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            preload="metadata"
          />
        </div>
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 bg-black ${
        showPlayer ? 'hidden' : ''
      }`}>
        <button className="text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>

        <Link href="/">
          <Image 
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" 
            alt="Logo" 
            width={100} 
            height={30} 
            unoptimized // Importante para imágenes externas
          />
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.toLowerCase() === 'lea') router.push('/serie/lea');
          }}
          className="flex-grow relative"
        >
          <IoSearchOutline className="absolute left-3 top-2.5 text-gray-400" />
          <input
            className="w-full bg-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-white/30"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </nav>

      {/* CONTENIDO */}
      <div className={`pt-20 px-4 ${showPlayer ? 'hidden' : ''}`}>
        <button
          onClick={() => playEpisode(currentIdx)}
          className="w-full bg-white text-black font-bold py-3 rounded-md uppercase hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          ▶ Ver ahora
        </button>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {leaEpisodes.map((ep, i) => (
            <div 
              key={ep.id} 
              onClick={() => playEpisode(i)}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="relative">
                <img 
                  src={ep.thumb} 
                  className="rounded-md w-full aspect-video object-cover"
                  alt={`Episodio ${ep.id}: ${ep.title}`}
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {ep.dur}
                </div>
              </div>
              <p className="text-xs font-bold mt-2 truncate">
                EP {ep.id} — {ep.title}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={toggleMyList}
          className="mt-6 w-full py-3 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center gap-2 transition-colors"
        >
          {inMyList ? (
            <>
              <IoCheckmarkCircle className="text-green-400" /> 
              <span>En mi lista</span>
            </>
          ) : (
            <>
              <IoList />
              <span>+ Mi lista</span>
            </>
          )}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default LeaMobile;
