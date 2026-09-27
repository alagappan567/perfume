import useLenis from './lib/useLenis'
import Loader from './components/Loader'
import Hero from './components/Hero'
import BestSellers from './components/BestSellers'
import OfferGallery from './components/OfferGallery'
import MoodSelector from './components/MoodSelector'
import Testimonial from './components/Testimonial'
import Reviews from './components/Reviews'
import PromoOffers from './components/PromoOffers'
import Footer from './components/Footer'
import OfferMarquee from './components/OfferMarquee'

function App() {
  useLenis()

  return (
    <>
      <Loader />
      <Hero />
      <BestSellers />
      <OfferGallery />
      <MoodSelector />
      <Testimonial />
      <Reviews />
      <PromoOffers />
      <Footer />
      <OfferMarquee />
    </>
  )
}

export default App
