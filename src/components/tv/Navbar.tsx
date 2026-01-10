import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline } from 'react-icons/io5';

const Navbar = () => {
  const router = useRouter();

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

  const handleKeyDown = (e: React.KeyboardEvent, index: number, totalElements: number) => {
    const navElements = document.querySelectorAll<HTMLElement>('.nav-focusable');
    
    if (e.key === 'ArrowRight' && index < totalElements - 1) {
      e.preventDefault();
      navElements[index + 1].focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      navElements[index - 1].focus();
    }
    // Dejamos que 'ArrowDown' se propague para que el Home lo detecte y baje al Banner
  };

  return (
    <nav className="fixed top-0 w-full z-[100] px-12 py-6 flex items-center justify-between bg-gradient-to-b from-black via-black/90 to-transparent">
      <div className="flex items-center gap-12">
        {/* LOGO (Índice 0) */}
        <Link href="/">
          <div 
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, 0, navLinks.length + languages.length + 2)}
            className="nav-focusable relative w-[180px] h-[50px] outline-none focus:ring-2 focus:ring-[#F09800] rounded-lg transition-transform focus:scale-105"
          >
            <Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority />
          </div>
        </Link>

        {/* LINKS (Índices 1 a 4) */}
        <div className="flex gap-6">
          {navLinks.map((link, i) => (
            <Link 
              key={link.href} 
              href={link.href} 
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, i + 1, navLinks.length + languages.length + 2)}
              className="nav-focusable text-white text-lg font-bold outline-none px-4 py-2 rounded-lg focus:bg-white/20 focus:ring-2 focus:ring-[#F09800]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* IDIOMAS (Índices 5, 6, 7) */}
        <div className="flex gap-4">
          {languages.map((lang, i) => (
            <button 
              key={lang.name} 
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, i + 5, navLinks.length + languages.length + 2)}
              className="nav-focusable outline-none focus:ring-2 focus:ring-[#F09800] rounded-full p-1 transition-all focus:scale-125"
            >
              <img src={lang.img} alt={lang.name} className="w-8 h-8 object-contain" />
            </button>
          ))}
        </div>

        {/* BUSCADOR (Índice 8) */}
        <div 
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, 8, navLinks.length + languages.length + 2)}
          className="nav-focusable flex items-center bg-white/10 rounded-full px-6 py-2 border border-white/10 outline-none focus:ring-2 focus:ring-[#F09800]"
        >
          <IoSearchOutline className="text-white text-2xl" />
          <span className="text-white ml-2 text-sm opacity-50">Buscar...</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
