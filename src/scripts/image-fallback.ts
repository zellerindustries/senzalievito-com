export interface ImageFallbackOptions {
  placeholder?: string;
  logPrefix?: string;
}

export function initImageFallback(options: ImageFallbackOptions = {}): void {
  const PLACEHOLDER = options.placeholder ?? "/assets/placeholder.webp";

  const LOG_PREFIX = options.logPrefix ?? "[img-fallback]";

  document.addEventListener(
    "error",
    (event) => {
      const target = event.target as EventTarget | null;

      if (!(target instanceof HTMLImageElement)) {
        return;
      }

      const img = target;

      // Prevent infinite loop if placeholder also fails
      if (img.dataset.fallbackApplied === "true") {
        console.warn(`${LOG_PREFIX} placeholder also failed`, {
          attemptedSrc: img.src,
        });

        return;
      }

      console.warn(`${LOG_PREFIX} image load error`, {
        originalSrc: img.src,
      });

      img.dataset.fallbackApplied = "true";
      img.src = PLACEHOLDER;

      console.info(`${LOG_PREFIX} fallback applied`, {
        newSrc: PLACEHOLDER,
      });
    },
    true, // capture phase required for resource errors
  );
}
