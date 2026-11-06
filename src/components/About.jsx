import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo, aboutContent, skillGroups } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

// Load portrait dynamically matching any image extension
const portraitModules = import.meta.glob('../assets/about/about-portrait.*', {
  eager: true,
  import: 'default',
})
const portraitSrc = Object.values(portraitModules)[0] || null

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // If reduced motion is preferred, display immediately without scroll animations
    if (prefersReducedMotion) {
      gsap.set('[data-about="reveal"]', { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // Reveal all marked sections with smooth stagger when scrolled 75% into view
      gsap.fromTo(
        '[data-about="reveal"]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-5 md:px-10 py-28 md:py-40 border-t border-bone/10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading Badge */}
        <div data-about="reveal" className="mb-10">
          <ScrambleText
            text={aboutContent.label}
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium inline-block"
          />
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* LEFT: Portrait in .hud-frame (Sticky on desktop) */}
          <div data-about="reveal" className="w-full flex justify-center lg:justify-start lg:sticky lg:top-28">
            <div className="hud-frame aspect-[4/5] max-w-[420px] w-full border border-bone/10 bg-panel overflow-hidden relative group">
              {portraitSrc ? (
                <img
                  src={portraitSrc}
                  alt={`${personalInfo.name} (Satharuzama) — Aspiring Java Full Stack Developer based in Bengaluru`}
                  width="420"
                  height="525"
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center font-mono text-xs text-dim">
                  <span className="text-signal mb-2 text-base">[HUD_PORTRAIT]</span>
                  <span>IMAGE PENDING</span>
                </div>
              )}

              {/* Orange Tint Layer with multiply blend */}
              <div
                className="absolute inset-0 bg-signal mix-blend-multiply opacity-25 pointer-events-none transition-opacity duration-300 group-hover:opacity-15"
                aria-hidden="true"
              />

              {/* Bottom-Left HUD Identity Label */}
              <span
                className="absolute bottom-3 left-3 pointer-events-none font-mono text-[10px] uppercase tracking-[0.2em] text-dim z-10 bg-ink/80 px-2 py-0.5 border border-bone/10 backdrop-blur-sm"
                aria-hidden="true"
              >
                ID · {personalInfo.brandName}
              </span>
            </div>
          </div>

          {/* RIGHT: Heading, Bio Paragraph, Technical Skill Modules */}
          <div className="flex flex-col">
            {/* Heading */}
            <h2
              data-about="reveal"
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone mb-6"
            >
              {aboutContent.heading}
            </h2>

            {/* Paragraph */}
            <p
              data-about="reveal"
              className="text-lg md:text-xl leading-relaxed text-bone/75 max-w-2xl mb-12 whitespace-pre-line"
            >
              {aboutContent.paragraph}
            </p>

            {/* Technical Skill Groups Grid */}
            {skillGroups?.length > 0 && (
              <div data-about="reveal" className="flex flex-col gap-4">
                <div className="border-b border-bone/10 pb-3">
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-signal font-medium">
                    Technical Capabilities
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-bone/10 border border-bone/10">
                  {skillGroups.map((group, groupIdx) => (
                    <div
                      key={group.title}
                      className={`bg-ink p-6 hover:bg-panel transition-colors flex flex-col justify-between ${
                        groupIdx === skillGroups.length - 1 && skillGroups.length % 2 !== 0
                          ? 'sm:col-span-2'
                          : ''
                      }`}
                    >
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold">
                          {group.title}
                        </span>
                        <span
                          className="font-mono text-xs text-dim tracking-wider"
                          aria-hidden="true"
                        >
                          {String(groupIdx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="border border-bone/15 px-3 py-1.5 font-mono text-xs text-bone/90 hover:border-signal/50 hover:text-signal transition-colors cursor-default bg-panel/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
