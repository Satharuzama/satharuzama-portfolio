import { useEffect, useState } from 'react'
import { personalInfo, navLinks, heroContent } from '../data/portfolioData'

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Hud() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [timeString, setTimeString] = useState('')

  // Track scroll position to apply background blur and border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cycle through HUD status lines every 4s with a smooth fade transition
  useEffect(() => {
    const lines = heroContent?.statusLines
    if (!lines || lines.length <= 1) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let fadeTimeout = null

    const statusInterval = setInterval(() => {
      if (prefersReducedMotion) {
        setStatusIndex((prev) => (prev + 1) % lines.length)
        return
      }

      setIsFading(true)
      fadeTimeout = setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % lines.length)
        setIsFading(false)
      }, 300)
    }, 4000)

    return () => {
      clearInterval(statusInterval)
      if (fadeTimeout) clearTimeout(fadeTimeout)
    }
  }, [])

  // Live 24-hour clock for the developer's timezone
  useEffect(() => {
    const timeZone = personalInfo.timezone || 'Asia/Kolkata'
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const updateClock = () => {
      setTimeString(formatter.format(new Date()))
    }
    updateClock()
    const clockInterval = setInterval(updateClock, 1000)
    return () => clearInterval(clockInterval)
  }, [])

  const isBarActive = isScrolled || isMenuOpen
  const initials = getInitials(personalInfo.brandName)
  const currentStatus = heroContent.statusLines?.[statusIndex] || ''

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 ${
        isBarActive
          ? 'bg-ink/80 backdrop-blur-md border-b border-bone/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">
        {/* Left: Brand Initials Badge & Name */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          aria-label={`${personalInfo.brandName} - Return to top`}
        >
          <div className="w-8 h-8 flex items-center justify-center border border-signal font-mono text-xs font-semibold text-signal transition-colors group-hover:bg-signal group-hover:text-ink">
            {initials}
          </div>
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors group-hover:text-signal">
            {personalInfo.brandName}
          </span>
        </a>

        {/* Centre (lg and up): Rotating Status Indicator */}
        {heroContent.statusLines?.length > 0 && (
          <div
            className="hidden lg:flex items-center gap-2.5 w-[290px] flex-shrink-0"
            aria-live="polite"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse flex-shrink-0"
              aria-hidden="true"
            />
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.18em] text-dim whitespace-nowrap transition-opacity duration-300 ease-in-out ${
                isFading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {currentStatus}
            </span>
          </div>
        )}

        {/* Right (md and up): Navigation Links & Live Clock */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.18em] text-bone/70 hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div
            className="font-mono text-xs tabular-nums text-dim pl-4 border-l border-bone/10"
            title={personalInfo.timezone}
          >
            {timeString}
          </div>
        </div>

        {/* Mobile (below md): Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden font-mono uppercase text-xs tracking-wider text-bone hover:text-signal transition-colors px-2 py-1"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-hud-menu"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMenuOpen && (
        <div
          id="mobile-hud-menu"
          className="md:hidden absolute top-16 inset-x-0 bg-ink/95 backdrop-blur-lg border-b border-bone/10 px-6 py-6 flex flex-col"
        >
          {/* Mobile Rotating Status Indicator */}
          {heroContent.statusLines?.length > 0 && (
            <div
              className="flex items-center gap-2.5 pb-4 mb-4 border-b border-bone/10"
              aria-live="polite"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse flex-shrink-0"
                aria-hidden="true"
              />
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.18em] text-dim transition-opacity duration-300 ease-in-out ${
                  isFading ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {currentStatus}
              </span>
            </div>
          )}

          <nav className="flex flex-col mb-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold border-b border-bone/10 py-4 text-bone hover:text-signal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between font-mono text-xs text-dim pt-2">
            <span>{personalInfo.city}</span>
            <span className="tabular-nums" title={personalInfo.timezone}>
              {timeString}
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
