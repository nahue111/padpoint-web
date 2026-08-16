import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Mail, Phone, Send } from 'lucide-react'
import { Ball } from './Decor'

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const inputClass =
  'bg-white border border-[#e5e5e5] rounded-lg px-4 py-3.5 text-sm text-[#0047b3] placeholder:text-[#c0c0c0] focus:outline-none focus:border-[#0047b3] transition-colors duration-200 w-full tracking-[-0.01em]'

const labelClass =
  'text-[10px] font-semibold text-[#0047b3]/50 uppercase tracking-wider'

const channels = [
  { icon: Mail, label: 'Email', text: 'Contacto@padpoint.com.uy', href: 'mailto:Contacto@padpoint.com.uy' },
  // wa.me pide el número en formato internacional y sin el 0 inicial: 092 060 245 -> 598 92060245
  { icon: Phone, label: 'WhatsApp', text: '092 060 245', href: 'https://wa.me/59892060245' },
  { icon: InstagramIcon, label: 'Instagram', text: '@padpoint_uy', href: 'https://www.instagram.com/padpoint_uy/' },
]

const emptyForm = { nombre: '', club: '', email: '', telefono: '', canchas: '', mensaje: '' }

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)

  const update = field => e => setForm({ ...form, [field]: e.target.value })

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
          {/* Izquierda */}
          <div className="flex flex-col gap-10">
            <div className="c-animate">
              <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase block mb-2">
                Contacto
              </span>
              <h2 className="text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0047b3] mb-4">
                Sumá tu club.
              </h2>
              <p className="text-[1.0625rem] text-[#4a4a4a] leading-relaxed max-w-[42ch]">
                Contanos cómo se maneja hoy tu club — planilla, WhatsApp, cuaderno —
                y te mostramos cómo queda funcionando en PadPoint.
              </p>
            </div>

            <div className="c-animate flex flex-col gap-4">
              {channels.map(({ icon: Icon, label, text, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0047b3]/8 border-2 border-[#0047b3]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-ball group-hover:border-ball transition-colors duration-200">
                    <Icon size={16} className="text-[#0047b3]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#0047b3]/50 font-semibold uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm text-[#0047b3] font-medium group-hover:text-[#0066ff] transition-colors duration-200">
                      {text}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Derecha: formulario */}
          {sent ? (
            <div className="c-animate flex flex-col items-start justify-center gap-4 py-12">
              <Ball className="w-14 h-14 text-ball" />
              <h3 className="text-2xl font-bold tracking-tight text-[#0047b3]">
                Recibimos tu consulta.
              </h3>
              <p className="text-sm text-[#4a4a4a] max-w-[38ch] leading-relaxed">
                Te escribimos para coordinar una demo y ver juntos cómo se adapta
                a la forma de trabajar de tu club.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-5">
              <div className="c-animate grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-nombre" className={labelClass}>Nombre</label>
                  <input id="f-nombre" name="nombre" autoComplete="name" type="text" value={form.nombre} onChange={update('nombre')} placeholder="Tu nombre" className={inputClass} required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-club" className={labelClass}>Club</label>
                  <input id="f-club" name="club" autoComplete="organization" type="text" value={form.club} onChange={update('club')} placeholder="Nombre del club" className={inputClass} required />
                </div>
              </div>

              <div className="c-animate grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-email" className={labelClass}>Email</label>
                  <input id="f-email" name="email" autoComplete="email" type="email" value={form.email} onChange={update('email')} placeholder="tu@email.com" className={inputClass} required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="f-telefono" className={labelClass}>Teléfono</label>
                  <input id="f-telefono" name="telefono" autoComplete="tel" type="tel" value={form.telefono} onChange={update('telefono')} placeholder="+598 9X XXX XXX" className={inputClass} />
                </div>
              </div>

              <div className="c-animate flex flex-col gap-2">
                <label htmlFor="f-canchas" className={labelClass}>Cantidad de canchas</label>
                <select id="f-canchas" name="canchas" value={form.canchas} onChange={update('canchas')} className={`${inputClass} ${form.canchas ? '' : 'text-[#c0c0c0]'}`} required>
                  <option value="" disabled>Elegí una opción</option>
                  <option value="1-2">1 a 2 canchas</option>
                  <option value="3-5">3 a 5 canchas</option>
                  <option value="6+">6 o más</option>
                </select>
              </div>

              <div className="c-animate flex flex-col gap-2">
                <label htmlFor="f-mensaje" className={labelClass}>Cómo funciona hoy tu club</label>
                <textarea id="f-mensaje" name="mensaje" value={form.mensaje} onChange={update('mensaje')} placeholder="¿Cómo tomás las reservas hoy? ¿Tenés entrenadores dando clases? ¿Hacés torneos?" rows={4} className={`${inputClass} resize-none`} />
              </div>

              <div className="c-animate">
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 bg-[#0047b3] text-white font-medium py-4 rounded-lg hover:bg-[#0066ff] active:scale-[0.97] transition-all duration-200 text-[0.9375rem] mt-1 tracking-[-0.01em]"
                >
                  Quiero una demo
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
