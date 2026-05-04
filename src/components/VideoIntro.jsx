import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoIntro() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const tweenRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const init = () => {
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
            end: `+=${Math.ceil(duration * 180)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.2,
            invalidateOnRefresh: true,
            onUpdate(self) {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`
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
      video.addEventListener('canplaythrough', init, { once: true })
      video.load()
    }

    return () => {
      tweenRef.current?.scrollTrigger?.kill()
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{ height: '100dvh' }}
      className="relative w-full bg-[#0047b3]"
    >
      <video
        ref={videoRef}
        src="/intro_scrub.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="absolute bottom-8 left-8 md:left-12 flex items-center gap-3 pointer-events-none">
        <img src="/logopad.jpg" alt="PadPoint" className="h-10 w-10 rounded-xl object-cover" />
        <span
          className="text-white font-semibold text-lg tracking-tight"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
        >
          PadPoint
        </span>
      </div>

      {loaded && (
        <div className="absolute bottom-10 right-8 md:right-12 pointer-events-none">
          <span
            className="text-[11px] text-white/55 font-semibold tracking-[0.18em] uppercase block text-right"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            Scroll para continuar
          </span>
        </div>
      )}

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 pointer-events-none">
        <div
          ref={progressRef}
          className="h-full bg-white origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}
