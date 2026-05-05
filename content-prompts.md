# invengic — Content Prompt Brief

A single master document for generating the 29 missing visual assets. Built so you can:
- Paste **Section 1** once into your ChatGPT project's custom instructions (or Grok system prompt) → every output inherits the look.
- Walk through **Sections 2–6** in order → each block is standalone and copy-paste ready.
- Drop the resulting files into `assets/` with the exact filenames listed → the site picks them up with no rewiring.

---

## How to use this brief

1. Create a new ChatGPT project ("invengic visuals"). In the project settings, paste **Section 1 — Style System** as the custom instructions.
2. For each image: open a chat in that project, paste the prompt block from Section 2 / 3 / 4. Generate. Re-roll only if it drifts from the style. Save with the exact filename listed.
3. For videos: use Grok. Paste the same Section 1 style at the top of the chat, then the prompt block from Section 5.
4. Drop everything into `c:\Users\Lenovo\component\dune-watch\assets\` using the filenames in this doc.
5. Ping me when a batch is ready → I rewire the site in minutes (filenames are pre-aligned with the code).

> **Consistency tip:** Generate the **first metallic Classic shot** first, treat it as your "reference frame," and tell ChatGPT to match camera angle, lighting, and frame fill exactly for every subsequent prompt. Even with the style system in place, image-gen models drift — anchoring to one image keeps drift small.

---

## SECTION 1 — Style system (paste into ChatGPT project's custom instructions)

```
You are generating product photography for invengic — a desktop clock made from
multiple layers of optical-grade TRANSPARENT acrylic stacked vertically with precise
millimeter spacing. Each layer has a single engraved digit. A focused warm LED
illuminates only ONE layer at a time, so the lit digit appears to float in physical
depth inside the clear stack. Time displayed: always 10:24 unless otherwise asked.

CONSISTENT VISUAL LANGUAGE FOR EVERY IMAGE:

Subject framing:
- Centered, occupying ~75–80% of the frame
- Three-quarter front view (slight side angle so the depth of the acrylic layers
  is visible) unless prompt asks otherwise
- Camera at clock's mid-height, slight downward tilt (~5°)

