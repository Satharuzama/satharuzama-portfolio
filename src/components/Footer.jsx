import { personalInfo, navLinks, socialLinks, footerContent, academy } from '../data/portfolioData'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socials = [
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
  ].filter((item) => Boolean(item.url && item.url.trim()))

  return (
    <footer className="w-full overflow-hidden border-t border-bone/10 bg-ink px-5 md:px-10 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto">
        {/* 3-Column Navigation Grid */}
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

        {/* Large Decorative Watermark Brand */}
        <div
          className="w-full text-center overflow-hidden my-6 md:my-10 select-none pointer-events-none"
          aria-hidden="true"
        >
          <span className="block uppercase whitespace-nowrap text-[13.5vw] font-bold leading-none tracking-[-0.05em] text-bone/[0.05]">
            {personalInfo.brandName}
          </span>
        </div>

        {/* Bottom Metadata & Credits Row */}
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
