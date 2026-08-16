import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Ranking', href: '#ranking' },
  { label: 'Entrenadores', href: '#entrenadores' },
  { label: 'Torneos', href: '#torneos' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
    })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-xl'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-10 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 flex-shrink-0">
          <img
            src="/logopad.jpg"
            alt="PadPoint"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="font-semibold text-[1.05rem] tracking-[-0.02em] text-[#0047b3]">
            PadPoint
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.9375rem] text-[#4a4a4a] hover:text-[#0047b3] transition-colors duration-200 font-normal tracking-[-0.01em]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contacto"
            className="bg-[#0047b3] text-white text-[0.9375rem] font-medium px-5 py-2.5 rounded-lg hover:bg-[#0066ff] active:scale-[0.97] transition-all duration-200 tracking-[-0.01em]"
          >
            Sumar mi club
          </a>
        </div>

        <button
          className="md:hidden text-[#0047b3] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e5e5] px-6 py-8">
          <ul className="flex flex-col">
            {navLinks.map(link => (
              <li key={link.href} className="border-b border-[#e5e5e5]">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-[1.125rem] text-[#0047b3] font-normal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="block mt-6 bg-[#0047b3] text-white text-center text-sm font-medium px-5 py-4 rounded-lg"
          >
            Sumar mi club
          </a>
        </div>
      )}
    </nav>
  )
}
