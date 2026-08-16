import { Phone, Mail } from 'lucide-react'
import { Ball } from './Decor'

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const linkGroups = {
  Producto: [
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Ranking', href: '#ranking' },
    { label: 'Entrenadores', href: '#entrenadores' },
    { label: 'Torneos', href: '#torneos' },
  ],
  Club: [
    { label: 'Sumar mi club', href: '#contacto' },
    { label: 'Pedir una demo', href: '#contacto' },
  ],
  Legal: [
    { label: 'Términos', href: '#' },
    { label: 'Privacidad', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0047b3] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Pelota gigante saliendo de la esquina. Sin girar: ahora lleva la P
          adentro y una letra rotando lentamente queda rara. El color de la
          letra es el fondo del footer, así se lee como calada. */}
      <Ball
        className="absolute -bottom-24 -left-16 w-64 h-64 text-white/[0.05]"
        seam="rgba(255,255,255,0.12)"
        letterColor="#0047b3"
      />

      <div className="max-w-[1200px] mx-auto px-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Marca */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <img src="/logopad.jpg" alt="PadPoint" className="h-9 w-9 rounded-lg object-cover" />
              <span className="font-semibold text-[1.125rem] tracking-[-0.02em]">PadPoint</span>
            </div>
            <p className="text-[0.9375rem] text-white/65 leading-[1.7]">
              Reservas, ranking, clases y torneos para clubes de pádel. Todo en un
              mismo lugar.
            </p>

            <div className="flex flex-col gap-3 mt-1">
              {[
                { icon: Mail, text: 'Contacto@padpoint.com.uy', href: 'mailto:Contacto@padpoint.com.uy' },
                { icon: Phone, text: '092 060 245', href: 'https://wa.me/59892060245' },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  <Icon size={15} className="flex-shrink-0 opacity-70" />
                  {text}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              {[
                { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/padpoint_uy/' },
                { Icon: FacebookIcon, label: 'Facebook', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(linkGroups).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-white/40 mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[0.9375rem] text-white/65 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/10 pt-8">
          <p className="text-xs text-white/35">© 2026 PadPoint. Todos los derechos reservados.</p>
          <p className="text-xs text-white/35">Hecho en Montevideo, Uruguay</p>
        </div>
      </div>
    </footer>
  )
}
