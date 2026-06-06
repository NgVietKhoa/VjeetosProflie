'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLenis } from './lenis-provider'

const LOADING_MESSAGES = [
  'INITIALIZING SYSTEM...',
  'GENERATING PORTFOLIO TERRAIN...',
  'LOADING TECH TEXTURES...',
  'CRAFTING BLOCK GRID...',
  'SPAWNING PROJECTS...',
  'PREPARING EXPLORING VAULT...',
  'ESTABLISHING CONNECTION...',
  'READY!',
]

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const { lenis } = useLenis()

  // 1. Loading progress interval simulation
  useEffect(() => {
    let currentProgress = 0
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 2
      currentProgress = Math.min(100, currentProgress + increment)
      setProgress(currentProgress)

      const targetMsgIndex = Math.min(
        LOADING_MESSAGES.length - 1,
        Math.floor((currentProgress / 100) * LOADING_MESSAGES.length)
      )
      setMessageIndex(targetMsgIndex)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setLoadingComplete(true)
          if (onComplete) onComplete()
        }, 500)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [onComplete])

  // 2. Lock scrolling via Lenis instance to prevent background scrolling lag
  useEffect(() => {
    if (!lenis) return
    if (!loadingComplete) {
      lenis.stop()
    } else {
      lenis.start()
    }
    return () => {
      lenis.start()
    }
  }, [lenis, loadingComplete])

  return (
    <AnimatePresence>
      {!loadingComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#07070a] text-foreground grid-overlay"
        >
          {/* Subtle green ambient backglow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-grass/5 blur-[120px] mix-blend-screen pointer-events-none" />

          <div className="w-full max-w-sm px-6 flex flex-col items-stretch text-center z-10">
            {/* Minecraft theme indicator */}
            <span className="font-pixel text-[8px] tracking-[0.3em] text-grass mb-6 block uppercase animate-pulse">
              // BOOTING_VAULT_OS
            </span>

            {/* Dynamic simulated percentage */}
            <div className="font-pixel text-4xl sm:text-5xl font-black mb-8 select-none tabular-nums text-foreground">
              {progress}<span className="text-grass">%</span>
            </div>

            {/* Status text */}
            <div className="font-mono text-[10px] tracking-wider text-muted-ink h-6 mb-6 select-none">
              {LOADING_MESSAGES[messageIndex]}
            </div>

            {/* Premium Minecraft-style Pixel Progress Bar */}
            <div className="h-6 w-full border-2 border-[#3c3c3c] bg-[#141414] p-1 flex items-center overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-grass/60 via-grass to-leaf shadow-[0_0_12px_#7ec85088]"
              />
            </div>
          </div>

          {/* Micro-terminal text in the corner */}
          <div className="absolute bottom-6 left-6 font-mono text-[8px] text-muted-ink select-none hidden sm:block">
            VOS_LOADER_v2.0.6 // SYS_INIT_OK
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
