import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ChevronDown, Check } from 'lucide-react'
import { Ball, Paddle, Scribble } from './Decor'

const SLOTS = [
  { initials: 'MG', name: 'Martín' },
  { initials: 'FL', name: 'Flor' },
  { initials: 'DR', name: 'Diego' },
  { initials: 'AC', name: 'Ana' },
]

// Demo viva de una pre-reserva: se llena el último lugar y se confirma sola.
// Es la mecánica central del producto, así que se muestra en vez de explicarse.
function PreReservaDemo() {
  const [full, setFull] = useState(false)

  useEffect(() => {
    // Si el usuario pidió menos movimiento, dejamos la tarjeta quieta
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = setInterval(() => setFull(f => !f), 3200)
    return () => clearInterval(id)
  }, [])

  const taken = full ? 4 : 3

  return (
    <div className="relative">
      {/* Pelota decorativa detrás de la tarjeta */}
      <Ball className="absolute -top-7 -right-4 w-16 h-16 text-ball animate-float -z-10" />

      <div className="bg-white border border-[#e5e5e5] rounded-2xl p-7 shadow-[0_18px_50px_-24px_rgba(0,71,179,0.45)]">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#0047b3]/45 mb-1.5">
              Cancha 3 · Techada
            </p>
            <p className="text-[1.75rem] font-bold tracking-[-0.03em] leading-none text-[#0047b3]">
              Martes 20:00
            </p>
          </div>
          <span
            className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full transition-colors duration-500 ${
              full ? 'bg-[#00a859] text-white' : 'bg-ball text-[#2c3d00]'
            }`}
          >
            {full && <Check size={12} strokeWidth={3} />}
            {full ? 'Confirmada' : 'Pre-reserva'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 mb-5">
          {SLOTS.map((slot, i) => {
            const occupied = i < taken
            return (
              <div key={slot.initials} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full aspect-square max-w-[54px] rounded-xl flex items-center justify-center text-[13px] font-bold transition-all duration-500 ${
                    occupied
                      ? 'bg-[#0047b3] text-white border-2 border-[#0047b3]'
                      : 'border-2 border-dashed border-[#d4d4d4] text-[#c0c0c0] scale-95'
                  }`}
                >
                  {occupied ? slot.initials : '+'}
                </div>
                <span
                  className={`text-[11px] transition-colors duration-500 ${
                    occupied ? 'text-[#4a4a4a]' : 'text-[#c0c0c0]'
                  }`}
                >
                  {occupied ? slot.name : 'Libre'}
                </span>
              </div>
            )
          })}
        </div>

        <div className="h-1.5 rounded-full bg-[#f0f0f0] overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              full ? 'bg-[#00a859]' : 'bg-ball'
            }`}
            style={{ width: `${(taken / 4) * 100}%` }}
          />
        </div>

        <p className="text-[13px] text-[#4a4a4a] leading-relaxed">
          {full ? (
            <>
              Se completó el cuarto lugar.{' '}
              <span className="font-semibold text-[#0047b3]">
                La reserva quedó firme sola.
              </span>
            </>
          ) : (
            <>
              Falta <span className="font-semibold text-[#0047b3]">1 jugador</span> para
              que se confirme. Nadie llamó al club.
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Se dispara al entrar en pantalla, no al montar: el Hero queda debajo del
      // video con scrub, así que al montar el usuario todavía no lo está viendo.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

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
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
          0.4
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="min-h-[85vh] bg-white relative overflow-hidden"
    >
      {/* Paleta gigante de fondo, apenas visible */}
      <Paddle className="hidden lg:block absolute -right-16 top-10 w-[420px] h-auto text-[#0047b3]/[0.04] rotate-[18deg] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh] max-w-[1200px] mx-auto px-10 gap-16 lg:gap-24 items-center py-32 relative">
        {/* Izquierda: mensaje */}
        <div className="flex flex-col">
          <div className="hero-label flex items-center gap-3 mb-8">
            <Ball className="w-4 h-4 text-ball" />
            <span className="text-xs font-semibold tracking-[0.12em] text-[#0047b3]/60 uppercase">
              Para clubes de pádel
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,5.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-7 text-[#0047b3]">
            <span className="hero-line block">Vos ponés</span>
            <span className="hero-line block">las canchas.</span>
            <span className="hero-line block relative inline-block">
              Del resto se encarga{' '}
              <span className="relative whitespace-nowrap">
                <span className="text-[#0066ff]">PadPoint.</span>
                <Scribble className="absolute left-0 -bottom-1 w-full h-3 text-ball -z-10" />
              </span>
            </span>
          </h1>

          <p className="hero-desc text-[1.125rem] text-[#4a4a4a] leading-relaxed max-w-[520px] mb-10 font-normal">
            Reservas que se llenan solas, un ranking propio para tu club,
            entrenadores con su agenda aparte y torneos sin trabajo administrativo.
            Todo en un mismo lugar.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="hero-cta group flex items-center gap-2 bg-[#0047b3] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-[#0066ff] active:scale-[0.98] transition-all duration-200 text-[0.9375rem] tracking-[-0.01em]"
            >
              Sumar mi club
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
            <a
              href="#como-funciona"
              className="hero-cta flex items-center gap-2 border border-[#e5e5e5] text-[#0047b3] font-medium px-8 py-3.5 rounded-lg hover:border-[#0047b3] active:scale-[0.98] transition-all duration-200 text-[0.9375rem] tracking-[-0.01em]"
            >
              Ver cómo funciona
            </a>
          </div>
        </div>

        {/* Derecha: la mecánica en vivo */}
        <div ref={rightRef}>
          <PreReservaDemo />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[#0047b3]/30">
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}
