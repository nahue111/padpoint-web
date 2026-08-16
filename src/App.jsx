import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoIntro from './components/VideoIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <main className="bg-white text-[#0047b3] overflow-x-hidden">
      <VideoIntro />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Contact />
      <Footer />
    </main>
  )
}
