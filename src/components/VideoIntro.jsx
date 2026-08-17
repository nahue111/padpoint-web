import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Tile de 56x12 que se repite en X — la longitud de onda no se deforma al escalar
const WAVE = 'M0 6 Q 14 1 28 6 T 56 6'

const waveTile = inner =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='12' viewBox='0 0 56 12'>${inner}</svg>`
  )}")`

// Relleno blanco por debajo de la onda: empalma con la sección blanca de abajo
const waveFill = waveTile(`<path d='${WAVE} L56 12 L0 12 Z' fill='#ffffff'/>`)

// Trazo sobre la cresta (sin linecap, para que los tiles empalmen sin cortes)
const waveStroke = color =>
  waveTile(`<path d='${WAVE}' fill='none' stroke='${color}' stroke-width='1.4'/>`)

const waveStyle = image => ({
  backgroundImage: image,
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'left center',
})

// El intro tiene dos masters: 16:9 para pantallas anchas y 9:16 para celular.
// Se elige por JS y no con <source media>, porque los navegadores ignoran ese
// atributo en <video> y además no lo reevalúan si cambia el tamaño.
const CONSULTA_VERTICAL = '(max-width: 767px)'
const VIDEO_HORIZONTAL = '/intro_scrub.mp4'
const VIDEO_VERTICAL = '/intro_vertical.mp4'

const videoSegunPantalla = () =>
  window.matchMedia(CONSULTA_VERTICAL).matches ? VIDEO_VERTICAL : VIDEO_HORIZONTAL

// Píxeles de scroll por cada segundo de video. En celular va la mitad: con el
// mismo valor que en escritorio había que hacer el doble de swipes para pasar
// el intro, porque el dedo recorre mucho menos que una rueda de mouse.
const PX_POR_SEGUNDO = 180
const PX_POR_SEGUNDO_CELULAR = 90

export default function VideoIntro() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const tweenRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [src, setSrc] = useState(videoSegunPantalla)

  // Si se cruza el breakpoint (rotar el teléfono, agrandar la ventana) se
  // cambia el master y el efecto de abajo rearma el scrub con el nuevo.
  useEffect(() => {
    const mq = window.matchMedia(CONSULTA_VERTICAL)
    const alCambiar = () => setSrc(videoSegunPantalla())
    mq.addEventListener('change', alCambiar)
    return () => mq.removeEventListener('change', alCambiar)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Si el src cambia antes de que el video termine de cargar, este flag
    // evita que el init viejo arme un scrub sobre el master que ya no va.
    let cancelado = false

    const init = () => {
      if (cancelado) return
      const duration = video.duration
      if (!duration) return

      video.pause()
      video.currentTime = 0
      setLoaded(true)

      // Limpiar tween anterior (StrictMode crea el efecto dos veces en dev)
      tweenRef.current?.scrollTrigger?.kill()
      tweenRef.current?.kill()

      // GSAP anima video.currentTime directamente — llega exactamente al final
      tweenRef.current = gsap.fromTo(
        video,
        { currentTime: 0 },
        {
          currentTime: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${Math.ceil(
              duration * (src === VIDEO_VERTICAL ? PX_POR_SEGUNDO_CELULAR : PX_POR_SEGUNDO)
            )}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.2,
            invalidateOnRefresh: true,
            onUpdate(self) {
              if (progressRef.current) {
                // clip-path en vez de scaleX: revela la onda sin deformarla
                progressRef.current.style.clipPath = `inset(0 ${(1 - self.progress) * 100}% 0 0)`
              }
            },
          },
        }
      )
    }

    // readyState 4 = HAVE_ENOUGH_DATA (bufferizado hasta el final)
    if (video.readyState >= 4) {
      init()
    } else {
      setLoaded(false)
      video.addEventListener('canplaythrough', init, { once: true })
      video.load()
    }

    return () => {
      cancelado = true
      video.removeEventListener('canplaythrough', init)
      tweenRef.current?.scrollTrigger?.kill()
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [src])

  return (
    <div
      ref={sectionRef}
      style={{ height: '100dvh' }}
      className="relative w-full bg-[#0047b3]"
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Marca y aviso de scroll comparten la franja de abajo. En mobile no
          entran uno al lado del otro (se pisaban a 375px), así que ahí van
          apilados y recién desde md pasan a fila con el aviso a la derecha. */}
      <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 pointer-events-none">
        <div className="flex items-center gap-3">
          <img src="/logopad.jpg" alt="PadPoint" className="h-10 w-10 rounded-xl object-cover" />
          <span
            className="text-white font-semibold text-lg tracking-tight"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
          >
            PadPoint
          </span>
        </div>

        {loaded && (
          <span
            className="text-[11px] text-white/55 font-semibold tracking-[0.18em] uppercase md:text-right"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            Scroll para continuar
          </span>
        )}
      </div>

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-3 pointer-events-none">
        <div className="absolute inset-0" style={waveStyle(waveFill)} />
        <div className="absolute inset-0" style={waveStyle(waveStroke('rgba(0,71,179,0.18)'))} />
        <div
          ref={progressRef}
          className="absolute inset-0"
          style={{ ...waveStyle(waveStroke('#0047b3')), clipPath: 'inset(0 100% 0 0)' }}
        />
      </div>
    </div>
  )
}
