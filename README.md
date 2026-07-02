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

This site is plain HTML and CSS. Deploy by uploading `index.html`, `styles.css`, `robots.txt`, `sitemap.xml`, and the `assets/` folder to any static host. Point the `bagpipergames.com` domain at that host when ready.

## SEO and Google Search Console

After deploying, complete these steps in [Google Search Console](https://search.google.com/search-console?resource_id=sc-domain:bagpipergames.com):

1. **Submit the sitemap** — Sitemaps → Add new sitemap → enter `sitemap.xml` → Submit.
2. **Request indexing** — URL Inspection → enter `https://bagpipergames.com/` → Request indexing.
3. **Verify crawlability** — Confirm these URLs return 200 after deploy:
   - `https://bagpipergames.com/robots.txt`
   - `https://bagpipergames.com/sitemap.xml`
4. **Monitor** — Check Pages (indexing) and Performance after a few days for the query `bagpiper games`.

### On-site SEO included

- Canonical URL, meta description, Open Graph, and Twitter cards in `index.html`
- JSON-LD structured data (`Organization` + `WebSite`)
- `robots.txt` and `sitemap.xml` at the site root
- Brand-focused H1 and copy naming Bagpiper Games, BAGPIPER, LLC, Fort Worth, and Golfer's Pair-A-Dice

### Off-site signals (manual)

- Link to `https://bagpipergames.com` from [golferspairadice.com](https://golferspairadice.com) (footer or about page)
- Use consistent naming **Bagpiper Games** on GitHub, social profiles, and app store listings
- Add the site URL to any public business or press listings

### Regenerate logo PNGs

```bash
npm install
node scripts/generate-assets.mjs
```

Requires Google Chrome (or set `CHROME_PATH` to your browser executable).

## Privacy reminder

Do **not** publish EIN, tax IDs, bank information, private phone numbers, personal email addresses, or other non-public business details on this site. Only the public contact information listed in `index.html` should appear.

## Brand assets

Logo and mark files live in `assets/`. See `BRAND-SPEC.md` for usage guidelines.

## Agent skills (Cursor)

This repo includes [Impeccable](https://webdeveloper.com/tools/impeccable/), [Taste Skill](https://www.tasteskill.dev/docs), [Emil Kowalski design skills](https://emilkowal.ski/skill), [Ponytail](https://github.com/DietrichGebert/ponytail), and [Vercel web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) for AI-assisted design and coding work.

**Installed skills:** `.agents/skills/` (locked in `skills-lock.json`)

**Brand context:** `PRODUCT.md` and `DESIGN.md` at the project root — generated from `BRAND-SPEC.md` and the live site styles.

**Useful commands in Cursor Agent chat:**

| Command | Purpose |
| --- | --- |
| `/ponytail` | Minimal-code mode — YAGNI, stdlib-first, simplest solution (modes: lite, full, ultra) |
| `/ponytail-review` | Review diff for over-engineering; what to delete or simplify |
| `/ponytail-audit` | Whole-repo audit for bloat and unnecessary complexity |
| `/design-taste-frontend` | Anti-slop frontend generation — brief inference, ban list, pre-flight checks |
| `/emil-design-eng` | UI polish, component patterns, and animation decision framework |
| `/review-animations` | Review motion code against Emil Kowalski's craft bar |
| `/impeccable audit` | Accessibility, responsive, and quality checks |
| `/impeccable polish` | Pre-ship design refinement pass |
| `/impeccable critique` | UX review with actionable feedback |
| `/web-design-guidelines` | Audit UI against Vercel interface guidelines |

To update skills later: `npx skills update -y`

## TODO

- Configure deployment host and document the steps in the Deployment section above.
