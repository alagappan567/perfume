import { useEffect, useRef, useState } from 'react'
import { FaHeart, FaFire, FaGem, FaLeaf, FaCompass, FaCrown, FaBolt } from 'react-icons/fa'
import './MoodSelector.css'

const MOODS = [
  {
    title: 'The Romantic',
    description: 'Warm florals for golden-hour moments',
    image: '/people/a127d1dc816a727207dfcd788e440d3f.jpg',
    icon: <FaHeart size={20} className="mood-icon-svg" />,
  },
  {
    title: 'The Magnetic',
    description: 'Deep, smoky notes that linger',
    image: '/people/c6d03a9f02d2cfb0410ae129e6e6f95c.jpg',
    icon: <FaFire size={20} className="mood-icon-svg" />,
  },
  {
    title: 'The Icon',
    description: 'Bold, unapologetic elegance',
    image: '/people/ed7c9b6e46615e66e8f44b328fd616d3.jpg',
    icon: <FaGem size={20} className="mood-icon-svg" />,
  },
  {
    title: 'The Free Spirit',
    description: 'Fresh greens, botanical calm',
    image: '/people/1b05dd54172b151618ac9b7ecba9e51d.jpg',
    icon: <FaLeaf size={20} className="mood-icon-svg" />,
  },
  {
    title: 'The Adventurer',
    description: 'Daring scents for bold days',
    image: '/people/af6777ce69cecd4b65da707386eb43c6.jpg',
    icon: <FaCompass size={20} className="mood-icon-svg" />,
  },
  {
    title: 'The Seductress',
    description: 'Amber warmth, magnetic allure',
    image: '/people/a83ce099b074f55ed9d9f3bc5c51ae93.jpg',
    icon: <FaCrown size={20} className="mood-icon-svg" />,
  },
  {
    title: 'The Rebel',
    description: 'Fresh, fearless, unforgettable',
    image: '/people/f4e9be922233f0d3c234809267fdf86d.jpg',
    icon: <FaBolt size={20} className="mood-icon-svg" />,
  },
]

const MoodSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedIndexes, setAnimatedIndexes] = useState([])
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            setInView(true)
            MOODS.forEach((_, i) => {
              setTimeout(() => {
                setAnimatedIndexes((prev) => [...prev, i])
              }, 130 * i)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`mood-selector ${inView ? 'is-in-view' : ''}`} ref={sectionRef}>
      <svg
        className="mood-selector-top-wave"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          fill="#1a1a1a"
        />
      </svg>
      <div className="mood-selector-header">
        <span className="mood-selector-kicker">Find Your Match</span>
        <h2>Find Your Fragrance Mood</h2>
        <p>Every scent tells a story — click to discover yours.</p>
      </div>

      <div className="mood-options">
        {MOODS.map((mood, index) => {
          const isActive = activeIndex === index
          return (
            <div
              key={mood.title}
              className={`mood-option ${isActive ? 'is-active' : ''}`}
              style={{
                backgroundImage: `url('${mood.image}')`,
                backgroundSize: isActive ? 'cover' : 'auto 120%',
                opacity: animatedIndexes.includes(index) ? 1 : 0,
                transform: animatedIndexes.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                flex: isActive ? '7 1 0%' : '1 1 0%',
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="mood-option-shadow" />
              <div className="mood-option-label">
                <span className="mood-option-icon">{mood.icon}</span>
                <div className="mood-option-info">
                  <div className="mood-option-title">{mood.title}</div>
                  <div className="mood-option-sub">{mood.description}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MoodSelector
