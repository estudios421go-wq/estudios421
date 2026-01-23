import React from 'react';

const TerminosPC = () => {
  return (
    <div className="bg-black min-h-screen text-gray-300 p-10 md:p-20 font-sans">
      <h1 className="text-[#F09800] text-3xl font-black mb-8 uppercase">Términos de Uso</h1>
      <div className="space-y-6 text-sm leading-relaxed max-w-4xl">
        <section>
          <h2 className="text-white font-bold text-lg mb-2">1. Naturaleza de la Plataforma</h2>
          <p>Estudios 421 es un proyecto cultural y educativo sin fines de lucro. Nuestra misión es la difusión de contenido bíblico y valores para la comunidad hispanohablante.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-2">2. Propiedad Intelectual</h2>
          <p>Reconocemos y respetamos los derechos de autor. Todo el material audiovisual pertenece a sus respectivos creadores y productoras (Record TV, Seriella, etc.). Estudios 421 no comercializa ni vende acceso a este contenido.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-2">3. Responsabilidad del Usuario</h2>
          <p>El usuario se compromete a utilizar la plataforma de manera personal y no comercial. Queda prohibida la redistribución del contenido con fines de lucro ajenos a esta plataforma.</p>
        </section>
      </div>
    </div>
  );
};

export default TerminosPC;
