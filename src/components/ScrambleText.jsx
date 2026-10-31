import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/'

export default function ScrambleText({
  text = '',
  as: Tag = 'span',
  className = '',
  delay = 0,
  speed = 30,
  trigger = 'view',
}) {
  const containerRef = useRef(null)
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    let intervalId = null
    let timeoutId = null
    let observer = null
    let hasStarted = false

    const startScramble = () => {
      if (hasStarted) return
      hasStarted = true

      timeoutId = setTimeout(() => {
        let frame = 0
        intervalId = setInterval(() => {
          frame++
          const lockedCount = Math.floor(frame / 2)

          if (lockedCount >= text.length) {
            setDisplay(text)
            clearInterval(intervalId)
            intervalId = null
            return
          }

          let scrambled = ''
          for (let i = 0; i < text.length; i++) {
            if (i < lockedCount) {
              scrambled += text[i]
            } else if (text[i] === ' ') {
              scrambled += ' '
            } else {
              scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            }
          }
          setDisplay(scrambled)
        }, speed)
      }, delay)
    }

    if (trigger === 'mount') {
      startScramble()
    } else {
      const element = containerRef.current
      if (!element) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              startScramble()
              if (observer && element) {
                observer.unobserve(element)
              }
            }
          })
        },
        { threshold: 0.4 },
      )

      observer.observe(element)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
      if (observer) observer.disconnect()
    }
  }, [text, delay, speed, trigger])

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
}
