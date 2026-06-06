'use client'

import { motion, useSpring } from 'framer-motion'
import { useLenis } from './lenis-provider'

/** Top-of-page progress bar driven by Lenis scroll progress (0 → 1). */
export function ScrollProgress() {
  const { progress } = useLenis()
  const scaleX = useSpring(progress, {
    stiffness: 200,
    damping: 40,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-leaf"
      style={{ scaleX }}
    />
  )
}
