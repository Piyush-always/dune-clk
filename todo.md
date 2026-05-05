# invengic — TODO

Living checklist of pending work. Tick items off as they ship.

---

## 🔥 Active: wire "Let's connect" form to Firestore

Goal: replace the current Formsubmit-only flow on `customize.html` with a Firestore-backed lead store. See [customize.js](customize.js) for the existing submission logic.

### Inputs needed from the user (blocking)

- [ ] **Firebase project config object** (from Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration). Looks like:
  ```js
  const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abc123"
  };
  ```
  *(These are safe to expose in client JS — security comes from Firestore rules.)*

- [ ] **Architecture choice:**
  - [ ] **A. Direct browser → Firestore** *(recommended — no backend, works on any static host)*
  - [ ] **B. Browser → Cloud Function → Firestore** *(needs Firebase Blaze plan; better for server-side validation / rate limiting)*

- [ ] **Firestore collection name** — default: `customize_leads`. Each submission becomes one document with: `organization`, `name`, `email`, `phone`, `brief`, `submittedAt` (server timestamp), `source`, `userAgent`, `referrer`.

- [ ] **Firestore security rule deployment method:**
  - [ ] **(a)** Write rule into a repo `firestore.rules` file → deploy via `firebase deploy --only firestore:rules`
  - [ ] **(b)** Just give the snippet to paste into Firebase Console manually

  Rule that will be applied:
  ```
  match /customize_leads/{doc} {
    allow create: if request.resource.data.keys().hasAll(['name','email','phone'])
                  && request.resource.data.email is string
                  && request.resource.data.email.size() < 200
                  && request.resource.data.brief.size() < 5000;
    allow read, update, delete: if false;
  }
  ```

### Decisions needed (have defaults — speak up to override)

- [ ] **Email notifications strategy:**
  - [ ] Drop emails entirely (just check Firestore)
  - [ ] **Keep Formsubmit running in parallel** *(default — zero risk of losing leads while verifying Firestore)*
  - [ ] Email via Firebase "Trigger Email" Extension (cleaner long-term, needs SMTP creds)

- [ ] **Preorder form too?** — `preorder.html` / `preorder.js` exists. Should preorder submissions also land in Firestore?
  - [ ] No — leave preorder as-is
  - [ ] Yes, **same collection** with `source: "preorder-page"` to distinguish
  - [ ] Yes, **separate collection** `preorder_leads`

- [ ] **Spam protection:**
  - [ ] None for now
  - [ ] **Honeypot field** *(default — invisible field that must stay empty; cheap, blocks dumb bots, no UX cost)*
  - [ ] Cloudflare Turnstile / hCaptcha (needs site key)

- [ ] **Firestore index for date sorting?**
  - [ ] Yes — add `submittedAt desc` index in `firestore.indexes.json` so Firebase Console shows newest-first by default
  - [ ] No

### Implementation tasks (kick off once inputs above are answered)

- [ ] Add Firebase JS SDK via CDN (or npm if a build step exists)
- [ ] Initialize Firebase app + Firestore in [customize.js](customize.js)
- [ ] Replace/augment the Formsubmit POST with `addDoc(collection(db, '<collection>'), data)`
- [ ] Add honeypot field to the form in [customize.html](customize.html) (if chosen)
- [ ] Add `firestore.rules` file (if option a)
- [ ] Add `firestore.indexes.json` (if date index chosen)
- [ ] Test: submit a test lead, confirm document appears in Firestore Console
- [ ] Test: submit with missing required fields, confirm rule rejects
- [ ] Test: try reading the collection from browser DevTools, confirm rule blocks
- [ ] Update success-panel UX copy if anything changes

---

## 📦 Content production (waiting on Grok / ChatGPT generation)

See [grok-master-prompt.md](grok-master-prompt.md) and [chatgpt-master-prompt.md](chatgpt-master-prompt.md) for the master prompts. See [content-prompts.md](content-prompts.md) for the asset list.

- [ ] **Hero customize video** — `customize-hero.mp4` (~14s particle-dissolve loop, white-matte ceramic starting state, multi-brand logo carousel ending on Taj)
- [ ] **Hero poster** — `customize-hero-poster.jpg` (final frame still)
- [ ] **7 pillar micro-loops** (3–4s each, 1080×1080, MP4):
  - [ ] `pillar-logo-loop.mp4`
  - [ ] `pillar-body-theme-loop.mp4`
  - [ ] `pillar-glass-engraving-loop.mp4`
  - [ ] `pillar-led-pattern-loop.mp4`
  - [ ] `pillar-dedication-loop.mp4`
  - [ ] `pillar-display-loop.mp4` *(new — custom display content)*
  - [ ] `pillar-packaging-loop.mp4`
- [ ] **Preorder finishing loops** (optional, nice-to-have):
  - [ ] `metallic-loop.mp4`
  - [ ] `wooden-loop.mp4`
  - [ ] `ceramic-loop.mp4`
- [ ] **Use-case stills** (8 environmental shots — see content-prompts.md Section 6)
- [ ] **Open Graph card** — `og-image.png` (1200×630 with typography overlay)

---

## 🎯 Strategic / page restructure

Decision logged: focus on **luxury hospitality** (primary) + **premium corporate gifting** (secondary). De-emphasize cafés, schools, spiritual, events, personal gifting on the customize page.

- [ ] **Finalize "Who it's for" audience list** — currently shows 6 audiences as icon + name only (Hospitality, Retail, Cafés & Restaurants, Corporate Gifting, Personal Gifting, Events & Media). Per the strategic decision (focus on luxury hospitality + premium corporate gifting), revisit whether to (a) trim to 2 cards, (b) keep all 6 but reorder hospitality + corporate first, or (c) keep all 6 as broad signaling. Decide before going to market.
- [ ] Add new pillar: **Per-unit personalization** (D1) — hero pillar for batch buyers (room numbers, recipient names within a single order)
- [ ] Reframe pillar copy with hospitality / corporate framing (e.g., LED patterns → "brand light")
- [ ] Add 7th pillar to grid: **Custom display content**
- [ ] Wire each of the 7 pillar cards to its `<video>` micro-loop once produced
- [ ] Update hero `<video>` to use `customize-hero.mp4` + `customize-hero-poster.jpg` once produced

---

## 🧹 Smaller polish / chores

- [ ] Replace placeholder canonical / og:url / og:image domain (`https://invengic.com/...`) with the real deployed domain across `index.html`, `customize.html`, `preorder.html`
- [ ] Confirm which homepage image is the "white matte clock" reference for the customize hero starting state — likely `ceramic.png` or `product improved.png`
- [ ] Audit that the new image slider on `index.html` (after "Deeply Engineered") feels right with the chosen 5 images, swap any that don't land
- [ ] Verify mobile autoplay works for the new `0505-inv.mp4` and pillar micro-loops on iOS Safari (strict autoplay rules)

---

## ✅ Recently shipped

- ✅ Added `0505-inv.mp4` intro video before "Deeply Engineered" section on homepage
- ✅ Added 4 new features to homepage Features grid: AI, Voice Assistant, Reminders, Alarm
- ✅ Added auto-rotating image slider after "Deeply Engineered" (5 images, 1.5s interval, hover-pause, dot navigation)
- ✅ Created Grok master prompt ([grok-master-prompt.md](grok-master-prompt.md))
- ✅ Created ChatGPT master prompt ([chatgpt-master-prompt.md](chatgpt-master-prompt.md))
