import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaPlay, FaSearch, FaHome, FaFilm, FaTv, FaPlus } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { MdOutlineCalendarMonth } from 'react-icons/md';

// ─── DATOS ────────────────────────────────────────────────────────────────────

const perfiles = [
  { nombre: 'Perfil 1', avatar: 'https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png', libre: true },
  { nombre: 'Perfil 2', avatar: 'https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png', libre: false },
  { nombre: 'Perfil 3', avatar: 'https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png', libre: false },
];

const banners = [
  { id: 1, path: '/serie/reyes-la-emboscada', bg: 'https://static.wixstatic.com/media/859174_9343d48d63e648a58f8389da18e1a645~mv2.jpg', logo: 'https://static.wixstatic.com/media/859174_373d72b97d7e49c6a2ed99da442b8e5a~mv2.png', desc: 'El poder se oculta y el reino enfrenta amenazas silenciosas. Intrigas, alianzas y traiciones marcan el destino de Israel.' },
  { id: 2, path: '/serie-tv/la-casa-de-david', bg: 'https://static.wixstatic.com/media/859174_f9a54fcc5f6343f58000d1c2bc159189~mv2.jpg', logo: 'https://static.wixstatic.com/media/859174_483e446bb507429694def615b148509d~mv2.png', desc: 'De pastor de ovejas al trono de Israel, sigue la vida de David. Gigantes y batallas marcan el camino de un líder.' },
  { id: 3, path: '/serie/apocalipsis', bg: 'https://static.wixstatic.com/media/859174_dba2a951e50449c8ac82791567649e3e~mv2.jpg', logo: 'https://static.wixstatic.com/media/859174_12525e1dc127400fbe95ab2ffafa8c32~mv2.png', desc: 'Inspirada en las profecías bíblicas, esta historia revela cómo la fe de unos pocos enfrenta el fin de los tiempos.' },
  { id: 4, path: '/serie/pablo-el-apostol', bg: 'https://static.wixstatic.com/media/859174_3f7434c3c97d4ed982befff72cfdbd27~mv2.jpg', logo: 'https://static.wixstatic.com/media/859174_90bd74be414340e29671df248bade4a3~mv2.png', desc: 'De perseguidor implacable a mensajero de Cristo, vive la transformación radical de Pablo de Tarso.' },
];

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

const menuItems = [
  { icon: <FaSearch size={28} />, label: 'Buscar', path: '/buscar' },
  { icon: <FaHome size={28} />, label: 'Inicio', path: '/' },
  { icon: <MdOutlineCalendarMonth size={28} />, label: 'Series Bíblicas', path: '/series-biblicas' },
  { icon: <FaTv size={28} />, label: 'Series TV', path: '/series-tv' },
  { icon: <FaFilm size={28} />, label: 'Películas', path: '/peliculas' },
  { icon: <FaPlus size={28} />, label: 'Mi Lista', path: '/mi-lista' },
];

