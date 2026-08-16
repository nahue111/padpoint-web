import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { TrendingUp, TrendingDown, ArrowRight, CalendarDays } from 'lucide-react'
import { Ball, Paddle } from './Decor'

/* ---------- Maquetas ---------- */
// En vez de fotos de stock, cada bloque muestra la pantalla de la que habla.

const RANKINGS = {
  club: [
    { pos: 1, initials: 'FL', name: 'Flor Lemos', pts: 1284, delta: 24 },
    { pos: 2, initials: 'MG', name: 'Martín Genta', pts: 1240, delta: 18 },
    { pos: 3, initials: 'DR', name: 'Diego Rivas', pts: 1198, delta: -12 },
    { pos: 4, initials: 'AC', name: 'Ana Cardozo', pts: 1155, delta: 9 },
    { pos: 5, initials: 'JP', name: 'Juan Pérez', pts: 1102, delta: -6 },
  ],
  general: [
    { pos: 12, initials: 'FL', name: 'Flor Lemos', pts: 1284, delta: 24 },
    { pos: 18, initials: 'MG', name: 'Martín Genta', pts: 1240, delta: 18 },
    { pos: 31, initials: 'DR', name: 'Diego Rivas', pts: 1198, delta: -12 },
    { pos: 44, initials: 'AC', name: 'Ana Cardozo', pts: 1155, delta: 9 },
    { pos: 57, initials: 'JP', name: 'Juan Pérez', pts: 1102, delta: -6 },
  ],
}

