// Primitivas gráficas de pádel. Son SVG propios en vez de iconos genéricos:
// es lo que le da identidad a la página sin depender de imágenes de stock.

// Pelota de pádel — las costuras son los dos arcos clásicos
export function Ball({ className = '', seam = 'rgba(255,255,255,0.85)' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="currentColor" />
      <path d="M3 8.5C10 12 10 20 3 23.5" stroke={seam} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M29 8.5C22 12 22 20 29 23.5" stroke={seam} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

// Agujeros de la paleta: grilla generada, más prolijo que hardcodear 12 círculos
const PADDLE_HOLES = [14, 21, 28, 35].flatMap(y =>
  [12, 20, 28].map(x => ({ x, y }))
)

export function Paddle({ className = '' }) {
  return (
    <svg viewBox="0 0 40 66" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 2c10.5 0 17.5 8.5 17.5 19.5C37.5 33 29.5 43.5 20 43.5S2.5 33 2.5 21.5C2.5 10.5 9.5 2 20 2Z"
        fill="currentColor"
      />
      <path d="M16.5 42h7v18a3.5 3.5 0 0 1-7 0Z" fill="currentColor" />
      {PADDLE_HOLES.map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" fill="#ffffff" fillOpacity="0.34" />
      ))}
    </svg>
  )
}

// Cancha vista desde arriba — se usa como marca de agua de fondo
export function CourtLines({ className = '' }) {
  return (
    <svg viewBox="0 0 200 100" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="196" height="96" rx="2" />
        <path d="M100 2v96M40 2v96M160 2v96M2 50h38M160 50h38" />
      </g>
    </svg>
  )
}

// Subrayado a mano alzada para destacar una palabra del titular
export function Scribble({ className = '' }) {
  return (
    <svg viewBox="0 0 240 14" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M3 9C42 3 78 11 116 6c34-4 68 5 121-1"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}
