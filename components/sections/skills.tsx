'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

type Skill = {
  name: string
  level: number
  desc: string
  color: string
  logo: string
}

const SKILLS: Skill[] = [
  { name: 'JavaScript', level: 95, desc: 'The core programming language powering interactive webs.', color: '#f0db4f', logo: '/logos/javascript.svg' },
  { name: 'TypeScript', level: 92, desc: 'Static typing layer ensuring absolute system safety.', color: '#3178c6', logo: '/logos/typescript.svg' },
  { name: 'Java', level: 84, desc: 'Object-oriented programming for robust, enterprise-grade backends.', color: '#f89820', logo: '/logos/java.svg' },
  { name: 'React', level: 94, desc: 'Component-driven frontend engineering for modern views.', color: '#61dafb', logo: '/logos/react.svg' },
  { name: 'Next.js', level: 90, desc: 'Production-grade React framework for fullstack applications.', color: '#f0ede6', logo: '/logos/nextjs.svg' },
  { name: 'Node.js', level: 88, desc: 'Scalable server-side JavaScript runtime engine.', color: '#5b8a3c', logo: '/logos/nodejs.svg' },
  { name: 'PostgreSQL', level: 82, desc: 'Robust relational database architecture for secure data.', color: '#336791', logo: '/logos/postgresql.svg' },
  { name: 'Docker', level: 78, desc: 'Isolated application containerization for simple shipping.', color: '#2496ed', logo: '/logos/docker.svg' },
  { name: 'Git', level: 90, desc: 'Distributed version control and collaboration mastery.', color: '#f1502f', logo: '/logos/git.svg' },
  { name: 'Tailwind', level: 93, desc: 'Utility-first CSS styling for rapid, clean interfaces.', color: '#38bdf8', logo: '/logos/tailwindcss.svg' },
  { name: 'GraphQL', level: 80, desc: 'Declarative query APIs for fetching exactly what is needed.', color: '#e535ab', logo: '/logos/graphql.svg' },
  { name: 'Redis', level: 76, desc: 'Ultra-fast in-memory caching and message brokerage.', color: '#d82c20', logo: '/logos/redis.svg' },
  { name: 'AWS', level: 74, desc: 'Cloud computing infrastructure, deployments, and storage.', color: '#ff9900', logo: '/logos/aws.svg' },
]

export function Skills() {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [travelDistance, setTravelDistance] = useState(0)

  // Track scroll position of the tall wrapper element
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Measure track widths on mount and resize to calculate precise pixel travel
  useEffect(() => {
    if (!trackRef.current) return
    
    const handleResize = () => {
      const trackElement = trackRef.current
      const trackWidth = trackElement.scrollWidth
      const viewportWidth = window.innerWidth
      
      // Extract computed padding-right to exclude it from the travel calculation,
      // bringing the last card perfectly flush with the screen's right edge.
      const style = window.getComputedStyle(trackElement)
      const paddingRight = parseFloat(style.paddingRight) || 0
      
      setTravelDistance(Math.max(0, trackWidth - paddingRight - viewportWidth))
    }

    // Set initial size
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Map vertical scroll progress (0 -> 1) to horizontal translation (0 -> -travelDistance)
  const x = useTransform(scrollYProgress, (latest) => latest * -travelDistance)

  return (
    <section ref={targetRef} id="skills" className="relative h-[450vh] w-full bg-transparent">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full">
        
        {/* Floating header aligned with page grid */}
        <div className="mx-auto w-full max-w-6xl px-6 pointer-events-none z-10 mb-10">
          <div className="flex flex-col items-start gap-2">
            <span className="font-pixel text-[10px] tracking-[0.3em] text-grass uppercase">
              // SYSTEM_INVENTORY
            </span>
            <h2 className="font-sans font-black tracking-tighter text-3xl text-foreground uppercase">
              SKILLS SHOWCASE
            </h2>
          </div>
        </div>

        {/* Fullscreen Horizontal Scroll Track */}
        <div className="w-screen overflow-hidden flex items-center justify-start h-[50vh] md:h-[60vh] relative">
          <motion.div
            ref={trackRef}
            style={{ x }}
            // Padding aligns the first card at start. The paddingRight is subtracted in JS to align the last card at end.
            className="flex gap-5 md:gap-10 pl-6 pr-6 md:pl-[calc((100vw-1152px)/2+24px)] md:pr-[calc((100vw-1152px)/2+24px)] w-fit"
          >
            {SKILLS.map((skill, i) => {
              const numStr = String(i + 1).padStart(2, '0')
              return (
                <div
                  key={skill.name}
                  className="group relative w-[260px] sm:w-[320px] md:w-[440px] shrink-0 h-[38vh] min-h-[280px] md:h-[48vh] md:min-h-[340px] select-none p-[3px] bg-zinc-800/80 transition-colors hover:bg-grass/70"
                  style={{
                    clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))'
                  }}
                >
                  {/* Inner Content Container - Minecraft GUI themed */}
                  <div
                    className="w-full h-full bg-[#131317]/95 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))'
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,138,60,0.03)_0%,transparent_80%)] pointer-events-none" />

                    {/* Top: Large index number and status indicator */}
                    <div className="flex justify-between items-start relative z-10">
                      <span className="font-sans font-black text-5xl sm:text-7xl md:text-8xl text-grass/20 leading-[0.8] tracking-tighter transition-colors group-hover:text-grass/30">
                        {numStr}
                      </span>
                      <span className="font-pixel text-[8px] tracking-[0.2em] text-muted-ink uppercase pt-1">
                        LEVEL: {skill.level}%
                      </span>
                    </div>

                    {/* Middle: Brand Logo */}
                    <div className="flex justify-start items-center my-2 md:my-4 relative z-10">
                      <img
                        src={skill.logo || '/placeholder.svg'}
                        alt={`${skill.name} logo`}
                        width={44}
                        height={44}
                        loading="lazy"
                        className="h-11 w-11 md:h-13 md:w-13 shrink-0 object-contain filter brightness-95 contrast-105 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Bottom: Skill Info & Details */}
                    <div className="space-y-2 md:space-y-3 relative z-10">
                      <h3 className="font-sans font-black tracking-tight text-lg md:text-2xl text-foreground uppercase">
                        {skill.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                        {skill.desc}
                      </p>

                      {/* Segmented progress indicator */}
                      <div className="flex gap-[3px] pt-2">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <span
                            key={idx}
                            className="h-[3px] flex-1 bg-white/5 transition-colors duration-300 group-hover:bg-white/10"
                            style={{
                              backgroundColor:
                                idx < Math.round(skill.level / 10)
                                  ? '#7ec850'
                                  : undefined,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
