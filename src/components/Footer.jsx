import { useEffect, useRef } from 'react'
import { personalInfo, navLinks, socialLinks, footerContent, academy } from '../data/portfolioData'

function WatermarkBrand({ firstWord, remainingWords }) {
  const containerRef = useRef(null)
  const desktopTextRef = useRef(null)
  const mobileWordRef = useRef(null)
  const mobileWrapperRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId = null

    const adjust = () => {
      const containerWidth = container.clientWidth || window.innerWidth
      if (!containerWidth) return

      // Desktop / Laptop / Tablet (>= 640px): Full name on ONE line occupying ~95% viewport width
      if (containerWidth >= 640) {
        const desktopEl = desktopTextRef.current
        if (desktopEl) {
          const currentFontSize = parseFloat(window.getComputedStyle(desktopEl).fontSize) || 100
          const currentWidth = desktopEl.getBoundingClientRect().width
          if (currentWidth > 0) {
            const targetWidth = containerWidth * 0.95
            if (Math.abs(currentWidth - targetWidth) > 1) {
              const scaledFontSize = currentFontSize * (targetWidth / currentWidth)
              desktopEl.style.fontSize = `${scaledFontSize.toFixed(2)}px`
            }
          }
        }
      } else {
        // Mobile (< 640px): Two centered lines, scaling "SATARUZAMA" to occupy ~92-94% of viewport width
        const mobileEl = mobileWordRef.current
        const wrapperEl = mobileWrapperRef.current
        if (mobileEl && wrapperEl) {
          const currentFontSize = parseFloat(window.getComputedStyle(mobileEl).fontSize) || 40
          const currentWidth = mobileEl.getBoundingClientRect().width
          if (currentWidth > 0) {
            const targetWidth = containerWidth * 0.92
            if (Math.abs(currentWidth - targetWidth) > 1) {
              const scaledFontSize = currentFontSize * (targetWidth / currentWidth)
              wrapperEl.style.fontSize = `${scaledFontSize.toFixed(2)}px`
            }
          }
        }
      }
    }

    // Run initial measurement
    adjust()

    // Recalculate once web fonts finish loading to ensure precise glyph dimensions
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        adjust()
      })
    }

    // ResizeObserver catches container size changes smoothly without lag
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(adjust)
    })
    resizeObserver.observe(container)

    window.addEventListener('resize', adjust)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', adjust)
    }
  }, [firstWord, remainingWords])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden flex justify-center items-center my-6 md:my-10 select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Desktop / Laptop / Tablet (>= 640px): Full name on ONE line */}
      <span
        ref={desktopTextRef}
        className="hidden sm:inline-block uppercase font-bold tracking-[-0.04em] text-bone/[0.05] leading-none whitespace-nowrap text-center"
        style={{ fontSize: 'clamp(3rem, 10.85vw, 18rem)' }}
      >
        {firstWord} {remainingWords}
      </span>

      {/* Mobile (< 640px): Two centered lines */}
      <div
        ref={mobileWrapperRef}
        className="flex sm:hidden flex-col items-center uppercase font-bold tracking-[-0.04em] text-bone/[0.05] leading-[0.9] text-center"
        style={{ fontSize: 'clamp(2.5rem, 15vw, 5rem)' }}
      >
        <span>{firstWord}</span>
        <span ref={mobileWordRef}>{remainingWords}</span>
      </div>
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socials = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((item) => Boolean(item.url && item.url.trim()))

  // Split brand name so it can render as one line on desktop and two centered lines on small screens
  const brandParts = (personalInfo.brandName || '').trim().split(' ')
  const firstWord = brandParts[0] || ''
  const remainingWords = brandParts.slice(1).join(' ') || ''

  return (
    <footer className="w-full overflow-hidden border-t border-bone/10 bg-ink pt-16 pb-8">
      {/* 3-Column Navigation Grid (constrained to max-w-[1440px] with responsive padding) */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14 font-mono text-xs">
          {/* Col 1: Navigate */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold">
              Navigate
            </span>
            <nav className="flex flex-col gap-2.5" aria-label="Footer Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-bone/75 hover:text-signal transition-colors text-sm w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 2: Elsewhere */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold">
              Elsewhere
            </span>
            <div className="flex flex-col gap-2.5">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} profile of ${personalInfo.name}`}
                  className="text-bone/75 hover:text-signal transition-colors text-sm flex items-center gap-1 w-fit"
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Reach / Location */}
          <div className="flex flex-col md:items-end gap-3 md:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal font-semibold">
              Say hello
            </span>
            <div className="flex flex-col md:items-end gap-1.5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-bone/75 hover:text-signal transition-colors text-sm font-mono"
              >
                {personalInfo.email}
              </a>
              <span className="font-mono text-xs text-dim">{personalInfo.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Large Decorative Watermark Brand - FULL-BLEED (spans 100% viewport width) */}
      <WatermarkBrand firstWord={firstWord} remainingWords={remainingWords} />

      {/* Bottom Metadata & Credits Row (constrained to max-w-[1440px] with responsive padding) */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="border-t border-bone/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-dim flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <span>
            © {currentYear} {personalInfo.name} · {footerContent.tagline}
          </span>
          <span className="flex items-center gap-1.5">
            Trained at{' '}
            <a
              href={academy.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${academy.name} placement training website`}
              className="text-bone hover:text-signal transition-colors underline underline-offset-4 decoration-bone/30 hover:decoration-signal"
            >
              {academy.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
