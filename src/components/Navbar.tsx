import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Series Bíblicas', href: '/series-biblicas' },
    { name: 'Series TV', href: '/series-tv' },
    { name: 'Películas', href: '/peliculas' },
  ];

  const languages = [
    { name: 'ESP', img: "https://static.wixstatic.com/media/859174_367960b11c1c44ba89cd1582fd1b5776~mv2.png" },
    { name: 'ENG', img: "https://static.wixstatic.com/media/859174_35112d9ffe234d6f9dcef16cf8f7544e~mv2.png" },
    { name: 'PT', img: "https://static.wixstatic.com/media/859174_830f1c20656e4d44a819bedfc13a22cc~mv2.png" }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        
        <div className="flex items-center gap-4 md:gap-10">
          {/* Botón Hamburguesa para Móvil */}
          <button 
            className="xl:hidden text-white text-3xl z-[110]" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>

          <Link href="/">
            <div className="relative w-[130px] h-[35px] md:w-[160px] md:h-[45px] cursor-pointer">
              <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Enlaces para Computadora */}
          <div className="hidden xl:flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative group text-white text-[15px] font-medium tracking-wide">
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 ${router.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Banderas para Computadora */}
          <div className="hidden lg:flex gap-4 mr-4">
            {languages.map((lang) => (
              <img key={lang.name} src={lang.img} alt={lang.name} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" />
            ))}
          </div>

          {/* Buscador Adaptable */}
          <div className="flex items-center bg-white/10 rounded-full px-3 md:px-4 py-1 border border-white/5">
            <IoSearchOutline className="text-white text-lg md:text-xl" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-transparent border-none outline-none text-white text-xs md:text-sm ml-2 w-20 md:w-32 placeholder:text-gray-400" 
            />
          </div>

          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {/* MENÚ LATERAL (Móvil) */}
      <div className={`fixed inset-0 bg-black/95 z-[90] transition-transform duration-500 xl:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
          <div className="flex flex-col gap-6">
            <p className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-bold ${router.pathname === link.href ? 'text-[#FF8A00]' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <p className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/10 pb-2">Idioma</p>
            <div className="flex gap-6">
              {languages.map((lang) => (
                <div key={lang.name} className="flex flex-col items-center gap-2">
                  <img src={lang.img} alt={lang.name} className="w-10 h-10 object-contain" />
                  <span className="text-[10px] text-white font-bold">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;