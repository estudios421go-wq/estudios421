import React from 'react';

const AnunciosPC = () => {
  return (
    <div className="bg-black min-h-screen text-gray-300 p-10 md:p-20 font-sans">
      <h1 className="text-[#F09800] text-3xl font-black mb-8 uppercase">Especificaciones de Anuncios</h1>
      <div className="space-y-6 text-sm leading-relaxed max-w-4xl">
        <section>
          <h2 className="text-white font-bold text-lg mb-2">Publicidad de Sostenimiento</h2>
          <p>En Estudios 421 priorizamos una experiencia limpia y sin interrupciones. Sin embargo, el mantenimiento de los servidores y la infraestructura técnica conlleva costos mensuales fijos.</p>
        </section>

        <section className="bg-zinc-900/50 p-6 border-l-4 border-[#F09800]">
          <h2 className="text-white font-bold text-lg mb-2">¿Cuándo aparecen los anuncios?</h2>
          <p>Nuestra política es simple: <span className="text-[#F09800] font-bold">Si hay donaciones, no hay anuncios.</span></p>
          <ul className="list-disc ml-5 mt-3 space-y-2 italic">
            <li>Los anuncios se activarán únicamente en periodos donde las donaciones de la comunidad no cubran los gastos operativos.</li>
            <li>En cuanto se alcance el objetivo de sostenibilidad mediante donaciones, la publicidad será desactivada inmediatamente.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-2">Compromiso con el Usuario</h2>
          <p>Buscamos que los anuncios sean lo menos intrusivos posible, utilizando este recurso solo como un fondo de emergencia para evitar el cierre de la plataforma.</p>
        </section>
      </div>
    </div>
  );
};

export default AnunciosPC;
