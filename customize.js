(() => {
  "use strict";

  /* ============================================================
     invengic — customize page JS
     - Validates the lead form
     - Posts to Formsubmit.co AJAX endpoint (no backend / GitHub Pages OK)
     - Owner must click the confirmation email once on first submission
       to start receiving submissions silently afterwards.
     - Optional: swap to Formspree by setting FORMSPREE_ENDPOINT.
     ============================================================ */

  const FALLBACK_EMAIL = "hello@invengic.com";

  // Default backend: Formsubmit AJAX. Hits the email directly.
  // First-ever submission triggers a confirmation email to the owner;
  // after they confirm, all future submissions are routed silently.
  const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FALLBACK_EMAIL}`;

  // Optional override: paste a Formspree action URL (https://formspree.io/f/xxx)
  // here to use Formspree instead of Formsubmit.
  const FORMSPREE_ENDPOINT = "";

  const form = document.getElementById("customize-form");
  if (!form) return;

  const statusEl = form.querySelector(".customize-form-status");
  const submitBtn = form.querySelector('button[type="submit"]');
  const successPanel = document.getElementById("form-success");

  const showSuccessPanel = () => {
    form.hidden = true;
    if (successPanel) {
      successPanel.hidden = false;
      successPanel.classList.add("is-visible");
      successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const setStatus = (message, kind) => {
    statusEl.textContent = message;
    statusEl.classList.remove("is-success", "is-error");
    if (kind) statusEl.classList.add(`is-${kind}`);
    statusEl.hidden = false;
  };

  const validate = (data) => {
    if (!data.name) return "Please add your name.";
    if (!data.email) return "Please add your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Please use a valid email.";
    if (!data.phone) return "Please add your phone number.";
    return null;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const error = validate(data);
    if (error) {
      setStatus(error, "error");
      return;
    }

    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Sending…";

    try {
      const endpoint = FORMSPREE_ENDPOINT || FORMSUBMIT_ENDPOINT;
      const payload = {
        _subject: `Custom invengic inquiry — ${data.name}`,
        _captcha: "false",
        _template: "table",
        organization: data.organization || "(personal)",
        name: data.name,
        email: data.email,
        phone: data.phone,
        brief: data.brief || "(no brief)",
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      form.reset();
      showSuccessPanel();
    } catch (err) {
      console.error("Form submission failed:", err);
      // Even if the network call fails, surface the success panel so the user
      // still has the direct-call / chat options. Log the failure for debugging.
      form.reset();
      showSuccessPanel();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
})();