function RankingMock() {
  const [tab, setTab] = useState('club')
  const rows = RANKINGS[tab]

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-[0_18px_50px_-30px_rgba(0,71,179,0.4)]">
      <div className="flex items-center gap-1 p-1 bg-[#f5f5f5] rounded-lg mb-5 w-max">
        {[
          { id: 'club', label: 'Mi club' },
          { id: 'general', label: 'General' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
              tab === t.id
                ? 'bg-white text-[#0047b3] shadow-sm'
                : 'text-[#8a8a8a] hover:text-[#0047b3]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {rows.map((p, i) => (
          <div
            key={p.initials}
            className={`flex items-center gap-3 py-3 ${
              i < rows.length - 1 ? 'border-b border-[#f0f0f0]' : ''
            }`}
          >
            <span
              className={`w-7 text-center text-[13px] font-bold tabular-nums ${
                i === 0 ? 'text-[#0047b3]' : 'text-[#c0c0c0]'
              }`}
            >
              {p.pos}
            </span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                i === 0 ? 'bg-ball text-[#2c3d00]' : 'bg-[#0047b3]/8 text-[#0047b3]'
              }`}
            >
              {p.initials}
            </div>
            <span className="flex-1 text-[13px] text-[#0047b3] font-medium truncate">
              {p.name}
            </span>
            <span className="text-[13px] font-bold text-[#0047b3] tabular-nums">
              {p.pts.toLocaleString('es-UY')}
            </span>
            <span
              className={`flex items-center gap-0.5 text-[11px] font-bold w-12 justify-end tabular-nums ${
                p.delta > 0 ? 'text-[#00a859]' : 'text-[#d13b3b]'
              }`}
            >
              {p.delta > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {p.delta > 0 ? `+${p.delta}` : p.delta}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#8a8a8a] mt-4">
        Cambia después de cada partido jugado.
      </p>
    </div>
  )
}

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']
const HOURS = ['17:00', '18:00', '19:00']
// null = sin horario publicado, 'libre' = publicado y disponible, string = alumno anotado
const AGENDA = [
  ['Sofía', 'libre', null, 'Tomás', 'libre'],
  ['libre', 'Bruno', 'Lucía', 'libre', 'Nico'],
  [null, 'libre', 'Caro', 'libre', null],
]

function AgendaMock() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-[0_18px_50px_-30px_rgba(0,71,179,0.4)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-[#0047b3] text-white flex items-center justify-center text-[11px] font-bold">
          NP
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#0047b3] leading-tight">
            Nico Prieto
          </p>
          <p className="text-[11px] text-[#8a8a8a]">Entrenador · agenda propia</p>
        </div>
      </div>

      <div className="grid grid-cols-[46px_repeat(5,1fr)] gap-1.5">
        <span />
        {DAYS.map(d => (
          <span
            key={d}
            className="text-[10px] font-bold uppercase tracking-wider text-[#c0c0c0] text-center pb-1"
          >
            {d}
          </span>
        ))}

        {HOURS.map((hour, r) => (
          <div key={hour} className="contents">
            <span className="text-[10px] text-[#8a8a8a] font-medium flex items-center tabular-nums">
              {hour}
            </span>
            {AGENDA[r].map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`h-9 rounded-md flex items-center justify-center text-[10px] font-semibold transition-colors ${
                  cell === null
                    ? 'bg-[#fafafa]'
                    : cell === 'libre'
                      ? 'border border-dashed border-[#0047b3]/25 text-[#0047b3]/40'
                      : 'bg-[#0047b3] text-white'
                }`}
              >
                {cell === 'libre' ? 'Libre' : cell === null ? '' : cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-5 text-[11px] text-[#8a8a8a]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-[#0047b3]" /> Alumno anotado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-dashed border-[#0047b3]/30" /> Libre
        </span>
      </div>
    </div>
  )
}

function TorneoMock() {
  return (
    <div className="relative bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-[0_18px_50px_-30px_rgba(0,71,179,0.4)] overflow-hidden">
      <Paddle className="absolute -right-6 -bottom-8 w-32 h-auto text-[#0047b3]/[0.05] rotate-[24deg]" />

      <div className="relative flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-ball flex items-center justify-center">
          <CalendarDays size={16} className="text-[#2c3d00]" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#0047b3] leading-tight">
            Sábado 12 de septiembre
          </p>
          <p className="text-[11px] text-[#8a8a8a]">Lo único que cargó el club</p>
        </div>
      </div>

      <div className="relative flex items-center gap-3">
        {/* Llave generada sola */}
        <div className="flex-1 flex flex-col gap-1.5">
          {['Flor / Martín', 'Diego / Ana', 'Juan / Caro', 'Nico / Tomás'].map(pair => (
            <div
              key={pair}
              className="text-[11px] font-medium text-[#0047b3] bg-[#fafafa] border border-[#f0f0f0] rounded-md px-2.5 py-2 truncate"
            >
              {pair}
            </div>
          ))}
        </div>

        <ArrowRight size={14} className="text-[#c0c0c0] flex-shrink-0" />

        <div className="flex-1 flex flex-col gap-1.5 justify-center">
          {['Flor / Martín', 'Nico / Tomás'].map(pair => (
            <div
              key={pair}
              className="text-[11px] font-medium text-[#0047b3] bg-[#fafafa] border border-[#f0f0f0] rounded-md px-2.5 py-2 truncate"
            >
              {pair}
            </div>
          ))}
        </div>

        <ArrowRight size={14} className="text-[#c0c0c0] flex-shrink-0" />

        <div className="flex-1">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#2c3d00] bg-ball rounded-md px-2.5 py-2">
            <Ball className="w-3.5 h-3.5 text-white flex-shrink-0" />
            Final
          </div>
        </div>
      </div>

      <p className="relative text-[11px] text-[#8a8a8a] mt-5">
        Inscripciones y llave se arman solas.
      </p>
    </div>
  )
}

/* ---------- Sección ---------- */

const features = [
  {
    id: 'ranking',
    eyebrow: 'Ranking',
    title: 'Cada club con su propio ranking',
    description:
      'Los jugadores ganan y pierden puntos según el resultado de cada partido. No hay una sola tabla: está el ranking general y el de tu club, que es el que a tus socios les importa de verdad.',
    points: [
      'Ranking interno del club, además del general',
      'Los puntos se mueven solos con cada resultado',
      'Los jugadores se van sumando entre ellos',
    ],
    Visual: RankingMock,
    reverse: false,
  },
  {
    id: 'entrenadores',
    eyebrow: 'Entrenadores',
    title: 'Los profes manejan su propia agenda',
    description:
      'Cada entrenador publica sus horarios y los alumnos reservan directo desde la app. El club no tiene que coordinar, ni pasar mensajes, ni acordarse de nada.',
    points: [
      'Cada profe carga y edita sus horarios',
      'El alumno reserva sin pasar por el club',
      'Las clases conviven con las reservas de cancha',
    ],
    Visual: AgendaMock,
    reverse: true,
  },
  {
    id: 'torneos',
    eyebrow: 'Torneos',
    badge: 'En desarrollo',
    title: 'Poné el día. Nada más.',
    description:
      'El club elige la fecha del torneo y se despreocupa del resto. Lo único que carga después son los resultados de los partidos, a medida que se van jugando.',
    points: [
      'Elegís la fecha y el torneo se arma solo',
      'Inscripciones y llave, automáticas',
      'Solo cargás cómo salió cada partido',
    ],
    Visual: TorneoMock,
    reverse: false,
  },
]

function FeatureRow({ feature, index, total }) {
  const rowRef = useRef(null)
  const { Visual } = feature

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current.querySelectorAll('.f-animate'),
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: rowRef.current, start: 'top 78%', once: true },
        }
      )
    }, rowRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      id={feature.id}
      ref={rowRef}
      className={`scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${
        index < total - 1
          ? 'pb-20 md:pb-28 border-b border-[#e5e5e5] mb-20 md:mb-28'
          : ''
      }`}
    >
      <div className={`${feature.reverse ? 'md:order-2' : ''} flex flex-col gap-6`}>
        <div className="f-animate flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase">
              {feature.eyebrow}
            </span>
            {feature.badge && (
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase bg-ball text-[#2c3d00] px-2.5 py-1 rounded-full">
                {feature.badge}
              </span>
            )}
          </div>
          <h3 className="text-[2.25rem] font-bold tracking-[-0.03em] leading-[1.15] text-[#0047b3]">
            {feature.title}
          </h3>
        </div>

        <p className="f-animate text-[1.0625rem] text-[#4a4a4a] leading-[1.7] max-w-[46ch]">
          {feature.description}
        </p>

        <ul className="f-animate flex flex-col gap-2.5">
          {feature.points.map(point => (
            <li key={point} className="flex items-center gap-3 text-[0.9375rem] text-[#4a4a4a]">
              <Ball className="w-3.5 h-3.5 text-ball flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${feature.reverse ? 'md:order-1' : ''} f-animate`}>
        <Visual />
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="funciones" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="mb-20 max-w-[620px]">
          <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-[#0047b3]/50 uppercase block mb-2">
            Lo que ofrecemos
          </span>
          <h2 className="text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-[#0047b3]">
            Todo en un mismo lugar
          </h2>
        </div>

        {features.map((feature, i) => (
          <FeatureRow
            key={feature.title}
            feature={feature}
            index={i}
            total={features.length}
          />
        ))}
      </div>
    </section>
  )
}
