// Primitivas gráficas de pádel. Son SVG propios en vez de iconos genéricos:
// es lo que le da identidad a la página sin depender de imágenes de stock.

// Pelota de pádel con la P de PadPoint adentro — la inversa del logo, donde la
// pelota va dentro de la P. El color del círculo se hereda de `currentColor`.
//
// Las costuras van bien pegadas al borde a propósito: con la curvatura clásica
// (más panzona hacia el centro) se tocaban con la letra y a 14px, que es el
// tamaño de las viñetas, quedaba todo embarrado.
export function Ball({
  className = '',
  seam = 'rgba(0,71,179,0.4)',
  letterColor = '#0047b3',
}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="currentColor" />
      <path d="M3.4 8C7.2 12 7.2 20 3.4 24" stroke={seam} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M28.6 8C24.8 12 24.8 20 28.6 24" stroke={seam} strokeWidth="1.6" strokeLinecap="round" />
      {/* Asta recta + bowl semicircular, con la contraforma calada (evenodd) */}
      <path
        fillRule="evenodd"
        fill={letterColor}
        d="M10.5 8H16a5.25 5.25 0 0 1 0 10.5H14.75V24H10.5ZM14.75 10.75H16a2.5 2.5 0 0 1 0 5H14.75Z"
      />
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
