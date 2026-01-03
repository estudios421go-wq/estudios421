import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../../components/tv/Navbar';
import Footer from '../../components/Footer';

// BASE DE DATOS DE EPISODIOS
const genesisEpisodes = [
  {
    id: 1,
    num: 1,
    title: "El edén",
    desc: "Esta es la historia de como todo fue creado por Dios y el inicio de la humanidad con Adán y Eva, el primer hombre y mujer en la tierra. Dios les entrega el...",
    dur: "43:16",
    seconds: 2596,
    thumb: "https://static.wixstatic.com/media/859174_34318cd5b639416e9f54aac740e60a84~mv2.jpg",
    url: "https://ok.ru/videoembed/13888818973184"
  },
  {
    id: 2,
    num: 2,
    title: "Las consecuencias",
    desc: "Adán y Eva tienen que vivir las consecuencias de haber comido el fruto prohibido. Fueron expulsados del paraíso y ahora deben de buscar comida y...",
    dur: "43:09",
    seconds: 2589,
    thumb: "https://static.wixstatic.com/media/859174_40d433337bf542d68b9965dccb4f0ecd~mv2.jpg",
    url: "https://ok.ru/videoembed/13888837454336"
  },
  {
    id: 3,
    num: 3,
    title: "Hermanos",
    desc: "Caín y Abel son los hijos de Adán y Eva y ambos tratan de sobrevivir, pero son muy distintos: Abel es noble y trata de agradecer todo lo que tiene,...",
    dur: "00:42:59",
    seconds: 2579,
    thumb: "https://static.wixstatic.com/media/859174_244fa62379ba4682a6cc03815f3891f6~mv2.jpg",
    url: "https://ok.ru/videoembed/13888884902400"
  },
  {
    id: 4,
    num: 4,
    title: "¿Por qué me persigues?",
    desc: "Caín y Abel logran llamar la atención de Dios, pero Caín está seguro que solo respondió a los regalos de Abel, por lo cual se pone celoso y decide matar a s...",
    dur: "00:43:00",
    seconds: 2580,
    thumb: "https://static.wixstatic.com/media/859174_461f6b43b4a7488fb1eca919f954f145~mv2.jpg",
    url: "https://ok.ru/videoembed/13888885230080"
  }
];

const seriesInfo = {
  title: "Génesis",
  poster: "https://static.wixstatic.com/media/859174_264be00ba6d14e699767e79c49297e5c~mv2.jpg",
  donateLink: "https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS"
};

export default function GenesisPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <h1 className="pt-24 px-8 text-4xl font-bold">{seriesInfo.title}</h1>
            <p className="px-8 text-gray-400">Cargando base de datos de episodios...</p>
            <Footer />
        </div>
    );
}
