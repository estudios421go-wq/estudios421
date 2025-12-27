import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head"; // Importamos Head para las etiquetas meta
// Importación de los estilos base para que el Banner funcione
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Esta línea es la que soluciona el problema del tamaño en móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}