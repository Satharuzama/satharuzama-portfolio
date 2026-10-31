import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { personalInfo, heroContent } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

// Lazy load 3D Three.js scene in its own chunk
const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const heroRef = useRef(null)
  const dividerRef = useRef(null)

  // Split name: first word solid, remaining words outlined
  const nameParts = (personalInfo.name || '').trim().split(' ')
  const firstName = nameParts[0] || ''
  const restName = nameParts.slice(1).join(' ') || ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger entrance of marked hero elements
      gsap.fromTo(
        '[data-hero="fade"]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.3,
        },
      )

      // Draw thin technical divider from left to right
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            delay: 0.3,
          },
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="hud-grid min-h-screen flex flex-col justify-between overflow-hidden px-5 md:px-10 pt-24 pb-10"
    >
      {/* Central Interactive Grid */}
      <div className="w-full max-w-[1440px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
        {/* LEFT Column: HUD Identity, Scrambled Title, Role, Description, CTAs */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow Label */}
          <div data-hero="fade">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium">
              {heroContent.eyebrow}
            </span>
          </div>

          {/* Dual-style Dynamic <h1> */}
          <h1
            data-hero="fade"
            className="text-[clamp(3.2rem,11vw,9.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] flex flex-col"
          >
            <ScrambleText
              trigger="mount"
              delay={200}
              text={firstName}
              className="text-bone"
            />
            {restName && (
              <ScrambleText
                trigger="mount"
                delay={500}
                text={restName}
                className="text-transparent [-webkit-text-stroke:1.5px_#e8e6df]"
              />
            )}
          </h1>

          {/* Expanding Divider Line */}
          <div
            ref={dividerRef}
            className="h-px w-full max-w-xl bg-bone/25 origin-left my-1"
            aria-hidden="true"
          />

          {/* Role & Core Intro */}
          <div data-hero="fade" className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim">
              {personalInfo.role}
            </p>
            <p className="text-lg md:text-xl text-bone/85 leading-relaxed max-w-xl">
              {heroContent.intro}
            </p>
          </div>

          {/* Sharp HUD Action Buttons */}
          <div data-hero="fade" className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={heroContent.ctaPrimary.href}
              className="bg-signal text-ink hover:bg-bone transition-colors font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 inline-flex items-center gap-2 group"
            >
              <span>{heroContent.ctaPrimary.label}</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
            <a
              href={heroContent.ctaSecondary.href}
              className="border border-bone/30 text-bone hover:border-signal hover:text-signal transition-colors font-mono text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3.5 inline-block"
            >
              {heroContent.ctaSecondary.label}
            </a>
          </div>
        </div>

        {/* RIGHT Column: 3D Signal Core Canvas in HUD Frame */}
        <div data-hero="fade" className="w-full">
          <div className="hud-frame border border-bone/10 bg-panel/40 h-[48vh] min-h-[320px] lg:h-[70vh] relative flex items-center justify-center overflow-hidden">
            {/* Top-Left Corner HUD Label */}
            <span
              className="absolute top-3 left-4 pointer-events-none font-mono text-[10px] uppercase tracking-[0.25em] text-dim z-10"
              aria-hidden="true"
            >
              core.view — drag to rotate
            </span>

            {/* Lazy Three.js Scene */}
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>

            {/* Bottom-Right Corner HUD Location */}
            <span
              className="absolute bottom-3 right-4 pointer-events-none font-mono text-[10px] uppercase tracking-[0.25em] text-dim z-10"
              aria-hidden="true"
            >
              {personalInfo.city}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Status Ribbon */}
      <div
        data-hero="fade"
        className="w-full max-w-[1440px] mx-auto mt-10 border-t border-bone/10 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse"
            aria-hidden="true"
          />
          <span>{personalInfo.availability}</span>
        </div>
        <span className="hidden sm:inline-block">Scroll ↓</span>
      </div>
    </section>
  )
}
