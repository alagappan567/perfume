import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import { perfumes } from '../data/perfumes'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const BG_TRANSITION = { duration: 0.6, ease: 'easeInOut' }
const SLIDE_TRANSITION = { duration: 0.65, ease: [0.32, 0.72, 0, 1] }

// Only ever one scene enters and one exits per transition, so each side's
// start/end is computed fresh from the current `direction` - no stale
// position carried over from an earlier, possibly different-direction move.
const sceneVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

const Hero = () => {
  const [[index, direction], setSlide] = useState([0, 1])
  const heroRef = useRef(null)
  const bottleFlyRefs = useRef({})
  const len = perfumes.length
  const current = perfumes[index]

  const goTo = (nextIndex, dir) => setSlide([nextIndex, dir])
  const prev = () => goTo((index - 1 + len) % len, -1)
  const next = () => goTo((index + 1) % len, 1)

  // Flies the currently active bottle down out of the hero and into its
  // matching (intentionally empty) Best Sellers card slot as the user
  // scrolls - same scroll-scrubbed transform technique as the ice-cream
  // reference Hero: animate the real element via GSAP ScrollTrigger, no
  // clone needed.
  useLayoutEffect(() => {
    const flyEl = bottleFlyRefs.current[current.id]
    const cardImg = document.querySelector(
      `.bs-card-img[data-perfume-id="${current.id}"]`
    )
    const card = cardImg?.closest('.bs-card')
    if (!flyEl || !cardImg || !card) return

    document.querySelectorAll('.bs-card-img').forEach((img) => {
      img.style.opacity = ''
    })
    cardImg.style.opacity = '0'

    let ctx
    let cancelled = false
    // Wait for the crossfade to settle and web fonts to finish loading
    // before measuring rects - a late font swap reflows the Best Sellers
    // section's text and throws off the landing spot.
    const ready = Promise.all([
      new Promise((resolve) => setTimeout(resolve, 650)),
      document.fonts?.ready ?? Promise.resolve(),
    ])

    ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        const dstRect = cardImg.getBoundingClientRect()
        const srcRect = flyEl.querySelector('.hero-bottle-img').getBoundingClientRect()
        const flyElRect = flyEl.getBoundingClientRect()
        const srcCx = srcRect.left + srcRect.width / 2
        const srcCy = srcRect.top + srcRect.height / 2
        const dstCx = dstRect.left + dstRect.width / 2
        const dstCy = dstRect.top + dstRect.height / 2
        const wCx = flyElRect.left + flyElRect.width / 2
        const wCy = flyElRect.top + flyElRect.height / 2
        const scale = dstRect.width / srcRect.width

        gsap.set(flyEl, { zIndex: 300, opacity: 1 })

        const x = dstCx - wCx - scale * (srcCx - wCx)
        const y = dstCy - wCy - scale * (srcCy - wCy)

        gsap.to(flyEl, {
          x,
          y,
          scale,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            endTrigger: card,
            end: 'top 140px',
            scrub: true,
            // Hero has no z-index of its own (so Categories' floating card
            // can overlap its bottom edge at rest) - but that same low
            // stacking traps the flying bottle underneath Categories mid-
            // transit. Lift Hero above it only while actually scrubbing
            // through the fly range, and drop it back once at either end.
            onUpdate: (self) => {
              heroRef.current.style.zIndex = self.progress > 0 && self.progress < 1 ? 25 : ''
            },
            onLeave: () => {
              cardImg.style.opacity = '1'
              flyEl.style.opacity = '0'
              heroRef.current.style.zIndex = ''
            },
            onEnterBack: () => {
              cardImg.style.opacity = '0'
              flyEl.style.opacity = '1'
            },
          },
        })
      }, heroRef)
    })

    return () => {
      cancelled = true
      ctx?.revert()
      cardImg.style.opacity = ''
      flyEl.style.opacity = ''
      heroRef.current.style.zIndex = ''
      gsap.set(flyEl, { zIndex: '', x: 0, y: 0, scale: 1 })
    }
  }, [index, current.id])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <motion.div
        className="hero-bg-layer"
        animate={{ backgroundColor: current.bgColor }}
        transition={BG_TRANSITION}
      >
        <motion.div
          className="hero-circle hero-circle--left"
          animate={{ backgroundColor: current.circleColor }}
          transition={BG_TRANSITION}
        />
        <motion.div
          className="hero-circle hero-circle--right"
          animate={{ backgroundColor: current.circleColor }}
          transition={BG_TRANSITION}
        />
      </motion.div>

      <Navbar />

      <div className="hero-main">
        <div className="hero-pills">
          {perfumes.map((p) => (
            <button
              key={p.id}
              className={`hero-pill ${p.id === current.id ? 'is-current' : ''}`}
              style={p.id === current.id ? { color: current.bgColor } : undefined}
              onClick={() => {
                const target = perfumes.findIndex((pf) => pf.id === p.id)
                if (target === index) return
                goTo(target, target > index ? 1 : -1)
              }}
            >
              {p.tag}
            </button>
          ))}
        </div>

        <div className="hero-body">
          <motion.div
            className="hero-text"
            animate={{ color: current.textColor }}
            transition={BG_TRANSITION}
          >
            <h1>
              <span className="hero-title-word">
                Nature&apos;s
                <svg className="hero-title-leaf" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 20c0-8 6-14 14-14 0 8-6 14-14 14Z" fill="#4CAF50" />
                </svg>
              </span>{' '}
              Organic
              <br />
              Fragrance
            </h1>
            <motion.p animate={{ color: current.subTextColor }} transition={BG_TRANSITION}>
              Crafted with 100% organic ingredients, our fragrances bring
              nature&apos;s purest essence to you.
            </motion.p>
            <div className="hero-actions">
              <button className="btn btn-cream" style={{ color: current.bgColor }}>
                Shop Now
              </button>
              <button className="btn btn-outline">Learn More</button>
            </div>

            <div className="hero-nav">
              <button className="hero-arrow" onClick={prev} aria-label="Previous fragrance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="hero-nav-count">
                {String(index + 1).padStart(2, '0')} / {String(len).padStart(2, '0')}
              </span>
              <button className="hero-arrow" onClick={next} aria-label="Next fragrance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>

          <div className="hero-right">
            <div className="hero-visual">
              <div className="hero-visual-mask">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={current.id}
                    src={current.scene}
                    alt=""
                    className="hero-scene-img"
                    custom={direction}
                    variants={sceneVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SLIDE_TRANSITION}
                  />
                </AnimatePresence>
              </div>

              <div className="hero-visual-bottle-layer">
                {perfumes.map((p, i) => (
                  <div
                    key={p.id}
                    className="hero-bottle-fly"
                    data-perfume-id={p.id}
                    ref={(el) => (bottleFlyRefs.current[p.id] = el)}
                  >
                    <motion.img
                      src={p.bottle}
                      alt={p.name}
                      className={`hero-bottle-img ${!p.bottleIsCutout ? 'is-masked' : ''}`}
                      animate={{ opacity: i === index ? 1 : 0 }}
                      transition={{ duration: 0 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-badges">
              <div className={`hero-badge ${current.accent === 'purple' ? 'is-purple' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 20c0-8 6-14 14-14 0 8-6 14-14 14Z" className="hero-badge-icon-leaf" />
                </svg>
                <span>
                  100%
                  <br />
                  Organic
                </span>
              </div>
              <div className={`hero-badge ${current.accent === 'purple' ? 'is-purple' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3c3.5 4 6 7.4 6 10.5A6 6 0 1 1 6 13.5C6 10.4 8.5 7 12 3Z"
                    className="hero-badge-icon-drop"
                  />
                </svg>
                <span>
                  Natural
                  <br />
                  Essential Oils
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
