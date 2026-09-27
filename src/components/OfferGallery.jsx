import useReveal from '../lib/useReveal'
import './OfferGallery.css'

const LEFT_CARDS = [
  {
    image: '/people/d492f5583260f1fcab1978a61a8cbd2d.jpg',
    offer: '20% Off First Order',
    sub: 'Code FRUITIVO20',
  },
  {
    image: '/people/7d555b95ffefb9fc9c5f64c340e77b87.jpg',
    offer: 'Free Shipping $75+',
    sub: 'On every fragrance',
  },
]

const MIDDLE_CARDS = [
  {
    image: '/banner/9d2935b8-e64b-4da5-bbf9-131a9b83f82e.png',
    offer: 'New: Blue Wave',
    sub: 'A wave of freshness',
  },
  {
    image: '/banner/a8a2f266-9745-4ab2-9480-c0900e5e0e12.png',
    offer: 'Shop The Collection',
    sub: 'Four signature scents',
  },
  {
    image: '/banner/3452da4c-b8af-400c-8278-89986c138532.png',
    offer: 'Limited Edition',
    sub: 'While supplies last',
  },
]

const RIGHT_CARDS = [
  {
    image: '/people/1d79a2f96c55e40ed685105da216843d.jpg',
    offer: '100% Organic',
    sub: 'Certified ingredients',
  },
  {
    image: '/people/af6777ce69cecd4b65da707386eb43c6.jpg',
    offer: 'Refer A Friend',
    sub: 'Give $10, get $10',
  },
]

const GalleryCard = ({ card, tall }) => (
  <div className={`gallery-card ${tall ? 'is-tall' : 'is-wide'}`}>
    <img src={card.image} alt="" className="gallery-card-img" />
    <div className="gallery-card-overlay">
      <span className="gallery-card-offer">{card.offer}</span>
      <span className="gallery-card-sub">{card.sub}</span>
    </div>
  </div>
)

const OfferGallery = () => {
  const sectionRef = useReveal([
    { selector: '.offer-gallery-header', y: 30, duration: 0.7 },
    { selector: '.offer-gallery-col:first-child .gallery-card', x: -80, duration: 0.8, stagger: 0.12, start: 'top 78%' },
    { selector: '.offer-gallery-col--wide .gallery-card', y: -50, scale: 0.9, duration: 0.8, stagger: 0.1, start: 'top 78%' },
    { selector: '.offer-gallery-col:last-child .gallery-card', x: 80, duration: 0.8, stagger: 0.12, start: 'top 78%' },
  ])

  return (
    <section className="offer-gallery" ref={sectionRef}>
      <svg
        className="offer-gallery-top-wave"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          fill="#f8f4ee"
        />
      </svg>
      <div className="offer-gallery-header">
        <span className="offer-gallery-kicker">Hover To Reveal</span>
        <h2>Offers Worth Discovering</h2>
      </div>

      <div className="offer-gallery-grid">
        <div className="offer-gallery-col">
          {LEFT_CARDS.map((card, i) => (
            <GalleryCard card={card} tall key={i} />
          ))}
        </div>
        <div className="offer-gallery-col offer-gallery-col--wide">
          {MIDDLE_CARDS.map((card, i) => (
            <GalleryCard card={card} key={i} />
          ))}
        </div>
        <div className="offer-gallery-col">
          {RIGHT_CARDS.map((card, i) => (
            <GalleryCard card={card} tall key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OfferGallery
