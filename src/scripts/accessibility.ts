export function applyAriaFallback(): void {
  const LOG_PREFIX = "[aria-fallback]";

  document
    .querySelectorAll<HTMLAnchorElement>('a[role="button"]')
    .forEach((a) => {
      if (!a.getAttribute("aria-label")) {
        if (!a.getAttribute("aria-label")) {
          const text = a.textContent?.trim();

          if (text) {
            a.setAttribute("aria-label", text);
          }
        }
      }
    });
}
