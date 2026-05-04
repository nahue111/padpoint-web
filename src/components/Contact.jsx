import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MapPin, Phone, Clock, Send } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const inputClass =
  'bg-white border border-[#e5e5e5] rounded-lg px-4 py-3.5 text-sm text-[#0047b3] placeholder:text-[#c0c0c0] focus:outline-none focus:border-[#0047b3] transition-colors duration-200 w-full tracking-[-0.01em]'

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.c-animate',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contacto" ref={sectionRef} className="py-24 bg-white border-t border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-16 md:gap-24 items-start">
          {/* Left */}
          <div className="flex flex-col gap-10">
            <div className="c-animate">
              <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase block mb-2">
                Contacto
              </span>
              <h2 className="text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0047b3]">
                Empezá a jugar hoy.
              </h2>
            </div>

            <div className="c-animate flex flex-col gap-6">
              {[
                { icon: MapPin, label: 'Ubicación', text: 'Av. Italia 3456, Montevideo', sub: 'Uruguay' },
                { icon: Phone, label: 'Teléfono', text: '+598 2 847-3912', sub: 'WhatsApp disponible' },
                { icon: Clock, label: 'Horarios', text: 'Lun–Dom: 07:00 – 23:00', sub: 'Feriados con horario reducido' },
              ].map(({ icon: Icon, label, text, sub }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0047b3]/8 border-2 border-[#0047b3]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-[#0047b3]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#0047b3]/50 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm text-[#0047b3] font-medium">{text}</p>
                    <p className="text-xs text-[#8a8a8a]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="c-animate">
              <a
                href="https://instagram.com/padpointuy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#4a4a4a] hover:text-[#0066ff] transition-colors duration-200"
              >
                <InstagramIcon />
                @padpointuy
              </a>
            </div>
          </div>

          {/* Right: Form */}
          {sent ? (
            <div className="c-animate flex flex-col items-start justify-center gap-4 py-12">
              <div className="w-12 h-12 bg-[#0047b3]/8 border-2 border-[#0047b3]/20 rounded-xl flex items-center justify-center">
                <Send size={20} className="text-[#0047b3]" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-[#0047b3]">Mensaje enviado.</h3>
              <p className="text-sm text-[#4a4a4a] max-w-[36ch] leading-relaxed">
                Te contactamos en las próximas horas para confirmar tu reserva. Nos vemos en la cancha.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-5">
              <div className="c-animate grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-[#0047b3]/50 uppercase tracking-wider">Nombre</label>
                  <input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre completo" className={inputClass} required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-[#0047b3]/50 uppercase tracking-wider">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" className={inputClass} required />
                </div>
              </div>

              <div className="c-animate flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-[#0047b3]/50 uppercase tracking-wider">Teléfono</label>
                <input type="tel" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} placeholder="+598 9X XXX XXX" className={inputClass} />
              </div>

              <div className="c-animate flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-[#0047b3]/50 uppercase tracking-wider">Mensaje</label>
                <textarea value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} placeholder="¿Querés reservar una cancha, consultar sobre clases o membresías?" rows={5} className={`${inputClass} resize-none`} />
              </div>

              <div className="c-animate">
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 bg-[#0047b3] text-white font-medium py-4 rounded-lg hover:bg-[#0066ff] active:scale-[0.97] transition-all duration-200 text-[0.9375rem] mt-1 tracking-[-0.01em]"
                >
                  Enviar mensaje
                  <Send size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
