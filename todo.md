# invengic — TODO

Living checklist of pending work. Tick items off as they ship.

---

## 🔥 Active: wire "Let's connect" form to Firestore

**Decisions locked:** direct browser → Firestore (option A) · keep Formsubmit running in parallel · customize page only (preorder skipped for now) · no spam protection for v1 · collection name `customize_leads` · `firestore.rules` written to repo · date-sort index included.

**Code scaffolding shipped** ✅ — all that's left is for you to do 3 things below.

### ⚠️ Remaining steps for you (5 min)

- [ ] **Step 1 — paste your Firebase config.** Open [customize.js](customize.js), find the `firebaseConfig = {...}` block at the top, and replace the 6 `PASTE_*` placeholders with the values from Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration. Until you do this, the form falls back to Formsubmit-only and a console warning fires.
- [ ] **Step 2 — deploy the Firestore rules.** From the repo root run:
  ```
  firebase login                 # if not already logged in
  firebase use --add             # pick your project
  firebase deploy --only firestore:rules,firestore:indexes
  ```
  This applies [firestore.rules](firestore.rules) (allow public create with strict validation, deny everything else) and creates the `submittedAt desc` index from [firestore.indexes.json](firestore.indexes.json) so the Firebase Console shows newest leads first.
- [ ] **Step 3 — verify end-to-end.** Open `customize.html` in a browser → submit a test lead. Then open Firebase Console → Firestore → `customize_leads` and confirm the document appeared with all fields. Also check your `hello@invengic.com` inbox to confirm Formsubmit still emails (the parallel path).

### What got built

- [customize.js](customize.js) — converted to ES module. Imports Firebase Web SDK v10 from gstatic CDN. Writes to Firestore + Formsubmit in parallel via `Promise.allSettled` so one failing doesn't block the other. Each document includes `name`, `email`, `phone`, `organization`, `brief`, `source: "customize-page"`, `submittedAt` (server timestamp), `userAgent`, `referrer`.
- [customize.html](customize.html#L328) — `<script>` tag changed to `type="module"`.
- [firestore.rules](firestore.rules) — public-create with field validation (required keys, type checks, size limits, email regex, source pinned to "customize-page"); read/update/delete blocked from client.
- [firestore.indexes.json](firestore.indexes.json) — descending index on `submittedAt`.
- [firebase.json](firebase.json) — wires the rules and indexes to `firebase deploy`.

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
