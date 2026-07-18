# Ochre Foundry

Marketing site for a fictional Mars business: an additive-construction company
that 3D-prints radiation-shielded habitat shells on-site from local regolith.

## Stack
React 19 + Vite, React Router, Tailwind CSS, Framer Motion, lucide-react.

## Run locally
```
npm install
npm run dev
```

## Build
```
npm run build
npm run preview
```

## Structure
- `src/pages` — Home, Services, Pricing, About, Contact
- `src/components` — Nav, Footer, PrintVisual (signature animated habitat-print
  graphic), Reveal (scroll-in animation wrapper), SectionHeading, StatStrip,
  TestimonialCard, FAQ, CTASection
- Design tokens (colors, fonts, keyframes) live in `tailwind.config.js`
