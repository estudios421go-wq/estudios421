import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaPlay, FaSearch, FaHome, FaFilm, FaTv, FaPlus } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { MdOutlineCalendarMonth } from 'react-icons/md';

// ─── PERFILES ───────────────────────────────────────────────────────────────
const perfiles = [
  { nombre: 'Perfil 1', avatar: 'https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png' },
  { nombre: 'Perfil 2', avatar: 'https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png' },
  { nombre: 'Perfil 3', avatar: 'https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png' },
];

// ─── BANNERS HERO ────────────────────────────────────────────────────────────
const banners = [
  {
    id: 1, path: '/serie/reyes-la-emboscada',
    bg: 'https://static.wixstatic.com/media/859174_9343d48d63e648a58f8389da18e1a645~mv2.jpg',
    logo: 'https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png',
    desc: 'El poder se oculta y el reino enfrenta amenazas silenciosas. Intrigas, alianzas y traiciones marcan el destino de Israel.',
  },
  {
    id: 2, path: '/serie-tv/la-casa-de-david',
    bg: 'https://static.wixstatic.com/media/859174_f9a54fcc5f6343f58000d1c2bc159189~mv2.jpg',
    logo: 'https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png',
    desc: 'De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes y batallas marcan el camino de un líder.',
  },
  {
    id: 3, path: '/serie/apocalipsis',
    bg: 'https://static.wixstatic.com/media/859174_dba2a951e50449c8ac82791567649e3e~mv2.jpg',
    logo: 'https://static.wixstatic.com/media/859174_12525e1dc127400fbe95ab2ffafa8c32~mv2.png',
    desc: 'Inspirada en las profecías bíblicas, esta historia revela cómo la fe de unos pocos enfrenta el fin de los tiempos.',
  },
  {
    id: 4, path: '/serie/pablo-el-apostol',
    bg: 'https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg',
    logo: 'https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png',
    desc: 'De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso.',
  },
];

// ─── CATEGORÍAS ──────────────────────────────────────────────────────────────
const categorias = [
  {
    titulo: 'Estrenos',
    items: [
      { title: 'Reyes La Emboscada', banner: 'https://static.wixstatic.com/media/859174_39af669f528c41f6be4925d32b80b42c~mv2.jpg', path: '/serie/reyes-la-emboscada' },
      { title: 'La Casa De David', banner: 'https://static.wixstatic.com/media/859174_bc1b97a10d3247e097ff4bbdda56e973~mv2.jpg', path: '/serie-tv/la-casa-de-david' },
      { title: 'Apocalipsis', banner: 'https://static.wixstatic.com/media/859174_ace5fbe133b3490593913ede8144fe06~mv2.jpg', path: '/serie/apocalipsis' },
      { title: 'Reyes La Sucesión', banner: 'https://static.wixstatic.com/media/859174_2960f93a729e41df96813820c93b80eb~mv2.jpg', path: '/serie/reyes-la-sucesion' },
      { title: 'Reyes La División', banner: 'https://static.wixstatic.com/media/859174_6986effb4d7a48c1925babb9425be472~mv2.jpg', path: '/serie/reyes-la-division' },
      { title: 'Pablo El Apóstol', banner: 'https://static.wixstatic.com/media/859174_1a4c34a2bb8a495bad6ea09b5da366dd~mv2.jpg', path: '/serie/pablo-el-apostol' },
      { title: 'La Reina De Persia', banner: 'https://static.wixstatic.com/media/859174_25430a5b5d74415f8a6ad729958081d2~mv2.jpg', path: '/serie/la-reina-de-persia' },
    ],
  },
  {
    titulo: 'Series Bíblicas',
    items: [
      { title: 'Génesis', banner: 'https://static.wixstatic.com/media/859174_018cfcb041814b67bd52c6a4359b3cbc~mv2.jpg', path: '/serie/genesis' },
      { title: 'José de Egipto', banner: 'https://static.wixstatic.com/media/859174_e4bd49f00d5d4377a7e404ae7246d696~mv2.jpg', path: '/serie/jose-de-egipto' },
      { title: 'Los Diez Mandamientos', banner: 'https://static.wixstatic.com/media/859174_0e75860e77094dbf9f210a7822ba7f5e~mv2.jpg', path: '/serie/moises-y-los-diez-mandamientos' },
      { title: 'La Tierra Prometida', banner: 'https://static.wixstatic.com/media/859174_e4d2a3d4cbe04efc8a90f9d17a3466e3~mv2.jpg', path: '/serie/la-tierra-prometida' },
      { title: 'Rey David', banner: 'https://static.wixstatic.com/media/859174_e0555531e40c4362ad8d1e06f243af08~mv2.jpg', path: '/serie/rey-david' },
      { title: 'Jesús', banner: 'https://static.wixstatic.com/media/859174_d9ce32069d954bc99d5db05bb90fc924~mv2.jpg', path: '/serie/jesus' },
      { title: 'Apocalipsis', banner: 'https://static.wixstatic.com/media/859174_3187cee73d2e4cd9bc1aa7971fd2c117~mv2.jpg', path: '/serie/apocalipsis' },
    ],
  },
  {
    titulo: 'Series TV',
    items: [
      { title: 'La Casa De David', banner: 'https://static.wixstatic.com/media/859174_cc2c878f7a0a4fffa5b63ef31048fb75~mv2.jpg', path: '/serie-tv/la-casa-de-david' },
      { title: 'La Biblia', banner: 'https://static.wixstatic.com/media/859174_aa4a8425d9714f0aa2f96b418a408747~mv2.jpg', path: '/serie-tv/la-biblia' },
    ],
  },
  {
    titulo: 'Películas',
    items: [
      { title: 'La Pasión De Cristo', banner: 'https://static.wixstatic.com/media/859174_68e2caed65fb48f482bead90d49ac07a~mv2.jpg', path: '/pelicula/la-pasion-de-cristo' },
    ],
  },
];

