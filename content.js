let isReady = false;
let isEnabled = true;

chrome.storage.local.get({ enabled: true }, (result) => {
  isEnabled = result.enabled;
  isReady = true;
  setShortsHidden(isEnabled);
  if (isEnabled) {
    redirectShortPage();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (!message || message.type !== "enabled") return;

  isEnabled = message.value;
  setShortsHidden(isEnabled);

  if (isEnabled) {
    redirectShortPage();
  }
});

function setShortsHidden(hidden) {
  if (!isReady) return;

  const apply = hidden
    ? (el) => el.style.setProperty("display", "none", "important")
    : (el) => el.style.removeProperty("display");

  // Carrusel de Shorts en la página de inicio.
  document
    .querySelectorAll('ytd-rich-shelf-renderer:has(a[href^="/shorts/"])')
    .forEach(apply);

  // Entrada "Shorts" en el sidebar (puede ser texto, icono o ambos).
  document.querySelectorAll("ytd-guide-entry-renderer").forEach((entry) => {
    if (entry.textContent.includes("Shorts")) {
      apply(entry);
    }
  });

  // Estantes de Shorts en los resultados de búsqueda.
  document.querySelectorAll("grid-shelf-view-model").forEach((entry) => {
    if (entry.textContent.toLowerCase().includes("shorts")) {
      apply(entry);
    }
  });
}

setShortsHidden(isEnabled);

const observer = new MutationObserver(() => setShortsHidden(isEnabled));

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

function redirectShortPage() {
  if (!isReady || !isEnabled) return;

  const isShortPage = location.pathname.startsWith("/shorts/");

  if (isShortPage) {
    const shortId = location.pathname.split("/")[2];
    const destinationUrl = location.origin + "/watch?v=" + shortId;
    location.replace(destinationUrl);
  }
}

document.addEventListener("yt-navigate-start", redirectShortPage);

redirectShortPage();
