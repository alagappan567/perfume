import useReveal from '../lib/useReveal'
import './PromoOffers.css'

const TILES = [
  {
    image: '/banner/9d2935b8-e64b-4da5-bbf9-131a9b83f82e.png',
    heading: '20% Off Your First Order',
    body: 'New to Fruitivo? Use code FRUITIVO20 at checkout and save on your first bottle.',
    cta: 'Claim Your Discount',
    icon: (
      <path
        d="M4 12.5 12.5 4h6a1.5 1.5 0 0 1 1.5 1.5v6L11.5 20 4 12.5Z M15.5 8.5h.01"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    image: '/banner/3452da4c-b8af-400c-8278-89986c138532.png',
    heading: 'Free Shipping Over $75',
    body: "Stock up on your favorite scents and we'll get them to your door for free.",
    cta: 'Shop & Save',
    icon: (
      <path
        d="M2 7h11v9H2V7Zm11 3h4l3 3v3h-7v-6ZM5.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm12 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
]

const PromoOffers = () => {
  const sectionRef = useReveal([
    { selector: '.promo-tile', y: 50, duration: 0.75, stagger: 0.14, start: 'top 82%' },
  ])

  return (
    <section className="promo-offers" ref={sectionRef}>
      <div className="promo-offers-grid">
        {TILES.map((t) => (
          <div className="promo-tile" key={t.heading} style={{ backgroundImage: `url('${t.image}')` }}>
            <div className="promo-tile-overlay" />
            <span className="promo-tile-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {t.icon}
              </svg>
            </span>
            <div className="promo-tile-content">
              <h3>{t.heading}</h3>
              <p>{t.body}</p>
              <button className="promo-tile-btn">{t.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PromoOffers
