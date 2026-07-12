/**
 * Inizializza il comportamento del click destro.
 * La GIF appare istantaneamente affianco al mouse senza sfarfallare in alto a sinistra.
 */
export function initRightClickGif(): () => void {
  // CONFIGURAZIONE FISSA
  const GIF_PATH = "assets/bat.gif";
  const DURATION = 10000;
  const OFFSET = 5;

  let gifTimeout: ReturnType<typeof setTimeout> | null = null;
  let isGifActive = false;

  // 1. Iniezione stili CSS (usiamo opacity e visibility al posto di display: none)
  const styleId = "custom-right-click-gif-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .custom-gif-pointer-hidden {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        z-index: 99999999 !important;

        /* Rimane nel DOM ma invisibile e intangibile */
        display: block !important;
        visibility: hidden;
        opacity: 0;
        will-change: transform;
        transition: opacity 0.15s ease, visibility 0.15s ease;

        width: 80px !important;
        height: auto !important;

        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
      }

      .custom-gif-pointer-active {
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Creazione dell'elemento IMG
  const gifElement = document.createElement("img");
  gifElement.src = GIF_PATH;
  gifElement.className = "custom-gif-pointer-hidden";
  gifElement.alt = "Right click animation";

  gifElement.style.filter = "contrast(1.4) brightness(1.1)";
  gifElement.style.mixBlendMode = "multiply";

  document.body.appendChild(gifElement);

  let mouseX = 0;
  let mouseY = 0;

  const updateGifPosition = () => {
    gifElement.style.transform = `translate3d(${mouseX + OFFSET}px, ${mouseY + OFFSET}px, 0)`;
  };

  const handleMouseMove = (event: MouseEvent): void => {
    if (!isGifActive) return;
    mouseX = event.clientX;
    mouseY = event.clientY;
    requestAnimationFrame(updateGifPosition);
  };

  const handleContextMenu = (event: MouseEvent): void => {
    event.preventDefault();

    mouseX = event.clientX;
    mouseY = event.clientY;

    // 1. Posizioniamo la GIF *mentre è ancora invisibile*
    updateGifPosition();

    // 2. Solo adesso la rendiamo visibile (evita il salto dall'angolo 0,0)
    if (!gifElement.classList.contains("custom-gif-pointer-active")) {
      gifElement.classList.add("custom-gif-pointer-active");
    } else {
      const currentSrc = gifElement.src.split("?")[0];
      gifElement.src = `${currentSrc}?t=${Date.now()}`;
    }

    isGifActive = true;
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    if (gifTimeout) {
      clearTimeout(gifTimeout);
    }

    gifTimeout = setTimeout((): void => {
      gifElement.classList.remove("custom-gif-pointer-active");
      isGifActive = false;
      document.removeEventListener("mousemove", handleMouseMove);
    }, DURATION);
  };

  document.addEventListener("contextmenu", handleContextMenu);

  return () => {
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("mousemove", handleMouseMove);
    if (gifTimeout) clearTimeout(gifTimeout);
    gifElement.remove();
  };
}
