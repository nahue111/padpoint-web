import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const stats = [
  { value: 6, suffix: '', label: 'Canchas profesionales' },
  { value: 500, suffix: '+', label: 'Socios activos' },
  { value: 12, suffix: '', label: 'Años de experiencia' },
  { value: 7, suffix: '/7', label: 'Días de la semana' },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const countersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      countersRef.current.forEach((el, i) => {
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stats[i].value,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val)
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-[#e5e5e5] py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`stat-item flex flex-col gap-1 py-6 md:py-0 ${
                i < 3 ? 'md:border-r md:border-[#e5e5e5]' : ''
              } ${i > 0 ? 'md:pl-10' : ''} ${i < 3 ? 'md:pr-10' : ''} ${
                i < 2 ? 'border-b md:border-b-0 border-[#e5e5e5]' : ''
              }`}
            >
              <div className="flex items-baseline gap-0.5">
                <span
                  ref={el => (countersRef.current[i] = el)}
                  className="text-[2rem] font-semibold tracking-[-0.02em] text-[#0047b3]"
                >
                  0
                </span>
                <span className="text-[#0066ff] text-xl font-semibold">{stat.suffix}</span>
              </div>
              <p className="text-sm text-[#4a4a4a] font-normal">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