Background:
- Soft off-white seamless (#f8f7f4) OR transparent PNG (preferred for product shots)
- No props, no clutter, no surface texture
- A faint, soft contact shadow directly under the clock for grounding

Lighting:
- Soft directional key from upper-left, ~45° elevation
- Gentle ambient fill on the right
- The internal LED glow is WARM (~3000K, color #FFB776), only one digit lit
- Highlights should be diffused, not specular; no harsh reflections

Material rendering — pick from one of three finishings per shot:
1. METALLIC chassis — brushed satin aluminum, cool neutral grey (#a9aaa8), soft
   non-mirror sheen, very subtle anodized texture. No glossy highlights.
2. WOODEN chassis — solid walnut grain, matte natural finish, warm brown
   (#7b5837 → #d8b487), visible grain pattern, soft edges.
3. CERAMIC chassis — matte off-white ceramic (#f8f5f0 → #c9c0b1), soft chalky
   surface like unglazed bisque or fine porcelain, warm cream undertone, NO gloss.

Acrylic layers (always present, regardless of chassis):
- Optical-grade clear acrylic, polished edges, ~6 stacked plates visible
- Only one layer lit (digit visible only on that plate)
- Other layers fully transparent — read as ghost lines, not opaque

Mood:
- Quiet, considered, premium
- Reference: Apple product photography meets Teenage Engineering, with the warmth
  of a Brian Eno album cover

NEVER include:
- Stock-photo cliches (hands holding it, smiling people)
- Lens flares, light streaks, sparkles
- Gradient or colored backgrounds
- Neon LED colors outside the warm 3000K palette
- Cluttered surfaces, plants, mugs, books unless the brief explicitly asks
- Logos other than "invengic" wordmark when shown
- Pixel art, illustration style, or any non-photoreal rendering

Output should look like a still from a high-end product film, not a product render
or an AI generation.
```

---

## SECTION 2 — Pre-order product stills (9 images)

These power the finishing-swap UI on `preorder.html`. Filenames here match what `preorder.js → finishingImages` will be rewired to once they land. Same camera angle, same framing, same time across all 9 — only the chassis and the digits' resting state changes between models.

> **Generate `classic-metallic.png` FIRST**, treat its output as the reference frame. Every subsequent prompt should add: *"Match camera angle, framing, lighting direction, and shadow exactly to the previous classic-metallic shot."*

---

### 2.1 — `classic-metallic.png`
- **Where it lives:** Pre-order page, image stage when Classic + Metallic selected
- **Dimensions:** 1600 × 1600 px, square, transparent PNG (or `#f8f7f4` background)
- **Prompt:**
```
Product photo of an invengic desktop clock, three-quarter front view, centered,
75% frame fill, clean off-white seamless background.

Chassis: METALLIC — brushed satin aluminum, cool neutral grey, anodized,
non-glossy. The chassis is a slim horizontal frame holding a stack of ~6
optical-grade transparent acrylic plates.

Acrylic stack: only one plate is lit, showing the digits "10:24" in warm
3000K glow. The remaining plates are fully transparent so the lit digits
appear suspended in physical depth.

Lighting: soft directional key from upper-left, gentle ambient fill, faint
contact shadow under the clock.

Style: editorial product photography, premium, quiet, minimal — Apple meets
Teenage Engineering. Sharp focus, no lens flare, no clutter, no hands.
```
- **Negative:** people, hands, gradients, neon colors, glossy reflections, props, plants

---

### 2.2 — `classic-wooden.png`
- **Where it lives:** Pre-order page, Classic + Wooden
- **Dimensions:** same as 2.1
- **Prompt:**
```
[Same setup as classic-metallic.png — match camera angle, framing, lighting,
shadow exactly.]

Chassis: WOODEN — solid walnut frame with visible grain, matte natural
finish, warm brown tones (#7b5837 base, #d8b487 highlights). The acrylic
layer stack and the lit "10:24" in warm 3000K glow are unchanged.

Match exact pose and frame to the metallic reference shot.
```
- **Negative:** glossy lacquer wood, painted wood, fake plastic-wood look

---

### 2.3 — `classic-ceramic.png`
- **Where it lives:** Pre-order page, Classic + Ceramic
- **Dimensions:** same as 2.1
- **Prompt:**
```
[Same setup as classic-metallic.png — match camera angle, framing, lighting,
shadow exactly.]

Chassis: CERAMIC MATTE — chalky off-white ceramic body like unglazed bisque
or fine matte porcelain. Color #f8f5f0 to #c9c0b1, NO glossy highlights, no
shine. Subtle warm cream undertone. The acrylic layer stack and the lit
"10:24" in warm 3000K glow are unchanged.

Match exact pose and frame to the metallic reference shot.
```
- **Negative:** glossy ceramic, glazed porcelain, plastic-looking, pure stark white

---

### 2.4 — `pro-metallic.png`
- **Where it lives:** Pre-order page, Pro + Metallic
- **Dimensions:** same as 2.1
- **Prompt:**
```
[Identical to classic-metallic.png in chassis, framing, lighting.]

This is the PRO model — visually nearly identical to Classic, with one subtle
addition: a small embossed "PRO" wordmark in 6pt, etched into the lower-right
corner of the metal chassis (same color as chassis, only visible on close
inspection — does not break the minimal aesthetic).

Match camera angle, framing, lighting, and time (10:24) exactly to
classic-metallic.png.
```
- **Negative:** loud Pro badge, sticker, prominent label, color contrast on the wordmark

> **Note:** Classic / Pro / Ultra are physically near-identical. If you'd rather just have 3 distinct shots (one per finishing) and use them across all three models, skip prompts 2.4–2.9 — the codebase only needs 3.

---

### 2.5 — `pro-wooden.png`
- **Prompt:** *Same as 2.4, swap chassis to walnut wood per 2.2 spec. Engraved "PRO" wordmark on the wood instead of metal.*

### 2.6 — `pro-ceramic.png`
- **Prompt:** *Same as 2.4, swap chassis to ceramic matte per 2.3 spec. Engraved "PRO" wordmark on the ceramic.*

### 2.7 — `ultra-metallic.png`
- **Prompt:** *Same as 2.4, but the wordmark reads "ULTRA" and there's a tiny voice-mic dot indicator engraved next to it (signaling the voice-assistance feature). Otherwise identical.*

### 2.8 — `ultra-wooden.png`
- **Prompt:** *Same as 2.7, walnut chassis per 2.2.*

### 2.9 — `ultra-ceramic.png`
- **Prompt:** *Same as 2.7, ceramic chassis per 2.3.*

---

## SECTION 3 — Pre-order finishing loop videos (3 videos)

Short ambient loops that show the layered light effect. Will replace or supplement the static images on the pre-order image stage when `metalic-loop.mp4` etc. become available.

---

### 3.1 — `metallic-loop.mp4`
- **Where it lives:** Pre-order page, image stage on Metallic finishing
- **Specs:** 1080 × 1080 (square), 8 seconds, seamless loop, MP4 H.264, no audio, < 4 MB
- **Reference still:** anchor to `classic-metallic.png` for camera angle and lighting
- **Grok prompt:**
```
8-second seamless loop video of an invengic desktop clock with a metallic
brushed-aluminum chassis. Camera locked-off, three-quarter front view,
identical framing to a still product photo of the same clock.

Action: the warm 3000K LED inside the layered acrylic stack drifts smoothly
between layers — first illuminating the front-most plate showing "10:24",
then 2 seconds later transferring the glow to a deeper plate (subtle parallax
effect as the digits appear to float backward), then forward again. Loop
seamlessly back to the start.

Tone: meditative, quiet, slow. No music. No hard cuts. No camera movement.
Background: clean off-white seamless. Soft contact shadow stays static under
the clock.

Style: editorial product film, premium, minimalist. Reference Apple's
on-product films and Aesop's product loops.
```
- **Negative cues:** zooming/panning camera, music, text overlays, fast cuts, color shifts

---

### 3.2 — `wooden-loop.mp4`
- **Specs:** same as 3.1
- **Reference still:** `classic-wooden.png`
- **Prompt:** *Same as 3.1, swap chassis to walnut-wood per Section 1 spec. Match camera and pacing exactly to metallic-loop.*

### 3.3 — `ceramic-loop.mp4`
- **Specs:** same as 3.1
- **Reference still:** `classic-ceramic.png`
- **Prompt:** *Same as 3.1, swap chassis to ceramic-matte per Section 1 spec. Match camera and pacing exactly.*

---

## SECTION 4 — Customize page imagery

### 4.1 — `customize-all-options.png`
- **Where it lives:** Customize page hero collage center tile
- **Dimensions:** 1600 × 1200 px, 4:3, transparent or `#f8f7f4` background
- **Prompt:**
```
Hero composite product photo of an invengic desktop clock featuring ALL six
customization options visible at once:

1. LOGO ENGRAVING — a wordmark "ACME" laser-engraved into one of the front
   acrylic layers, glowing softly with warm 3000K light
2. BODY THEME — chassis is a custom matte navy-blue, slightly textured
3. GLASS PANEL ENGRAVING — fine geometric pattern (subtle dots, not loud)
   etched into a middle layer
4. LED PATTERN — main digits "10:24" lit in warm 3000K, but with a faint
   secondary cool accent on a deeper layer for depth
5. PERSONAL DEDICATION — a tiny script-engraved line "for emma — 12.04.26"
   on the bottom-most acrylic plate, only readable on close inspection
6. CO-BRANDED PACKAGING — a slim matte-paper gift box (closed, embossed
   "ACME" on the lid) sits behind and to the right of the clock, slightly
   out of focus

Composition: clock centered, packaging slightly off to the right, soft
seamless off-white backdrop. Camera three-quarter front view.

Style: rich editorial product photo, premium, considered. Apple meets
Teenage Engineering.
```
- **Negative:** loud branding, multiple competing logos, toy-like appearance

---

### 4.2 — `pillar-logo-engraving.png`
- **Where it lives:** Customize page, pillar 01
- **Dimensions:** 1200 × 900 px, 4:3
- **Prompt:**
```
Macro close-up product photo focused on the front-most acrylic plate of an
invengic clock. A clean wordmark "ACME" is laser-engraved into the plate,
illuminated by the warm 3000K LED so the wordmark glows from within the
clear acrylic — looks like ghost-print until lit, then floats in depth.

Background: out-of-focus chassis hint at the edges, otherwise off-white
seamless. Shallow depth of field — the engraved logo is the hero.

Style: macro editorial, premium, quiet. Show the depth of the acrylic so
the logo clearly reads as engraved INSIDE a clear material, not printed on top.
```

---

### 4.3 — `pillar-body-theme.png`
- **Where it lives:** Customize page, pillar 02
- **Dimensions:** 1200 × 900 px, 4:3
- **Prompt:**
```
Three invengic clocks placed side-by-side in a single shot, showing the
three body theme options:
- Left: brushed metallic aluminum chassis
- Center: walnut wooden chassis with visible grain
- Right: matte ceramic off-white chassis

All three units identical otherwise — same acrylic stack, all displaying
"10:24" in warm 3000K glow. Equal spacing, identical lighting on all three.
Off-white seamless background. Soft contact shadows for grounding.

Style: hero comparison shot, editorial, calm.
```

---

### 4.4 — `pillar-glass-engraving.png`
- **Where it lives:** Customize page, pillar 03
- **Dimensions:** 1200 × 900 px, 4:3
- **Prompt:**
```
Macro close-up of a single transparent acrylic layer pulled slightly out of
the invengic stack (or shown as a hero detail). The plate has a delicate
laser-etched pattern across its full surface — subtle geometric repeats
(dots, hairlines, or a brand monogram pattern). When lit, the pattern
catches the warm 3000K glow and floats in depth.

Background: the rest of the clock is softly out of focus behind the hero
plate. Off-white seamless backdrop.

Style: macro product, premium materials, quiet detail.
```

---

### 4.5 — `pillar-led-patterns.mp4`
- **Where it lives:** Customize page, pillar 04 (the only pillar with motion)
- **Specs:** 1080 × 1080, 6 seconds, seamless loop, MP4, no audio, < 3 MB
- **Reference still:** `classic-metallic.png`
- **Grok prompt:**
```
6-second seamless loop video. Locked-off camera, three-quarter front view of
an invengic clock with metallic chassis.

The LED inside the acrylic stack cycles through 4 brand-color tunings:
- Seconds 0–1.5: warm orange (#FFB776) — the default invengic glow
- Seconds 1.5–3: deep emerald green
- Seconds 3–4.5: soft indigo
- Seconds 4.5–6: warm orange again (loop seamlessly)

Color transitions are smooth fades, not hard switches. The displayed time
"10:24" never changes. The chassis and acrylic stack are static — only the
LED color shifts.

No camera movement. No music. Background: off-white seamless. Premium,
restrained, hypnotic.
```

---

### 4.6 — `pillar-personal-dedication.png`
- **Where it lives:** Customize page, pillar 05
- **Dimensions:** 1200 × 900 px, 4:3
- **Prompt:**
```
Macro close-up of an invengic clock's bottom acrylic plate. A delicate
script-engraved line reads "Happy 30th, Sarah — 14.06.26" — engraved INTO
the clear acrylic, lit faintly from the side so the script catches a soft
warm glow.

Above it, the main digits "10:24" are lit in their usual warm 3000K. The
shot frames the dedication as a quiet, intimate detail beneath the time.

Background: out-of-focus chassis (any finishing — pick walnut wooden for
warmth). Soft seamless off-white surroundings.

Style: gift photography, sentimental but not saccharine, editorial.
```

---

### 4.7 — `pillar-packaging.png`
- **Where it lives:** Customize page, pillar 06
- **Dimensions:** 1200 × 900 px, 4:3
- **Prompt:**
```
A premium matte-paper gift box, slightly opened, revealing an invengic clock
nestled inside on a soft cream foam-core insert. The lid is partially lifted
and tilted at an angle, embossed with a subtle wordmark "ACME" (deboss only,
no ink). Box color: warm off-white matte paper, no glossy lamination.

Camera: three-quarter overhead, similar to high-end electronics unboxing
shots (think Apple, Leica). Soft natural lighting from upper left. Background:
clean off-white surface, no clutter.

Mood: presentation-grade, gift-worthy, quietly luxurious.
```

---

## SECTION 5 — Customize page hero video

### 5.1 — `customize-hero.mp4`
- **Where it lives:** Customize page hero (replacing or augmenting the 3-tile collage)
- **Specs:** 1920 × 1080 (16:9), 25–35 seconds, MP4 H.264, no audio (or muted ambient), < 8 MB
- **Reference frame:** `customize-all-options.png` for material rendering, mood
- **Grok prompt:**
```
30-second cinematic product film for invengic — a custom-built layered
acrylic LED desk clock for brands and gifting.

Sequence (6 cuts, ~5 sec each, smooth crossfades):

1. SLOW PUSH-IN on a metallic invengic clock against off-white seamless,
   the LED glow gradually intensifying from black to warm 3000K, displaying
   "10:24". Quiet, considered.

2. MACRO of a CO2 laser engraving a wordmark "ACME" into a single acrylic
   plate (in a workshop setting — clean, well-lit, minimal). Visible smoke
   curl, precise beam.

3. PULL-BACK from a wooden-chassis invengic in a hotel-room context (soft
   bedside lighting, untouched setup, the clock as the hero of the frame).

4. TOP-DOWN on a matte gift box being opened slowly by gloved hands, the
   ceramic invengic revealed inside on cream foam.

5. LED PATTERN CYCLE — close-up of the acrylic stack as the LED color
   shifts through warm orange → emerald → indigo → warm orange (matching
   pillar-led-patterns.mp4 color logic).

6. WIDE final frame: three invengic clocks in a row (metallic, wooden,
   ceramic), all lit, against off-white seamless. Slow gentle dolly-back.
   Title card fades in: "Made for you. Made for your brand." in serif
   wordmark, bottom-left, then fade out.

Style: A24 product film, Apple's product launch films, Aesop. Color-graded
warm and clean. No music; if any, very minimal ambient drone. No voiceover.
No fast cuts.
```
- **Negative cues:** stock-music swells, voiceover, fast cuts, lens flare, hand-holding the product, smiling models

---

## SECTION 6 — Use-case grid (8 images, optional but recommended)

These show invengic in real-world contexts. Less product-focused, more environmental. Background can be richer here — these are NOT product shots, they're brand mood.

> Style guide for this section: looser than product shots. Real or render-quality interiors. Clock is the hero but not 75% of the frame — it's an object in a space.

---

### 6.1 — `usecase-hospitality.png`
- **Dimensions:** 1600 × 1200, 4:3
- **Prompt:**
```
A wooden-chassis invengic clock on a hotel-room nightstand, soft bedside
lamp glow, warm linen sheets faintly visible behind, neutral palette.
Time: 10:24 in warm 3000K. Photographed at low evening light, premium
boutique hotel mood. Editorial, calm.
```

### 6.2 — `usecase-corporate-gifting.png`
- **Prompt:**
```
A metallic invengic clock on a desk in a modern corporate office, soft
daylight from a window, a closed gift box (matte paper, embossed wordmark)
beside it, a fountain pen. Composed but lived-in. Premium gifting mood.
```

### 6.3 — `usecase-retail.png`
- **Prompt:**
```
A ceramic invengic clock on a minimal retail counter (walnut shelf,
off-white wall behind), softly co-branded with a wordmark "ACME" engraved
on the front plate. Mid-day natural light. Aesop-style retail
photography.
```

### 6.4 — `usecase-cafe.png`
- **Prompt:**
```
A wooden invengic clock mounted on a clean stone wall behind a café
counter. Warm afternoon light, espresso machine softly out of focus in
the foreground. Quiet, considered café aesthetic. The clock reads 10:24
in warm 3000K.
```

### 6.5 — `usecase-events.png`
- **Prompt:**
```
A metallic invengic clock as a speaker gift on a podium at a tech
conference, soft stage lighting, a name card "for: Naoto" beside it.
Premium event photography mood.
```

### 6.6 — `usecase-agencies.png`
- **Prompt:**
```
A ceramic invengic clock on the desk of a creative agency studio, surrounded
by mood boards, swatches, a desktop monitor showing brand work. Daytime
natural light, productive but uncluttered.
```

### 6.7 — `usecase-personal-gifting.png`
- **Prompt:**
```
A wooden invengic clock on a marble bedside table, beside it a handwritten
note "Happy birthday" and a small bouquet of dried flowers. Soft window
light. Sentimental but restrained.
```

### 6.8 — `usecase-media.png`
- **Prompt:**
```
A metallic invengic clock as a set piece on a video shoot — visible behind
it: softboxes slightly out of focus, a clapperboard at the edge of the
frame, a director's monitor. The clock is the hero subject, sharply
in focus. Behind-the-scenes premium production aesthetic.
```

---

## SECTION 7 — Site-wide social card

### 7.1 — `og-image.png`
- **Where it lives:** Open Graph + Twitter card preview for every page
- **Dimensions:** 1200 × 630 px, exact (Open Graph spec)
- **Prompt:**
```
A metallic invengic clock photographed on the LEFT third of a 1200x630
horizontal frame, against a clean off-white seamless background. The
clock displays "10:24" in warm 3000K glow. To the RIGHT of the clock,
a generous space for typography (which we'll add in post — leave that
half mostly empty, only soft ambient gradient there).

Composition designed for an OG card: clear focal subject on the left,
breathing room for a wordmark + tagline overlay on the right.
```

After generating, overlay in Figma/Photoshop:
- Wordmark "invengic" — Inter, semibold, ~72pt, black, right-half top
- Tagline "Engineering light. Defining time." — Inter, regular, ~28pt, ink-600, right-half center
- Save as `og-image.png`

---

## Filename cross-check (do not skip)

When you save assets, double-check filenames match exactly. The site code already references these — typos = broken images.

| Site code reference | Filename you must save |
|---|---|
| `preorder.js` `finishingImages.metal` | `metalic.png` *(legacy, keep for now)* OR rewire to `classic-metallic.png` |
| `preorder.js` `finishingImages.wood` | `wooden.png` *(legacy)* OR `classic-wooden.png` |
| `preorder.js` `finishingImages.ceramic` | `ceramic.png` *(legacy)* OR `classic-ceramic.png` |
| `customize.html` pillars (placeholder) | `pillar-*.png/.mp4` per Section 4 |
| `customize.html` use-cases | `usecase-*.png` per Section 6 |
| Both pages OG meta | `og-image.png` |

> **Note on legacy filenames:** the pre-order page currently uses `metalic.png`, `wooden.png`, `ceramic.png` (single image per finishing, used for Classic/Pro/Ultra alike). When your 9-shot batch arrives, ping me and I'll either: (a) keep the same 3-file simple model and you just rename `classic-metallic.png` → `metalic.png` after generation, or (b) rewire the JS to a 9-image map by `(model, finishing)`. Your call.

---

## Generation order (recommended)

1. **Day 1 — anchor + finishing trio:**
   - `classic-metallic.png` (your reference frame)
   - `classic-wooden.png`
   - `classic-ceramic.png`
   - That gives you a usable pre-order page immediately (3-file mode).

2. **Day 2 — pre-order videos:**
   - `metallic-loop.mp4`, `wooden-loop.mp4`, `ceramic-loop.mp4`

3. **Day 3 — customize hero + composite:**
   - `customize-all-options.png`
   - `customize-hero.mp4`
   - `pillar-led-patterns.mp4` (this one needs Grok)

4. **Day 4 — pillar stills:**
   - `pillar-logo-engraving.png` … `pillar-packaging.png` (5 stills)

5. **Day 5 — use-cases + OG:**
   - 8 use-case images + `og-image.png`

6. **Day 6 — Pro/Ultra variants if you decide to use 9-image mode:**
   - `pro-*.png` (3) and `ultra-*.png` (3)

Each day is bite-sized so generation fatigue + drift stay low.

---

## When you're ready

Ping me with **"Batch 1 ready"** (or whichever batch) → I rewire the relevant `<img src>` and `finishingImages` paths to the new filenames. Should take me 5–10 minutes per batch.
