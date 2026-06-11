# Image Swap — Design System

A clean, developer-tool design system for **Image Swap**, a lightweight two-panel
image comparison utility (load an image into either panel, then copy between them
with the arrow controls). The system is a faithful extraction of the product's
real foundation: a **shadcn/ui "new-york"** base on Tailwind v4, with a blue
primary, cool-slate neutrals, the **Inter** typeface, an 8px radius, and a soft
low-contrast shadow scale — plus the product's own panel/arrow UI.

## Sources

This system was built by reading the product's source code, not screenshots:

- **GitHub:** https://github.com/piotrbary/image-swap-tool
  - `artifacts/image-swap/src/index.css` — the real theme (color tokens, radius, shadows, fonts, the "elevate" interaction overlays, and the Image Swap app CSS). This is the source of truth for every token here.
  - `artifacts/image-swap/src/App.tsx` — the Image Viewer screen (two `ImagePanel`s + arrow controls), recreated in `ui_kits/image-swap/`.
  - `artifacts/image-swap/src/components/ui/*.tsx` — the shadcn "new-york" primitives (Button, Badge, Card, Input, Switch, Tabs, …), recreated here as token-driven React components.

  Explore the repository to design more deeply against the product. Note: the repo also ships a `Design.md` describing an unrelated third-party brand — that file is a template artifact and was **not** used; this system reflects the actual Image Swap codebase only.

> **Font note:** Inter is the product's real UI font (loaded from Google Fonts in the source app), so it is used here directly — no substitution. Georgia (serif) and Menlo (mono) are the system-font fallbacks declared in the original theme.

---

## Content Fundamentals

The product's voice is **plain, instructional, and second-person** — it tells you
exactly what to do next and gets out of the way.

- **Person & tone:** Speaks to *you* with direct imperatives. Real product copy: *"Image Viewer"* (H1), *"Click an image panel to load a file. Use the arrows to copy between panels."* (subtitle), *"Load Image" / "Click to browse"* (panel placeholder). Tooltips are literal instructions: *"Copy Image 1 → Image 2."*
- **Casing:** Sentence case everywhere — headings, buttons, labels. Short pill labels (panel tags like `IMAGE 1`) are the only uppercase, and they're set in a wide-tracked caption style.
- **Length:** Terse. One short sentence of guidance, never a paragraph. Labels are 1–2 words (`Reset`, `Compare`).
- **No exclamation, no jargon, no emoji.** The interface is calm and utilitarian; emphasis comes from the UI, not punctuation.
- **Numbers & units:** Plain and explicit (`1 of 2 panels loaded`, `1920×1080`, `PNG`).

When writing new copy: lead with the action, name the object, keep it to one line.

---

## Visual Foundations

**Color.** A single **blue primary** (`hsl(221 83% 53%)` — the "Get started"/CTA
color, and the focus ring) over **cool-slate neutrals**: a near-white cool-gray
page (`210 20% 98%`), pure-white cards, and a `220 13%` border family. Primary is
reserved for the dominant action and active states — never body text or large
fills. Semantic colors are a saturated red (`destructive`), green (`success`), and
orange (`warning`); a five-hue chart palette (blue / teal / orange / purple / rose)
covers data viz. A full **dark mode** (deep navy `222 47% 11%` surfaces, brighter
blue primary) ships under the `.dark` class.

**Type.** **Inter** across every surface — humanist-geometric, weights 400/500/600/700.
Tight tracking (`-0.02em`) on large headings and the app title; comfortable 1.5
body leading. Buttons and UI labels are 14px medium; headings 600; the app title
700. Menlo monospace is used for code/values.

**Spacing & layout.** 4px base unit. The workspace uses a 24px gap between panels
and 32px page padding; marketing/section rhythm steps up to 64px. The image
workspace caps at ~820–900px and centers; panels are a 4:3 ratio and flex evenly.

**Shape.** 8px base radius: 4px chips, 6px inputs/buttons, 8px panels, 12px cards,
and full pills for badges, the arrow buttons, and panel labels. Geometry is
sober-rectangular — pills are reserved for genuinely pill-shaped elements (labels,
toggles, circular arrow buttons), not standard buttons.

