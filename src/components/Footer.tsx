import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Sección Superior: Redes Sociales */}
        <div className="flex justify-center md:justify-end gap-6 mb-10">
          <a href="#" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
          <a href="#" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
          <a href="#" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
          <a href="#" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
          <a href="#" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
        </div>

        {/* Sección Media: Información de Derechos */}
        <div className="mb-10 space-y-4">
          <p className="text-xs leading-relaxed max-w-4xl">
            © {currentYear} Estudios 421. Todos los derechos reservados sobre el diseño y edición de la plataforma.
          </p>
          <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl">
            Aviso Legal: El contenido audiovisual compartido en este sitio pertenece a sus respectivos propietarios y productoras (Record TV, Seriella Productions, Casablanca Productions, Amazon Content Services LLC, entre otros). Estudios 421 es una plataforma sin fines de lucro destinada a la difusión de contenido bíblico para la comunidad. No reclamamos propiedad sobre las series o películas mostradas.
          </p>
        </div>

        {/* Sección Inferior: Enlaces Legales (Estilo VIX) */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
          <a href="#" className="hover:text-white transition-colors">Política de privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Términos de uso</a>
          <a href="#" className="hover:text-white transition-colors">Configuración de cookies</a>
          <a href="#" className="hover:text-white transition-colors">Especificaciones de anuncios</a>
          <a href="#" className="hover:text-white transition-colors">Centro de ayuda</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
