import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoIntro from './components/VideoIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import Courts from './components/Courts'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <main className="bg-white text-[#0047b3] overflow-x-hidden">
      <VideoIntro />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Courts />
      <Services />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}
