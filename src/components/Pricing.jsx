import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Por Sesión',
    price: '$450',
    unit: '/ hora',
    description: 'Para quienes juegan ocasionalmente. Sin compromisos ni cuotas mensuales.',
    features: [
      'Alquiler de cancha por hora',
      'Pelotas incluidas',
      'Vestuarios y duchas',
      'Reserva online 24/7',
      'Iluminación nocturna',
    ],
    cta: 'Reservar hora',
    highlight: false,
  },
  {
    name: 'Membresía',
    price: '$3.800',
    unit: '/ mes',
    description:
      'Para quienes viven el pádel. Beneficios exclusivos y prioridad de cancha.',
    features: [
      '4 horas preferenciales por semana',
      '20% de descuento en reservas extra',
      'Acceso a torneos exclusivos de socios',
      'Clases grupales ilimitadas',
      'Vestuario personal asignado',
      'Reserva con 7 días de anticipación',
    ],
    cta: 'Unirme ahora',
    highlight: true,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-header',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )
      gsap.fromTo(
        '.pricing-card',
        { y: 45, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="precios" ref={sectionRef} className="py-24 bg-[#fafafa] border-t border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="pricing-header flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase block mb-2">
              Precios
            </span>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0047b3]">
              Simple y transparente
            </h2>
          </div>
          <p className="text-[1.0625rem] text-[#4a4a4a] max-w-[380px] leading-relaxed">
            Sin letras chicas. Elegí el plan que se adapta a tu ritmo de juego.
          </p>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[740px]">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`pricing-card relative flex flex-col gap-7 p-8 rounded-xl border transition-all duration-300 ${
                plan.highlight
                  ? 'bg-[#0047b3] border-[#0047b3] text-white hover:bg-[#0066ff] hover:border-[#0066ff]'
                  : 'bg-white border-[#e5e5e5] text-[#0047b3] hover:border-[#0047b3] hover:-translate-y-0.5'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-7">
                  <span className="bg-white text-[#0047b3] text-[10px] font-bold px-3 py-1.5 rounded-full tracking-[0.16em] uppercase">
                    Más popular
                  </span>
                </div>
              )}

              <div>
                <p className={`text-xs font-semibold tracking-[0.16em] uppercase mb-4 ${
                  plan.highlight ? 'text-white/60' : 'text-[#0047b3]/50'
                }`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[2.5rem] font-bold tracking-[-0.03em] leading-none">
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? 'text-white/55' : 'text-[#8a8a8a]'}`}>
                    {plan.unit}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${
                  plan.highlight ? 'text-white/65' : 'text-[#4a4a4a]'
                }`}>
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={14}
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.highlight ? 'text-white' : 'text-[#0047b3]'
                      }`}
                    />
                    <span className={plan.highlight ? 'text-white/75' : 'text-[#4a4a4a]'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`text-center text-sm font-semibold py-3.5 rounded-lg transition-all duration-200 active:scale-[0.97] tracking-[-0.01em] ${
                  plan.highlight
                    ? 'bg-white text-[#0047b3] hover:bg-white/90'
                    : 'bg-[#0047b3] text-white hover:bg-[#0066ff]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-7 text-xs text-[#8a8a8a]">
          * Precios en pesos uruguayos. IVA incluido. Consultá promociones para grupos y empresas.
        </p>
      </div>
    </section>
  )
}
