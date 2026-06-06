'use client'

import { motion } from 'framer-motion'

/** Rotated, sticky editorial section label (godly-style). */
export function SectionLabel({
  label,
  index,
}: {
  label: string
  index: string
}) {
  return (
    // We use an absolute container spanning the full height of the section to act as a solid scroll track.
    // This prevents browser layout engine flickering at the start/end boundaries of sticky containers.
    <div className="pointer-events-none absolute inset-y-16 left-6 hidden lg:block z-30 w-10">
      <div className="sticky top-44">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: '-20% 0px -20% 0px', once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex origin-top-left -rotate-90 items-center gap-3 whitespace-nowrap"
          style={{ transformBox: 'fill-box' }}
        >
          <span className="font-pixel text-[10px] leading-none text-grass">
            {index}
          </span>
          <span className="font-pixel text-[10px] leading-none tracking-tight text-foreground">
            {label}
          </span>
          <span className="h-px w-16 bg-glass-border" />
        </motion.div>
      </div>
    </div>
  )
}
