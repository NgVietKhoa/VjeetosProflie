'use client'

import { motion, useTransform } from 'framer-motion'
import { useLenis } from '../lenis-provider'

export function Hero() {
  const { scrollY } = useLenis()

  // The headline sits on the mid plane and drifts gently.
  const nameY = useTransform(scrollY, [0, 900], [0, 200])
  const subY = useTransform(scrollY, [0, 900], [0, 120])
  const fade = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >

      {/* Headline (mid plane) */}
      <motion.div
        style={{ y: nameY }}
        className="relative z-[60] text-center"
      >
        <p className="mb-8 text-xs uppercase tracking-[0.4em] text-grass">
          // personal_build_v1.0
        </p>
        <h1 className="font-pixel text-2xl leading-[1.4] text-foreground sm:text-4xl md:text-5xl">
          Viet Khoa
          <span className="text-grass">.dev</span>
          <span className="cursor-blink ml-2 inline-block h-[0.85em] w-[0.12em] translate-y-[-0.06em] bg-leaf align-middle" />
        </h1>
      </motion.div>

      <motion.p
        style={{ y: subY }}
        className="relative z-[60] mt-8 max-w-lg text-balance text-center text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        Full Stack Developer.<br />
        Architecting robust, high-performance software solutions.
      </motion.p>

      {/* CTAs */}
      <motion.div
        style={{ y: subY }}
        className="relative z-[60] mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="#projects"
          className="group relative border border-grass bg-grass/10 px-7 py-3 text-xs uppercase tracking-[0.2em] text-leaf transition-colors hover:bg-grass hover:text-primary-foreground"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="group relative border border-glass-border bg-glass px-7 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground/30"
        >
          Get in Touch
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-10 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-ink">
          scroll
        </span>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          shapeRendering="crispEdges"
          aria-hidden="true"
          className="animate-bounce"
        >
          <rect x="5" y="0" width="4" height="12" fill="#5b8a3c" />
          <rect x="1" y="10" width="4" height="4" fill="#7ec850" />
          <rect x="9" y="10" width="4" height="4" fill="#7ec850" />
          <rect x="3" y="13" width="4" height="4" fill="#7ec850" />
          <rect x="7" y="13" width="4" height="4" fill="#7ec850" />
          <rect x="5" y="16" width="4" height="4" fill="#7ec850" />
        </svg>
      </motion.div>
    </section>
  )
}
