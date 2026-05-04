import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GraduationCap, Trophy, Clock, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: GraduationCap,
    title: 'Clases de Pádel',
    subtitle: 'Todos los niveles',
    description:
      'Instructores federados con metodología progresiva. Desde tu primera clase hasta nivel competidor. Clases individuales, grupales y clínicas técnicas.',
    features: [
      'Clases individuales con análisis en video',
      'Grupos reducidos (máx. 4 jugadores)',
      'Clínicas técnicas semanales',
      'Plan de progresión personalizado',
    ],
    img: 'https://images.pexels.com/photos/35248244/pexels-photo-35248244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    reverse: false,
  },
  {
    icon: Trophy,
    title: 'Torneos & Liga',
    subtitle: 'Competí. Mejorá. Ganá.',
    description:
      'Organizamos torneos internos mensuales, circuitos regionales y eventos especiales. Ranking actualizado en tiempo real y premios para los clasificados.',
    features: [
      'Ranking mensual actualizado',
      'Liga inter-clubes de Montevideo',
      'Torneos corporativos y grupales',
      'Transmisión en vivo de finales',
    ],
    img: 'https://images.pexels.com/photos/35248254/pexels-photo-35248254.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    reverse: true,
  },
  {
    icon: Clock,
    title: 'Alquiler de Canchas',
    subtitle: 'Disponible 7 días',
    description:
      'Sistema de reservas online 24/7. Canchas de 07:00 a 23:00 con iluminación nocturna de alta potencia. Pelotas y equipamiento incluidos.',
    features: [
      'Reserva online en menos de 60 segundos',
      'Iluminación nocturna LED de 1000 lux',
      'Pelotas Head + raquetas disponibles',
      'Vestuarios y duchas premium',
    ],
    img: 'https://images.pexels.com/photos/32896996/pexels-photo-32896996.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    reverse: false,
  },
]

function ServiceRow({ service, index }) {
  const rowRef = useRef(null)
  const Icon = service.icon

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current.querySelectorAll('.s-animate'),
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
        }
      )
    }, rowRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${
        index < services.length - 1
          ? 'pb-20 md:pb-28 border-b border-[#e5e5e5] mb-20 md:mb-28'
          : ''
      }`}
    >
      {/* Content */}
      <div className={`${service.reverse ? 'md:order-2' : ''} flex flex-col gap-6`}>
        <div className="s-animate flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#0047b3]/10 border-2 border-[#0047b3]/20 flex items-center justify-center">
              <Icon size={22} className="text-[#0047b3]" strokeWidth={1.8} />
            </div>
            <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase">
              {service.subtitle}
            </span>
          </div>
          <h3 className="text-[2.25rem] font-bold tracking-[-0.03em] leading-[1.2] text-[#0047b3]">
            {service.title}
          </h3>
        </div>

        <p className="s-animate text-[1.0625rem] text-[#0047b3]/80 leading-[1.7] max-w-[46ch]">
          {service.description}
        </p>

        <ul className="s-animate flex flex-col gap-2.5">
          {service.features.map(feature => (
            <li key={feature} className="flex items-center gap-3 text-[0.9375rem] text-[#4a4a4a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0047b3] flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="s-animate">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0066ff] hover:gap-3 transition-all duration-200"
          >
            Consultar disponibilidad
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Image */}
      <div className={`${service.reverse ? 'md:order-1' : ''} s-animate`}>
        <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="mb-20">
          <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase block mb-2">
            Servicios
          </span>
          <h2 className="text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0047b3]">
            Todo para tu juego
          </h2>
        </div>
        {services.map((service, i) => (
          <ServiceRow key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}