// ─── MENÚ LATERAL ────────────────────────────────────────────────────────────
const menuItems = [
  { icon: <FaSearch size={24} />, label: 'Buscar', path: '/buscar' },
  { icon: <FaHome size={24} />, label: 'Inicio', path: '/' },
  { icon: <MdOutlineCalendarMonth size={24} />, label: 'Series Bíblicas', path: '/series-biblicas' },
  { icon: <FaTv size={24} />, label: 'Series TV', path: '/series-tv' },
  { icon: <FaFilm size={24} />, label: 'Películas', path: '/peliculas' },
  { icon: <FaPlus size={24} />, label: 'Mi Lista', path: '/mi-lista' },
];

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────
const InicioTV = () => {
  const router = useRouter();

  // FASE: 'perfil' | 'inicio'
  const [fase, setFase] = useState<'perfil' | 'inicio'>('perfil');

  // Navegación perfil
  const [perfilFoco, setPerfilFoco] = useState(0);

  // Navegación inicio
  const [menuFoco, setMenuFoco] = useState(1); // 1 = Inicio
  const [bannerIdx, setBannerIdx] = useState(0);
  const [focusZona, setFocusZona] = useState<'menu' | 'hero' | 'filas'>('hero');
  const [filaFoco, setFilaFoco] = useState(0);       // qué fila
  const [itemFoco, setItemFoco] = useState(0);        // qué ítem dentro de la fila

  // Auto-avance banner
  useEffect(() => {
    if (fase !== 'inicio') return;
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 7000);
    return () => clearInterval(t);
  }, [fase]);

  // ── CONTROL REMOTO ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // ── FASE PERFIL ──
      if (fase === 'perfil') {
        if (e.key === 'ArrowRight') setPerfilFoco(p => Math.min(p + 1, perfiles.length - 1));
        if (e.key === 'ArrowLeft')  setPerfilFoco(p => Math.max(p - 1, 0));
        if (e.key === 'Enter')      setFase('inicio');
        return;
      }

      // ── FASE INICIO ──
      if (focusZona === 'menu') {
        if (e.key === 'ArrowUp')    setMenuFoco(p => Math.max(p - 1, 0));
        if (e.key === 'ArrowDown')  setMenuFoco(p => Math.min(p + 1, menuItems.length - 1));
        if (e.key === 'ArrowRight') setFocusZona('hero');
        if (e.key === 'Enter')      router.push(menuItems[menuFoco].path);
      }

      if (focusZona === 'hero') {
        if (e.key === 'ArrowLeft')  setFocusZona('menu');
        if (e.key === 'ArrowDown')  { setFocusZona('filas'); setFilaFoco(0); setItemFoco(0); }
        if (e.key === 'ArrowRight') setBannerIdx(i => (i + 1) % banners.length);
        if (e.key === 'ArrowLeft' && focusZona === 'hero') setBannerIdx(i => (i - 1 + banners.length) % banners.length);
        if (e.key === 'Enter')      router.push(banners[bannerIdx].path);
      }

      if (focusZona === 'filas') {
        const filaActual = categorias[filaFoco];
        if (e.key === 'ArrowRight') setItemFoco(p => Math.min(p + 1, filaActual.items.length - 1));
        if (e.key === 'ArrowLeft') {
          if (itemFoco === 0) setFocusZona('menu');
          else setItemFoco(p => Math.max(p - 1, 0));
        }
        if (e.key === 'ArrowDown')  { setFilaFoco(p => Math.min(p + 1, categorias.length - 1)); setItemFoco(0); }
        if (e.key === 'ArrowUp') {
          if (filaFoco === 0) { setFocusZona('hero'); }
          else { setFilaFoco(p => Math.max(p - 1, 0)); setItemFoco(0); }
        }
        if (e.key === 'Enter') router.push(filaActual.items[itemFoco].path);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fase, focusZona, perfilFoco, menuFoco, bannerIdx, filaFoco, itemFoco]);

  // ── RENDER PERFIL ────────────────────────────────────────────────────────────
  if (fase === 'perfil') {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center">
        <div className="mb-12">
          <Image
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
            alt="Logo"
            width={280}
            height={80}
            className="object-contain"
          />
        </div>
        <p className="text-white text-3xl font-light mb-14 tracking-widest uppercase">
          Elige un perfil
        </p>
        <div className="flex gap-16 items-center">
          {perfiles.map((p, i) => (
            <div
              key={i}
              onClick={() => { setPerfilFoco(i); setFase('inicio'); }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`w-36 h-36 rounded-lg overflow-hidden transition-all duration-300 ${
                  perfilFoco === i
                    ? 'ring-4 ring-[#F09800] scale-110 shadow-[0_0_30px_#F09800]'
                    : 'ring-2 ring-white/20 opacity-60 group-hover:opacity-100 group-hover:scale-105'
                }`}
              >
                <Image src={p.avatar} alt={p.nombre} width={144} height={144} className="object-cover w-full h-full" />
              </div>
              <p className={`mt-4 text-lg font-medium tracking-wide transition-colors ${perfilFoco === i ? 'text-[#F09800]' : 'text-gray-400'}`}>
                {p.nombre}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-gray-600 text-sm tracking-widest">
          Usá las flechas ← → y OK para seleccionar
        </p>
      </div>
    );
  }

  // ── RENDER INICIO ────────────────────────────────────────────────────────────
  const bannerActual = banners[bannerIdx];

  return (
    <div className="bg-black min-h-screen text-white flex overflow-hidden" style={{ userSelect: 'none' }}>

      {/* ── MENÚ LATERAL ── */}
      <div
        className={`fixed left-0 top-0 h-full z-50 flex flex-col justify-center gap-2 px-3 transition-all duration-300 ${
          focusZona === 'menu' ? 'w-52 bg-black/95' : 'w-16 bg-black/60'
        }`}
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className="mb-8 flex justify-center">
          <Image
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
            alt="Logo"
            width={focusZona === 'menu' ? 130 : 36}
            height={40}
            className="object-contain transition-all duration-300"
          />
        </div>
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => { setMenuFoco(i); setFocusZona('menu'); router.push(item.path); }}
            className={`flex items-center gap-4 px-3 py-4 rounded-lg cursor-pointer transition-all duration-200 ${
              focusZona === 'menu' && menuFoco === i
                ? 'bg-[#F09800] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="min-w-[24px] flex justify-center">{item.icon}</span>
            {focusZona === 'menu' && (
              <span className="text-base font-medium whitespace-nowrap">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${focusZona === 'menu' ? 'ml-52' : 'ml-16'}`}>

        {/* ── HERO BANNER ── */}
        <div
          className="relative w-full cursor-pointer"
          style={{ height: '62vh' }}
          onClick={() => setFocusZona('hero')}
        >
          {/* Imagen de fondo */}
          <Image
            src={bannerActual.bg}
            alt="Banner"
            fill
            className="object-cover transition-all duration-700"
            priority
          />
          {/* Gradientes */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

          {/* Contenido hero */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-16 pb-8">
            <div className="relative w-[380px] h-[130px] mb-5 drop-shadow-2xl">
              <Image src={bannerActual.logo} alt="Logo serie" fill className="object-contain object-left" unoptimized />
            </div>
            <p className="max-w-[520px] text-white text-xl font-light mb-8 leading-relaxed opacity-90">
              {bannerActual.desc}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push(bannerActual.path)}
                className={`flex items-center gap-3 px-10 py-4 rounded-md font-bold text-lg transition-all duration-200 ${
                  focusZona === 'hero'
                    ? 'bg-[#F09800] text-white scale-105 shadow-[0_0_20px_#F09800]'
                    : 'bg-white/20 text-white backdrop-blur-md border border-white/20'
                }`}
              >
                <FaPlay size={16} /> Ver Ahora
              </button>
              <button
                className="flex items-center gap-3 px-8 py-4 rounded-md font-bold text-lg bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
              >
                <HiOutlineInformationCircle size={22} /> Más Info
              </button>
            </div>
          </div>

          {/* Indicadores de banner */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, i) => (
              <div
                key={i}
                onClick={() => setBannerIdx(i)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i === bannerIdx ? 'w-10 bg-[#F09800]' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── FILAS DE CATEGORÍAS ── */}
        <div className="flex-1 overflow-y-auto pb-10 pt-4" onClick={() => setFocusZona('filas')}>
          {categorias.map((cat, fi) => (
            <div key={fi} className="mb-8 px-6">
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-3 uppercase tracking-wider">
                <span className="w-1.5 h-6 bg-[#F09800]" />
                {cat.titulo}
              </h2>
              <div className="flex gap-4 overflow-x-hidden">
                {cat.items.map((item, ii) => {
                  const esFocused = focusZona === 'filas' && filaFoco === fi && itemFoco === ii;
                  return (
                    <div
                      key={ii}
                      onClick={() => { setFilaFoco(fi); setItemFoco(ii); router.push(item.path); }}
                      className={`relative flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                        esFocused
                          ? 'scale-110 ring-4 ring-[#F09800] shadow-[0_0_20px_#F09800] z-10'
                          : 'opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ width: '140px', aspectRatio: '2/3' }}
                    >
                      <Image
                        src={item.banner}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {esFocused && (
                        <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                          <p className="text-white text-xs font-bold leading-tight">{item.title}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de zona activa (ayuda visual) */}
      <div className="fixed bottom-4 right-6 z-50 text-gray-600 text-xs tracking-widest">
        ↑ ↓ ← → para navegar · OK para seleccionar
      </div>

      <style jsx global>{`
        body { overflow: hidden; }
        img { pointer-events: none; -webkit-user-drag: none; }
        * { -webkit-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default InicioTV;
