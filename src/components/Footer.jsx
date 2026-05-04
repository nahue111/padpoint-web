import { Phone, MapPin, Mail } from 'lucide-react'

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
const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

const links = {
  Club: ['Sobre Nosotros', 'Canchas', 'Torneos', 'Noticias'],
  Servicios: ['Alquiler', 'Clases', 'Membresías', 'Corporativo'],
  Legal: ['Términos', 'Privacidad', 'Cookies'],
}

export default function Footer() {
  return (
    <footer className="bg-[#0047b3] text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <img src="/logopad.jpg" alt="PadPoint" className="h-9 w-9 rounded-lg object-cover" />
              <span className="font-semibold text-[1.125rem] tracking-[-0.02em]">PadPoint</span>
            </div>
            <p className="text-[0.9375rem] text-white/65 leading-[1.7]">
              El club de pádel de referencia en Montevideo. Canchas profesionales, comunidad apasionada.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mt-1">
              {[
                { icon: Phone, text: '+598 2 847-3912' },
                { icon: MapPin, text: 'Av. Italia 3456, Montevideo' },
                { icon: Mail, text: 'hola@padpoint.com.uy' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors duration-200 cursor-pointer">
                  <Icon size={15} className="flex-shrink-0 opacity-70" />
                  {text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2 mt-1">
              {[
                { Icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/padpointuy' },
                { Icon: FacebookIcon, label: 'Facebook', href: '#' },
                { Icon: YoutubeIcon, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-white/40 mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[0.9375rem] text-white/65 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/10 pt-8">
          <p className="text-xs text-white/35">© 2026 PadPoint. Todos los derechos reservados.</p>
          <p className="text-xs text-white/35">Montevideo, Uruguay</p>
        </div>
      </div>
    </footer>
  )
}
