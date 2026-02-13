import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// Step 3: International Search Database (Master)
import { allSeriesEn } from '../../../../data/en/seriesEn';

// --- EPISODE CONFIGURATION (ID: 13 | TRANSLATED & REPLACED) ---
const persiaEpisodes = [
  { id: 1, title: "What is your name?", dur: "00:50:57", desc: "To celebrate the first three years of Emperor Xerxes' reign, a lavish feast reveals the palace's reality. In Susa, a young Jewish woman rejoices...", thumb: "https://static.wixstatic.com/media/859174_bb24b7b013194cd48103df1e39666a8c~mv2.jpg", url: "https://ok.ru/videoembed/9889136118455" },
  { id: 2, title: "It is done", dur: "00:44:33", desc: "Seeing her hopes for the future fade, Hadassah suffers a forced farewell. Humiliated before his guests, Xerxes is forced to make a definitive decision.", thumb: "https://static.wixstatic.com/media/859174_b27c907cb6f44475a260677acfc56e95~mv2.jpg", url: "https://ok.ru/videoembed/9889136183991" },
  { id: 3, title: "I need her", dur: "00:45:08", desc: "In the clash between the Persians and Leonidas' three hundred, a betrayal changes the war's course and the lives of those left in Susa.", thumb: "https://static.wixstatic.com/media/859174_d4a8295575144c0092eae77cd6776a7d~mv2.jpg", url: "https://ok.ru/videoembed/9892179741367" },
  { id: 4, title: "Now what?", dur: "00:49:55", desc: "As a reward for the events in Greece, Xerxes promotes Haman. The arrival of the first group of candidates stirs the harem, including Esther.", thumb: "https://static.wixstatic.com/media/859174_6bba3949853a4228a8ce7c7f2243ea43~mv2.jpg", url: "https://ok.ru/videoembed/9892179806903" },
  { id: 5, title: "Do you understand now?", dur: "00:48:27", desc: "After a tense confrontation, Esther tries to meet Mordecai. Xerxes observes the women of his harem, and one candidate catches his eye.", thumb: "https://static.wixstatic.com/media/859174_060f835264d24e48987d7c0d1578a12c~mv2.jpg", url: "https://ok.ru/videoembed/9892179937975" },
  { id: 6, title: "One of two things", dur: "00:44:18", desc: "Hegai maintains his decision for Esther to be the first to appear before the Emperor. Xerxes is tempted to break his own rules.", thumb: "https://static.wixstatic.com/media/859174_382cc0ab57fd4adcb3b3fe0e70c4021d~mv2.jpg", url: "https://ok.ru/videoembed/9892180134583" },
  { id: 7, title: "Have you ever dreamed of the king?", dur: "00:43:46", desc: "Showing their skills before the king, the candidates perform so Xerxes can personally choose the next one to visit his chambers.", thumb: "https://static.wixstatic.com/media/859174_e5c96fd4320440199aceeb2fe1203abc~mv2.jpg", url: "https://ok.ru/videoembed/9892180200119" },
  { id: 8, title: "If you really knew him", dur: "00:43:56", desc: "Charmed by Esther, Xerxes reveals he had met her before. At work, Mordecai suffers insults and discrimination for being Jewish.", thumb: "https://static.wixstatic.com/media/859174_9c57747bdefb410fa1a0197d59856ba7~mv2.jpg", url: "https://ok.ru/videoembed/9892180331191" },
  { id: 9, title: "Behold the new queen!", dur: "00:40:27", desc: "In celebration of Esther's coronation, Xerxes declares his love before all Susa. But amidst the party, an attack looms...", thumb: "https://static.wixstatic.com/media/859174_ff7bc1f3ca734479b9e78fc6e4550149~mv2.jpg", url: "https://ok.ru/videoembed/9892180462263" },
  { id: 10, title: "Nobody has to know", dur: "00:48:56", desc: "Unable to sleep, Esther receives a visit from the king and a thoughtful gift. Mordecai and Yona are attacked by Haman's sons.", thumb: "https://static.wixstatic.com/media/859174_d8471ef5b07b4a01bdb31df5531168ec~mv2.jpg", url: "https://ok.ru/videoembed/9892180593335" },
  { id: 11, title: "Don't be curious", dur: "00:44:40", desc: "Still traveling in Babylon, Xerxes falls into another trap. Esther meets Mordecai, who warns her about those surrounding them.", thumb: "https://static.wixstatic.com/media/859174_86d7dbfe40cc498cbf439a7130b1930f~mv2.jpg", url: "https://ok.ru/videoembed/9898450553527" },
  { id: 12, title: "A matter of life and death", dur: "00:47:41", desc: "After being beaten, Nehemiah asks Mordecai to warn Esther about a plot against the king's life. Esther confronts Xerxes about Elarre.", thumb: "https://static.wixstatic.com/media/859174_cc0e5052aa8b407ca3bf4bdd8afffb3c~mv2.jpg", url: "https://ok.ru/videoembed/9898450684599" },
  { id: 13, title: "Why are you like this?", dur: "00:36:55", desc: "Suspicious of the closeness between Esther and Mordecai, Xerxes confronts her. Amestris rebels against Artabanus.", thumb: "https://static.wixstatic.com/media/859174_00cef21a70a246dba0ba13d77de578c7~mv2.jpg", url: "https://ok.ru/videoembed/9898450881207" },
  { id: 14, title: "You are different", dur: "00:43:22", desc: "After a touching conversation, the king grants Esther's request. Arriving in Jerusalem, Mordecai is shocked by the city's state.", thumb: "https://static.wixstatic.com/media/859174_ab6a038a5e2040f68e49f8cae427366e~mv2.jpg", url: "https://ok.ru/videoembed/9898451405495" },
  { id: 15, title: "We are even", dur: "00:46:37", desc: "In Greece, provocations against Xerxes increase the tension. In the king's absence, Amestris makes a grand revelation.", thumb: "https://static.wixstatic.com/media/859174_18a1bd77ce504e0b93e4e89eb93d7407~mv2.jpg", url: "https://ok.ru/videoembed/9898451798711" },
  { id: 16, title: "You will never understand", dur: "00:53:37", desc: "An old ally of Amestris returns to Susa. After revealing a surprise to Esther, Xerxes and the queen reach an ultimatum.", thumb: "https://static.wixstatic.com/media/859174_4d1e71aef9d94f2a8682e5c2d51e3f95~mv2.jpg", url: "https://ok.ru/videoembed/9898452126391" },
  { id: 17, title: "On the thirteenth day", dur: "00:45:08", desc: "Amestris presents the twins to the king. Promising to secure the king's power, Haman asks for the annihilation of the Jews.", thumb: "https://static.wixstatic.com/media/859174_076a07d11152470b9c8dbf487e0aaf73~mv2.jpg", url: "https://ok.ru/videoembed/9898452454071" },
  { id: 18, title: "So, you are Hadassah?", dur: "00:44:25", desc: "The Jews of Susa gather in grief before the palace. Esther receives news from Mordecai about the Emperor's latest decree.", thumb: "https://static.wixstatic.com/media/859174_8b1d9a993b734ac79d50d9149c7ba84f~mv2.jpg", url: "https://ok.ru/videoembed/9898452716215" },
  { id: 19, title: "I will not die", dur: "00:46:44", desc: "Xerxes calls for Amirah to fill Esther's absence. After fasting for three days, Esther prepares to appear before the king unsummoned.", thumb: "https://static.wixstatic.com/media/859174_9243597cb05b46a88014fd145b9b781c~mv2.jpg", url: "https://ok.ru/videoembed/9898452847287" },
  { id: 20, title: "What is your request?", dur: "00:45:06", desc: "Xerxes is surprised by Esther's presence. Everyone awaits the king's reaction. Hegai reveals secrets of his past to Mordecai.", thumb: "https://static.wixstatic.com/media/859174_e71dfd724abf4442aa2e32775097f33c~mv2.jpg", url: "https://ok.ru/videoembed/9898453174967" },
  { id: 21, title: "Expect nothing", dur: "00:38:43", desc: "Xerxes is confronted by Aria after rejecting her. Haman celebrates with his sons the completion of the gallows for Mordecai.", thumb: "https://static.wixstatic.com/media/859174_997eecbb23864da48f48a46cfa8b2799~mv2.jpg", url: "https://ok.ru/videoembed/9898453895863" },
  { id: 22, title: "It's a long story", dur: "00:49:43", desc: "Xerxes asks Haman how to honor a man the king favors. Fearful of her revelation, Esther prepares for the banquet.", thumb: "https://static.wixstatic.com/media/859174_2b316ab7ccff4907921d3531b33c52e2~mv2.jpg", url: "https://ok.ru/videoembed/9898454026935" },
  { id: 23, title: "Return to me", dur: "00:43:41", desc: "The fate Haman prepared for Mordecai falls upon himself. Xerxes and Esther finally find a moment to be alone again.", thumb: "https://static.wixstatic.com/media/859174_046da0e08c794c33b1c93b07d28db11f~mv2.jpg", url: "https://ok.ru/videoembed/9898454420151" },
  { id: 24, title: "How will I bear this?", dur: "00:40:55", desc: "Esther makes an important announcement to Xerxes, unaware that danger is near. Haman's sons send a cruel message to the Jews.", thumb: "https://static.wixstatic.com/media/859174_2290f046f1b548ef8a76435987a623cf~mv2.jpg", url: "https://ok.ru/videoembed/9898455009975" },
  { id: 25, title: "You still don't know", dur: "00:51:32", desc: "A revelation from the past brings to light the truth about the Emperor's strategy. A flood devastates the capital of Susa.", thumb: "https://static.wixstatic.com/media/859174_83a0eb5648294c1cb14e2f707b49649c~mv2.jpg", url: "https://ok.ru/videoembed/9898455337655" },
  { id: 26, title: "Help!", dur: "00:44:47", desc: "Xerxes enjoys a special moment with two small guests. Taking Esther by surprise, Haman's sons find their chance for revenge.", thumb: "https://static.wixstatic.com/media/859174_479ea1c0b7e64f94bd2860011c178159~mv2.jpg", url: "https://ok.ru/videoembed/9898455468727" },
  { id: 27, title: "The opposite happened", dur: "00:41:09", desc: "Xerxes speaks to God for the first time. On the 13th of Adar, the Jews face their enemies with divine providence.", thumb: "https://static.wixstatic.com/media/859174_6dc176dd45b9494eb320a698ae97e493~mv2.jpg", url: "https://ok.ru/videoembed/9898456189623" },
  { id: 28, title: "I have to go", dur: "00:43:16", desc: "The Jewish people celebrate victory over their enemies. Years later, a tragedy is sparked by the clash between Darius and Xerxes.", thumb: "https://static.wixstatic.com/media/859174_3ea091c141164d378d5176f59dccada1~mv2.jpg", url: "https://ok.ru/videoembed/9898456320695" },
  { id: 29, title: "They deceived me", dur: "00:54:10", desc: "With Xerxes' death, Artaxerxes' rise brings an unexpected turn. Esther leaves the capital to pursue an old dream.", thumb: "https://static.wixstatic.com/media/859174_6d1125235d20420ca6c3e621bf635b07~mv2.jpg", url: "https://ok.ru/videoembed/9898456451767" },
  { id: 30, title: "My Lion King", dur: "00:50:34", desc: "Reunited, Xerxes tells Esther how he got there. Nehemiah leads the devastated new king to someone from his past.", thumb: "https://static.wixstatic.com/media/859174_289d76ff709647cba249df69d39ab5f9~mv2.jpg", url: "https://ok.ru/videoembed/9898456648375" }
];

