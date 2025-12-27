import "@/styles/globals.css";
import type { AppProps } from "next/app";
// Importación de los estilos base para que el Banner funcione
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}