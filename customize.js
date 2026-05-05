/* ============================================================
   invengic — customize page JS
   - Validates the lead form
   - Writes the submission to Firestore (collection: customize_leads)
   - Also posts to Formsubmit.co AJAX so emails keep arriving
     (both run in parallel; one failing does not block the other)
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

/* ────────────────────────────────────────────────────────────
   1. CONFIG — paste your Firebase project config here.
   Get it from: Firebase Console → Project Settings → Your apps
   → Web app → SDK setup and configuration.
   These keys are safe to expose in client-side JS. Real security
   comes from firestore.rules (in this repo).
   ──────────────────────────────────────────────────────────── */

const firebaseConfig = {
  apiKey: "AIzaSyDdeg1ihnyyXuqtrECn97Y9nsF2Pyv_fTQ",
  authDomain: "device-6059e.firebaseapp.com",
  projectId: "device-6059e",
  storageBucket: "device-6059e.firebasestorage.app",
  messagingSenderId: "9635170202",
  appId: "1:9635170202:web:f12794439e2c8047109c23",
  measurementId: "G-7QXN7VJCN9"
};

const FIRESTORE_COLLECTION = "customize_leads";

/* ────────────────────────────────────────────────────────────
   2. Formsubmit (kept in parallel — emails stay flowing)
   ──────────────────────────────────────────────────────────── */
const FALLBACK_EMAIL = "clock.invengic@gmail.com";
const CC_EMAIL = "piyushalways7@gmail.com,akhandjyotig@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FALLBACK_EMAIL}`;

/* ────────────────────────────────────────────────────────────
   3. Initialize Firebase (skipped if config is still placeholder)
   ──────────────────────────────────────────────────────────── */
const isConfigured = !Object.values(firebaseConfig).some(
  (v) => typeof v !== "string" || v.startsWith("PASTE_")
);

let db = null;
if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.error("Firebase init failed:", err);
  }
} else {
  console.warn(
    "Firebase config is still a placeholder — leads will only be sent via Formsubmit. " +
      "Update firebaseConfig at the top of customize.js to enable Firestore."
  );
}

/* ────────────────────────────────────────────────────────────
   4. Form wiring
   ──────────────────────────────────────────────────────────── */
const form = document.getElementById("customize-form");
if (form) {
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

  // ── Firestore write
  const sendToFirestore = (data) => {
    if (!db) return Promise.reject(new Error("Firestore not initialized"));
    return addDoc(collection(db, FIRESTORE_COLLECTION), {
      organization: data.organization || "",
      name: data.name,
      email: data.email,
      phone: data.phone,
      brief: data.brief || "",
      source: "customize-page",
      submittedAt: serverTimestamp(),
      userAgent: navigator.userAgent || "",
      referrer: document.referrer || "",
    });
  };

  // ── Formsubmit POST (kept for email notifications)
  const sendToFormsubmit = (data) => {
    const payload = {
      _subject: `Custom invengic inquiry — ${data.name}`,
      _captcha: "false",
      _template: "table",
      _cc: CC_EMAIL,
      organization: data.organization || "(personal)",
      name: data.name,
      email: data.email,
      phone: data.phone,
      brief: data.brief || "(no brief)",
    };
    return fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (!res.ok) throw new Error(`Formsubmit responded ${res.status}`);
      return res;
    });
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

    // Run both in parallel; surface success even if one side fails so the
    // lead still gets through (we'd rather double-store than drop the lead).
    const results = await Promise.allSettled([
      sendToFirestore(data),
      sendToFormsubmit(data),
    ]);

    results.forEach((r, i) => {
      if (r.status === "rejected") {
        const which = i === 0 ? "Firestore" : "Formsubmit";
        console.error(`${which} write failed:`, r.reason);
      }
    });

    // Both failed = real problem; still show success panel so the user
    // gets the WhatsApp fallback, but log loudly.
    const allFailed = results.every((r) => r.status === "rejected");
    if (allFailed) {
      console.error("All submission backends failed — check Firestore rules and network.");
    }

    form.reset();
    showSuccessPanel();
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  });
}
