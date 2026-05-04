const ITEMS = [
  'Pádel Profesional',
  'Reservas Online',
  'Canchas Iluminadas',
  'Instructores Certificados',
  'Torneos Mensuales',
  'Liga Interna',
  'Vestuarios Premium',
]

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="border-y border-[#e5e5e5] overflow-hidden py-4 bg-white">
      <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-4 text-xs font-semibold tracking-[0.16em] uppercase">
            <span className="text-[#0047b3]/25">{item}</span>
            <span className="text-[#0066ff]/40 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
