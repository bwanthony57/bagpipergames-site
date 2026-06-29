---
name: Bagpiper Games
description: Independent games publisher — deep forest green, cream typography, clubhouse warmth
colors:
  bg: "#0f2f22"
  bg-deep: "#063b2a"
  panel: "#123d2e"
  cream: "#fff8e8"
  cream-muted: "rgba(255, 248, 232, 0.78)"
  accent-ui: "#e4d27a"
  border: "rgba(255, 248, 232, 0.18)"
  logo-pennant: "#dd5436"
  logo-green: "#0f2f22"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.85rem, 5vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 3vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  sm: "8px"
  md: "12px"
spacing:
  section: "2.5rem"
  hero: "3rem"
  card: "1.5rem"
  nav: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.bg-deep}"
    rounded: "{rounded.sm}"
    padding: "0.65rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-ui}"
    textColor: "{colors.bg-deep}"
  game-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "{spacing.card}"
---

## Overview

**The Clubhouse Green** — a restrained brand surface for an indie game publisher. Deep forest greens carry the BAGPIPER identity; cream text reads warm and legible on dark. UI gold (`#e4d27a`) handles links, labels, and button hovers; the logo pennant red (`#dd5436`) stays reserved for the mark only. System sans-serif keeps the page fast and native-feeling; the wordmark uses Inter as paths in logo assets, not as a loaded web font.

Layout is a single-column editorial flow capped at 960px — hero, games, about, contact. Sections separated by subtle cream borders. One game card today; the pattern scales to more releases.

## Colors

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#0f2f22` | Page background, header |
| `--bg-deep` | `#063b2a` | Gradient bottom, footer, button text |
| `--panel` | `#123d2e` | Card surfaces |
| `--cream` | `#fff8e8` | Primary text, button fill |
| `--cream-muted` | `rgba(255, 248, 232, 0.78)` | Body copy, nav links |
| `--accent` | `#e4d27a` | Links, hero label, focus ring, button hover |
| `--border` | `rgba(255, 248, 232, 0.18)` | Section dividers, card borders |

Logo palette (from BRAND-SPEC.md, reverse lockup): pennant `#dd5436`, bag greens `#0f2f22` / `#1b5e43` / `#154c36`. Do not add UI reds beyond the logo pennant.

## Typography

- **Hero (display):** `clamp(1.85rem, 5vw, 2.75rem)`, tight tracking (`-0.03em`), max ~18ch width.
- **Section headings:** `clamp(1.35rem, 3vw, 1.75rem)`, `-0.02em` tracking.
- **Body:** `clamp(1.05rem, 2.5vw, 1.2rem)`, line-height 1.55, max-width ~42rem.
- **Labels (hero-label):** 0.9rem, uppercase, 0.06em letter-spacing, accent color.
- **Nav links:** 0.95rem, semibold, muted cream default.

Base stack: system UI fonts (no web font load on the page). Logo typography is path-based Inter per brand spec.

## Elevation

Flat tonal layering — no box shadows. Depth comes from background steps (`bg` → `panel` → `bg-deep`) and 1px `border` outlines. Cards use `border-radius: 12px` with border, not shadow.

## Components

- **Site header:** Sticky, `bg` fill, bottom border. Logo lockup reverse PNG, max-width `min(220px, 56vw)`.
- **Nav links:** Muted cream, semibold; hover to full cream.
- **Hero:** Label + h1 + description; bottom border separator.
- **Game card:** Panel background, border, 12px radius, 1.5rem padding. Title + description + primary button.
- **Button:** Cream fill, deep green text, 8px radius. Hover: accent gold fill.
- **Footer:** Deep background, muted text, flex row (stacks on mobile).

## Do's and Don'ts

**Do**
- Use CSS custom properties from `styles.css` for all new UI.
- Keep the pennant as the only warm red in the identity; UI warmth comes from cream and gold.
- Maintain 4.5:1+ contrast for body text on green backgrounds.
- Use semantic HTML (`header`, `main`, `section`, `article`, `address`, `nav`).
- Reference `BRAND-SPEC.md` for logo usage, clear space, and mark sizing rules.

**Don't**
- Add purple gradients, generic card shadows, or "AI slop" hero patterns.
- Load Inter or other display fonts for page copy unless deliberately chosen with brand rationale.
- Introduce extra accent colors (especially reds) outside the logo.
- Restyle, recolor, or "fix" logo kerning/optical adjustments documented in BRAND-SPEC.md.
- Use gray muted text that fails contrast on tinted green backgrounds.
