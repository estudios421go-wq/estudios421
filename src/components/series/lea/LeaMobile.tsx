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
  }, []);

  const playEpisode = (idx: number) => {
    setCurrentIdx(idx);
    localStorage.setItem('lea_last_ep', idx.toString());
    setShowPlayer(true);

    // cambiar src SIN desmontar iframe
    if (iframeRef.current) {
      iframeRef.current.src = leaEpisodes[idx].url + '?autoplay=1';
    }
  };

  const closePlayer = () => {
    setShowPlayer(false);
    if (iframeRef.current) {
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
      </Head>

      {/* PLAYER (SIEMPRE MONTADO) */}
      <div className={`fixed inset-0 z-[200] bg-black transition-opacity ${showPlayer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-[10vh] flex items-center justify-between px-4 border-b border-white/10">
          <span className="text-xs font-bold uppercase">
            Ep. {leaEpisodes[currentIdx].id} — {leaEpisodes[currentIdx].title}
          </span>
          <button onClick={closePlayer} className="text-3xl">&times;</button>
        </div>

        <iframe
          ref={iframeRef}
          className="w-full h-[75vh] border-none"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 bg-black">
        <button className="text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>

        <Link href="/">
          <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={100} height={30} />
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery === 'lea') router.push('/serie/lea');
          }}
          className="flex-grow relative"
        >
          <IoSearchOutline className="absolute left-3 top-2.5 text-gray-400" />
          <input
            className="w-full bg-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </nav>

      {/* CONTENIDO */}
      <div className="pt-20 px-4">
        <button
          onClick={() => playEpisode(currentIdx)}
          className="w-full bg-white text-black font-bold py-3 rounded-md uppercase"
        >
          ▶ Ver ahora
        </button>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {leaEpisodes.map((ep, i) => (
            <div key={ep.id} onClick={() => playEpisode(i)}>
              <img src={ep.thumb} className="rounded-md" />
              <p className="text-xs font-bold mt-1">
                EP {ep.id} — {ep.title}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={toggleMyList}
          className="mt-6 w-full py-3 rounded-md bg-white/10"
        >
          {inMyList ? <><IoCheckmarkCircle /> En mi lista</> : '+ Mi lista'}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default LeaMobile;
