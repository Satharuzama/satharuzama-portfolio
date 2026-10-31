import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    // Synchronize Lenis scroll position with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's central animation loop
    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Smooth scroll for in-page anchor links
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -60 })
      }
    }
    document.addEventListener('click', handleAnchorClick)

    // Refresh ScrollTrigger calculations on load and once layout stabilizes
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 800)

    // Cleanup resources and event listeners on unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('load', onLoad)
      clearTimeout(timeoutId)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

export default useSmoothScroll
