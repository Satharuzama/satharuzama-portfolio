# Shek Sataruzama — Developer Portfolio

A modern, high-performance developer portfolio engineered with a dark, technical "Signal HUD" aesthetic. Features smooth inertial scrolling, interactive 3D graphics, dynamic typography effects, and responsive layout architecture.

**Live Website:** [https://shek-sataruzama-portfolio.vercel.app/](https://shek-sataruzama-portfolio.vercel.app/)

---

## 🛠️ Technology Stack

- **React 19** — Component-driven declarative UI architecture
- **Vite** — Next-generation frontend tooling and fast HMR bundling
- **Tailwind CSS 4** — Modern utility-first styling with custom HUD design tokens
- **GSAP & ScrollTrigger** — Coordinated entrance reveals, scrub animations, and pinned tracks
- **Lenis** — Smooth inertia scrolling unified with GSAP's central animation loop
- **Three.js** — Interactive 3D wireframe globe centerpiece with real-time mouse/touch physics
- **EmailJS** — Asynchronous client-side contact messaging with native mailto fallback
- **AI-Assisted Development** — Engineered and refined using AI-assisted development tools (Google Antigravity)

---

## ✨ Features

- **Signal HUD Aesthetic:** Futuristic dark theme (`#08090c` background, `#0f1116` panel) accented with vibrant signal orange (`#ff5b1f`), technical monospaced telemetry, and corner-bracketed frames.
- **Interactive 3D Centerpiece:** Three.js procedural wireframe globe with particle satellites responding dynamically to pointer interaction.
- **Smooth Inertial Navigation:** Hardware-accelerated Lenis smooth scrolling harmonized with GSAP tickers and anchor-based section jumps.
- **Dynamic Status Indicator:** Automatically rotating developer status telegraphing current learning focuses with smooth fade transitions.
- **Project Showcase:** Interactive project cards with live demo links, source code repositories, and responsive screenshot color transitions.
- **Interactive Timeline:** Chronological education and career journey mapped with telemetry markers.
- **Contact Protocol:** Integrated direct message transmission via EmailJS with robust client fallback.
- **Accessibility & Motion Safety:** Built with full support for `prefers-reduced-motion` and semantic HTML standards.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Satharuzama/satharuzama-portfolio.git
cd satharuzama-portfolio
npm install
```

### Development

Start the local development server with hot module replacement:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Linting

Run ESLint to inspect code quality:

```bash
npm run lint
```

### Production Build

Compile and bundle optimized static assets for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🔐 Environment Variables

To enable contact form delivery via EmailJS, create a `.env.local` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

*(If omitted, the form automatically falls back to an encoded mailto trigger).*

---

## 🎓 Credits

Built during the placement training program at [TAP Academy](https://thetapacademy.com/) (full-stack development, AI and augmented reality training).