**Elevation.** Soft, low-contrast shadows (`xs → 2xl`), mostly black at 5–10%
opacity. Flat cards lean on a 1px hairline border + a barely-there shadow; the
loaded-image hover lifts a panel with `shadow-md`. No heavy drop shadows on
documentation surfaces.

**Backgrounds.** Flat solid surfaces — no gradients, textures, or patterns in the
product chrome (gradients appear only inside *user image content*). The page is a
cool off-white; cards are pure white; sections divide with hairlines, not color
blocks.

**Borders.** A consistent `220 13% 88%` hairline. Empty image panels use a **2px
dashed** border that turns **solid** once filled and lifts to **blue on hover** —
the system's clearest affordance signal. Inputs use a 1px border with a 1px blue
focus ring.

**Motion.** Quick and functional: 100–200ms with a standard `cubic-bezier(0.4,0,0.2,1)`
ease. Transitions cover color, border, and box-shadow; the arrow buttons add a
small scale nudge (`1.08` hover, `0.95` press). No bounces, no decorative loops.

**Hover & press — the signature "elevate" interaction.** Buttons and badges don't
change hue on interaction; they overlay a subtle **ink wash** — `--elevate-1`
(black 3%) on hover, `--elevate-2` (black 8%) on press (inverted to white washes in
dark mode). This keeps the palette stable while still feeling responsive. The arrow
controls are the exception — they invert to a solid blue fill on hover because
they're the primary verb of the app.

**Cards.** White surface, 12px radius, 1px hairline border, soft `shadow`. Compose
with header / title / description / content / footer. No colored left-border
accents, no tinted card families.

---

## Iconography

- **Primary set: [Lucide](https://lucide.dev)** (`lucide-react`) — the icon library the underlying shadcn "new-york" components are built around (chevrons, checks, x, indicators all come from Lucide). Stroke-based, ~1.5–2px weight, 16px (`size-4`) default inside controls. Consumers should pull Lucide from CDN (e.g. `https://unpkg.com/lucide@latest`) rather than re-drawing icons.
- **Bespoke product glyphs:** the empty-panel placeholder uses a custom image icon (rounded rect + circle + mountain line) — rendered inline in `ImagePanel`. The swap controls use the **unicode chevrons `›` and `‹`** as their glyphs (not an icon font), echoing the product's actual source.
- **Logo mark:** a horizontal double-arrow "swap" glyph in a rounded-square blue tile (`assets/logo-mark.svg`), with a wordmark lockup (`assets/logo-lockup.svg`). The mark is original to this system — the source repo shipped only a solid-orange placeholder favicon, which was discarded.
- **Emoji:** never used.
- **Checkmarks/indicators:** inline stroked SVG (e.g. the Checkbox tick) matching Lucide's weight.

---

## Index / Manifest

**Foundations**
- `styles.css` — global entry point (consumers link this one file). `@import`s only.
- `tokens/fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius.css` · `base.css` — the token layer (181 tokens + dark scope).

**Components** (`window.ImageSwapDesignSystem_e3a0c4.*`)
- `components/core/` — `Button`, `Badge`, `Card` (+ Header/Title/Description/Content/Footer), `Input`, `Label`, `Switch`, `Checkbox`, `Tabs` (+ List/Trigger/Content).
- `components/image-swap/` — `ImagePanel`, `SwapControl` (the product primitives).
- Each component dir has a `.jsx`, `.d.ts`, `.prompt.md`, and a `@dsCard` showcase HTML.

**Specimen cards** (Design System tab) — `guidelines/*.card.html`: Colors (primary, neutrals, text/semantic, charts, dark), Type (scale, family/weights, mono/serif), Spacing (scale, radius, shadows, elevate), Brand (logo, voice).

**UI kit** — `ui_kits/image-swap/` — interactive recreation of the Image Viewer (load files, copy between panels, dark-mode toggle, reset). `index.html` + `TopBar.jsx` + `Workspace.jsx`.

**Template** — `templates/image-swap/ImageSwap.dc.html` — the same app as a reusable Design-Component starting point for consuming projects (loads the system via `ds-base.js`).

**Assets** — `assets/logo-mark.svg`, `assets/logo-lockup.svg`.

**Skill** — `SKILL.md` — makes this folder usable as a downloadable Agent Skill.
