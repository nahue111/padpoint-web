import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(
        '.hero-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-line',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.hero-desc',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
          '-=0.4'
        )
        .fromTo(
          rightRef.current,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
          0.2
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="inicio" className="min-h-[85vh] bg-white relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh] max-w-[1200px] mx-auto px-10 gap-24 items-center py-32">
        {/* Left: Content */}
        <div className="flex flex-col">
          <div className="hero-label flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#0047b3]" />
            <span className="text-xs font-semibold tracking-[0.12em] text-[#0047b3]/60 uppercase">
              Montevideo, Uruguay
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,5.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-6 text-[#0047b3]">
            <span className="hero-line block">Reservá tu cancha</span>
            <span className="hero-line block">de pádel</span>
            <span className="hero-line block">
              en{' '}
              <span className="text-[#0066ff]">tiempo real.</span>
            </span>
          </h1>

          <p className="hero-desc text-[1.125rem] text-[#4a4a4a] leading-relaxed max-w-[520px] mb-10 font-normal">
            6 canchas profesionales, instructores certificados y una comunidad
            que vive el pádel. Reservá online en segundos.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="hero-cta group flex items-center gap-2 bg-[#0047b3] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#0066ff] active:scale-[0.98] transition-all duration-200 text-[0.9375rem] tracking-[-0.01em]"
            >
              Reservar cancha
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
            <a
              href="#servicios"
              className="hero-cta flex items-center gap-2 border border-[#e5e5e5] text-[#0047b3] font-medium px-8 py-3.5 rounded-lg hover:border-[#0047b3] active:scale-[0.98] transition-all duration-200 text-[0.9375rem] tracking-[-0.01em]"
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div ref={rightRef} className="relative overflow-hidden rounded-xl min-h-[400px] md:min-h-[500px]">
          <img
            src="/padpointgalaan.avif"
            alt="Canchas de PadPoint"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Floating badge */}
          <div className="absolute bottom-6 right-6 bg-white border border-[#e5e5e5] rounded-xl px-5 py-4 shadow-lg animate-float">
            <div className="text-2xl font-bold text-[#0047b3] tracking-tight">+500</div>
            <div className="text-xs text-[#8a8a8a] font-medium mt-0.5">socios activos</div>
          </div>
          {/* Live badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#e5e5e5] rounded-full px-3.5 py-2">
            <div className="w-2 h-2 rounded-full bg-[#00a859] animate-pulse" />
            <span className="text-xs font-semibold text-[#0047b3] tracking-wide">Canchas disponibles</span>
          </div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[#0047b3]/30">
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}
