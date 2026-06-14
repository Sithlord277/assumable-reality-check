# Brand Assets, Assumable Reality Check

Realtor-branded for v1: Martin Tsatskin, Elevate48 / Libertas Real Estate (Arizona).
Astin Mortgage does not appear in this app.

## Colors

Approximate, derived from the logo files. Eyedropper-confirm against the source art before
launch. Defined as Tailwind v4 theme tokens in `app/globals.css` (so they generate utilities
like `bg-navy`, `text-gold`, `border-line`).

| Token       | Hex        | Use |
|-------------|------------|-----|
| Navy        | `#1E3A5F`  | Primary. Headlines, primary buttons, structure. |
| Navy deep   | `#15293F`  | Primary button hover, deep accents. |
| Gold        | `#C6A24A`  | Accent. Eyebrows, progress bar, highlights. Use sparingly. |
| Gold soft   | `#D9BD74`  | Soft gold fills. |
| Charcoal    | `#2B2B2B`  | Default text. |
| Ink         | `#3D3D3D`  | Body copy. |
| Cream       | `#FAF7F2`  | App background. Warm and friendly, not cold-bank white. |
| Cream deep  | `#F1EAE0`  | Tile fills, progress track. |
| Line        | `#E7DED0`  | Hairline borders. |

## Type

Plus Jakarta Sans (Google, self-hosted via `next/font`). Friendly, modern, with strong
tabular numerals for the financial tiles. Apply the `.tabular` class to figures.

## Logos and imagery

Copied into `public/` for the app to use:

- `elevate48-lockup.png` , primary horizontal lockup, for the cream background.
- `elevate48-white.png` , all-white version, for dark / navy backgrounds.
- `martin-headshot.png` , Martin's headshot, for the result / booking screen.

Source art (with the SVG vectors) lives in `Branding/`.

Tagline: "It's your story, let's write it together."

## Naming rule

The public-facing name in the UI is always "Martin Tsatskin." Never "Marty" on screen.
