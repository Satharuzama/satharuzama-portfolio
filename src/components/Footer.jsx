import { personalInfo, footerContent, academy } from '../data/portfolioData'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-bone/10 bg-ink py-10 px-5 md:px-10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-dim">
        {/* Left: Brand Copyright */}
        <div>
          <span>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </span>
        </div>

        {/* Center: Tagline */}
        <div className="text-center">
          <span>{footerContent.tagline}</span>
        </div>

        {/* Right: Mandatory TAP Academy Credit */}
        <div>
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