const TheQueenOfPersiaEN_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const SERIES_ID = 13; 

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

    const savedIdx = localStorage.getItem('queen_persia_last_idx_en');
    if (savedIdx) {
      setCurrentIdx(parseInt(savedIdx));
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
      const filtered = allSeriesEn.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return titleNormalized.includes(term) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    const url = persiaEpisodes[idx].url;
    setCurrentIdx(idx);
    setSelectedVideo(url);
    localStorage.setItem('queen_persia_last_idx_en', idx.toString());
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
      <Head><title>The Queen of Persia — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/en"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/en" className="relative group text-white text-[15px] font-medium tracking-wide">Home<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/biblical-series" className="relative group text-white text-[15px] font-medium tracking-wide">Biblical Series<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/tv-shows" className="relative group text-white text-[15px] font-medium tracking-wide">TV Shows<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/movies" className="relative group text-white text-[15px] font-medium tracking-wide">Movies<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776', p: '/serie/la-reina-de-persia' }, 
              { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e', p: '/en/series/the-queen-of-persia' }, 
              { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc', p: '/pt/series/a-rainha-da-persia' }].map((l) => (
              <Link key={l.n} href={l.p}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[120] pt-24 px-16 overflow-y-auto pb-20 text-left">
          <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Results: "{searchQuery}"</h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-10">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_c62c588e86eb48b9a5d073089de5b868~mv2.jpg" className="w-full h-full object-cover" alt="Banner The Queen of Persia" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase">
            {currentIdx === 0 ? "▶ Watch Now" : `▶ Continue Ep.${persiaEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> In My List</> : '+ My List'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donate</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase tracking-widest">Available Episodes</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {persiaEpisodes.map((ep, index) => (
            <div key={ep.id} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] opacity-60" />
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span className="text-[11px] font-black uppercase text-white">Episode <span className="text-[#FF8A00]">{ep.id}</span></span>
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
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5 relative shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Series: The Queen of Persia</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">
                  Episode {persiaEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {persiaEpisodes[currentIdx].title}
                </h2>
              </div>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Exit Video</span>
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] to-[#050608] border-t border-white/5 flex items-center justify-between shadow-2xl">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                <IoChevronBack className="text-xl" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Previous</span>
                <span className="text-sm font-bold uppercase text-white/80">Episode {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group scale-95 hover:scale-100">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Chapters</span>
            </button>
            <button 
              disabled={currentIdx === persiaEpisodes.length - 1} 
              onClick={() => openEpisode(currentIdx + 1)} 
              className="group flex items-center gap-6 disabled:opacity-5 transition-all"
            >
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Next</span>
                <span className="text-sm font-bold uppercase text-white/80">Episode {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
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
          <div className="mb-10 space-y-4 text-left">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies. Estudios 421 is a non-profit platform dedicated to the dissemination of biblical content for the community.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <Link href="/en/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/en/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/en/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
            <Link href="/en/ads" className="hover:text-white transition-colors">Ad Specifications</Link>
            <Link href="/en/help" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default TheQueenOfPersiaEN_PC;
