import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

// Load project images dynamically if available
const projectImages = import.meta.glob('../assets/projects/*.*', {
  eager: true,
  import: 'default',
})

function getProjectImage(project) {
  const searchTerms = [
    project.imageName,
    project.image,
    project.id,
  ].filter(Boolean)

  for (const term of searchTerms) {
    const match = Object.entries(projectImages).find(([path]) => {
      const filename = path.split('/').pop().toLowerCase()
      return filename.startsWith(term.toLowerCase())
    })
    if (match) return match[1]
  }
  return null
}

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) return

    const mm = gsap.matchMedia()

    // Desktop view (≥ 1024px): Pin and scrub horizontally IF content exceeds viewport
    mm.add('(min-width: 1024px)', () => {
      if (prefersReducedMotion) {
        return
      }

      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120
      const scrollAmount = getScrollAmount()

      if (scrollAmount <= 0) {
        // Content fits on screen — standard smooth entrance reveal
        gsap.fromTo(
          track.querySelectorAll('.project-card'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          },
        )
        return
      }

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.kill()
      }
    })

    // Mobile & Tablet view (< 1024px): Clean vertical scroll with stagger entrance
    mm.add('(max-width: 1023px)', () => {
      const cards = track.querySelectorAll('.project-card')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full relative py-28 md:py-40 border-t border-bone/10 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <ScrambleText
            text="02 / Projects"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium mb-4 block"
          />
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone">
            Selected Works.
          </h2>
        </div>

        <span className="font-mono text-xs text-dim uppercase tracking-widest hidden md:inline-block">
          ({projects?.length || 0} FEATURED)
        </span>
      </div>

      {/* Projects Track (Balanced grid on tablet/desktop, vertical stack on mobile) */}
      <div
        ref={trackRef}
        className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-8 px-5 md:px-10 w-full max-w-[1440px] mx-auto"
      >
        {projects?.map((project) => {
          const imageSrc = getProjectImage(project)

          return (
            <div
              key={project.id}
              className="project-card w-full lg:flex-1 lg:max-w-[640px] hud-frame border border-bone/10 bg-panel p-6 md:p-8 flex flex-col justify-between transition-colors hover:border-bone/25 group"
            >
              <div>
                {/* Visual Cover / HUD Placeholder */}
                <div className="w-full h-52 sm:h-60 md:h-64 bg-ink/70 border border-bone/10 mb-6 overflow-hidden relative flex items-center justify-center">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={project.imageAlt || `${project.title} screenshot`}
                      className="w-full h-full object-cover object-top grayscale-0 contrast-100 opacity-100 lg:grayscale lg:contrast-110 lg:opacity-80 lg:group-hover:grayscale-0 lg:group-hover:contrast-100 lg:group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center font-mono text-xs text-dim p-4 text-center">
                      <span className="text-signal font-semibold mb-1">
                        [{project.number} · HUD_CORE]
                      </span>
                      <span className="text-[11px] tracking-wider">
                        {project.tags?.[0] || 'FULL STACK'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Number & Year Header */}
                <div className="flex items-center justify-between font-mono text-xs text-dim mb-3">
                  <span className="text-signal font-bold">{project.number}</span>
                  <span className="tracking-widest">{project.year}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold text-bone mb-3 tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-bone/70 text-sm md:text-base leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="border border-bone/15 px-2.5 py-1 font-mono text-xs text-bone/80 bg-ink/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links / Status Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-bone/10 font-mono text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-signal/60 bg-signal/15 hover:bg-signal text-signal hover:text-ink font-semibold uppercase tracking-wider transition-colors duration-200 group/btn"
                      >
                        <span>Live Demo</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    ) : null}

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-bone/25 hover:border-signal text-bone hover:text-signal uppercase tracking-wider px-3.5 py-1.5 transition-colors inline-flex items-center gap-1.5 group/code"
                      >
                        <span>Source Code</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover/code:translate-x-0.5 group-hover/code:-translate-y-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 text-dim font-mono text-[11px] uppercase tracking-wider">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-signal/80 animate-pulse"
                      aria-hidden="true"
                    />
                    <span>{project.status || 'In Development'}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
