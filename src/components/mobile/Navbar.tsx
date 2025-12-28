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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
      <nav className={`fixed top-0 w-full z-[100] px-4 py-3 flex items-center justify-between ${isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <button className="text-white text-3xl z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>

        <Link href="/">
          <div className="relative w-[130px] h-[35px]">
            <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <IoSearchOutline className="text-white text-2xl" />
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={28} height={28} className="rounded-full ring-1 ring-white/20" />
        </div>
      </nav>

      {/* MENÚ LATERAL */}
      <div className={`fixed inset-0 bg-black/98 z-[90] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8">
          <div className="flex flex-col gap-6">
            <p className="text-gray-500 text-xs uppercase tracking-widest border-b border-white/10 pb-2">Navegación</p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`text-xl font-bold ${router.pathname === link.href ? 'text-[#FF8A00]' : 'text-white'}`}>
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