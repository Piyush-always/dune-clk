/* invengic — minimal vanilla JS
   - Reveal-on-scroll via IntersectionObserver (one-shot)
   - Navbar background swap once user scrolls
   - Mobile menu toggle
   - Stagger reveal for grouped reveal items inside the same parent
*/

(() => {
  "use strict";

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  // Apply stagger delay to siblings within the same parent
  const groups = new Map();
  revealEls.forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    const arr = groups.get(parent) || [];
    arr.push(el);
    groups.set(parent, arr);
  });
  groups.forEach((arr) => {
    if (arr.length < 2) return;
    arr.forEach((el, i) => {
      if (i > 0 && !el.dataset.delay) el.dataset.delay = String(Math.min(i, 5));
    });
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("menu-toggle");
  const panel = document.getElementById("mobile-panel");
  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const open = !panel.classList.contains("hidden");
      panel.classList.toggle("hidden", open);
      toggle.setAttribute("aria-expanded", String(!open));
    });
    panel.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        panel.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }
})();
