'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const SKILL_GROUPS = [
  {
    id: 'frontend',
    label: 'Frontend',
    index: '01',
    color: '#61dafb',
    tagline: 'Crafting interfaces users love.',
    skills: [
      { name: 'JavaScript', logo: '/logos/javascript.svg', color: '#f0db4f', desc: 'ES2024+, async patterns, DOM mastery' },
      { name: 'TypeScript', logo: '/logos/typescript.svg', color: '#3178c6', desc: 'Type safety, generics, advanced types' },
      { name: 'React', logo: '/logos/react.svg', color: '#61dafb', desc: 'Hooks, context, performance optimization' },
      { name: 'Next.js', logo: '/logos/nextjs.svg', color: '#ffffff', desc: 'SSR, SSG, App Router, RSC' },
      { name: 'Tailwind', logo: '/logos/tailwindcss.svg', color: '#38bdf8', desc: 'Utility-first, custom design systems' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    index: '02',
    color: '#5b8a3c',
    tagline: 'Scalable systems, clean APIs.',
    skills: [
      { name: 'Node.js', logo: '/logos/nodejs.svg', color: '#5b8a3c', desc: 'REST APIs, microservices, streams' },
      { name: 'Java', logo: '/logos/java.svg', color: '#f89820', desc: 'OOP, Spring Boot, enterprise patterns' },
      { name: 'PostgreSQL', logo: '/logos/postgresql.svg', color: '#336791', desc: 'Schema design, indexing, migrations' },
      { name: 'Redis', logo: '/logos/redis.svg', color: '#d82c20', desc: 'Caching, sessions, pub/sub queues' },
      { name: 'GraphQL', logo: '/logos/graphql.svg', color: '#e535ab', desc: 'Schema-first, resolvers, DataLoader' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    index: '03',
    color: '#2496ed',
    tagline: 'Ship fast, ship reliably.',
    skills: [
      { name: 'Docker', logo: '/logos/docker.svg', color: '#2496ed', desc: 'Containerization, Compose, multi-stage' },
      { name: 'Git', logo: '/logos/git.svg', color: '#f1502f', desc: 'Branching strategies, CI/CD workflows' },
      { name: 'AWS', logo: '/logos/aws.svg', color: '#ff9900', desc: 'EC2, S3, Lambda, CloudFront' },
    ],
  },
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [travelDistance, setTravelDistance] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({ target: containerRef })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.2,
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (!trackRef.current) return
      const el = trackRef.current!
      const totalWidth = el.scrollWidth
      const viewport = window.innerWidth
      setTravelDistance(Math.max(0, totalWidth - viewport))
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const x = useTransform(
    smoothProgress,
    [0, 0.12, 0.38, 0.62, 0.88, 1.0],
    [0, 0, -travelDistance * 0.5, -travelDistance * 0.5, -travelDistance, -travelDistance]
  )

  // Track which group is active based on stepped scroll position
  const activeIndex = useTransform(smoothProgress, (v) => {
    if (v < 0.25) return 0
    if (v < 0.75) return 1
    return 2
  })

  // Set comfortable scroll height for mobile (240vh) to match stepped curve
  const trackHeight = isMobile ? '240vh' : `${100 + SKILL_GROUPS.length * 120}vh`

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full bg-transparent"
      style={{ height: trackHeight }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-start pt-16 md:pt-24 overflow-hidden w-full">

        {/* Header */}
        <div className="mx-auto w-full max-w-6xl px-6 mb-8 md:mb-12 pointer-events-none">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="font-pixel text-[9px] tracking-[0.3em] text-grass uppercase block mb-2">
                // 02_SKILLS
              </span>
              <h2 className="font-sans font-black tracking-tight text-3xl sm:text-4xl text-foreground uppercase">
                Tech Stack
              </h2>
            </div>

            {/* Group indicators */}
            <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
              {SKILL_GROUPS.map((g, i) => (
                <motion.span
                  key={g.id}
                  style={{
                    color: useTransform(activeIndex, (v) => Math.round(v) === i ? g.color : '#555550'),
                    opacity: useTransform(activeIndex, (v) => Math.round(v) === i ? 1 : 0.4),
                  }}
                  className="font-pixel text-[8px] uppercase tracking-widest transition-colors"
                >
                  {g.index} {g.label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 md:mt-4 h-px w-full bg-glass-border overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress, originX: 0 }}
              className="h-full bg-grass"
            />
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="w-screen overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x, willChange: 'transform' }}
            className="flex gap-0 w-fit"
          >
            {SKILL_GROUPS.map((group, gi) => (
              <GroupPanel key={group.id} group={group} groupIndex={gi} activeIndex={activeIndex} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

function GroupPanel({
  group,
  groupIndex,
  activeIndex,
}: {
  group: typeof SKILL_GROUPS[0]
  groupIndex: number
  activeIndex: any
}) {
  const isActive = useTransform(activeIndex, (v: number) => Math.round(v) === groupIndex ? 1 : 0.3)

  return (
    <motion.div
      style={{ opacity: isActive }}
      className="w-screen shrink-0 flex flex-col justify-center px-4 md:px-[calc((100vw-1152px)/2+24px)] py-2 md:py-4"
    >
      {/* Panel header */}
      <div className="flex items-end justify-between mb-4 md:mb-8 max-w-6xl w-full mx-auto">
        <div>
          <span
            className="font-pixel text-[9px] uppercase tracking-widest block mb-1.5 md:mb-2"
            style={{ color: group.color }}
          >
            {group.index} — {group.label}
          </span>
          <p className="font-sans text-base sm:text-2xl font-bold text-foreground">
            {group.tagline}
          </p>
        </div>
        <span
          className="font-sans font-black text-5xl sm:text-8xl leading-none tracking-tighter"
          style={{ color: `${group.color}15` }}
        >
          {group.index}
        </span>
      </div>

      {/* Skill cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 max-w-6xl w-full mx-auto">
        {group.skills.map((skill, si) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: si * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col gap-2 md:gap-3 border border-glass-border bg-glass/30 p-3 md:p-5 transition-all hover:border-opacity-60 hover:-translate-y-1 hover:bg-glass/50"
            style={{ '--accent': skill.color } as any}
            whileHover={{ borderColor: `${skill.color}55`, boxShadow: `0 8px 24px -8px ${skill.color}22` }}
          >
            {/* Logo */}
            <div className="flex items-center justify-between">
              <img
                src={skill.logo}
                alt={skill.name}
                width={32}
                height={32}
                className="h-6 w-6 md:h-8 md:w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                style={{ filter: `drop-shadow(0 0 8px ${skill.color}55)` }}
              />
              <div
                className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: skill.color }}
              />
            </div>

            {/* Name */}
            <div>
              <h3
                className="font-sans font-bold text-[12px] md:text-sm text-foreground uppercase tracking-tight mb-0.5 md:mb-1 group-hover:text-[var(--accent)] transition-colors"
              >
                {skill.name}
              </h3>
              <p className="text-[9px] md:text-[10px] text-muted-ink leading-snug line-clamp-1 md:line-clamp-2">
                {skill.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint (only on last group) */}
      {groupIndex === SKILL_GROUPS.length - 1 && (
        <div className="mt-4 md:mt-8 max-w-6xl w-full mx-auto">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-ink">
            ↓ Keep scrolling
          </span>
        </div>
      )}
    </motion.div>
  )
}
