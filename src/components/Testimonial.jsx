import useReveal from '../lib/useReveal'
import './Testimonial.css'

const TESTIMONIAL_IMAGE = '/people/bc35a325a8cfb0a10757433a4e67cc4c.jpg'

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#e0a951">
    <path d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.6 6.9-6.2-3.7-6.2 3.7 1.6-6.9L2.1 9.6l7-.7L12 2.5Z" />
  </svg>
)

const Testimonial = () => {
  const sectionRef = useReveal([
    { selector: '.testimonial-quote', x: -60, duration: 0.8 },
    { selector: '.testimonial-visual', x: 80, duration: 0.8, start: 'top 75%' },
  ])

  return (
  <section className="testimonial" ref={sectionRef}>
    <div className="testimonial-inner">
      <div className="testimonial-quote">
        <svg className="testimonial-mark" width="52" height="40" viewBox="0 0 36 28" fill="none">
          <path
            d="M10.6 0C4.7 3.4 0 9.6 0 16.6 0 22.9 4.4 28 10.6 28c5.2 0 9-4 9-9 0-4.7-3.4-8.4-7.8-8.4-.9 0-1.7.1-2.3.4C10.2 6.4 13.8 2.6 18.6 0h-8ZM28 0c-5.9 3.4-10.6 9.6-10.6 16.6 0 6.3 4.4 11.4 10.6 11.4 5.2 0 9-4 9-9 0-4.7-3.4-8.4-7.8-8.4-.9 0-1.7.1-2.3.4C27.6 6.4 31.2 2.6 36 0h-8Z"
            fill="currentColor"
          />
        </svg>

        <div className="testimonial-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} />
          ))}
        </div>

        <p>
          Fruitivo completely changed my fragrance routine. The oils feel
          real, the scent lasts all day, and I finally found bottles
          I&apos;m proud to leave out on my dresser.
        </p>

        <div className="testimonial-person">
          <span className="testimonial-avatar">SM</span>
          <div>
            <span className="testimonial-name">Sophia M.</span>
            <span className="testimonial-role">Verified customer</span>
          </div>
        </div>

        <div className="testimonial-stats">
          <div className="testimonial-stat">
            <strong>4.9</strong>
            <span>Average rating</span>
          </div>
          <div className="testimonial-stat">
            <strong>2,400+</strong>
            <span>Reviews</span>
          </div>
          <div className="testimonial-stat">
            <strong>18k+</strong>
            <span>Happy noses</span>
          </div>
        </div>
      </div>

      <div className="testimonial-visual">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <clipPath id="testimonial-s-curve" clipPathUnits="objectBoundingBox">
              <path d="M0.25,0 C0.05,0.15 0.35,0.25 0.15,0.4 C-0.05,0.55 0.35,0.6 0.2,0.75 C0.05,0.9 0.3,0.95 0.25,1 L1,1 L1,0 Z" />
            </clipPath>
          </defs>
        </svg>
        <img src={TESTIMONIAL_IMAGE} alt="" className="testimonial-visual-img" />
      </div>
    </div>
  </section>
  )
}

export default Testimonial
