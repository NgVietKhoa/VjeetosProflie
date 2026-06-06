'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Staggered reveal container — children animate in from bottom on scroll. */
export function Reveal({
  children,
  className,
  amount = 0.3,
}: {
  children: ReactNode
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

/** Individual revealing line/element — use inside <Reveal>. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}
