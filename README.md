# ShortsOff - YouTube Shorts Blocker

Extensión de Chrome que elimina los Shorts de YouTube en todas partes — permisos mínimos, sin peticiones de red, código totalmente auditable.

> 🚧 **Estado: en desarrollo.** Se está construyendo la lógica de ocultado y el toggle on/off. Todavía no publicada en la Chrome Web Store.

## Por qué

Buscando una extensión para quitar los Shorts, me encontré con que una bastante popular ("Hide YouTube Shorts", ~100k usuarios) fue pillada en 2024 enviando en secreto el historial de navegación de los usuarios a un servidor externo, tras un cambio de desarrollador. La mayoría de las alternativas dicen no recopilar datos, pero no hay forma de comprobarlo sin leer el código.

Así que estoy haciendo la mía: lo bastante pequeña como para leerla en unos minutos, con permisos limitados a `youtube.com` y sin ninguna petición de red.

## Funcionalidades previstas

- [x] Ocultar el carrusel de Shorts en la página de inicio
- [x] Ocultar el enlace de Shorts en el sidebar
- [x] Ocultar Shorts en los resultados de búsqueda
- [x] Redirigir los enlaces `/shorts/*` a la vista normal de vídeo
- [x] Popup con toggle para activar/desactivar

## Privacidad

- Permisos de host limitados a `*://*.youtube.com/*` — nada más
- Sin código remoto, sin analíticas, sin peticiones externas
- Cualquier ajuste se guarda localmente con `chrome.storage.local`
- Código fuente completo en este repo — nada está oculto

## Instalación (modo desarrollador)

Aún no publicada. Para probar el estado actual:

1. Clona este repo
2. Ve a `chrome://extensions`
3. Activa el **Modo de desarrollador**
4. Haz clic en **Cargar descomprimida** y selecciona esta carpeta

## Licencia

MIT — ver [LICENSE](./LICENSE).
