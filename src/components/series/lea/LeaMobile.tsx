import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  IoChevronBack,
  IoChevronForward,
  IoList,
  IoClose,
  IoMenuOutline,
  IoCloseOutline,
  IoSearchOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

type Episode = {
  id: number;
  title: string;
  desc: string;
  dur: string;
  thumb: string;
  // video page URL (ok.ru/video/...)
  pageUrl: string;
  // embed URL (ok.ru/videoembed/...)
  embedUrl: string;
};

const BRAND_ORANGE = "#F09800";

const STORAGE_LAST_IDX = "lea_nf_last_idx";
const STORAGE_MYLIST = "myList";
const STORAGE_PLAYER = "lea_nf_player_state_v1";

const bannerUrl =
  "https://static.wixstatic.com/media/859174_394a43598162462980999d535f5ab55a~mv2.jpg";

const episodes: Episode[] = [
  {
    id: 1,
    title: "Hermanas del destino",
    desc: "Lía pierde a su madre siendo aún joven y comienza a criar a su hermana menor. Raquel se convierte en una adulta fría y egoísta. Lía es rescatada por Jacob.",
    dur: "00:40:09",
    thumb:
      "https://static.wixstatic.com/media/859174_86a2172b057b4dbb8f9aad8c28163653~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199373957632",
    embedUrl: "https://ok.ru/videoembed/14199373957632",
  },
  {
    id: 2,
    title: "El voto sagrado",
    desc: "Jacó conhece Lia e é observado por Saul. Jacó fala a todos sobre o voto que fez com Deus. Lia e Raquel se desentendem.",
    dur: "00:40:09",
    thumb:
      "https://static.wixstatic.com/media/859174_b2866dfb10364a52a6f6c4b1d0bd36b5~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199375071744",
    embedUrl: "https://ok.ru/videoembed/14199375071744",
  },
  {
    id: 3,
    title: "El engaño de Labán",
    desc: "Jacob se acerca a Lía, pero pide a Raquel en casamiento. Para que Jacob no se vaya, Labán obliga a Lía a casarse en lugar de Raquel.",
    dur: "00:42:09",
    thumb:
      "https://static.wixstatic.com/media/859174_d7cfc67255f04256a593c369119ed86c~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199375989248",
    embedUrl: "https://ok.ru/videoembed/14199375989248",
  },
  {
    id: 4,
    title: "La boda equivocada",
    desc: "Lía es obligada a seguir los planes de Labán. La joven termina casándose con Jacob en lugar de Raquel.",
    dur: "00:41:09",
    thumb:
      "https://static.wixstatic.com/media/859174_7e9da0e84f384be2ae32c853dbdeedcc~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199376972288",
    embedUrl: "https://ok.ru/videoembed/14199376972288",
  },
  {
    id: 5,
    title: "Solo para Raquel",
    desc: "Jacob le dice a Raquel que solo tendrá ojos para ella y, en la primera noche de casados, rechaza a Lía.",
    dur: "00:43:09",
    thumb:
      "https://static.wixstatic.com/media/859174_58e073319d26466a86e306f4691c9d96~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199377562112",
    embedUrl: "https://ok.ru/videoembed/14199377562112",
  },
  {
    id: 6,
    title: "Amor dividido",
    desc: "Las dos esposas quedan embarazadas, pero Jacob solo le da atención a Raquel, y Lía se siente desamparada.",
    dur: "00:40:09",
    thumb:
      "https://static.wixstatic.com/media/859174_eb250911b0bb4614b9deeb1b78769c02~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199378283008",
    embedUrl: "https://ok.ru/videoembed/14199378283008",
  },
  {
    id: 7,
    title: "El dolor de la primogénita",
    desc: "El nacimiento del hijo de Raquel hace que Jacob rechace aún más a Lía, quien da a luz a una niña.",
    dur: "00:42:09",
    thumb:
      "https://static.wixstatic.com/media/859174_7a07cdbacf0b4cf2a538a4a8058215e5~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199379134976",
    embedUrl: "https://ok.ru/videoembed/14199379134976",
  },
  {
    id: 8,
    title: "Bendecido para partir",
    desc: "Jacob es ayudado por Dios y logra tener su propio rebaño. Poco después, decide irse con su familia.",
    dur: "00:40:09",
    thumb:
      "https://static.wixstatic.com/media/859174_192e07b145414120854d08fdfa103e40~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199380380160",
    embedUrl: "https://ok.ru/videoembed/14199380380160",
  },
  {
    id: 9,
    title: "La noche del encuentro",
    desc: "Un encuentro con Dios cambia la vida de Jacob, que planea reencontrarse con Esaú. Dina intenta resistir, pero termina entregándose a Siquem.",
    dur: "00:41:09",
    thumb:
      "https://static.wixstatic.com/media/859174_02f250b13a77498c8de22760af9bb7b8~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199397812736",
    embedUrl: "https://ok.ru/videoembed/14199397812736",
  },
  {
    id: 10,
    title: "Juicio en la familia",
    desc: "Jacob y Lía cuidan de Dina después de que sus hijos cometieran una masacre. Jacob descubre que Raquel adoraba ídolos y la condena.",
    dur: "00:41:09",
    thumb:
      "https://static.wixstatic.com/media/859174_24d955c28833450eae4d86e9b842a109~mv2.jpg",
    pageUrl: "https://ok.ru/video/14199398861312",
    embedUrl: "https://ok.ru/videoembed/14199398861312",
  },
];

