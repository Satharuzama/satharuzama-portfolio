import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

gsap.registerPlugin(ScrollTrigger)

export default function Journey() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const fillLineRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // If reduced motion is requested, immediately set final states
    if (prefersReducedMotion) {
      if (fillLineRef.current) {
        gsap.set(fillLineRef.current, { scaleY: 1 })
      }
      itemRefs.current.forEach((itemEl) => {
        if (itemEl) {
          itemEl.classList.add('is-on')
          gsap.set(itemEl, { opacity: 1, x: 0 })
        }
      })
      return
    }

    const ctx = gsap.context(() => {
      // 1. Vertical timeline fill line that expands as user scrolls through the list
      if (fillLineRef.current && listRef.current) {
        gsap.fromTo(
          fillLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        )
      }

      // 2. Timeline nodes and entry animations
      itemRefs.current.forEach((itemEl) => {
        if (!itemEl) return

        // Activate solid signal node state when line reaches entry
        ScrollTrigger.create({
          trigger: itemEl,
          start: 'top 65%',
          onEnter: () => itemEl.classList.add('is-on'),
          onLeaveBack: () => itemEl.classList.remove('is-on'),
        })

        // Fade in entry from x: 30 once
        gsap.fromTo(
          itemEl,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: itemEl,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="w-full px-5 md:px-10 py-28 md:py-40 border-t border-bone/10"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        {/* LEFT: Sticky Section Title */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ScrambleText
            text="03 / Journey"
            className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium mb-4 block"
          />
          <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-bone">
            Where I&apos;ve been learning and building.
          </h2>
        </div>

        {/* RIGHT: Interactive Scroll-Filled Timeline */}
        <div className="w-full">
          <ol
            ref={listRef}
            className="relative pl-10 flex flex-col gap-16 md:gap-20 list-none m-0"
          >
            {/* Base Background Track Line */}
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px bg-bone/15 pointer-events-none"
              aria-hidden="true"
            />

            {/* Dynamic Signal Orange Fill Line */}
            <div
              ref={fillLineRef}
              className="absolute left-[7px] top-3 bottom-3 w-px bg-signal origin-top scale-y-0 pointer-events-none"
              aria-hidden="true"
            />

            {/* Timeline Entries */}
            {experience?.map((item, index) => (
              <li
                key={`${item.period}-${item.role}`}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                className="relative flex flex-col group [&.is-on_.node]:bg-signal [&.is-on_.node]:scale-100"
              >
                {/* Square Timeline Node */}
                <span
                  className="node absolute -left-10 top-1.5 w-[15px] h-[15px] border border-signal bg-ink scale-75 transition-all duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Period */}
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-dim mb-2">
                  {item.period}
                </span>

                {/* Role / Degree */}
                <h3 className="text-2xl md:text-3xl font-bold text-bone mb-1">
                  {item.role}
                </h3>

                {/* Organization */}
                <span className="font-mono text-sm text-signal font-medium mb-3">
                  {item.org || item.organisation}
                </span>

                {/* Description */}
                <p className="text-bone/70 leading-relaxed text-base md:text-lg max-w-xl">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
