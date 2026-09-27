import { perfumes } from '../data/perfumes'
import useReveal from '../lib/useReveal'
import './BestSellers.css'

const BestSellers = () => {
  const sectionRef = useReveal([
    { selector: '.bestsellers-top', y: 30, duration: 0.7 },
    { selector: '.bs-card', y: 60, scale: 0.94, duration: 0.7, stagger: 0.1, start: 'top 80%' },
  ])

  return (
    <section className="bestsellers" id="best-sellers" ref={sectionRef}>
      <div className="bestsellers-top">
        <h2>Best Sellers</h2>
        <a href="#best-sellers" className="bestsellers-viewall">
          View All <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="bestsellers-grid">
        {perfumes.map((p) => (
          <div className="bs-card" key={p.id}>
            <div className="bs-card-media">
              <img src={p.bottle} alt={p.name} className="bs-card-img" data-perfume-id={p.id} />
            </div>
            <div className="bs-card-info">
              <p className="bs-card-price">${p.price}.00</p>
              <p className="bs-card-name">{p.name}</p>
              <button className="bs-card-add">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BestSellers
