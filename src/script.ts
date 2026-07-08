import { applyAriaFallback } from "./scripts/accessibility";
import { initFlipBoxes } from "./scripts/flip-cards";
import { initForm } from "./scripts/form";
import { initHeaderNavigation } from "./scripts/header";
import { initImageFallback } from "./scripts/image-fallback";
import { initSmoothScroll } from "./scripts/smooth-scroll";

/* ============================= */
/* ACCESSIBILITY                 */
/* ============================= */

applyAriaFallback();

/* ============================= */
/* UI COMPONENTS                 */
/* ============================= */

initFlipBoxes();
initHeaderNavigation();

/* ============================= */
/* UTILITIES                     */
/* ============================= */

initImageFallback({
  placeholder: "/assets/placeholder.webp",
});

/* ============================= */
/* NAVIGATION                    */
/* ============================= */

initSmoothScroll();

initForm();
