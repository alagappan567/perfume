import './OfferMarquee.css'

const OFFERS = [
  'FREE SHIPPING ON ORDERS OVER $75',
  '20% OFF YOUR FIRST ORDER — CODE FRUITIVO20',
  '100% ORGANIC & CRUELTY-FREE',
  'NEW: LAVENDER BLOSSOM IS HERE',
  'HAND-BLENDED IN SMALL BATCHES',
]

const OfferMarqueeTrack = () => (
  <div className="offer-track">
    {OFFERS.map((offer) => (
      <span className="offer-item" key={offer}>
        {offer}
        <span className="offer-dot" aria-hidden="true">
          ✦
        </span>
      </span>
    ))}
  </div>
)

const OfferMarquee = () => (
  <div className="offer-marquee">
    <div className="offer-marquee-track">
      <OfferMarqueeTrack />
      <OfferMarqueeTrack aria-hidden="true" />
    </div>
  </div>
)

export default OfferMarquee
