import { useEffect, useRef, useState } from 'react'
import { personalInfo, socialLinks, contactContent, emailjsConfig } from '../data/portfolioData'
import ScrambleText from './ScrambleText'

export default function Contact() {
  const formRef = useRef(null)
  const timerRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: null, message: '' })

  const firstName = (personalInfo.name || '').trim().split(' ')[0].toLowerCase()

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const setTimedStatus = (type, message) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStatus({ type, message })
    timerRef.current = setTimeout(() => {
      setStatus({ type: null, message: '' })
    }, 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const name = (formData.get('user_name') || '').toString().trim()
    const email = (formData.get('user_email') || '').toString().trim()
    const message = (formData.get('message') || '').toString().trim()

    // Frontend validations
    if (!name || !email || !message) {
      setTimedStatus('error', '✕ Please complete all required fields.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setTimedStatus('error', '✕ Please enter a valid email address.')
      return
    }

    const { serviceId, templateId, publicKey } = emailjsConfig
    const isConfigured =
      Boolean(serviceId && templateId && publicKey) &&
      serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'

    if (!isConfigured) {
      // Fallback: trigger mailto with formatted subject and body
      const subject = encodeURIComponent(`Portfolio contact from ${name}`)
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      )
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`

      window.open(mailtoUrl, '_blank')
      formRef.current.reset()
      setTimedStatus('success', '✓ Message sent. Talk soon.')
      return
    }

    try {
      setIsSubmitting(true)
      const emailjs = await import('@emailjs/browser')
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      formRef.current.reset()
      setTimedStatus('success', '✓ Message sent. Talk soon.')
    } catch (err) {
      console.error('EmailJS Error:', err)
      setTimedStatus('error', '✕ Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter active social links
  const activeSocials = [
    {
      label: 'GitHub',
      url: socialLinks.github,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      url: socialLinks.linkedin,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      url: socialLinks.instagram,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
  ].filter((item) => Boolean(item.url && item.url.trim()))

  return (
    <section
      id="contact"
      className="hud-grid w-full px-5 md:px-10 py-28 md:py-40 border-t border-bone/10"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        {/* LEFT Column: HUD Label, Heading, Description, Email, Phone, Socials */}
        <div className="flex flex-col justify-between">
          <div>
            <ScrambleText
              text={contactContent.label}
              className="font-mono text-xs uppercase tracking-[0.3em] text-signal font-medium mb-4 block"
            />

            <h2 className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-bone mb-6">
              {contactContent.heading}
            </h2>

            <p className="text-lg text-bone/70 max-w-md leading-relaxed mb-10">
              {contactContent.note}
            </p>
          </div>

          <div className="flex flex-col gap-6 pt-4">
            {/* Primary Email Mailto Link */}
            <div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-mono text-lg md:text-2xl text-bone underline decoration-signal decoration-2 underline-offset-8 hover:text-signal transition-colors inline-block"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Social Links Row */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4 border-t border-bone/10 mt-2">
                {activeSocials.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} profile of ${personalInfo.name}`}
                    className="group border border-bone/15 bg-panel/40 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-bone/80 hover:text-signal hover:border-signal/50 hover:bg-panel/80 transition-all inline-flex items-center gap-2"
                  >
                    <span className="text-dim group-hover:text-signal transition-colors">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    <span
                      className="text-dim group-hover:text-signal transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT Column: Terminal-Style Contact Form */}
        <div>
          <div className="hud-frame border border-bone/10 bg-ink/70 backdrop-blur p-6 md:p-10 relative">
            {/* Terminal Command Header */}
            <div className="font-mono text-xs text-dim mb-8 flex items-center gap-2 select-none border-b border-bone/10 pb-4">
              <span className="text-signal font-bold">$</span>
              <span>new message --to {firstName}</span>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              noValidate={false}
            >
              {/* Field 1: Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="user_name"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal"
                >
                  &gt; name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="bg-transparent border-b border-bone/20 focus:border-signal font-mono text-sm text-bone py-2 outline-none rounded-none transition-colors w-full placeholder:text-dim/60"
                />
              </div>

              {/* Field 2: Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="user_email"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal"
                >
                  &gt; email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="bg-transparent border-b border-bone/20 focus:border-signal font-mono text-sm text-bone py-2 outline-none rounded-none transition-colors w-full placeholder:text-dim/60"
                />
              </div>

              {/* Field 3: Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal"
                >
                  &gt; message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  className="bg-transparent border-b border-bone/20 focus:border-signal font-mono text-sm text-bone py-2 outline-none rounded-none transition-colors w-full resize-none placeholder:text-dim/60"
                />
              </div>

              {/* Full-width Square Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-signal text-ink hover:bg-bone transition-colors font-mono text-xs font-semibold uppercase tracking-[0.25em] px-6 py-4 flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                <span>{isSubmitting ? 'Sending…' : 'Send message'}</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>

              {/* Accessible Status Message */}
              <div className="min-h-[24px]">
                {status.message && (
                  <p
                    role="status"
                    className={`font-mono text-xs transition-opacity ${
                      status.type === 'success'
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
