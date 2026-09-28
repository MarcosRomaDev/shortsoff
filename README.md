# ShortsOff - YouTube Shorts Blocker

Extensión de Chrome que elimina los Shorts de YouTube en todas partes — permisos mínimos, sin peticiones de red, código totalmente auditable.

> ✅ **Estado: listo para revisión.** Funcionalidad completa (ocultado, redirección, popup con toggle). Pendiente solo publicar en Chrome Web Store.

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

## Limitaciones conocidas

- **Selectores de YouTube**: la extensión depende de la estructura actual del DOM de YouTube. Si YouTube cambia sus selectores o atributos, hay que actualizarlos manualmente en `content.js`. Los puntos clave están comentados en el código.
- **Almacenamiento local**: el estado del toggle se guarda en `chrome.storage.local`, que **no se sincroniza** entre dispositivos ni perfiles de Chrome. Para sincronizar habría que cambiar a `chrome.storage.sync`, que tiene límites más bajos de cuota.
- **Primera carga con toggle en OFF**: si instalas la extensión, apagas el toggle y recargas una pestaña abierta de YouTube, los Shorts se mostrarán brevemente hasta que el `MutationObserver` complete la primera pasada. Imperceptible en la práctica.
- **Sin service worker**: la extensión no tiene background script. Si YouTube bloquea las pestañas inactivas agresivamente (lo que puede pasar en pestañas en segundo plano), los listeners de mensajes pueden tardar más en responder.

## Procedimiento de prueba manual

Lista reproducible de casos a probar tras cualquier cambio:

1. Cargar la extensión desde `chrome://extensions` (modo desarrollador).
2. Abrir `youtube.com/shorts/<id>` con el toggle en ON → debe redirigir a `/watch?v=<id>`.
3. Abrir `youtube.com/shorts/<id>` con el toggle en OFF → debe quedarse en formato Short.
4. Con toggle OFF, abrir Short y luego activar el toggle → debe redirigir al reproductor normal.
5. Click en un Short desde la portada → debe redirigir.
6. Click en un Short desde resultados de búsqueda → debe redirigir.
7. Botón "Atrás" tras una redirección desde Short → debe volver a la página anterior, no al Short.
8. Cerrar Chrome, reabrir, abrir popup → el estado del switch debe persistir.
9. Recarga completa (F5) de cualquier página de YouTube → el comportamiento del toggle se mantiene.
10. Apagar el toggle: los Shorts visibles desaparecen en menos de un segundo; encenderlo: vuelven a aparecer.
