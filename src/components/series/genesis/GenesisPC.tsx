import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../tv/Navbar';
import Footer from '../../Footer';

const genesisEpisodes = [
  { id: 1, title: "El edén", dur: "43:16", desc: "Historia de la creación y el inicio de la humanidad con Adán y Eva.", thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg", url: "https://ok.ru/videoembed/13888818973184" },
  { id: 2, title: "Las consecuencias", dur: "43:09", desc: "Adán y Eva enfrentan la expulsión del paraíso tras el fruto prohibido.", thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg", url: "https://ok.ru/videoembed/13888837454336" },
  { id: 3, title: "Hermanos", dur: "42:59", desc: "La historia de Caín y Abel, hijos de Adán y Eva, y sus naturalezas opuestas.", thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg", url: "https://ok.ru/videoembed/13888884902400" },
  { id: 4, title: "La opción", dur: "43:00", desc: "Los celos de Caín lo llevan a tomar una decisión trágica sobre su hermano.", thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg", url: "https://ok.ru/videoembed/13888885230080" },
  { id: 5, title: "Una idea", dur: "43:08", desc: "Caín encuentra el lugar donde todas sus hermanas se instalaron después de abandonar a su padre.", thumb: "https://static.wixstatic.com/media/859174_dbef8b4ca19a4d868ee8a1903c6e2266~mv2.jpg", url: "https://ok.ru/videoembed/13889027836416" },
  { id: 6, title: "El arca", dur: "43:10", desc: "Noé es hombre bueno entre todas las personas corruptas. Dios le dice que tendrá una misión importante.", thumb: "https://static.wixstatic.com/media/859174_9f5d8e059c484939b2b0dab7b5507dcc~mv2.jpg", url: "https://ok.ru/videoembed/14047823858176" },
  { id: 7, title: "Diversión", dur: "43:17", desc: "Cam es uno de los hijos de Noé y está casado con Tali, una joven mujer que anhela más diversión.", thumb: "https://static.wixstatic.com/media/859174_2392fed4b52547639e8a7c715c24053b~mv2.jpg", url: "https://ok.ru/videoembed/14047824251392" },
  { id: 8, title: "El diluvio", dur: "43:13", desc: "Noé está muy preocupado por Cam y Tali, ya que todos han visto volar a las aves.", thumb: "https://static.wixstatic.com/media/859174_ccedf26c92af4a2ebb28622d2a3f97e6~mv2.jpg", url: "https://ok.ru/videoembed/14150140692992" },
  { id: 9, title: "En el arca", dur: "43:23", desc: "Noé y su familia permanecen en el arca por cuarenta días y noches.", thumb: "https://static.wixstatic.com/media/859174_2fe22f1a0cc848a0bd2b738564c5677e~mv2.jpg", url: "https://ok.ru/videoembed/14047825103360" },
  { id: 10, title: "El cazador", dur: "44:01", desc: "Después de muchos años, las comunidades vuelven a construirse y en una de ellas hay un gran cazador, Nimrod.", thumb: "https://static.wixstatic.com/media/859174_ce86e737968e44c9bd36e646d83851b8~mv2.jpg", url: "https://ok.ru/videoembed/14047825234432" },
  { id: 11, title: "Una torre", dur: "43:31", desc: "Nimrod tiene una idea: construir una torre, tan alta que todo el mundo pueda verla.", thumb: "https://static.wixstatic.com/media/859174_f4f66373b8f440d9b7a63ce06c75fc22~mv2.jpg", url: "https://ok.ru/videoembed/14047825562112" },
  { id: 12, title: "La construcción", dur: "43:42", desc: "Comienza la construcción de la torre y Nimrod trata de convencer a todos de trabajar muy duro.", thumb: "https://static.wixstatic.com/media/859174_10f2d191f7824755918d684f759dd5d1~mv2.jpg", url: "https://ok.ru/videoembed/14047825758720" },
  { id: 13, title: "Una diosa", dur: "43:40", desc: "Guiada por las fuerzas de la maldad, Semiramis comienza a obtener extraños poderes.", thumb: "https://static.wixstatic.com/media/859174_7922e780a36d48c08cc6545cb2aa269e~mv2.jpg", url: "https://ok.ru/videoembed/14047826020864" },
  { id: 14, title: "Mucho peligro", dur: "43:54", desc: "Nimrod decide alejar a su amada Liba, para evitar que su madre le pueda hacer daño.", thumb: "https://static.wixstatic.com/media/859174_e21ef51160c74d4a8942c3c516f59b21~mv2.jpg", url: "https://ok.ru/videoembed/14047826414080" },
  { id: 15, title: "Babel", dur: "43:14", desc: "Nimrod es hechizado por su madre y él está cansado de la enferma relación que tienen.", thumb: "https://static.wixstatic.com/media/859174_7dacb459702d4d13a4ea6cf4e7cec3e2~mv2.jpg", url: "https://ok.ru/videoembed/14047826610688" },
  { id: 16, title: "Varios lenguajes", dur: "41:57", desc: "Tras la caída de la torre de Babel, las personas crearon diferentes sitios para vivir.", thumb: "https://static.wixstatic.com/media/859174_66158e2f7e384ee48002082e65f05f0c~mv2.jpg", url: "https://ok.ru/videoembed/14047826807296" },
  { id: 17, title: "El negociador", dur: "42:43", desc: "Taré visita al sacerdote real en el templo de Ur y ahí recibe una misión.", thumb: "https://static.wixstatic.com/media/859174_8bc61a7bf93a4016990f95d39558f86d~mv2.jpg", url: "https://ok.ru/videoembed/14150138399232" },
  { id: 18, title: "La misión", dur: "42:57", desc: "Taré va a visitar a un viejo hurán al que tiene que convencer de entregarle sus cabras.", thumb: "https://static.wixstatic.com/media/859174_fe6259ef71b843729b677782cc0d2609~mv2.jpg", url: "https://ok.ru/videoembed/14047827462656" },
  { id: 19, title: "La prueba del queso", dur: "43:24", desc: "Taré ahora tiene que demostrar en el palacio que logró conseguir la receta del ermitaño.", thumb: "https://static.wixstatic.com/media/859174_a66235e1f80c403c890c4721147d8c9a~mv2.jpg", url: "https://ok.ru/videoembed/14047827659264" },
  { id: 20, title: "La caravana", dur: "42:54", desc: "Una nueva prueba le es asignada a Taré: tiene que llevar su primera caravana.", thumb: "https://static.wixstatic.com/media/859174_2dd63647f20d49dbacbf644c0ca802fb~mv2.jpg", url: "https://ok.ru/videoembed/14047828249088" },
  { id: 21, title: "Dificultades", dur: "43:05", desc: "Taré sabe que su tarea no es sencilla y que tendrá que enfrentarse a extraños.", thumb: "https://static.wixstatic.com/media/859174_35b0f74d7cf843e8b65392357aaaf80c~mv2.jpg", url: "https://ok.ru/videoembed/14066036247040" },
  { id: 22, title: "Extraño aliado", dur: "42:57", desc: "Los sacerdotes han enviado a un asesino para que se deshaga de Taré en su misión.", thumb: "https://static.wixstatic.com/media/859174_dcbc50c5bab2441dacfdca8d565b3403~mv2.jpg", url: "https://ok.ru/videoembed/14066242095616" },
  { id: 23, title: "Alta traición", dur: "42:09", desc: "La reina de Ur tiene planes que atentan en contra del Rey, ahora que tendrá nueva esposa.", thumb: "https://static.wixstatic.com/media/859174_b40774fefbb7413083d4999b851867a6~mv2.jpg", url: "https://ok.ru/videoembed/14066390534656" },
  { id: 24, title: "Negociación", dur: "42:39", desc: "Taré logra capturar a uno de los sacerdotes que lo quiere muerto y le dice que tiene que irse.", thumb: "https://static.wixstatic.com/media/859174_e69d267882804bd4a2cb85f3453ec1cf~mv2.jpg", url: "https://ok.ru/videoembed/14066469833216" },
  { id: 25, title: "Seducción", dur: "43:43", desc: "Taré se siente seducido por Nadi y no solo eso, también por el poder y la riqueza.", thumb: "https://static.wixstatic.com/media/859174_909e1717b6e1483c9391d48a2461831f~mv2.jpg", url: "https://ok.ru/videoembed/14066543561216" },
  { id: 26, title: "Enemigos", dur: "43:02", desc: "Los amoritas son los enemigos del reino de Ur que han comenzado a realizar ataques.", thumb: "https://static.wixstatic.com/media/859174_93341eab3ef34cce8e6bae72aff863a5~mv2.jpg", url: "https://ok.ru/videoembed/14066831329792" },
  { id: 27, title: "El dolor", dur: "42:52", desc: "Amat descubre que Taré y Nadi son amantes y él le pide que no revele nada.", thumb: "https://static.wixstatic.com/media/859174_800edbe576aa41b4990f330a94822b82~mv2.jpg", url: "https://ok.ru/videoembed/14066832181760" },
  { id: 28, title: "Caída", dur: "43:04", desc: "Kissare, el sumo sacerdote de Ur cae por las escaleras y tiene lesiones graves.", thumb: "https://static.wixstatic.com/media/859174_5524828b2abb4838b95e214f85a1a8bc~mv2.jpg", url: "https://ok.ru/videoembed/14067043731968" },
  { id: 29, title: "Sin piedad", dur: "42:59", desc: "Morabi, el sacerdote que quiere asesinar a Kissare, no se detiene e intenta quitarle la vida.", thumb: "https://static.wixstatic.com/media/859174_f5bb9fde41594532b402d5b699ef1d4f~mv2.jpg", url: "https://ok.ru/videoembed/14067045501440" },
  { id: 30, title: "Niños perdidos", dur: "43:08", desc: "Abraham y Dnin Sim fueron secuestrados por los amoritas y piensan negociar.", thumb: "https://static.wixstatic.com/media/859174_191d180c9c7e441d9272e79467ac15f4~mv2.jpg", url: "https://ok.ru/videoembed/14067047074304" },
  { id: 31, title: "Mal presagio", dur: "43:04", desc: "El rey de Ur tiene una pesadilla y está seguro que es un mensaje de los dioses.", thumb: "https://static.wixstatic.com/media/859174_718e52de8b9c4f498bdc1465bd0c4e29~mv2.jpg", url: "https://ok.ru/videoembed/14067248531968" },
  { id: 32, title: "Entrega", dur: "42:19", desc: "El rey de Ur y el líder de los amoritas acuerdan hacer el intercambio de sus familiares.", thumb: "https://static.wixstatic.com/media/859174_47ae0a7fda8d42049a840d2db866dacd~mv2.jpg", url: "https://ok.ru/videoembed/14067249515008" },
  { id: 33, title: "Ataque", dur: "42:59", desc: "La ciudad de Ur recibe un ataque sorpresa por parte de los amoritas y muchos mueren.", thumb: "https://static.wixstatic.com/media/859174_0cdbb1aecc55442491a137e97ba414fb~mv2.jpg", url: "https://ok.ru/videoembed/14067250366976" },
  { id: 34, title: "Segunda esposa", dur: "42:47", desc: "Taré se casará con Nadi y oficialmente se convertirá en su segunda esposa.", thumb: "https://static.wixstatic.com/media/859174_c7168a3e57c54c819bbf926f23645b6c~mv2.jpg", url: "https://ok.ru/videoembed/14067690179072" },
  { id: 35, title: "Se acabó", dur: "43:00", desc: "Taré y Nadi discuten, ya que él piensa que su matrimonio ha sido un error.", thumb: "https://static.wixstatic.com/media/859174_79e0ec9105d842d8bb5529060755b1ab~mv2.jpg", url: "https://ok.ru/videoembed/14067691293184" },
  { id: 36, title: "Sospecha", dur: "42:22", desc: "El rey de Ur comienza a sospechar que su mujer lo quiere traicionar.", thumb: "https://static.wixstatic.com/media/859174_cb41d4d6d53e4dcd9b87f24edf506a80~mv2.jpg", url: "https://ok.ru/videoembed/14067692341760" },
  { id: 37, title: "Veneno", dur: "43:08", desc: "El rey de Ur enfrenta a su reina y le demuestra que ella es quien envenenó personas.", thumb: "https://static.wixstatic.com/media/859174_d62e279cf7de43748058692e3c2b46c2~mv2.jpg", url: "https://ok.ru/videoembed/14067881478656" },
  { id: 38, title: "Los juicios", dur: "43:04", desc: "Se llevan a cabo dos juicios, el de la reina de Ur y el de Morabi.", thumb: "https://static.wixstatic.com/media/859174_1c236e99cd6c4a66a1630b5c2cfe7a14~mv2.jpg", url: "https://ok.ru/videoembed/14068537297408" },
  { id: 39, title: "Testigo", dur: "41:46", desc: "El rey de Ur recibe a un testigo clave para poder acusar a su esposa de traición.", thumb: "https://static.wixstatic.com/media/859174_c0ae198909f34adb9a084a5ab4c66c2a~mv2.jpg", url: "https://ok.ru/videoembed/14068537559552" },
  { id: 40, title: "La juventud", dur: "42:53", desc: "Abraham ya es un joven y no cumple las expectativas de su padre Taré.", thumb: "https://static.wixstatic.com/media/859174_f822f043d46e45cbb15d2b52f80bd941~mv2.jpg", url: "https://ok.ru/videoembed/14068537690624" }
];

const GenesisPC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#FF8A00]">
      <Head><title>Génesis — Estudios 421</title></Head>
      <Navbar />

      <div className="relative w-full h-[85vh] overflow-hidden">
        <img src="https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg" className="w-full h-full object-cover" alt="Génesis PC Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
        
        <div className="absolute bottom-10 left-16 flex gap-6 z-10 items-center">
          <button onClick={() => { setSelectedVideo(genesisEpisodes[0].url); setCurrentIdx(0); }} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 shadow-2xl">▶ VER AHORA</button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-sm hover:bg-white/20 transition-all">+ MI LISTA</button>
          <button onClick={() => setShowQR(true)} className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-sm hover:bg-white/20 transition-all">❤ DONAR</button>
        </div>
      </div>

      <div className="px-16 mt-16 mb-32">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-[#FF8A00] pl-4">EPISODIOS DISPONIBLES</h2>
        <div className="grid grid-cols-6 gap-6">
          {genesisEpisodes.map((ep, index) => (
            <div key={ep.id} className="group cursor-pointer" onClick={() => { setSelectedVideo(ep.url); setCurrentIdx(index); }}>
              <div className="relative aspect-video rounded-md overflow-hidden ring-1 ring-white/10 group-hover:ring-[#FF8A00] transition-all">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-[10px] font-bold rounded">{ep.dur}</span>
              </div>
              <h3 className="mt-3 font-bold text-sm truncate group-hover:text-[#FF8A00]">EP. {ep.id} {ep.title}</h3>
              <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{ep.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col">
          <div className="h-16 flex items-center justify-between px-8 bg-black/90">
            <span className="text-[#FF8A00] font-black uppercase">Génesis — EP. {genesisEpisodes[currentIdx].id}</span>
            <button onClick={() => setSelectedVideo(null)} className="text-4xl font-light hover:text-[#FF8A00] transition">&times;</button>
          </div>
          <div className="flex-grow flex flex-col relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="w-full h-full" allow="autoplay; fullscreen" />
            <div className="absolute inset-x-0 bottom-10 flex justify-between px-20 pointer-events-none">
              <button disabled={currentIdx === 0} onClick={() => { setCurrentIdx(currentIdx - 1); setSelectedVideo(genesisEpisodes[currentIdx - 1].url); }} className="pointer-events-auto bg-black/80 hover:bg-[#FF8A00] px-8 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-20">ANTERIOR</button>
              <button onClick={() => setSelectedVideo(null)} className="pointer-events-auto bg-black/80 hover:bg-white hover:text-black px-8 py-3 rounded-full text-sm font-bold transition-all">LISTA</button>
              <button disabled={currentIdx === genesisEpisodes.length - 1} onClick={() => { setCurrentIdx(currentIdx + 1); setSelectedVideo(genesisEpisodes[currentIdx + 1].url); }} className="pointer-events-auto bg-black/80 hover:bg-[#FF8A00] px-8 py-3 rounded-full text-sm font-bold transition-all disabled:opacity-20">SIGUIENTE</button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 p-10 rounded-2xl flex flex-col items-center max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Apoya el proyecto</h3>
            <div className="bg-white p-4 rounded-xl mb-6">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS')}`} alt="QR Donate" />
            </div>
            <button onClick={() => setShowQR(false)} className="bg-[#FF8A00] w-full py-3 rounded-lg font-bold text-black uppercase tracking-widest">Cerrar</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GenesisPC;
