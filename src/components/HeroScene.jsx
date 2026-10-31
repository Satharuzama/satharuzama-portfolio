import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Dimensions
    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // 2. Signal Core 3D Group
    const group = new THREE.Group()
    scene.add(group)

    // (1) Outer Shell: Icosahedron wireframe edges in signal orange (#ff5b1f)
    const outerIcosaGeom = new THREE.IcosahedronGeometry(1.9, 1)
    const outerEdgesGeom = new THREE.EdgesGeometry(outerIcosaGeom)
    const outerMaterial = new THREE.LineBasicMaterial({
      color: 0xff5b1f,
      transparent: true,
      opacity: prefersReducedMotion ? 0.9 : 0.0,
    })
    const outerShell = new THREE.LineSegments(outerEdgesGeom, outerMaterial)
    group.add(outerShell)

    // (2) Inner Core: Dense constellation points in bone (#e8e6df)
    const innerGeom = new THREE.IcosahedronGeometry(1.15, 4)
    const innerMaterial = new THREE.PointsMaterial({
      color: 0xe8e6df,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    })
    const innerCore = new THREE.Points(innerGeom, innerMaterial)
    group.add(innerCore)

    // (3) Orbit Ring: Tilted ellipse loop
    const curve = new THREE.EllipseCurve(0, 0, 2.7, 2.7, 0, 2 * Math.PI, false, 0)
    const ringPoints = curve.getPoints(128)
    const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPoints)
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xe8e6df,
      transparent: true,
      opacity: 0.18,
    })
    const orbitRing = new THREE.LineLoop(ringGeom, ringMaterial)
    orbitRing.rotation.x = Math.PI / 2.4
    group.add(orbitRing)

    // Initial scale for intro materialisation
    if (prefersReducedMotion) {
      group.scale.set(1, 1, 1)
    } else {
      group.scale.set(0.6, 0.6, 0.6)
    }

    // 3. User Interaction States
    let mouseRotX = 0
    let mouseRotY = 0
    let dragRotX = 0
    let dragRotY = 0
    let autoSpinY = 0

    let isDragging = false
    let prevPointerX = 0
    let prevPointerY = 0

    // Tilt towards mouse on window pointermove
    const handlePointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = (e.clientY / window.innerHeight) * 2 - 1
      mouseRotY = normX * 0.4
      mouseRotX = normY * 0.25

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX
        const deltaY = e.clientY - prevPointerY
        dragRotY += deltaX * 0.01
        dragRotX += deltaY * 0.01
        prevPointerX = e.clientX
        prevPointerY = e.clientY
      }
    }

    // Drag rotation on canvas
    const handleCanvasPointerDown = (e) => {
      isDragging = true
      prevPointerX = e.clientX
      prevPointerY = e.clientY
    }

    const handlePointerUp = () => {
      isDragging = false
    }

    renderer.domElement.addEventListener('pointerdown', handleCanvasPointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    // 4. Responsive Resizing
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      if (!newWidth || !newHeight) return

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // 5. Visibility Tracking: pause rendering when off-screen
    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    observer.observe(container)

    // 6. Animation Loop
    let rafId = null
    const clock = new THREE.Clock()
    const startTime = performance.now()

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      // Skip GPU draw calls when outside viewport
      if (!isVisible) return

      const elapsed = clock.getElapsedTime()
      const now = performance.now()

      // Materialise intro (grow scale 0.6 -> 1 and fade in opacity over ~1s)
      if (!prefersReducedMotion) {
        const introDuration = 1000
        const progress = Math.min((now - startTime) / introDuration, 1)
        if (progress < 1) {
          // Ease-out cubic
          const ease = 1 - Math.pow(1 - progress, 3)
          const currentScale = 0.6 + 0.4 * ease
          group.scale.set(currentScale, currentScale, currentScale)
          outerMaterial.opacity = 0.9 * ease
        } else {
          group.scale.set(1, 1, 1)
          outerMaterial.opacity = 0.9
        }

        // Slow auto-spin on Y
        autoSpinY += 0.0025
      }

      // Inner points rotate in reverse direction
      innerCore.rotation.y = -elapsed * 0.15

      // Smooth damping toward target rotation (factor 0.06)
      const targetX = mouseRotX + dragRotX
      const targetY = mouseRotY + autoSpinY + dragRotY

      group.rotation.x += (targetX - group.rotation.x) * 0.06
      group.rotation.y += (targetY - group.rotation.y) * 0.06

      renderer.render(scene, camera)
    }

    animate()

    // 7. Comprehensive Cleanup on Unmount
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()

      renderer.domElement.removeEventListener('pointerdown', handleCanvasPointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('resize', handleResize)

      // Dispose all geometries
      outerIcosaGeom.dispose()
      outerEdgesGeom.dispose()
      innerGeom.dispose()
      ringGeom.dispose()

      // Dispose all materials
      outerMaterial.dispose()
      innerMaterial.dispose()
      ringMaterial.dispose()

      // Cleanup renderer & WebGL context
      renderer.dispose()
      renderer.forceContextLoss()
      if (renderer.domElement.parentElement) {
        renderer.domElement.remove()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive 3D shape — drag to rotate"
      data-cursor="hot"
      className="h-full w-full cursor-grab active:cursor-grabbing"
    />
  )
}
