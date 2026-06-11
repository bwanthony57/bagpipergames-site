# BAGPIPER, LLC — Brand Asset Specification

Version 1.0 · June 2026

## The mark

A golf stand bag carrying three bagpipe drones — the company name made literal. In the wordmark, a bare flagstick stands in for the letter I between the two Ps, with a single pennant flying above the cap line over the second P.

## Files

| File | Use |
| --- | --- |
| bagpiper-lockup-light.svg / .png | Primary lockup on white or light backgrounds |
| bagpiper-lockup-reverse.svg / .png | Lockup on deep green (background included in file) |
| bagpiper-mark.svg / .png | Bag mark alone, transparent background — favicons, avatars, small sizes |
| bagpiper-mark-white.svg / .png | White bag mark on deep green |

All SVGs are pure vector paths with no font dependencies; they render identically in any environment. PNGs are exported at 2400px (lockups) and 1200px (marks) wide.

## Color

### Light palette
| Role | Hex |
| --- | --- |
| Text / drones | #232323 |
| Bag body | #1B5E43 |
| Bag opening, base, strap | #0F2F22 |
| Bag pocket | #154C36 |
| Pennant (the only warm accent) | #C8472B |
| LLC text | #8A8A8A |
| LLC rules | #C9C9C9 |

### Reverse palette (on deep green #0F2F22)
| Role | Hex |
| --- | --- |
| Text / bag body / drones / strap | #FFFFFF |
| Bag opening, base, ferrules | #4A6B5C |
| Bag pocket | #C7D4CC |
| Pennant | #DD5436 |
| LLC text | #B8C7BF |
| LLC rules | #4A6B5C |

## Typography

Wordmark: Inter Medium (weight 500), optical size 32, set as paths. LLC line: Inter Regular (weight 400) with 6px letterspacing at the reference size. Inter is open-source under the SIL Open Font License, so there are no licensing constraints on logo use.

## Spacing system (at reference size: 34px caps)

- Letters are positioned by their actual ink edges with a uniform 9px gap between every adjacent pair of shapes.
- The flagpole occupies the I's slot (3px stroke) and is shifted **−2px toward the first P** — an optical correction that compensates for the open space under the first P's bowl. This kern is deliberate and calibrated; do not "fix" it back to the mathematical midpoint.
- The pole rises to 40px above the baseline; the pennant (20 × 11px) flies fully above cap height with ~4px clearance, overhanging the second P.
- The bag mark sits at 0.68 scale with its body edge **29px** (three letter-gaps) from the B's left ink edge.
- The LLC line is centered on the wordmark by its true glyph block width (trailing letterspace excluded), with 12px from each rule to the nearest letter and 30px rules.

## Usage rules

- Use the bag mark alone at any size below roughly 120px lockup width — the pennant and LLC line are the first things to break down small.
- The pennant is the identity's single warm accent. Don't introduce additional red elements alongside the logo.
- Maintain clear space around the lockup of at least the bag's width on all sides.
- Scale proportionally only; never restyle the pole back into a letterform or recolor individual components.
