import { useEffect } from 'react'
import gsap from 'gsap'

// Pointer-tracked 3D tilt for card-style elements. `hoverSelector` picks
// which elements listen for the pointer; `targetSelector` (defaults to the
// same element) picks what actually tilts - letting a wider hit area drive
// a tilt on just an inner wrapper, e.g. text overlaying a fixed image.
export default function useTilt(ref, hoverSelector, options = {}) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const hosts = [...root.querySelectorAll(hoverSelector)]
    const maxTilt = options.maxTilt ?? 12
    const liftScale = options.scale ?? 1.04
    const targetSelector = options.targetSelector

    const cleanups = hosts.map((host) => {
      const target = targetSelector ? host.querySelector(targetSelector) : host
      if (!target) return () => {}

      gsap.set(target, { transformPerspective: 800 })
      const quickX = gsap.quickTo(target, 'rotateX', { duration: 0.45, ease: 'power3.out' })
      const quickY = gsap.quickTo(target, 'rotateY', { duration: 0.45, ease: 'power3.out' })
      const quickScale = gsap.quickTo(target, 'scale', { duration: 0.45, ease: 'power3.out' })

      const onMove = (e) => {
        const rect = host.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        quickY(px * maxTilt * 2)
        quickX(-py * maxTilt * 2)
        quickScale(liftScale)
      }
      const onLeave = () => {
        quickX(0)
        quickY(0)
        quickScale(1)
      }

      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
      return () => {
        host.removeEventListener('pointermove', onMove)
        host.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => cleanups.forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, hoverSelector])
}
