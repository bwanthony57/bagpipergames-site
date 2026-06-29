# Bagpiper Games — Publisher Site

Static one-page website for [bagpipergames.com](https://bagpipergames.com), the publishing label for BAGPIPER, LLC.

## Preview locally

Open `index.html` in a web browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

No build step or server is required. All assets are local.

## Deployment

<!-- TODO: Add deployment notes when hosting is configured (e.g. GitHub Pages, static host). -->

This site is plain HTML and CSS. Deploy by uploading `index.html`, `styles.css`, and the `assets/` folder to any static host. Point the `bagpipergames.com` domain at that host when ready.

## Privacy reminder

Do **not** publish EIN, tax IDs, bank information, private phone numbers, personal email addresses, or other non-public business details on this site. Only the public contact information listed in `index.html` should appear.

## Brand assets

Logo and mark files live in `assets/`. See `BRAND-SPEC.md` for usage guidelines.

## Agent skills (Cursor)

This repo includes [Impeccable](https://webdeveloper.com/tools/impeccable/) and [Vercel web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) for AI-assisted design work.

**Installed skills:** `.agents/skills/` (locked in `skills-lock.json`)

**Brand context:** `PRODUCT.md` and `DESIGN.md` at the project root — generated from `BRAND-SPEC.md` and the live site styles.

**Useful commands in Cursor Agent chat:**

| Command | Purpose |
| --- | --- |
| `/impeccable audit` | Accessibility, responsive, and quality checks |
| `/impeccable polish` | Pre-ship design refinement pass |
| `/impeccable critique` | UX review with actionable feedback |
| `/web-design-guidelines` | Audit UI against Vercel interface guidelines |

To update skills later: `npx skills update -y`

## TODO

- Add a Golfer's Pair-A-Dice logo or card image to the Games section when a suitable asset is available.
