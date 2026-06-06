'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '../section-label'

const FULL = 'ready_to_connect.exe'

function useTyped(start: boolean, text: string, speed = 70) {
  const [out, setOut] = useState('')
  useEffect(() => {
    if (!start) return
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduce) {
      setOut(text)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [start, text, speed])
  return out
}

const LINKS = [
  { cmd: '> github.com/NgVietKhoa', href: 'https://github.com/NgVietKhoa' },
  { cmd: '> linkedin.com/in/khoa-nguyen-6a34b7360', href: 'https://www.linkedin.com/in/khoa-nguyen-6a34b7360/' },
  { cmd: '> facebook.com/vjeet.kho06', href: 'https://www.facebook.com/vjeet.kho06' },
]

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const typed = useTyped(inView, FULL)

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionLabel index="04" label="CONNECT" />

      <div ref={ref} className="mx-auto max-w-3xl">
        <span className="font-pixel text-xs text-grass">// terminal</span>
        <h2 className="mt-6 font-pixel text-2xl leading-[1.4] text-foreground sm:text-4xl">
          GET IN TOUCH
        </h2>

        {/* Terminal panel */}
        <div className="mt-10 border border-glass-border bg-[#0c0c0c] grid-overlay">
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-glass-border bg-surface px-4 py-3">
            <span className="h-3 w-3 bg-destructive" aria-hidden="true" />
            <span
              className="h-3 w-3"
              style={{ backgroundColor: '#e6b422' }}
              aria-hidden="true"
            />
            <span className="h-3 w-3 bg-grass" aria-hidden="true" />
            <span className="ml-3 text-[11px] tracking-widest text-muted-ink">
              khoa@portfolio: ~/contact
            </span>
          </div>

          <div className="space-y-3 p-6 text-sm leading-relaxed sm:p-8">
            <p className="text-muted-ink">
              <span className="text-grass">$</span> ./run --connect
            </p>
            <p className="text-leaf">
              {typed}
              <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-leaf align-middle" />
            </p>
            <p className="pt-2 text-muted-foreground">
              Open to freelance builds, collaborations, and good open-source
              quests. Pick a portal:
            </p>

            <div className="space-y-2 pt-3">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.cmd}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="block w-fit text-muted-foreground transition-colors hover:text-leaf"
                >
                  {link.cmd}
                </motion.a>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="mailto:khoa2006nguyen811@gmail.com"
                className="inline-block border border-grass bg-grass/10 px-8 py-3 text-xs uppercase tracking-[0.2em] text-leaf shadow-[0_0_24px_-6px_#5b8a3c] transition-all hover:bg-grass hover:text-primary-foreground hover:shadow-[0_0_32px_-4px_#7ec850]"
              >
                khoa2006nguyen811@gmail.com
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-muted-ink">
          built with blocks · {new Date().getFullYear()} · NgVietKhoa
        </p>
      </div>
    </section>
  )
}
