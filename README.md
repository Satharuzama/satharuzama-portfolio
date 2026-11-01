# Shek Sataruzama — Portfolio

A single-page developer portfolio website designed in a dark, motion-led "Signal HUD" technical aesthetic.

**Live site:** [https://shek-sataruzama-portfolio.vercel.app](https://shek-sataruzama-portfolio.vercel.app)

## Tech Stack

- **React 19** — Component-driven user interface architecture
- **Vite** — High-performance frontend tooling and asset bundling
- **Tailwind CSS 4** — Modern utility-first styling with HUD design tokens
- **GSAP & ScrollTrigger** — Coordinated entrance reveals, scrub animations, and pinned tracks
- **Lenis** — Smooth inertia scrolling unified with GSAP's central ticker
- **Three.js** — Interactive 3D signal core centerpiece with real-time pointer physics
- **EmailJS** — Client-side asynchronous contact messaging with fallback capabilities

## Run Locally

Clone the repository and install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the production distribution:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment Variables

For form delivery through EmailJS, create a `.env.local` file in the root directory and supply your keys:

```bash
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

*(If these variables are omitted or empty, the contact form seamlessly falls back to a pre-filled client mailto trigger).*

## Credits

Built during the placement training program at [TAP Academy](https://thetapacademy.com/) (full-stack development, AI and augmented reality training).
