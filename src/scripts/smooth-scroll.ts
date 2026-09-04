export function initSmoothScroll(): void {
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener(
        "click",
        function (this: HTMLAnchorElement, e: MouseEvent): void {
          const href = this.getAttribute("href");

          if (!href || href === "#") {
            return;
          }

          const target = document.querySelector(href) as HTMLElement | null;

          if (target) {
            e.preventDefault();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      );
    });
}
