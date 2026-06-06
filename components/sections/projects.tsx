'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { SectionLabel } from '../section-label'

type Project = {
  name: string
  desc: string
  tags: string[]
  github: string
  live: string
  index: string
  logo: string
}

const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Vjeetos Media',
    desc: 'An all-in-one multimedia entertainment platform combining an international cinema library with an ad-free YouTube Premium streaming experience.',
    tags: ['React', 'TypeScript', 'Zustand', 'Tailwind'],
    github: 'https://github.com/NgVietKhoa/VjeetosMedia',
    live: 'https://example.com',
    logo: '/vjeetosmedia.png',
  },
  {
    index: '02',
    name: 'VjeetOS Wallet',
    desc: 'A smart personal finance manager with receipt scanning integrations, real-time transaction tracking, and a warm VOS design system built on NestJS and Next.js.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/NgVietKhoa/Vjeetos_Wallet',
    live: 'https://example.com',
    logo: '/vjeetoswallet.png',
  },
  {
    index: '03',
    name: 'DuDuFruit',
    desc: 'An e-commerce fruit storefront and custom gift basket builder built on a pnpm Turborepo monorepo with Next.js, NestJS, Redis, and Cloudinary.',
    tags: ['Next.js', 'NestJS', 'Redis', 'Turborepo'],
    github: 'https://github.com/NgVietKhoa/DuDuFruit',
    live: 'https://example.com',
    logo: '/dudufruit.png',
  },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track scroll progress of the entire Projects section
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  // Swipe Away Stacking Card animations (Left Column)
  
  // Swipe Away Stacking Card animations (Left Column)
  
  // Card 01: Starts on top. Swipes away upwards.
  const card1Y = useTransform(scrollYProgress, [0, 0.15, 0.45, 1], ['0px', '0px', '-140%', '-140%'])
  const card1Rotate = useTransform(scrollYProgress, [0, 0.15, 0.45, 1], [0, 0, -12, -12])
  const card1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.42, 1], [1, 1, 0, 0])

  // Card 02: Starts in middle layer. Only fades in after Card 01 swipes away.
  const card2Y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.45, 0.55, 0.85, 1], 
    ['18px', '18px', '0px', '0px', '-140%', '-140%']
  )
  const card2Scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 1],
    [0.94, 0.94, 1.0, 1.0]
  )
  const card2Rotate = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.55, 0.85, 1],
    [4, 4, 0, 0, 12, 12]
  )
  const card2Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.38, 0.55, 0.82, 1],
    [0, 0, 1, 1, 0, 0]
  )

  // Card 03: Starts in back layer. Only fades in after Card 02 swipes away.
  const card3Y = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    ['36px', '36px', '0px', '0px']
  )
  const card3Scale = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    [0.88, 0.88, 1.0, 1.0]
  )
  const card3Rotate = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    [-4, -4, 0, 0]
  )
  const card3Opacity = useTransform(
    scrollYProgress,
    [0, 0.52, 0.78, 1],
    [0, 0, 1, 1]
  )

  // Visibility logic to completely hide inactive blocks and prevent 3D flattening
  const card1Visibility = useTransform(scrollYProgress, (pos) => pos > 0.42 ? 'hidden' : 'visible')
  const card2Visibility = useTransform(scrollYProgress, (pos) => (pos >= 0.15 && pos <= 0.82) ? 'visible' : 'hidden')
  const card3Visibility = useTransform(scrollYProgress, (pos) => pos >= 0.52 ? 'visible' : 'hidden')

  // Text content slide-up translation (Right Column)
  const textY = useTransform(scrollYProgress, (progress) => {
    const step = isMobile ? 320 : 464
    if (progress <= 0.15) return '0px'
    if (progress <= 0.45) {
      const p = (progress - 0.15) / 0.3
      return `${-p * step}px`
    }
    if (progress <= 0.55) return `${-step}px`
    if (progress <= 0.85) {
      const p = (progress - 0.55) / 0.3
      return `${-step - p * step}px`
    }
    return `${-2 * step}px`
  })

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-transparent">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 relative">
          <SectionLabel index="03" label="PROJECTS" />

          {/* 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center w-full min-h-[70vh]">
            
            {/* Left Column: Fixed Stacking Cards (Swipe Away) */}
            {/* Perspective wrapper creates 3D depth for the block stack */}
            <div 
              style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
              className="relative flex items-center justify-center h-[230px] md:h-[520px] w-full order-1 overflow-visible scale-[0.62] md:scale-100 origin-center z-10"
            >
              
              {/* --- Card 03 (Back Layer, stays static/focuses at end) --- */}
              <motion.div 
                style={{ 
                  y: card3Y, 
                  scale: card3Scale, 
                  rotate: card3Rotate,
                  rotateX: 16,
                  rotateY: -20,
                  visibility: card3Visibility,
                  transformStyle: 'preserve-3d'
                }}
                className="absolute w-[300px] h-[300px] select-none z-10"
              >
                {/* 1. Top Face (Fruit Crate Top - Filled with colorful pixel fruits) */}
                <motion.div
                  className="absolute inset-0 bg-[#3d2716] border-4 border-[#251910] p-1.5"
                  style={{
                    transform: 'translate3d(0, -150px, 0) rotateX(90deg)',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.85)',
                    opacity: card3Opacity
                  }}
                >
                  {/* Wooden slats showing fruits between them */}
                  <div className="grid grid-cols-4 grid-rows-4 h-full w-full gap-1 bg-[#1e120a] p-1">
                    {[
                      'bg-red-500 shadow-[0_0_6px_#ef4444]', 'bg-[#5c3e26]', 'bg-[#5c3e26]', 'bg-amber-400 shadow-[0_0_6px_#fbbf24]',
                      'bg-[#5c3e26]', 'bg-grass shadow-[0_0_6px_#5b8a3c]', 'bg-orange-500 shadow-[0_0_6px_#f97316]', 'bg-[#5c3e26]',
                      'bg-[#5c3e26]', 'bg-red-500 shadow-[0_0_6px_#ef4444]', 'bg-[#5c3e26]', 'bg-grass shadow-[0_0_6px_#5b8a3c]',
                      'bg-orange-500 shadow-[0_0_6px_#f97316]', 'bg-[#5c3e26]', 'bg-[#5c3e26]', 'bg-amber-400 shadow-[0_0_6px_#fbbf24]'
                    ].map((cls, idx) => (
                      <div key={idx} className={`${cls} rounded-sm border border-black/10`} />
                    ))}
                  </div>
                </motion.div>
                
                {/* 2. Bottom Face */}
                <motion.div
                  className="absolute inset-0 bg-[#150f0a] border-2 border-zinc-950"
                  style={{
                    transform: 'translate3d(0, 150px, 0) rotateX(-90deg)',
                    opacity: card3Opacity
                  }}
                />

                {/* 3. Right Face (Crate Side - Horizontal Wood Slats) */}
                <motion.div
                  className="absolute inset-0 bg-[#3d2716] border-y-4 border-r-4 border-l-2 border-[#251910] p-1.5"
                  style={{
                    transform: 'translate3d(150px, 0, 0) rotateY(90deg)',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.85)',
                    opacity: card3Opacity
                  }}
                >
                  <div className="w-full h-full bg-[#1e120a] flex flex-col justify-between gap-1.5">
                    <div className="h-5 w-full bg-[#5c3e26] border-y border-[#3d2716]" />
                    <div className="h-5 w-full bg-[#5c3e26] border-y border-[#3d2716]" />
                    <div className="h-5 w-full bg-[#5c3e26] border-y border-[#3d2716]" />
                    <div className="h-5 w-full bg-[#5c3e26] border-y border-[#3d2716]" />
                  </div>
                </motion.div>

                {/* 4. Left Face */}
                <motion.div
                  className="absolute inset-0 bg-[#2d1b0f] border-y-4 border-l-4 border-r-2 border-[#1e120a] p-1.5"
                  style={{
                    transform: 'translate3d(-150px, 0, 0) rotateY(-90deg)',
                    opacity: card3Opacity
                  }}
                >
                  <div className="w-full h-full bg-[#1e120a] flex flex-col justify-between gap-1.5">
                    <div className="h-5 w-full bg-[#4d331e] border-y border-[#2d1b0f]" />
                    <div className="h-5 w-full bg-[#4d331e] border-y border-[#2d1b0f]" />
                    <div className="h-5 w-full bg-[#4d331e] border-y border-[#2d1b0f]" />
                    <div className="h-5 w-full bg-[#4d331e] border-y border-[#2d1b0f]" />
                  </div>
                </motion.div>

                {/* 5. Back Face */}
                <motion.div
                  className="absolute inset-0 bg-[#150f0a] border-4 border-[#251910]"
                  style={{
                    transform: 'translate3d(0, 0, -150px) rotateY(180deg)',
                    opacity: card3Opacity
                  }}
                />

                {/* 6. Front Face (Oak Wood Crate with Diagonal Cross Braces) */}
                <motion.div
                  className="absolute inset-0 bg-[#3d2716] border-4 border-[#251910] p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
                  style={{
                    transform: 'translate3d(0, 0, 150px)',
                    opacity: card3Opacity
                  }}
                >
                  {/* Outer crate board paneling background */}
                  <div className="absolute inset-1.5 border-4 border-[#251910] bg-[#5c3e26] z-0" />
                  
                  {/* Diagonal Cross Braces (CSS generated) */}
                  <div className="absolute inset-4 border-2 border-dashed border-[#3d2716] opacity-35 z-10 pointer-events-none flex items-center justify-center">
                    <div className="w-full h-2 bg-[#3d2716] rotate-45 absolute" />
                    <div className="w-full h-2 bg-[#3d2716] -rotate-45 absolute" />
                  </div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,138,60,0.1)_0%,transparent_85%)] pointer-events-none z-10" />

                  {/* Project Logo in Center (with gold glow) */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <img 
                      src={PROJECTS[2].logo} 
                      alt={`${PROJECTS[2].name} Center Logo`} 
                      className="w-28 h-28 object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.7)]" 
                    />
                  </div>

                  <div className="relative z-20 flex justify-between items-start pt-1">
                    <span className="font-sans font-black text-5xl text-grass/30 leading-none tracking-tighter">03</span>
                    <span className="text-[10px] text-grass font-pixel tracking-widest bg-black/40 px-2 py-0.5 rounded border border-grass/20 uppercase">Store</span>
                  </div>
                  <div className="relative z-20 space-y-3">
                    <h3 className="font-sans font-black tracking-tight text-lg text-white uppercase drop-shadow-md">{PROJECTS[2].name}</h3>
                    <div className="h-1 w-14 bg-grass shadow-[0_0_8px_rgba(91,138,60,0.6)]" />
                  </div>
                </motion.div>
  
              </motion.div>
  
              {/* --- Card 02 (Middle Layer, swipes away at 0.55-0.85) --- */}
              <motion.div 
                style={{ 
                  y: card2Y, 
                  scale: card2Scale, 
                  rotate: card2Rotate, 
                  rotateX: 16,
                  rotateY: -20,
                  visibility: card2Visibility,
                  transformStyle: 'preserve-3d'
                }}
                className="absolute w-[300px] h-[300px] select-none z-20"
              >
                {/* 1. Top Face (Vault Safe Top - Steel & Electronic Circuits) */}
                <motion.div
                  className="absolute inset-0 bg-[#202026] border-4 border-zinc-700 flex items-center justify-center p-3"
                  style={{
                    transform: 'translate3d(0, -150px, 0) rotateX(90deg)',
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
                    opacity: card2Opacity
                  }}
                >
                  <div className="w-full h-full border-4 border-zinc-650 bg-[#16161b] relative p-2 overflow-hidden">
                    {/* Glowing gold/blue circuit lines */}
                    <div className="absolute top-2 left-0 right-0 h-0.5 bg-blue-500/30" />
                    <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-blue-500/30" />
                    <div className="absolute top-8 left-6 right-10 h-0.5 bg-blue-500/30" />
                    <div className="absolute top-8 right-10 bottom-0 w-0.5 bg-blue-500/30" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500/20 border border-blue-500 rounded-full animate-ping" />
                  </div>
                </motion.div>
                
                {/* 2. Bottom Face */}
                <motion.div
                  className="absolute inset-0 bg-[#0c0c0f] border-2 border-zinc-950"
                  style={{
                    transform: 'translate3d(0, 150px, 0) rotateX(-90deg)',
                    opacity: card2Opacity
                  }}
                />

                {/* 3. Right Face (Reinforced Vault Wall - Heavy Steel Plate) */}
                <motion.div
                  className="absolute inset-0 bg-[#25252d] border-x-4 border-y-2 border-zinc-800 p-2 flex flex-col justify-between"
                  style={{
                    transform: 'translate3d(150px, 0, 0) rotateY(90deg)',
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
                    opacity: card2Opacity
                  }}
                >
                  <div className="w-full h-full border-4 border-double border-zinc-700 bg-[#1b1b21] relative p-1.5 flex flex-col justify-between">
                    {/* Corner bolts/rivets */}
                    <div className="flex justify-between w-full">
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                    </div>
                    {/* Heavy metal reinforce line */}
                    <div className="h-4 w-full bg-zinc-800 border-y border-zinc-700/50" />
                    <div className="flex justify-between w-full">
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                    </div>
                  </div>
                </motion.div>

                {/* 4. Left Face */}
                <motion.div
                  className="absolute inset-0 bg-[#1e1e24] border-x-4 border-y-2 border-zinc-850 p-2 flex flex-col justify-between"
                  style={{
                    transform: 'translate3d(-150px, 0, 0) rotateY(-90deg)',
                    opacity: card2Opacity
                  }}
                >
                  <div className="w-full h-full border-4 border-double border-zinc-700 bg-[#16161b] relative p-1.5 flex flex-col justify-between">
                    <div className="flex justify-between w-full">
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                    </div>
                    <div className="h-4 w-full bg-zinc-800 border-y border-zinc-700/50" />
                    <div className="flex justify-between w-full">
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                      <div className="w-3 h-3 bg-zinc-600 border border-zinc-900 rounded-sm" />
                    </div>
                  </div>
                </motion.div>

                {/* 5. Back Face */}
                <motion.div
                  className="absolute inset-0 bg-[#121215] border-2 border-zinc-950"
                  style={{
                    transform: 'translate3d(0, 0, -150px) rotateY(180deg)',
                    opacity: card2Opacity
                  }}
                />

                {/* 6. Front Face (Vault Door with Combination Dial & Logo) */}
                <motion.div
                  className="absolute inset-0 bg-[#282830] border-4 border-zinc-700 p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
                  style={{
                    transform: 'translate3d(0, 0, 150px)',
                    opacity: card2Opacity
                  }}
                >
                  {/* Heavy Steel door plate border */}
                  <div className="absolute inset-1.5 border-4 border-zinc-600 bg-[#1d1d22] z-0" />
                  
                  {/* Camera lens/Scanner indicator (finance scanning) */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-[#1e1e24] border border-zinc-700 rounded-sm z-20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                  </div>

                  {/* Vault Combination Lock Dial surrounding logo */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-36 h-36 rounded-full border-4 border-dashed border-blue-500/30 bg-black/45 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)] animate-[spin_30s_linear_infinite]" />
                  </div>

                  {/* Project Logo in Center (with blue glow) */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <img 
                      src={PROJECTS[1].logo} 
                      alt={`${PROJECTS[1].name} Center Logo`} 
                      className="w-28 h-28 object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.7)]" 
                    />
                  </div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_85%)] pointer-events-none z-10" />

                  <div className="relative z-20 flex justify-between items-start pt-1">
                    <span className="font-sans font-black text-5xl text-blue-500/20 leading-none tracking-tighter">02</span>
                    <span className="text-[10px] text-blue-500 font-pixel tracking-widest bg-black/40 px-2 py-0.5 rounded border border-blue-500/20 uppercase">Wallet</span>
                  </div>
                  <div className="relative z-20 space-y-3">
                    <h3 className="font-sans font-black tracking-tight text-lg text-white uppercase drop-shadow-md">{PROJECTS[1].name}</h3>
                    <div className="h-1 w-14 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  </div>
                </motion.div>
              </motion.div>
  
              {/* --- Card 01 (Top Layer, swipes away at 0.15-0.45) --- */}
              <motion.div 
                style={{ 
                  y: card1Y, 
                  rotate: card1Rotate, 
                  rotateX: 16,
                  rotateY: -20,
                  visibility: card1Visibility,
                  transformStyle: 'preserve-3d'
                }}
                className="absolute w-[300px] h-[300px] select-none z-30"
              >
                {/* 1. Top Face (Media Player Ventilation & Controls) */}
                <motion.div
                  className="absolute inset-0 bg-[#25252a] border-4 border-zinc-800 p-3 flex flex-col justify-between"
                  style={{
                    transform: 'translate3d(0, -150px, 0) rotateX(90deg)',
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
                    opacity: card1Opacity
                  }}
                >
                  {/* Speaker vent grills */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="h-2 w-full bg-black/60 rounded-sm" />
                    <div className="h-2 w-full bg-black/60 rounded-sm" />
                    <div className="h-2 w-full bg-black/60 rounded-sm" />
                    <div className="h-2 w-full bg-black/60 rounded-sm" />
                  </div>
                  {/* Glowing control buttons */}
                  <div className="flex justify-between items-center w-full">
                    <div className="w-4 h-4 bg-orange-500 rounded-sm animate-pulse shadow-[0_0_8px_#f97316]" />
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 bg-zinc-600 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-zinc-600 rounded-sm" />
                    </div>
                  </div>
                </motion.div>
                
                {/* 2. Bottom Face */}
                <motion.div
                  className="absolute inset-0 bg-[#0f0f12] border-2 border-zinc-950"
                  style={{
                    transform: 'translate3d(0, 150px, 0) rotateX(-90deg)',
                    opacity: card1Opacity
                  }}
                />

                {/* 3. Right Face (Film Strip side) */}
                <motion.div
                  className="absolute inset-0 bg-[#1e1e24] border-x-4 border-y-2 border-zinc-800 p-2 flex flex-col justify-between"
                  style={{
                    transform: 'translate3d(150px, 0, 0) rotateY(90deg)',
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.95)',
                    opacity: card1Opacity
                  }}
                >
                  {/* Top Film Sprockets */}
                  <div className="flex justify-between w-full">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-3 h-3 bg-black border border-zinc-700" />
                    ))}
                  </div>
                  {/* Cinema film reel circle */}
                  <div className="w-32 h-32 rounded-full border-4 border-dashed border-zinc-700 bg-black/50 self-center flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-zinc-800 bg-[#2d2d35]/30" />
                  </div>
                  {/* Bottom Film Sprockets */}
                  <div className="flex justify-between w-full">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-3 h-3 bg-black border border-zinc-700" />
                    ))}
                  </div>
                </motion.div>

                {/* 4. Left Face */}
                <motion.div
                  className="absolute inset-0 bg-[#18181c] border-x-4 border-y-2 border-zinc-850 p-2 flex flex-col justify-between"
                  style={{
                    transform: 'translate3d(-150px, 0, 0) rotateY(-90deg)',
                    opacity: card1Opacity
                  }}
                >
                  <div className="flex justify-between w-full">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-3 h-3 bg-black border border-zinc-700" />
                    ))}
                  </div>
                  <div className="w-32 h-32 rounded-full border-4 border-dashed border-zinc-700 bg-black/50 self-center flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-zinc-800 bg-[#2d2d35]/30" />
                  </div>
                  <div className="flex justify-between w-full">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-3 h-3 bg-black border border-zinc-700" />
                    ))}
                  </div>
                </motion.div>

                {/* 5. Back Face */}
                <motion.div
                  className="absolute inset-0 bg-[#121215] border-2 border-zinc-950"
                  style={{
                    transform: 'translate3d(0, 0, -150px) rotateY(180deg)',
                    opacity: card1Opacity
                  }}
                />

                {/* 6. Front Face (Cinema Screen / YouTube Player Face) */}
                <motion.div
                  className="absolute inset-0 bg-[#1a1a20] border-4 border-zinc-800 p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
                  style={{
                    transform: 'translate3d(0, 0, 150px)',
                    opacity: card1Opacity
                  }}
                >
                  {/* Glowing Screen ambient border */}
                  <div className="absolute inset-1 border border-orange-500/20 bg-black/40 z-0" />

                  {/* Project Logo in Center (with premium orange glow) */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <img 
                      src={PROJECTS[0].logo} 
                      alt={`${PROJECTS[0].name} Center Logo`} 
                      className="w-28 h-28 object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.75)] filter brightness-110" 
                    />
                  </div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_80%)] pointer-events-none z-10" />

                  <div className="relative z-20 flex justify-between items-start">
                    <span className="font-sans font-black text-5xl text-orange-500/20 leading-none tracking-tighter">01</span>
                    <span className="text-[10px] text-zinc-500 font-pixel tracking-widest bg-black/40 px-2 py-0.5 rounded border border-white/5 uppercase">Media</span>
                  </div>
                  <div className="relative z-20 space-y-3">
                    <h3 className="font-sans font-black tracking-tight text-lg text-white uppercase drop-shadow-md">{PROJECTS[0].name}</h3>
                    <div className="h-1 w-14 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                  </div>
                </motion.div>
              </motion.div>
 
            </div>
 
            {/* Right Column: Masked Scroll-Driven Text Content */}
            <div className="h-[280px] md:h-[400px] overflow-hidden relative order-2 z-0">
              <motion.div 
                style={{ y: textY }}
                className="flex flex-col space-y-10 md:space-y-16"
              >
                {PROJECTS.map((project, i) => (
                  <div key={project.name} className="h-[280px] md:h-[400px] shrink-0 flex flex-col justify-center space-y-3 md:space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-pixel text-[11px] text-grass">{project.index}</span>
                      <span className="h-px w-8 bg-glass-border" />
                      <span className="font-pixel text-[9px] tracking-wider text-muted-ink uppercase">SELECTED_WORK</span>
                    </div>
                    
                    <h3 className="font-sans font-black tracking-tight text-2xl sm:text-3xl text-foreground uppercase">
                      {project.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {project.desc}
                    </p>
 
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-glass-border bg-glass px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
 
                    <div className="flex items-center gap-6 pt-4 text-xs uppercase tracking-[0.15em] border-t border-glass-border">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground transition-colors hover:text-leaf"
                      >
                        &gt; github
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground transition-colors hover:text-leaf"
                      >
                        &gt; live website
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
 
          </div>
        </div>
      </div>
    </div>
  )
}
