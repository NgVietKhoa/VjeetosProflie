'use client'

import { useState } from 'react'
import { LenisProvider } from '@/components/lenis-provider'
import { PixelCursor } from '@/components/pixel-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { TechMarquee } from '@/components/tech-marquee'
import { LoadingScreen } from '@/components/loading-screen'
import { Hero } from '@/components/sections/hero'
import { MinecraftChest } from '@/components/sections/minecraft-chest'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Contact } from '@/components/sections/contact'

import { motion } from 'framer-motion'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <LenisProvider>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <PixelCursor />
      <ScrollProgress />
      <motion.main
        initial={{ opacity: 0, y: 100 }}
        animate={isLoading ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        className="relative"
      >
        <Hero />
        <TechMarquee />
        <MinecraftChest />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>
    </LenisProvider>
  )
}
