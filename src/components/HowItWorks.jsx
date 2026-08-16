import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Ball } from './Decor'

const steps = [
  {
    n: '01',
    title: 'Alguien abre una pre-reserva',
    text: 'Un jugador elige día, hora y cancha. Todavía no bloquea nada: queda publicada esperando gente.',
  },
  {
    n: '02',
    title: 'Se suman los demás',
    text: 'Lo ve cualquier jugador de la app, sea socio del club o no. Se llena entre ellos, y de paso entra gente nueva a tu cancha.',
  },
  {
    n: '03',
    title: 'Se completa y se confirma sola',
    text: 'Al ocuparse el último lugar la reserva queda firme. Sin llamadas, sin planilla, sin confirmar a mano.',
  },
  {
    n: '04',
    title: 'Se juega y mueve el ranking',
    text: 'El resultado suma o resta puntos, y actualiza el ranking del club y el general.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hw-animate',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="relative py-24 bg-[#fafafa] border-b border-[#e5e5e5] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-10 relative">
        <div className="hw-animate max-w-[620px] mb-16">
          <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase block mb-2">
            La mecánica
          </span>
          <h2 className="text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0047b3] mb-4">
            Cómo se llena una cancha
          </h2>
          <p className="text-[1.0625rem] text-[#4a4a4a] leading-relaxed">
            El club deja de ser el intermediario de cada partido. Los jugadores
            arman el partido entre ellos y la cancha se ocupa sola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, i) => (
            <div key={step.n} className="hw-animate relative flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-1">
                <Ball
                  className="w-7 h-7 text-ball flex-shrink-0"
                  seam="rgba(0,71,179,0.45)"
                />
                <span className="text-[11px] font-bold tracking-[0.16em] text-[#0047b3]/35">
                  {step.n}
                </span>
                {/* Línea que encadena los pasos */}
                {i < steps.length - 1 && (
                  <span className="hidden lg:block flex-1 h-px bg-[#0047b3]/12" />
                )}
              </div>
              <h3 className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-[#0047b3] leading-snug">
                {step.title}
              </h3>
              <p className="text-[0.9375rem] text-[#4a4a4a] leading-[1.65]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
