import React from 'react';

const PrivacidadPC = () => {
  return (
    <div className="bg-black min-h-screen text-gray-300 p-10 md:p-20 font-sans">
      <h1 className="text-[#F09800] text-3xl font-black mb-8 uppercase">Política de Privacidad</h1>
      <div className="space-y-6 text-sm leading-relaxed max-w-4xl">
        <p>En <span className="text-white font-bold">Estudios 421</span>, la privacidad de nuestros usuarios es prioridad. Al ser una plataforma de difusión sin fines de lucro, informamos lo siguiente:</p>
        
        <section>
          <h2 className="text-white font-bold text-lg mb-2">1. Recopilación de Datos</h2>
          <p>No solicitamos registros obligatorios ni almacenamos datos bancarios. La navegación es libre para la comunidad interesada en contenido bíblico.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-2">2. Uso de la Información</h2>
          <p>Cualquier dato técnico recopilado (como cookies de sesión) se utiliza exclusivamente para mejorar la experiencia de reproducción y la velocidad de carga de la interfaz.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-lg mb-2">3. Enlaces a Terceros</h2>
          <p>Nuestra plataforma puede contener enlaces a reproductores externos. No nos hacemos responsables de las políticas de privacidad de dichos sitios ajenos a Estudios 421.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacidadPC;
