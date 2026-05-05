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

  /* ---------- Lazy-load videos (defer download until in viewport) ---------- */
  const lazyVideos = document.querySelectorAll("video.lazy-video[data-src]");
  if (lazyVideos.length && "IntersectionObserver" in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const v = entry.target;
        if (!v.src) {
          v.src = v.dataset.src;
          v.load();
          const tryPlay = v.play();
          if (tryPlay && typeof tryPlay.catch === "function") tryPlay.catch(() => {});
        }
        vio.unobserve(v);
      });
    }, { rootMargin: "300px 0px" });
    lazyVideos.forEach((v) => vio.observe(v));
  } else {
    // Fallback for old browsers — load immediately
    lazyVideos.forEach((v) => { v.src = v.dataset.src; v.load(); v.play().catch(() => {}); });
  }

  /* ---------- Image sliders (auto-rotate) ---------- */
  document.querySelectorAll(".image-slider").forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll(".image-slider-slide"));
    const dotsHost = slider.querySelector(".image-slider-dots");
    if (slides.length < 2) return;

    const interval = parseInt(slider.dataset.interval, 10) || 1500;
    let index = slides.findIndex((s) => s.classList.contains("is-active"));
    if (index < 0) { index = 0; slides[0].classList.add("is-active"); }

    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "image-slider-dot" + (i === index ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i, true));
      dotsHost?.appendChild(dot);
      return dot;
    });

    let timer = null;
    const goTo = (next, fromUser) => {
      slides[index].classList.remove("is-active");
      dots[index]?.classList.remove("is-active");
      index = (next + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      dots[index]?.classList.add("is-active");
      if (fromUser) restart();
    };

    const tick = () => goTo(index + 1, false);
    const start = () => { timer = window.setInterval(tick, interval); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const restart = () => { stop(); start(); };

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop(); else start();
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
  });
})();
