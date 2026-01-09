import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-12 py-6 flex items-center justify-between ${isScrolled ? 'bg-black shadow-2xl' : 'bg-gradient-to-b from-black via-black/80 to-transparent'}`}>
      <div className="flex items-center gap-12">
        {/* LOGO */}
        <Link href="/">
          <div className="relative w-[180px] h-[50px] outline-none focus:scale-110 transition-transform duration-300">
            <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority />
          </div>
        </Link>

        {/* LINKS DE NAVEGACIÓN - En TV usamos focus: para el control remoto */}
        <div className="flex gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative text-white text-lg font-bold tracking-wide outline-none px-4 py-2 rounded-lg transition-all duration-300 focus:bg-white/10 focus:ring-2 focus:ring-[#F09800] ${router.pathname === link.href ? 'text-[#F09800]' : ''}`}
            >
              {link.name}
              {/* Línea decorativa que brilla cuando está activo */}
              <span className={`absolute -bottom-1 left-0 h-[3px] bg-[#F09800] transition-all duration-500 ${router.pathname === link.href ? 'w-full' : 'w-0'}`} />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* IDIOMAS - Navegables con flechas */}
        <div className="flex gap-6 mr-4">
          {languages.map((lang) => (
            <button 
              key={lang.name} 
              className="outline-none focus:scale-125 focus:ring-2 focus:ring-[#F09800] rounded-full p-1 transition-all duration-300"
            >
              <img src={lang.img} alt={lang.name} className="w-8 h-8 object-contain" />
            </button>
          ))}
        </div>

        {/* BUSCADOR - Adaptado para TV */}
        <div className="flex items-center bg-white/10 rounded-full px-6 py-2 border border-white/10 focus-within:ring-2 focus-within:ring-[#F09800] transition-all">
          <IoSearchOutline className="text-white text-2xl" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="bg-transparent border-none outline-none text-white text-lg ml-3 w-40 placeholder:text-gray-400"
            tabIndex={0}
          />
        </div>

        {/* USUARIO */}
        <button className="outline-none focus:ring-4 focus:ring-[#F09800] rounded-full transition-all">
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={40} height={40} className="rounded-full ring-1 ring-white/20" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
