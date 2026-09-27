import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Accepts either a single selector string (classic 2D fade-up) or an array
// of { selector, ...tween overrides } groups sharing the same section
// trigger, each animated independently - lets a section fade text in one
// way while images tilt in from off-screen another way.
export default function useReveal(groups, sharedOptions = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const list =
      typeof groups === 'string' ? [{ selector: groups, ...sharedOptions }] : groups

    const ctx = gsap.context(() => {
      list.forEach((g) => {
        const targets = ref.current.querySelectorAll(g.selector)
        if (!targets.length) return

        gsap.from(targets, {
          opacity: 0,
          y: g.y ?? 60,
          x: g.x ?? 0,
          rotateX: g.rotateX ?? 0,
          rotateY: g.rotateY ?? 0,
          scale: g.scale ?? 1,
          transformPerspective: g.perspective ?? 1000,
          transformOrigin: g.transformOrigin ?? 'center center',
          duration: g.duration ?? 0.9,
          ease: g.ease ?? 'power3.out',
          stagger: g.stagger ?? 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: g.start ?? 'top 80%',
          },
        })
      })
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
