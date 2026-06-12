import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        
        {/* ============================================================ */}
        {/* SOLUCIÓN UNIVERSAL PARA SMART TV - TODAS LAS MARCAS          */}
        /* Samsung Tizen, LG webOS, Hisense VIDAA, Panasonic,          */
        /* Sony, Philips, TCL, Xiaomi, Android TV                      */
        /* ============================================================ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                console.log('[SmartTV] Iniciando control remoto universal');
                
                // 1. Prevenir comportamiento por defecto del TV (scroll, zoom, etc.)
                function preventDefaultBehavior(e) {
                  var key = e.key;
                  var keyCode = e.keyCode;
                  
                  // Lista de teclas del control remoto que debemos capturar
                  var controlKeys = [
                    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
                    'Enter', ' ', 'Space', 'Escape', 'Backspace',
                    'GoBack', 'Back', 'Accept', 'OK'
                  ];
                  
                  // KeyCodes de diferentes fabricantes
                  var controlKeyCodes = [37, 38, 39, 40, 13, 32, 27, 8, 461, 10009, 166];
                  
                  if (controlKeys.indexOf(key) !== -1 || controlKeyCodes.indexOf(keyCode) !== -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                  return true;
                }
                
                // 2. Forzar foco en el elemento principal de la app
                function forceFocusOnApp() {
                  // Buscar el contenedor principal de Next.js
                  var appContainer = document.getElementById('__next');
                  
                  if (appContainer && document.activeElement !== appContainer) {
                    appContainer.setAttribute('tabindex', '0');
                    appContainer.style.outline = 'none';
                    appContainer.focus();
                  }
                  
                  // También buscar cualquier elemento que quiera recibir foco
                  var focusable = document.querySelector('[tabindex="0"]');
                  if (focusable && focusable !== appContainer && document.activeElement !== focusable) {
                    focusable.focus();
                  }
                }
                
                // 3. Capturar teclas a nivel global (esto es lo más importante)
                document.addEventListener('keydown', function(e) {
                  preventDefaultBehavior(e);
                  // Forzar foco después de cada tecla
                  setTimeout(forceFocusOnApp, 10);
                }, true);
                
                document.addEventListener('keyup', preventDefaultBehavior, true);
                
                // 4. Eventos específicos por fabricante
                window.addEventListener('load', function() {
                  // Múltiples intentos para asegurar foco
                  setTimeout(forceFocusOnApp, 100);
                  setTimeout(forceFocusOnApp, 300);
                  setTimeout(forceFocusOnApp, 500);
                  setTimeout(forceFocusOnApp, 1000);
                  
                  // Para LG webOS
                  if (window.webOS) {
                    console.log('[SmartTV] Detectado LG webOS');
                    window.webOS.focus = forceFocusOnApp;
                  }
                  
                  // Para Samsung Tizen
                  if (window.tizen) {
                    console.log('[SmartTV] Detectado Samsung Tizen');
                  }
                  
                  // Para Hisense VIDAA
                  if (window.vidaa) {
                    console.log('[SmartTV] Detectado Hisense VIDAA');
                  }
                });
                
                // 5. Intervalo de seguridad (algunos TVs pierden el foco solos)
                setInterval(forceFocusOnApp, 2000);
                
                // 6. Recuperar foco cuando la ventana recupera atención
                window.addEventListener('focus', forceFocusOnApp);
                window.addEventListener('click', forceFocusOnApp);
                
                // 7. Prevenir scroll del body
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
                document.body.style.height = '100%';
                document.body.style.margin = '0';
                document.body.style.padding = '0';
                
                // 8. Para iframes (como el reproductor de ok.ru)
                var originalAddEventListener = document.addEventListener;
                document.addEventListener = function(type, listener, options) {
                  if (type === 'keydown' || type === 'keyup') {
                    return originalAddEventListener.call(document, type, function(e) {
                      preventDefaultBehavior(e);
                      forceFocusOnApp();
                      return listener(e);
                    }, options);
                  }
                  return originalAddEventListener.call(document, type, listener, options);
                };
                
                console.log('[SmartTV] Control remoto universal activado correctamente');
              })();
            `,
          }}
        />
        
        {/* Estilos globales para Smart TV */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              -webkit-tap-highlight-color: transparent;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              user-select: none;
            }
            body {
              overflow: hidden !important;
              position: fixed !important;
              width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background-color: black;
            }
            #__next {
              height: 100%;
              width: 100%;
              overflow: hidden;
              position: relative;
            }
            :focus {
              outline: none !important;
            }
            iframe {
              pointer-events: auto !important;
            }
          `,
        }} />
      </Head>
      <body className="antialiased bg-black" style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
