function hideShortsGuideEntry() {
  const guideEntries = document.querySelectorAll("ytd-guide-entry-renderer");
  const searchGridShelves = document.querySelectorAll("grid-shelf-view-model");

  guideEntries.forEach((entry) => {
    if (entry.textContent.includes("Shorts")) {
      entry.style.setProperty("display", "none", "important");
    }
  });

  searchGridShelves.forEach((entry) => {
    if (entry.textContent.toLowerCase().includes("shorts")) {
      entry.style.setProperty("display", "none", "important");
    }
  });
}

// Oculta las entradas y secciones de Shorts que ya existen en la página.
hideShortsGuideEntry();

// YouTube añade contenido dinámicamente porque funciona como una SPA.
const observer = new MutationObserver(hideShortsGuideEntry);

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

// Redirecciona del formato short con scroll al visualizer de video normal.
function redirectShortPage() {
  const isShortPage = location.pathname.startsWith("/shorts/");

  if (isShortPage) {
    const shortId = location.pathname.split("/")[2];
    const destinationUrl = location.origin + "/watch?v=" + shortId;
    location.replace(destinationUrl);
  }
}

document.addEventListener("yt-navigate-start", redirectShortPage);

redirectShortPage();