// ─── TECLADO VIRTUAL ──────────────────────────────────────────────────────────
const teclado = [
  ['a','b','c','d','e','f'],
  ['g','h','i','j','k','l'],
  ['m','n','o','p','q','r'],
  ['s','t','u','v','w','x'],
  ['y','z','1','2','3','4'],
  ['5','6','7','8','9','0'],
  ['⌫','LIMPIAR','BUSCAR'],
];

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
const InicioTV = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Estados
  const [fase, setFase] = useState<'perfil' | 'login' | 'buscar' | 'inicio'>('perfil');
  const [perfilFoco, setPerfilFoco] = useState(0);

  // Login
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginCampo, setLoginCampo] = useState<'usuario' | 'password' | 'entrar'>('usuario');

  // Buscar
  const [busqueda, setBusqueda] = useState('');
  const [tecladoFila, setTecladoFila] = useState(0);
  const [tecladoCol, setTecladoCol] = useState(0);

  // Inicio
  const [menuFoco, setMenuFoco] = useState(1);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [zona, setZona] = useState<'menu' | 'hero' | 'filas'>('hero');
  const [filaFoco, setFilaFoco] = useState(0);
  const [itemFoco, setItemFoco] = useState(0);

  // Refs para scroll
  const itemRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const filasRef = useRef<HTMLDivElement>(null);

  // ── CRÍTICO: Foco automático al cargar — esto hace que los controles funcionen desde el inicio ──
  useEffect(() => {
    const forzarFoco = () => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
    };
    forzarFoco();
    // También forzar foco cuando la página vuelve a ser visible
    document.addEventListener('visibilitychange', forzarFoco);
    window.addEventListener('focus', forzarFoco);
    return () => {
      document.removeEventListener('visibilitychange', forzarFoco);
      window.removeEventListener('focus', forzarFoco);
    };
  }, []);

  // Re-forzar foco cada vez que cambia la fase
  useEffect(() => {
    setTimeout(() => containerRef.current?.focus(), 100);
  }, [fase]);

  // Auto-avance banner
  useEffect(() => {
    if (fase !== 'inicio') return;
    const t = setInterval(() => setBannerIdx(i => (i + 1) % banners.length), 7000);
    return () => clearInterval(t);
  }, [fase]);

  // Scroll automático al item enfocado
  useEffect(() => {
    if (zona !== 'filas') return;
    const ref = itemRefs.current[filaFoco]?.[itemFoco];
    if (ref) ref.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [filaFoco, itemFoco, zona]);

  // Scroll automático a la fila enfocada
  useEffect(() => {
    if (zona !== 'filas') return;
    const filaEl = filasRef.current?.children[filaFoco] as HTMLElement;
    if (filaEl) filaEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [filaFoco, zona]);

  // ── REFS DE ESTADO — para que el handler nunca se re-registre ──
  const stateRef = useRef({
    fase, perfilFoco, menuFoco, menuAbierto, bannerIdx, zona,
    filaFoco, itemFoco, loginCampo, loginUsuario, loginPassword,
    busqueda, tecladoFila, tecladoCol
  });
  useEffect(() => {
    stateRef.current = {
      fase, perfilFoco, menuFoco, menuAbierto, bannerIdx, zona,
      filaFoco, itemFoco, loginCampo, loginUsuario, loginPassword,
      busqueda, tecladoFila, tecladoCol
    };
  });

  // ── CONTROL REMOTO — UNA SOLA VEZ ─────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const s = stateRef.current;

      // Prevenir scroll nativo del navegador
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter'].includes(e.key)) {
        e.preventDefault();
      }

      // ── PERFIL ──
      if (s.fase === 'perfil') {
        if (e.key === 'ArrowRight') setPerfilFoco(p => Math.min(p + 1, perfiles.length - 1));
        if (e.key === 'ArrowLeft')  setPerfilFoco(p => Math.max(p - 1, 0));
        if (e.key === 'Enter') {
          if (perfiles[s.perfilFoco].libre) {
            setFase('inicio');
          } else {
            setLoginUsuario(''); setLoginPassword(''); setLoginError('');
            setLoginCampo('usuario'); setFase('login');
          }
        }
        return;
      }

      // ── LOGIN ──
      if (s.fase === 'login') {
        if (e.key === 'ArrowDown') {
          if (s.loginCampo === 'usuario') setLoginCampo('password');
          else if (s.loginCampo === 'password') setLoginCampo('entrar');
        }
        if (e.key === 'ArrowUp') {
          if (s.loginCampo === 'entrar') setLoginCampo('password');
          else if (s.loginCampo === 'password') setLoginCampo('usuario');
        }
        if (e.key === 'Enter' && s.loginCampo === 'entrar') {
          if (s.loginUsuario.trim() && s.loginPassword.trim()) setFase('inicio');
          else setLoginError('Ingresá usuario y contraseña.');
        }
        if (e.key === 'Backspace' || e.key === 'Escape') setFase('perfil');
        return;
      }

      // ── BUSCAR (teclado virtual) ──
      if (s.fase === 'buscar') {
        const fila = teclado[s.tecladoFila];
        if (e.key === 'ArrowRight') setTecladoCol(c => Math.min(c + 1, fila.length - 1));
        if (e.key === 'ArrowLeft')  setTecladoCol(c => Math.max(c - 1, 0));
        if (e.key === 'ArrowDown')  { setTecladoFila(f => Math.min(f + 1, teclado.length - 1)); setTecladoCol(0); }
        if (e.key === 'ArrowUp')    { setTecladoFila(f => Math.max(f - 1, 0)); setTecladoCol(0); }
        if (e.key === 'Backspace' || e.key === 'Escape') setFase('inicio');
        if (e.key === 'Enter') {
          const tecla = teclado[s.tecladoFila][s.tecladoCol];
          if (tecla === '⌫') setBusqueda(b => b.slice(0, -1));
          else if (tecla === 'LIMPIAR') setBusqueda('');
          else if (tecla === 'BUSCAR') {
            if (s.busqueda.trim()) router.push(`/buscar?q=${encodeURIComponent(s.busqueda)}`);
          }
          else setBusqueda(b => b + tecla);
        }
        return;
      }

      // ── INICIO ──
      if (s.fase === 'inicio') {

        // ZONA MENU
        if (s.zona === 'menu') {
          if (e.key === 'ArrowUp')    setMenuFoco(p => Math.max(p - 1, 0));
          if (e.key === 'ArrowDown')  setMenuFoco(p => Math.min(p + 1, menuItems.length - 1));
          if (e.key === 'ArrowRight') { setMenuAbierto(false); setZona('hero'); }
          if (e.key === 'Backspace' || e.key === 'Escape') { setMenuAbierto(false); setZona('hero'); }
          if (e.key === 'Enter') {
            const path = menuItems[s.menuFoco].path;
            if (path === '/buscar') { setFase('buscar'); setBusqueda(''); setTecladoFila(0); setTecladoCol(0); }
            else router.push(path);
          }
          return;
        }

        // ZONA HERO
        if (s.zona === 'hero') {
          if (e.key === 'ArrowLeft')  { setMenuAbierto(true); setZona('menu'); }
          if (e.key === 'ArrowRight') setBannerIdx(i => (i + 1) % banners.length);
          if (e.key === 'ArrowDown')  { setZona('filas'); setFilaFoco(0); setItemFoco(0); }
          if (e.key === 'Enter')      router.push(banners[s.bannerIdx].path);
          return;
        }

        // ZONA FILAS
        if (s.zona === 'filas') {
          const maxItem = categorias[s.filaFoco].items.length - 1;
          if (e.key === 'ArrowRight') setItemFoco(p => Math.min(p + 1, maxItem));
          if (e.key === 'ArrowLeft') {
            if (s.itemFoco === 0) { setMenuAbierto(true); setZona('menu'); }
            else setItemFoco(p => Math.max(p - 1, 0));
          }
          if (e.key === 'ArrowDown')  { setFilaFoco(p => Math.min(p + 1, categorias.length - 1)); setItemFoco(0); }
          if (e.key === 'ArrowUp') {
            if (s.filaFoco === 0) setZona('hero');
            else { setFilaFoco(p => Math.max(p - 1, 0)); setItemFoco(0); }
          }
          if (e.key === 'Enter') router.push(categorias[s.filaFoco].items[s.itemFoco].path);
          return;
        }
      }
    };

    // UNA SOLA VEZ — array vacío intencional
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ── RENDER PERFIL ──────────────────────────────────────────────────────────
  if (fase === 'perfil') {
    return (
      <div
        ref={containerRef}
        tabIndex={0}
        className="bg-black min-h-screen flex flex-col items-center justify-center outline-none"
      >
        <div className="mb-12">
          <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={320} height={90} className="object-contain" unoptimized />
        </div>
        <p className="text-white text-4xl font-light mb-16 tracking-widest uppercase">Elige un perfil</p>
        <div className="flex gap-20 items-center">
          {perfiles.map((p, i) => (
            <div
              key={i}
              onClick={() => {
                setPerfilFoco(i);
                if (p.libre) setFase('inicio');
                else { setLoginUsuario(''); setLoginPassword(''); setLoginError(''); setLoginCampo('usuario'); setFase('login'); }
              }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className={`w-40 h-40 rounded-xl overflow-hidden transition-all duration-300 ${perfilFoco === i ? 'ring-4 ring-[#F09800] scale-110 shadow-[0_0_40px_#F09800]' : 'ring-2 ring-white/20 opacity-60'}`}>
                <Image src={p.avatar} alt={p.nombre} width={160} height={160} className="object-cover w-full h-full" unoptimized />
              </div>
              <p className={`mt-5 text-xl font-medium tracking-wide ${perfilFoco === i ? 'text-[#F09800]' : 'text-gray-400'}`}>{p.nombre}</p>
              {!p.libre && <p className="text-sm text-gray-600 mt-1">🔒 Requiere acceso</p>}
            </div>
          ))}
        </div>
        <p className="mt-20 text-gray-600 text-base tracking-widest">← → para moverse · OK para seleccionar</p>
      </div>
    );
  }

  // ── RENDER LOGIN ────────────────────────────────────────────────────────────
  if (fase === 'login') {
    return (
      <div ref={containerRef} tabIndex={0} className="bg-black min-h-screen flex flex-col items-center justify-center outline-none">
        <div className="mb-10">
          <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={240} height={70} className="object-contain" unoptimized />
        </div>
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 w-[520px] flex flex-col gap-7">
          <h2 className="text-white text-3xl font-bold text-center uppercase mb-2">Acceder al perfil</h2>
          <p className="text-gray-500 text-base text-center mb-2">Ingresá tus datos para continuar</p>

          <div className={`flex flex-col gap-2 rounded-xl border-2 p-5 transition-all ${loginCampo === 'usuario' ? 'border-[#F09800] bg-white/5' : 'border-white/10'}`}>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Usuario</label>
            <input
              type="text"
              value={loginUsuario}
              onChange={e => setLoginUsuario(e.target.value)}
              onFocus={() => setLoginCampo('usuario')}
              placeholder="Tu nombre de usuario"
              className="bg-transparent text-white text-xl outline-none placeholder:text-gray-600"
            />
          </div>

          <div className={`flex flex-col gap-2 rounded-xl border-2 p-5 transition-all ${loginCampo === 'password' ? 'border-[#F09800] bg-white/5' : 'border-white/10'}`}>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Contraseña</label>
            <input
              type="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              onFocus={() => setLoginCampo('password')}
              placeholder="Tu contraseña"
              className="bg-transparent text-white text-xl outline-none placeholder:text-gray-600"
            />
          </div>

          {loginError && <p className="text-red-400 text-base text-center font-bold">{loginError}</p>}

          <button
            onClick={() => {
              if (loginUsuario.trim() && loginPassword.trim()) setFase('inicio');
              else setLoginError('Ingresá usuario y contraseña.');
            }}
            className={`w-full py-5 rounded-xl text-xl font-black uppercase tracking-widest transition-all duration-200 ${loginCampo === 'entrar' ? 'bg-[#F09800] text-white scale-105 shadow-[0_0_20px_#F09800]' : 'bg-white/10 text-white border border-white/20 hover:bg-[#F09800] hover:text-white'}`}
          >
            Entrar
          </button>

          <button onClick={() => setFase('perfil')} className="text-gray-500 text-base text-center hover:text-white transition-colors">
            ← Volver a perfiles
          </button>
        </div>
        <p className="mt-8 text-gray-700 text-sm tracking-widest">↑ ↓ navegar · OK confirmar · ESC volver</p>
      </div>
    );
  }

  // ── RENDER BUSCAR ───────────────────────────────────────────────────────────
  if (fase === 'buscar') {
    return (
      <div ref={containerRef} tabIndex={0} className="bg-black min-h-screen flex flex-col items-center justify-center outline-none px-20">
        <div className="w-full max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" width={160} height={45} className="object-contain" unoptimized />
            <h2 className="text-white text-3xl font-bold uppercase tracking-widest ml-4">Buscar</h2>
          </div>

          {/* Campo de búsqueda */}
          <div className="bg-white/10 border-2 border-[#F09800] rounded-xl px-6 py-4 mb-8 flex items-center gap-4">
            <FaSearch className="text-[#F09800] text-2xl flex-shrink-0" />
            <span className="text-white text-3xl tracking-widest flex-1 min-h-[40px]">
              {busqueda || <span className="text-gray-600">Escribí para buscar...</span>}
            </span>
            {busqueda && <span className="text-gray-400 text-base">{busqueda.length} letras</span>}
          </div>

          {/* Teclado virtual */}
          <div className="flex flex-col gap-3">
            {teclado.map((fila, fi) => (
              <div key={fi} className="flex gap-3 justify-center">
                {fila.map((tecla, ci) => {
                  const esFoco = tecladoFila === fi && tecladoCol === ci;
                  const esEspecial = ['⌫', 'LIMPIAR', 'BUSCAR'].includes(tecla);
                  return (
                    <button
                      key={ci}
                      onClick={() => {
                        setTecladoFila(fi); setTecladoCol(ci);
                        if (tecla === '⌫') setBusqueda(b => b.slice(0, -1));
                        else if (tecla === 'LIMPIAR') setBusqueda('');
                        else if (tecla === 'BUSCAR') { if (busqueda.trim()) router.push(`/buscar?q=${encodeURIComponent(busqueda)}`); }
                        else setBusqueda(b => b + tecla);
                      }}
                      className={`
                        ${esEspecial ? 'px-6 py-4 text-base' : 'w-14 h-14 text-xl'}
                        rounded-lg font-bold uppercase transition-all duration-150
                        ${esFoco
                          ? 'bg-[#F09800] text-white scale-110 shadow-[0_0_15px_#F09800]'
                          : tecla === 'BUSCAR'
                            ? 'bg-white/20 text-white border border-white/30 hover:bg-[#F09800]'
                            : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                        }
                      `}
                    >
                      {tecla}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-sm mt-8 tracking-widest">← → ↑ ↓ moverse · OK seleccionar · ESC volver</p>
        </div>
      </div>
    );
  }

  // ── RENDER INICIO ───────────────────────────────────────────────────────────
  const bannerActual = banners[bannerIdx];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="bg-black min-h-screen text-white flex overflow-hidden outline-none"
      style={{ userSelect: 'none' }}
    >
      {/* ── MENÚ LATERAL ── */}
      <div
        className={`fixed left-0 top-0 h-full z-50 flex flex-col justify-center gap-1 px-3 transition-all duration-300 ${menuAbierto ? 'w-56 bg-black' : 'w-20 bg-black/70'}`}
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="mb-8 flex justify-center">
          <Image
            src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png"
            alt="Logo"
            width={menuAbierto ? 140 : 44}
            height={44}
            className="object-contain transition-all duration-300"
            unoptimized
          />
        </div>
        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setMenuFoco(i);
              setMenuAbierto(true);
              setZona('menu');
              const path = item.path;
              if (path === '/buscar') { setFase('buscar'); setBusqueda(''); setTecladoFila(0); setTecladoCol(0); }
              else router.push(path);
            }}
            className={`flex items-center gap-4 px-4 py-5 rounded-xl cursor-pointer transition-all duration-200 ${
              zona === 'menu' && menuFoco === i
                ? 'bg-[#F09800] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="min-w-[28px] flex justify-center text-2xl">{item.icon}</span>
            {menuAbierto && <span className="text-lg font-semibold whitespace-nowrap">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${menuAbierto ? 'ml-56' : 'ml-20'}`}>

        {/* ── HERO BANNER ── */}
        <div
          className="relative w-full"
          style={{ height: '60vh' }}
          onClick={() => { setZona('hero'); setMenuAbierto(false); }}
        >
          <Image src={bannerActual.bg} alt="Banner" fill className="object-cover transition-all duration-700" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-16 pb-8">
            <div className="relative w-[420px] h-[140px] mb-6 drop-shadow-2xl">
              <Image src={bannerActual.logo} alt="Logo serie" fill className="object-contain object-left" unoptimized />
            </div>
            <p className="max-w-[560px] text-white text-2xl font-light mb-10 leading-relaxed opacity-90">
              {bannerActual.desc}
            </p>
            <div className="flex gap-5">
              <button
                onClick={(e) => { e.stopPropagation(); router.push(bannerActual.path); }}
                className={`flex items-center gap-3 px-12 py-5 rounded-xl font-bold text-xl transition-all duration-200 ${zona === 'hero' ? 'bg-[#F09800] text-white scale-105 shadow-[0_0_25px_#F09800]' : 'bg-white text-black hover:bg-[#F09800] hover:text-white'}`}
              >
                <FaPlay size={18} /> Ver Ahora
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); router.push(bannerActual.path + '?info=1'); }}
                className="flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-xl bg-white/15 text-white border border-white/30 hover:bg-white/25 transition-all"
              >
                <HiOutlineInformationCircle size={24} /> Más Info
              </button>
            </div>
          </div>

          {/* Indicadores banner */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {banners.map((_, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setBannerIdx(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === bannerIdx ? 'w-12 bg-[#F09800]' : 'w-3 bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* ── FILAS DE CATEGORÍAS ── */}
        <div
          ref={filasRef}
          className="flex-1 overflow-y-auto pb-12 pt-6"
          onClick={() => { setZona('filas'); setMenuAbierto(false); }}
          style={{ scrollbarWidth: 'none' }}
        >
          {categorias.map((cat, fi) => (
            <div key={fi} className="mb-10 px-8">
              <h2 className={`text-2xl font-bold mb-5 flex items-center gap-3 uppercase tracking-wider transition-colors ${zona === 'filas' && filaFoco === fi ? 'text-[#F09800]' : 'text-white'}`}>
                <span className="w-2 h-7 bg-[#F09800] rounded-full" />
                {cat.titulo}
              </h2>
              {/* Carrusel con overflow-x-auto para que funcione el scroll */}
              <div className="flex gap-5 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
                {cat.items.map((item, ii) => {
                  const esFocused = zona === 'filas' && filaFoco === fi && itemFoco === ii;
                  return (
                    <div
                      key={ii}
                      ref={el => {
                        if (!itemRefs.current[fi]) itemRefs.current[fi] = [];
                        itemRefs.current[fi][ii] = el;
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setZona('filas');
                        setFilaFoco(fi);
                        setItemFoco(ii);
                        setMenuAbierto(false);
                        router.push(item.path);
                      }}
                      className={`relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                        esFocused
                          ? 'scale-110 ring-4 ring-[#F09800] shadow-[0_0_25px_#F09800] z-10'
                          : 'opacity-75 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ width: '160px', aspectRatio: '2/3' }}
                    >
                      <Image src={item.banner} alt={item.title} fill className="object-cover" unoptimized />
                      {esFocused && (
                        <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                          <p className="text-white text-sm font-bold leading-tight">{item.title}</p>
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

      {/* Indicador controles */}
      <div className="fixed bottom-4 right-6 z-50 text-gray-600 text-xs tracking-widest">
        ↑ ↓ ← → navegar · OK seleccionar
      </div>

      <style jsx global>{`
        body { overflow: hidden; background: black; }
        img { pointer-events: none; -webkit-user-drag: none; }
        * { -webkit-user-select: none; user-select: none; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        *:focus { outline: none; }
      `}</style>
    </div>
  );
};

export default InicioTV;