function safeParseJSON<T>(v: string | null, fallback: T): T {
  if (!v) return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

export default function LeaNetflixMobile() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Player state: idx + src (calculado 1 vez) para que no se resetee al rotar
  const [playerOpen, setPlayerOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playerSrc, setPlayerSrc] = useState<string>("");

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Landscape mode: ocultar UI y verse “app”
  const [isLandscape, setIsLandscape] = useState(false);

  const current = episodes[idx];

  // Load last idx + my list + restore player if needed
  useEffect(() => {
    const savedIdx = Number(localStorage.getItem(STORAGE_LAST_IDX));
    if (!Number.isNaN(savedIdx) && savedIdx >= 0 && savedIdx < episodes.length) {
      setIdx(savedIdx);
    }

    const list = safeParseJSON<string[]>(localStorage.getItem(STORAGE_MYLIST), []);
    if (Array.isArray(list) && list.includes("lea")) setInMyList(true);

    // Restore player if browser “resets” on rotate
    const p = safeParseJSON<{ open: boolean; idx: number; src: string }>(
      sessionStorage.getItem(STORAGE_PLAYER),
      { open: false, idx: 0, src: "" }
    );
    if (p?.open && typeof p.idx === "number" && typeof p.src === "string") {
      setIdx(p.idx);
      setPlayerSrc(p.src);
      setPlayerOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_LAST_IDX, String(idx));
  }, [idx]);

  useEffect(() => {
    // Navbar scroll effect (solo cuando player está cerrado)
    const onScroll = () => {
      if (!playerOpen) setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [playerOpen]);

  useEffect(() => {
    // lock body scroll when player open
    if (!playerOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = (document.body.style as any).overscrollBehavior;
    document.body.style.overflow = "hidden";
    (document.body.style as any).overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      (document.body.style as any).overscrollBehavior = prevOverscroll;
    };
  }, [playerOpen]);

  useEffect(() => {
    // orientation detection
    const update = () => setIsLandscape(window.innerWidth > window.innerHeight);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  useEffect(() => {
    // vendor fullscreen attrs for iframe (no rompe TS)
    if (!playerOpen) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.setAttribute("webkitallowfullscreen", "true");
    iframe.setAttribute("mozallowfullscreen", "true");
  }, [playerOpen, idx]);

  useEffect(() => {
    // persist player state for “anti-reset”
    if (!playerOpen) {
      sessionStorage.removeItem(STORAGE_PLAYER);
      return;
    }
    sessionStorage.setItem(
      STORAGE_PLAYER,
      JSON.stringify({ open: true, idx, src: playerSrc })
    );
  }, [playerOpen, idx, playerSrc]);

  const buildEmbedSrc = (embedUrl: string) => {
    // autoplay + start=0; OK.ru maneja su propio progreso interno
    return embedUrl.includes("?") ? `${embedUrl}&autoplay=1` : `${embedUrl}?autoplay=1`;
  };

  const openEpisode = (nextIdx: number) => {
    if (nextIdx < 0 || nextIdx >= episodes.length) return;
    setIdx(nextIdx);

    // clave: src se calcula SOLO al abrir (no en render)
    const src = buildEmbedSrc(episodes[nextIdx].embedUrl);
    setPlayerSrc(src);
    setPlayerOpen(true);

    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const closePlayer = () => {
    setPlayerOpen(false);
    setPlayerSrc("");
  };

  const toggleMyList = () => {
    let list = safeParseJSON<string[]>(localStorage.getItem(STORAGE_MYLIST), []);
    if (!Array.isArray(list)) list = [];

    if (inMyList) {
      list = list.filter((x) => x !== "lea");
      setInMyList(false);
    } else {
      list.push("lea");
      setInMyList(true);
    }
    localStorage.setItem(STORAGE_MYLIST, JSON.stringify(list));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (q === "lea") router.push("/serie/lea");
    else if (q === "genesis") router.push("/serie/genesis");
  };

  // -------- PLAYER OVERLAY --------
  if (playerOpen) {
    const hideUI = isLandscape; // modo landscape: “pro player”

    return (
      <div className="fixed inset-0 bg-black z-[9999] flex flex-col">
        <Head>
          <title>Lea — Reproducción</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </Head>

        {!hideUI && (
          <div className="h-[10vh] min-h-[60px] px-4 flex items-center justify-between border-b border-white/5 bg-black flex-shrink-0">
            <div className="flex flex-col max-w-[72%] border-l-2 pl-3" style={{ borderColor: BRAND_ORANGE }}>
              <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: BRAND_ORANGE }}>
                Estudios 421
              </span>
              <span className="text-xs font-bold uppercase truncate">
                Ep. {current.id} — {current.title}
              </span>
            </div>

            <button onClick={closePlayer} className="text-4xl p-2" aria-label="Cerrar">
              &times;
            </button>
          </div>
        )}

        <div className="flex-1 bg-black">
          <iframe
            ref={iframeRef}
            src={playerSrc}
            className="w-full h-full border-none"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        {!hideUI && (
          <div className="h-[15vh] min-h-[96px] px-8 bg-black border-t border-white/5 flex items-center justify-between pb-8 flex-shrink-0">
            <button
              disabled={idx === 0}
              onClick={() => openEpisode(idx - 1)}
              className="flex flex-col items-center gap-1 active:scale-90 transition-transform disabled:opacity-5"
            >
              <IoChevronBack size={26} style={{ color: BRAND_ORANGE }} />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                Anterior
              </span>
            </button>

            <button
              onClick={closePlayer}
              className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            >
              <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                <IoList size={22} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">
                Episodios
              </span>
            </button>

            <button
              disabled={idx === episodes.length - 1}
              onClick={() => openEpisode(idx + 1)}
              className="flex flex-col items-center gap-1 active:scale-90 transition-transform disabled:opacity-5"
            >
              <IoChevronForward size={26} style={{ color: BRAND_ORANGE }} />
              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: BRAND_ORANGE }}>
                Siguiente
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // -------- HOME UI (Netflix-like) --------
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#F09800] overflow-x-hidden">
      <Head>
        <title>Lea — Estudios 421</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      {/* Top Nav */}
      <nav
        className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${
          isScrolled ? "bg-black shadow-lg" : "bg-gradient-to-b from-black/90 to-transparent"
        }`}
      >
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="text-white text-3xl z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>

          <Link href="/">
            <div className="relative w-[110px] h-[30px] cursor-pointer">
              <Image
                src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <IoSearchOutline size={16} />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#F09800] transition-all"
          />
        </form>

        <div className="flex-shrink-0">
          <Image
            src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png"
            alt="User"
            width={32}
            height={32}
            className="rounded-full ring-2 ring-white/10"
          />
        </div>
      </nav>

      {/* Side Menu */}
      <div
        className={`fixed inset-0 bg-black/98 z-[90] transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">
            Navegación
          </p>

          {[
            { n: "Inicio", h: "/" },
            { n: "Series Bíblicas", h: "/series-biblicas" },
            { n: "Series TV", h: "/series-tv" },
            { n: "Películas", h: "/peliculas" },
          ].map((link) => (
            <Link
              key={link.n}
              href={link.h}
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-white"
            >
              {link.n}
            </Link>
          ))}

          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">
            Acciones
          </p>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              toggleMyList();
            }}
            className={`w-full text-left text-base font-bold py-3 rounded-md border ${
              inMyList ? "bg-white/10 border-white/10" : "bg-transparent border-white/10"
            }`}
          >
            {inMyList ? (
              <>
                <IoCheckmarkCircle className="inline mr-2" /> En mi lista
              </>
            ) : (
              "+ Agregar a mi lista"
            )}
          </button>
        </div>
      </div>

      {/* Hero / Banner */}
      <div className="relative w-full bg-black pt-[56px]">
        <div className="w-full aspect-[4/3] relative pointer-events-none">
          <img src={bannerUrl} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>

        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button
            onClick={() => openEpisode(idx)}
            className="w-full bg-white text-black font-bold py-3.5 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-widest shadow-2xl"
          >
            {idx === 0 ? "▶ VER AHORA" : `▶ CONTINUAR EP. ${episodes[idx].id}`}
          </button>

          <div className="flex gap-3">
            <button
              onClick={toggleMyList}
              className={`flex-1 py-3 rounded-md text-[10px] font-bold border transition-all ${
                inMyList ? "bg-[#F09800] border-[#F09800]" : "bg-white/10 border-white/5"
              }`}
            >
              {inMyList ? (
                <>
                  <IoCheckmarkCircle className="inline mr-1" /> EN MI LISTA
                </>
              ) : (
                "+ MI LISTA"
              )}
            </button>

            <button
              onClick={() =>
                window.open("https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS", "_blank")
              }
              className="flex-1 bg-white/10 backdrop-blur-md py-3 rounded-md text-[10px] font-bold border border-white/5 active:bg-white/20 uppercase tracking-widest"
            >
              ❤ DONAR
            </button>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="px-4 mt-10 mb-24 text-left">
        <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-widest uppercase border-b border-white/10 pb-2">
          Episodios Disponibles
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {episodes.map((ep, i) => (
            <button
              key={ep.id}
              onClick={() => openEpisode(i)}
              className="w-full text-left active:opacity-80 transition-opacity"
            >
              <div className="flex gap-3">
                <div
                  className={`relative w-[46%] aspect-video rounded-md overflow-hidden border ${
                    idx === i ? "border-[#F09800]" : "border-white/5"
                  } shadow-lg flex-shrink-0`}
                >
                  <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute bottom-1 right-1 bg-black/90 text-white px-2 py-0.5 text-[9px] font-black rounded uppercase">
                    {ep.dur}
                  </span>
                </div>

                <div className="flex-1 pr-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-black text-[12px] uppercase tracking-tight">
                      EP. {ep.id} — {ep.title}
                    </h3>
                    {idx === i && (
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: BRAND_ORANGE }}>
                        Continuar
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/70 leading-snug mt-1 line-clamp-3">
                    {ep.desc}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
