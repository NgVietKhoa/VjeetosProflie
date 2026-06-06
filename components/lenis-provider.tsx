'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { motionValue, type MotionValue } from 'framer-motion'

type LenisContextValue = {
  lenis: Lenis | null
  /** Normalized scroll progress 0 → 1 of the entire page */
  progress: MotionValue<number>
  /** Raw scroll position in px */
  scrollY: MotionValue<number>
}

const LenisContext = createContext<LenisContextValue | null>(null)

export function useLenis() {
  const ctx = useContext(LenisContext)
  if (!ctx) throw new Error('useLenis must be used within <LenisProvider>')
  return ctx
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const progress = useRef(motionValue(0)).current
  const scrollY = useRef(motionValue(0)).current

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const instance = new Lenis({
      lerp: reduce ? 1 : 0.08,
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    instance.on('scroll', (e: Lenis) => {
      scrollY.set(e.scroll)
      progress.set(e.progress)
    })

    let rafId: number
    function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    setLenis(instance)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
    }
  }, [progress, scrollY])

  return (
    <LenisContext.Provider value={{ lenis, progress, scrollY }}>
      {children}
    </LenisContext.Provider>
  )
}
