import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

const courts = [
  {
    name: 'Canchas Indoor',
    tag: '3 canchas cubiertas',
    description: 'Superficie de cristal panorámico, iluminación LED de 1000 lux y climatización centralizada.',
    img: 'https://images.pexels.com/photos/35248383/pexels-photo-35248383.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
    large: true,
  },
  {
    name: 'Canchas Outdoor',
    tag: 'Al aire libre',
    img: 'https://images.pexels.com/photos/31012869/pexels-photo-31012869.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Cancha Central',
    tag: 'Torneos y eventos',
    img: 'https://images.pexels.com/photos/32897038/pexels-photo-32897038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
]

export default function Courts() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.court-header',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )
      gsap.fromTo(
        '.court-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.courts-grid', start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="canchas" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="court-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase block mb-2">
              Instalaciones
            </span>
            <h2 className="text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0047b3]">
              Canchas de clase mundial
            </h2>
          </div>
          <p className="text-[1.0625rem] text-[#4a4a4a] max-w-[400px] leading-relaxed">
            6 canchas con superficie de última generación, iluminación profesional
            y reserva en tiempo real.
          </p>
        </div>

        <div className="courts-grid grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 md:h-[560px]">
          <div className="court-card relative overflow-hidden rounded-xl group cursor-pointer min-h-[300px] md:min-h-full">
            <img
              src={courts[0].img}
              alt={courts[0].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0047b3]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <span className="text-[11px] font-semibold tracking-widest text-white/70 uppercase block mb-1.5">
                {courts[0].tag}
              </span>
              <h3 className="text-xl font-semibold text-white tracking-tight">{courts[0].name}</h3>
              <p className="text-sm text-white/70 mt-1.5 max-w-[38ch] leading-relaxed">
                {courts[0].description}
              </p>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-3">
            {courts.slice(1).map(court => (
              <div
                key={court.name}
                className="court-card relative overflow-hidden rounded-xl group cursor-pointer min-h-[180px]"
              >
                <img
                  src={court.img}
                  alt={court.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0047b3]/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="text-[10px] font-semibold tracking-widest text-white/60 uppercase block mb-1">
                    {court.tag}
                  </span>
                  <h3 className="text-base font-semibold text-white">{court.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-end">
          <a
            href="#contacto"
            className="group flex items-center gap-2 text-sm font-medium text-[#0047b3] hover:text-[#0066ff] transition-colors duration-200"
          >
            Ver disponibilidad
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </section>
  )
}
