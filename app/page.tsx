'use client'

import { LenisProvider } from '@/components/lenis-provider'
import { PixelCursor } from '@/components/pixel-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { TechMarquee } from '@/components/tech-marquee'
import { Hero } from '@/components/sections/hero'
import { MinecraftChest } from '@/components/sections/minecraft-chest'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Contact } from '@/components/sections/contact'

export default function Page() {
  return (
    <LenisProvider>
      <PixelCursor />
      <ScrollProgress />
      <main className="relative">
        <Hero />
        <TechMarquee />
        <MinecraftChest />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </LenisProvider>
  )
}
