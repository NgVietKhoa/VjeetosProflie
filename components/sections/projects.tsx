'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

type Project = {
  index: string
  name: string
  role: string
  desc: string
  tags: string[]
  github: string
  live: string
  logo: string
  previews: string[] // Array of screenshots
  accentColor: string
}

const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Vjeetos Media',
    role: 'Fullstack · React · TypeScript',
    desc: 'An all-in-one multimedia platform combining an international cinema library with an ad-free YouTube Premium streaming experience. Focused on performance and seamless UX.',
    tags: ['React', 'TypeScript', 'Zustand', 'Tailwind'],
    github: 'https://github.com/NgVietKhoa/VjeetosMedia',
    live: 'https://example.com',
    logo: '/vjeetosmedia.png',
    previews: ['/preview_vjeetosmedia.png', '/preview_vjeetosmedia_2.png'],
    accentColor: '#f97316',
  },
  {
    index: '02',
    name: 'VjeetOS Wallet',
    role: 'Fullstack · Next.js · NestJS',
    desc: 'A smart personal finance manager with receipt scanning, real-time transaction tracking, and a warm VOS design system built on NestJS and Next.js.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/NgVietKhoa/Vjeetos_Wallet',
    live: 'https://example.com',
    logo: '/vjeetoswallet.png',
    previews: ['/preview_vjeetoswallet.png', '/preview_vjeetoswallet_2.png'],
    accentColor: '#3b82f6',
  },
  {
    index: '03',
    name: 'DuDuFruit',
    role: 'Fullstack · Next.js · Turborepo',
    desc: 'An e-commerce fruit storefront and custom gift basket builder on a pnpm Turborepo monorepo with Next.js, NestJS, Redis caching, and Cloudinary media.',
    tags: ['Next.js', 'NestJS', 'Redis', 'Turborepo'],
    github: 'https://github.com/NgVietKhoa/DuDuFruit',
    live: 'https://example.com',
    logo: '/dudufruit.png',
    previews: ['/preview_dudufruit.png', '/preview_dudufruit_2.png'],
    accentColor: '#22c55e',
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageIndex, setImageIndex] = useState(0)

  // Track scroll of this specific card container to trigger scale & fade out
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // As the user scrolls past this card, scale it down and fade it out
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setImageIndex((prev) => (prev + 1) % project.previews.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setImageIndex((prev) => (prev - 1 + project.previews.length) % project.previews.length)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] flex flex-col justify-start"
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="sticky top-20 md:top-36 w-full h-[75vh] md:h-[60vh] border border-glass-border bg-[#0d0d12] overflow-hidden transition-all duration-300 hover:border-glass-border-hover hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col-reverse md:flex-row z-10"
      >
        {/* Project Info Block */}
        <div className="flex-1 p-4 md:p-10 flex flex-col justify-between z-10">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
              <div
                className="w-8 h-8 md:w-10 h-10 flex items-center justify-center border border-glass-border shrink-0"
                style={{
                  background: `${project.accentColor}12`,
                  boxShadow: `0 0 20px ${project.accentColor}15`,
                }}
              >
                <img
                  src={project.logo}
                  alt=""
                  className="w-5 h-5 md:w-6 h-6 object-contain"
                  style={{ filter: `drop-shadow(0 0 8px ${project.accentColor}aa)` }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[8px] text-grass">{project.index}</span>
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border"
                    style={{
                      color: project.accentColor,
                      borderColor: `${project.accentColor}44`,
                      background: `${project.accentColor}08`,
                    }}
                  >
                    Active Project
                  </span>
                </div>
                <h3 className="font-sans font-black text-lg md:text-3xl text-foreground uppercase tracking-tight mt-1">
                  {project.name}
                </h3>
              </div>
            </div>

            <p className="text-xs font-mono text-muted-ink mb-2 md:mb-3">{project.role}</p>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl line-clamp-3 md:line-clamp-none">
              {project.desc}
            </p>
          </div>

          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] md:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 md:px-3 md:py-1 border border-glass-border text-muted-ink bg-glass/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Links */}
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-glass-border px-3.5 py-2 md:px-5 md:py-3 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-foreground hover:border-grass/40 hover:text-leaf transition-all font-mono bg-glass/5"
              >
                Source Code →
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border px-3.5 py-2 md:px-5 md:py-3 text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-mono transition-all"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}44`,
                  background: `${project.accentColor}08`,
                }}
              >
                Launch App ↗
              </a>
            </div>
          </div>
        </div>

        {/* Project Screenshot Mockup Frame / Carousel */}
        <div
          className="flex-1 relative overflow-hidden bg-[#0d0d11] border-b md:border-b-0 md:border-l border-glass-border flex items-center justify-center group/preview"
        >
          {/* Browser Chrome Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-1.5 bg-[#121216]/90 backdrop-blur-sm px-4 py-3 border-b border-glass-border">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="h-2 w-2 rounded-full bg-green-500/70" />
            <div className="ml-3 flex-1 h-5 bg-glass-border/30 rounded flex items-center px-3">
              <span className="font-mono text-[9px] text-muted-ink truncate">
                {project.name.toLowerCase().replace(/\s/g, '-')}.app
              </span>
            </div>
          </div>

          {/* Screenshot Display Container */}
          <div className="w-full h-full pt-11 overflow-hidden relative flex items-center justify-center">
            
            {/* Carousel Images with AnimatePresence */}
            <div className="absolute inset-0 pt-11">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={project.previews[imageIndex]}
                  alt={`${project.name} UI preview ${imageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full h-full object-cover object-top origin-top filter brightness-[0.85] group-hover/preview:brightness-100 transition-all duration-500"
                />
              </AnimatePresence>
            </div>

            {/* Navigation Arrows (shown if multiple images exist) */}
            {project.previews.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 md:left-4 z-30 p-2 rounded-full border border-glass-border bg-[#0b0b0f]/60 backdrop-blur-sm text-foreground hover:bg-[#1a1a24] hover:border-glass-border-hover hover:scale-105 transition-all text-[10px] md:text-xs flex items-center justify-center w-7 h-7 md:w-8 md:h-8 opacity-100 md:opacity-0 md:group-hover/preview:opacity-100 select-none"
                  aria-label="Previous image"
                >
                  &larr;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 md:right-4 z-30 p-2 rounded-full border border-glass-border bg-[#0b0b0f]/60 backdrop-blur-sm text-foreground hover:bg-[#1a1a24] hover:border-glass-border-hover hover:scale-105 transition-all text-[10px] md:text-xs flex items-center justify-center w-7 h-7 md:w-8 md:h-8 opacity-100 md:opacity-0 md:group-hover/preview:opacity-100 select-none"
                  aria-label="Next image"
                >
                  &rarr;
                </button>
              </>
            )}

            {/* Slide indicators / dots (shown if multiple images exist) */}
            {project.previews.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-[#0b0b0f]/80 backdrop-blur-sm px-3 py-1.5 border border-glass-border rounded-full">
                {project.previews.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setImageIndex(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === imageIndex ? 'w-4' : 'w-1.5'
                    }`}
                    style={{
                      backgroundColor: i === imageIndex ? project.accentColor : 'rgba(255, 255, 255, 0.25)',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Bottom Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      {/* Sticky Header */}
      <div className="mb-20">
        <span className="font-pixel text-[9px] tracking-[0.3em] text-grass uppercase block mb-4">
          // 03_PROJECTS
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="font-sans font-black tracking-tight text-4xl sm:text-5xl text-foreground uppercase">
            Featured Projects
          </h2>
          <a
            href="https://github.com/NgVietKhoa"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-leaf transition-colors shrink-0"
          >
            All Projects on GitHub →
          </a>
        </div>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-grass/60 via-grass/20 to-transparent" />
      </div>

      {/* Stacking Card List */}
      <div className="relative flex flex-col items-center">
        {PROJECTS.map((project, index) => {
          return (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
            />
          )
        })}
      </div>

      {/* Note about screenshots */}
      <div className="mt-12 text-center">
        <span className="text-[10px] font-mono text-muted-ink uppercase tracking-[0.2em]">
          * Preview images are placeholders — replace files in /public/ with actual screenshots
        </span>
      </div>
    </section>
  )
}
