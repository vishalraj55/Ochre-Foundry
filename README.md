# Ochre Foundry - Mars Habitat Construction Website

A cinematic, premium landing page for a fictional Mars-based habitat printing company. Built with React, Framer Motion, and Tailwind CSS.

## Overview

Ochre Foundry is a next-generation website showcasing advanced 3D-printed habitat construction on Mars. The site features immersive animations, parallax scrolling, glassmorphism design, and seamless section transitions that create a futuristic, award-winning user experience.

## Features

- **Hero Section**: Full-screen Mars background with animated gradient text overlay and smooth parallax effects
- **Animated Counters**: Real-time counting animations for key statistics
- **Parallax Scrolling**: Dynamic scroll-based animations and parallax effects throughout
- **Timeline with Videos**: Interactive 4-phase company history with video integration
- **Feature Cards**: Mouse-tracking hover effects with radial gradient interactions
- **Glassmorphic Design**: Modern frosted glass effect cards and UI elements
- **Responsive Design**: Fully mobile-optimized with adaptive layouts
- **Premium Typography**: Custom font scales and hierarchy for cinematic feel
- **Smooth Transitions**: Staggered reveals and seamless section transitions

## Tech Stack

- **Frontend Framework**: React 18+
- **Animation Library**: Framer Motion
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

src/
├── pages/
│   └── Home.jsx              # Main landing page
├── components/
│   ├── Reveal.jsx            # Reveal animation wrapper
│   ├── SectionHeading.jsx    # Section header component
│   ├── FAQ.jsx               # FAQ accordion
│   ├── CTASection.jsx        # Call-to-action section
│   └── TestimonialCard.jsx
├── styles/
│   └── globals.css           # Global CSS with custom utilities
└── assets/
    └── mars-image.png        # Hero background image

## Installation

```bash
npm install
npm run dev
```

## Configuration

### Mars Background Image

Place your Mars image at `public/images/mars.png` and update Home.jsx line 156:

```jsx
backgroundImage: "url('/images/mars.png')"
```

### Timeline Videos

Add MP4 videos to `public/videos/`:
- `timeline-1.mp4` (2071 - First sintering prototype)
- `timeline-2.mp4` (2084 - Settlement Block deployment)
- `timeline-3.mp4` (2096 - Network scale)
- `timeline-4.mp4` (2100 - What's next)

### Color Palette

- **Primary Rust**: `#eb794d`
- **Background Dark**: `#0a0906`
- **Text Light**: `#c9c3bc`
- **Accent Cyan**: `#7fe7e0`
- **Orange**: `#f97316`

## Key Components

**Counter**: Animated numerical counter that starts on scroll
**GradientMesh**: Layered gradient blobs for visual depth
**TimelineItem**: Alternating left-right layout with video playback
**StatCard**: Parallax-enabled stat cards with hover effects
**FeatureCard**: Mouse-tracking interactive cards
**FeatureCard**: Mouse-tracking interactive cards with radial hover gradients

## Customization

### Button Styles
- `.btn-primary` - Main call-to-action buttons (rust colored)
- `.btn-ghost` - Secondary buttons (bordered)
- `.btn-secondary` - Tertiary buttons (subtle)

### Typography Classes
- `.h0` - Hero heading (clamp 2.25rem - 8rem)
- `.h1` - Section heading (clamp 1.875rem - 3.75rem)
- `.h2` - Subsection (clamp 1.5rem - 3rem)
- `.eyebrow` - Uppercase labels with cyan glow

### Card Styles
- `.card` - Glassmorphic card base with hover effects
- `.shadow-glow` - Rust-colored shadow glow
- `.shadow-glow-cyan` - Cyan accent shadow

## Performance Optimizations

- Lazy-loaded components via Framer Motion `whileInView`
- Optimized animations with reduced motion support
- CSS containment for animation performance
- Video autoplay with muted playback

## Accessibility

- Keyboard focus indicators on all interactive elements
- Reduced motion preferences respected
- Semantic HTML structure
- ARIA-friendly component composition
- Color contrast compliant

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- 3D model viewer for habitat designs
- Interactive Mars settlement simulator
- Live data integration with NASA APIs
- Multi-language support
- Dark/light theme toggle
- Blog section with case studies

## License

Proprietary - Ochre Foundry

## Contact

For inquiries about this project, contact the development team through the website contact form.

---

**Last Updated**: July 2026
**Version**: 1.0.0