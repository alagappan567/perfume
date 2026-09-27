import useReveal from '../lib/useReveal'
import './Reviews.css'

const REVIEWS = [
  {
    image: '/reviews/20dcdc23e2a4f226f07d20c7877b8cac.jpg',
    name: 'Ethan R.',
    rating: 5,
    text: 'Oud Wood is unreal — rich, warm, and it lasts the entire day without turning sharp.',
  },
  {
    image: '/reviews/661c3eccb4e65e1807e740ef7618ae1c.jpg',
    name: 'Maya L.',
    rating: 5,
    text: 'Lavender Blossom is my new signature. Soft, calming, and I get compliments every time.',
  },
  {
    image: '/reviews/46956dba564442462cef3ad1a8c08ec9.jpg',
    name: 'Priya K.',
    rating: 5,
    text: 'Ruby Passion smells expensive. The bottle alone makes it feel like a gift to myself.',
  },
  {
    image: '/reviews/c093b9cd25b45bf7a7500b7a1b1b7ff1.jpg',
    name: 'Jordan B.',
    rating: 4,
    text: "Blue Wave is fresh without being generic. It's become my everyday scent.",
  },
]

const Star = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#e0a951' : 'none'}>
    <path
      d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.6 6.9-6.2-3.7-6.2 3.7 1.6-6.9L2.1 9.6l7-.7L12 2.5Z"
      stroke="#e0a951"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
)

const Reviews = () => {
  const sectionRef = useReveal([
    { selector: '.reviews-kicker, .reviews-heading', y: 40, duration: 0.8 },
    { selector: '.review-card', y: 60, scale: 0.9, duration: 0.7, stagger: 0.1, start: 'top 78%' },
  ])

  return (
    <section className="reviews" id="reviews" ref={sectionRef}>
      <span className="reviews-kicker">Customer Love</span>
      <h2 className="reviews-heading">What Our Customers Say</h2>
      <div className="reviews-grid">
        {REVIEWS.map((r) => (
          <div className="review-card" key={r.name}>
            <img src={r.image} alt={r.name} className="review-photo" />
            <div className="review-body">
              <div className="review-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} filled={i < r.rating} />
                ))}
              </div>
              <p className="review-text">&ldquo;{r.text}&rdquo;</p>
              <span className="review-name">{r.name}</span>
              <span className="review-role">Verified Buyer</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews
