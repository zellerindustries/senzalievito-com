export function initHeaderNavigation(): void {
  const menuToggle = document.getElementById(
    "menu-toggle",
  ) as HTMLButtonElement | null;

  const headerNav = document.getElementById("header-nav") as HTMLElement | null;

  const menuOverlay = document.getElementById(
    "menu-overlay",
  ) as HTMLElement | null;

  const menuToggleIcon = menuToggle?.querySelector("i") as HTMLElement | null;

  const navLinks = document.querySelectorAll(
    ".header-nav .btn",
  ) as NodeListOf<HTMLAnchorElement>;

  const sections = document.querySelectorAll(
    "main section",
  ) as NodeListOf<HTMLElement>;

  const closeMenu = (): void => {
    if (!menuToggle || !headerNav) {
      return;
    }

    headerNav.classList.remove("is-active");

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("no-scroll");

    menuOverlay?.classList.remove("is-active");

    menuToggleIcon?.classList.remove("bi-x");
    menuToggleIcon?.classList.add("bi-list");
  };

  const openMenu = (): void => {
    if (!menuToggle || !headerNav) {
      return;
    }

    headerNav.classList.add("is-active");

    menuToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("no-scroll");

    menuOverlay?.classList.add("is-active");

    menuToggleIcon?.classList.remove("bi-list");
    menuToggleIcon?.classList.add("bi-x");
  };

  // Mobile menu
  if (menuToggle && headerNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on overlay click
    menuOverlay?.addEventListener("click", closeMenu);
  }

  // Scroll spy
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${section.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}
