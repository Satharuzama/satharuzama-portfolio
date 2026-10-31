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

    const { serviceId, templateId, publicKey } = emailjsConfig
    const isConfigured =
      Boolean(serviceId && templateId && publicKey) &&
      serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'

    if (!isConfigured) {
      // Fallback: trigger mailto with formatted subject and body
      const formData = new FormData(formRef.current)
      const name = formData.get('user_name') || ''
      const email = formData.get('user_email') || ''
      const message = formData.get('message') || ''

      const subject = encodeURIComponent('Portfolio contact')
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
    { label: 'GitHub', url: socialLinks.github },
    { label: 'LinkedIn', url: socialLinks.linkedin },
    { label: 'Instagram', url: socialLinks.instagram },
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

            {/* Optional Phone */}
            {personalInfo.phone && (
              <p className="font-mono text-sm text-dim">
                {personalInfo.phone}
              </p>
            )}

            {/* Social Links Row */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-6 pt-4 border-t border-bone/10 mt-2">
                {activeSocials.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider text-bone/80 hover:text-signal transition-colors inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">↗</span>
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
