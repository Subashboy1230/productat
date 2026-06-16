# Productat

Landing page for **productat.com**: a hackathon and year-round product community for builders across the US, based in the Bay Area.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components. The design follows a Linear-style aesthetic: a near-black canvas, a fine grid backdrop, hairline-bordered glass cards, soft electric-blue glows, and Inter typography.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To create a production build:

```bash
npm run build
npm start
```

> Note: build inside this folder on macOS may hit a harmless file-permission error at the very last step if the folder is on a synced/virtual drive. Building from a normal local directory (or deploying to Vercel) avoids it. Compilation, type-checking, and static generation all pass.

## Sections

The page is composed in `app/page.tsx`:

1. **Navbar**: sticky, collapses into a glass pill on scroll, mobile menu.
2. **Hero + CTA**: headline, dual call-to-action, and a live "Demo Day" product mock.
3. **Stats**: coast-to-coast city marquee and a four-stat strip.
4. **Hackathon**: format, weekend schedule, tracks, prizes, and Bay Area location.
5. **Community + perks**: always-on member room with a chat mock and a six-perk grid.
6. **Sponsors**: logo wall plus a "become a sponsor" call-to-action.
7. **FAQ**: shadcn accordion.
8. **CTA**: email capture band.
9. **Footer**: links, socials, location.

## Project structure

```
app/
  globals.css        Theme tokens (dark + electric blue) and Linear-style utilities
  layout.tsx         Fonts, metadata, dark theme
  page.tsx           Page composition
components/
  ui/                shadcn/ui primitives (button, card, badge, accordion, input, separator)
  site/              Page sections (navbar, hero, hackathon, community, sponsors, faq, cta, footer)
lib/
  utils.ts           cn() class-merge helper
tailwind.config.ts   shadcn theme + custom animations (marquee, fade-up, glow)
components.json      shadcn config (new-york style, slate base, CSS variables)
```

## Customizing

- **Colors / theme**: edit the CSS variables in `app/globals.css`. The accent is driven by `--primary` (and `--ring`); change those two HSL values to re-skin the whole site. Light-mode tokens live under `:root`, dark under `.dark` (the site ships dark via `className="dark"` on `<html>` in `app/layout.tsx`).
- **Copy & data**: each section keeps its content in plain arrays at the top of its file in `components/site/` (schedule, prizes, perks, sponsors, faqs). Edit those.
- **Dates / location**: search for `Sept 19–21, 2026` and `SoMa, San Francisco`.
- **Add shadcn components**: `npx shadcn@latest add <component>` (config is already in `components.json`).

## Deploy

Push to a Git repo and import into **Vercel** (zero config for Next.js). Point the `productat.com` domain at the project in Vercel's domain settings.

## Notes

- `next` is pinned to `14.2.35`, which includes the December 2025 security patch.
- All content (teams, sponsors, prize amounts, schedule) is placeholder copy: swap in real details before launch.
```
