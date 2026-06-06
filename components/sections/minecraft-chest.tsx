'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export function MinecraftChest() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress exactly from when the container pins (start start)
  // to when it finishes pinning (end end)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth out scroll progress values using physics springs
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 85,
    mass: 0.5,
  })

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Map scroll progress to animations (all within the pinned window)
  // 1. Lid rotation: opens from 12% to 50% of the sticky scroll timeline
  const lidRotation = useTransform(smoothProgress, [0.12, 0.5], [0, 115])
  
  // 2. Chest rotation to showcase 3D depth dynamically
  const chestRotateY = useTransform(smoothProgress, [0, 1], [-25, 25])
  const chestRotateX = useTransform(smoothProgress, [0, 1], [18, 12])
  
  // 3. Zoom-in/scale effect as we scroll (shifted down to keep chest lower)
  const chestScale = useTransform(smoothProgress, [0.1, 0.75], [isMobile ? 0.65 : 0.85, isMobile ? 0.95 : 1.2])
  const chestTranslateY = useTransform(smoothProgress, [0, 1], [isMobile ? 160 : 80, isMobile ? 90 : 20])
  
  // 4. Glow inside the chest: opens up and brightens
  const glowOpacity = useTransform(smoothProgress, [0.15, 0.45, 0.85, 0.98], [0, 0.95, 0.95, 0])
  const glowScale = useTransform(smoothProgress, [0.15, 0.65], [0.5, 3.5])
  
  // 5. Scattering title plates in 3D space around the chest (animating from 20% to 65%)
  // Title 1: ABOUT (Flies to top-left on desktop, top-center on mobile)
  const card1X = useTransform(smoothProgress, [0.2, 0.6], [0, isMobile ? 0 : -300])
  const card1Y = useTransform(smoothProgress, [0.2, 0.6], [0, isMobile ? -270 : -90])
  const card1Z = useTransform(smoothProgress, [0.2, 0.6], [0, isMobile ? 80 : 140])
  const card1RotY = useTransform(smoothProgress, [0.2, 0.6], [0, isMobile ? 0 : -25])
  const card1Opacity = useTransform(smoothProgress, [0.2, 0.35, 0.85, 0.95], [0, 1, 1, 0])

  // Title 2: SKILLS (Flies to top-right on desktop, middle-top-center on mobile)
  const card2X = useTransform(smoothProgress, [0.22, 0.62], [0, isMobile ? 0 : 300])
  const card2Y = useTransform(smoothProgress, [0.22, 0.62], [0, isMobile ? -210 : -90])
  const card2Z = useTransform(smoothProgress, [0.22, 0.62], [0, isMobile ? 80 : 140])
  const card2RotY = useTransform(smoothProgress, [0.22, 0.62], [0, isMobile ? 0 : 25])
  const card2Opacity = useTransform(smoothProgress, [0.22, 0.37, 0.85, 0.95], [0, 1, 1, 0])

  // Title 3: PROJECTS (Flies to middle-left on desktop, middle-bottom-center on mobile)
  const card3X = useTransform(smoothProgress, [0.24, 0.64], [0, isMobile ? 0 : -300])
  const card3Y = useTransform(smoothProgress, [0.24, 0.64], [0, isMobile ? -150 : 30])
  const card3Z = useTransform(smoothProgress, [0.24, 0.64], [0, isMobile ? 80 : 90])
  const card3RotY = useTransform(smoothProgress, [0.24, 0.64], [0, isMobile ? 0 : -15])
  const card3Opacity = useTransform(smoothProgress, [0.24, 0.39, 0.85, 0.95], [0, 1, 1, 0])

  // Title 4: CONTACT (Flies to middle-right on desktop, bottom-center on mobile)
  const card4X = useTransform(smoothProgress, [0.26, 0.66], [0, isMobile ? 0 : 300])
  const card4Y = useTransform(smoothProgress, [0.26, 0.66], [0, isMobile ? -90 : 30])
  const card4Z = useTransform(smoothProgress, [0.26, 0.66], [0, isMobile ? 80 : 90])
  const card4RotY = useTransform(smoothProgress, [0.26, 0.66], [0, isMobile ? 0 : 15])
  const card4Opacity = useTransform(smoothProgress, [0.26, 0.41, 0.85, 0.95], [0, 1, 1, 0])

  return (
    <div
      ref={containerRef}
      className="relative z-10 h-[150vh] md:h-[280vh] bg-transparent w-full overflow-visible"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        
        {/* Background Ambient Glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,200,80,0.18)_0%,transparent_60%)] pointer-events-none"
        />

        {/* Dynamic header banner */}
        <div className="absolute top-16 flex flex-col items-center text-center px-4 pointer-events-none z-20">
          <span className="font-pixel text-[9px] tracking-[0.25em] text-grass mb-2">
            // CORE_VAULT
          </span>
          <h3 className="font-sans font-black tracking-tight text-2xl sm:text-3xl md:text-4xl text-foreground uppercase">
            EXPLORING THE CORE
          </h3>
        </div>

        {/* 3D Scene Wrapper */}
        <motion.div
          style={{
            perspective: '1400px',
            transformStyle: 'preserve-3d',
          }}
          className="relative flex items-center justify-center w-full h-[550px]"
        >
          {/* Main 3D Chest Container */}
          <motion.div
            style={{
              rotateY: chestRotateY,
              rotateX: chestRotateX,
              scale: chestScale,
              y: chestTranslateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-[220px] h-[200px]"
          >
            {/* --- 1. GLOW & SCATTERED HOLOGRAPHIC TITLES (Symmetrical Virtual Anchors) --- */}
            <div className="absolute top-0 left-[110px] w-0 h-0" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* Internal glow sphere */}
              <motion.div
                style={{
                  scale: glowScale,
                  opacity: glowOpacity,
                  transform: 'translate3d(-50%, -50%, 0)',
                }}
                className="absolute w-28 h-28 rounded-full bg-leaf/30 blur-2xl pointer-events-none"
              />

              {/* Hologram 1: ABOUT (Top-Left) */}
              <motion.div
                style={{
                  x: card1X,
                  y: card1Y,
                  z: card1Z,
                  rotateY: card1RotY,
                  opacity: card1Opacity,
                  transformStyle: 'preserve-3d',
                }}
                className="absolute w-0 h-0"
              >
                <a
                  href="#about"
                  className="absolute left-[-90px] top-[-22px] w-[180px] h-[44px] p-[2px] bg-grass/50 hover:bg-leaf transition-colors shadow-[0_0_20px_rgba(126,200,80,0.25)] pointer-events-auto cursor-none group"
                  style={{
                    clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                  }}
                >
                  <div
                    className="w-full h-full bg-[#0c0c0e]/95 flex items-center justify-between px-4"
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                  >
                    <span className="font-pixel text-[9px] text-grass tracking-wider uppercase group-hover:text-leaf transition-colors">01. ABOUT</span>
                    <span className="text-[10px] font-sans font-bold tracking-tight text-white">&rarr;</span>
                  </div>
                </a>
              </motion.div>
 
              {/* Hologram 2: SKILLS (Top-Right) */}
              <motion.div
                style={{
                  x: card2X,
                  y: card2Y,
                  z: card2Z,
                  rotateY: card2RotY,
                  opacity: card2Opacity,
                  transformStyle: 'preserve-3d',
                }}
                className="absolute w-0 h-0"
              >
                <a
                  href="#skills"
                  className="absolute left-[-90px] top-[-22px] w-[180px] h-[44px] p-[2px] bg-grass/50 hover:bg-leaf transition-colors shadow-[0_0_20px_rgba(126,200,80,0.25)] pointer-events-auto cursor-none group"
                  style={{
                    clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                  }}
                >
                  <div
                    className="w-full h-full bg-[#0c0c0e]/95 flex items-center justify-between px-4"
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                  >
                    <span className="font-pixel text-[9px] text-grass tracking-wider uppercase group-hover:text-leaf transition-colors">02. SKILLS</span>
                    <span className="text-[10px] font-sans font-bold tracking-tight text-white">&rarr;</span>
                  </div>
                </a>
              </motion.div>
 
              {/* Hologram 3: PROJECTS (Middle-Left) */}
              <motion.div
                style={{
                  x: card3X,
                  y: card3Y,
                  z: card3Z,
                  rotateY: card3RotY,
                  opacity: card3Opacity,
                  transformStyle: 'preserve-3d',
                }}
                className="absolute w-0 h-0"
              >
                <a
                  href="#projects"
                  className="absolute left-[-90px] top-[-22px] w-[180px] h-[44px] p-[2px] bg-grass/50 hover:bg-leaf transition-colors shadow-[0_0_20px_rgba(126,200,80,0.25)] pointer-events-auto cursor-none group"
                  style={{
                    clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                  }}
                >
                  <div
                    className="w-full h-full bg-[#0c0c0e]/95 flex items-center justify-between px-4"
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                  >
                    <span className="font-pixel text-[9px] text-grass tracking-wider uppercase group-hover:text-leaf transition-colors">03. PROJECTS</span>
                    <span className="text-[10px] font-sans font-bold tracking-tight text-white">&rarr;</span>
                  </div>
                </a>
              </motion.div>
 
              {/* Hologram 4: CONTACT (Middle-Right) */}
              <motion.div
                style={{
                  x: card4X,
                  y: card4Y,
                  z: card4Z,
                  rotateY: card4RotY,
                  opacity: card4Opacity,
                  transformStyle: 'preserve-3d',
                }}
                className="absolute w-0 h-0"
              >
                <a
                  href="#contact"
                  className="absolute left-[-90px] top-[-22px] w-[180px] h-[44px] p-[2px] bg-grass/50 hover:bg-leaf transition-colors shadow-[0_0_20px_rgba(126,200,80,0.25)] pointer-events-auto cursor-none group"
                  style={{
                    clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                  }}
                >
                  <div
                    className="w-full h-full bg-[#0c0c0e]/95 flex items-center justify-between px-4"
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                  >
                    <span className="font-pixel text-[9px] text-grass tracking-wider uppercase group-hover:text-leaf transition-colors">04. CONTACT</span>
                    <span className="text-[10px] font-sans font-bold tracking-tight text-white">&rarr;</span>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* --- 2. CHEST BASE (Spans from Y = 0 to Y = 120px) --- */}
            <div className="absolute top-0 left-0 w-[220px] h-[120px]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Front Face (Z = 110px) */}
              <div
                className="absolute inset-0 bg-[#83552a] border-[6px] border-[#281b10] flex flex-col justify-between p-2 shadow-inner"
                style={{
                  transform: 'translate3d(0, 0, 110px)',
                  boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.6)',
                  height: '120px',
                }}
              >
                <div className="w-full h-1 bg-white/5" />
                <div className="w-full h-1 bg-black/10" />
              </div>
              
              {/* Back Face (Z = -110px) */}
              <div
                className="absolute inset-0 bg-[#663a17] border-[6px] border-[#281b10]"
                style={{
                  transform: 'translate3d(0, 0, -110px) rotateY(180deg)',
                  boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.7)',
                  height: '120px',
                }}
              />
              
              {/* Left Face (X = -110px) */}
              <div
                className="absolute inset-0 bg-[#78441c] border-[6px] border-[#281b10]"
                style={{
                  transform: 'translate3d(-110px, 0, 0) rotateY(-90deg)',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.6)',
                  width: '220px',
                  height: '120px',
                }}
              />
              
              {/* Right Face (X = 110px) */}
              <div
                className="absolute inset-0 bg-[#78441c] border-[6px] border-[#281b10]"
                style={{
                  transform: 'translate3d(110px, 0, 0) rotateY(90deg)',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.6)',
                  width: '220px',
                  height: '120px',
                }}
              />
              
              {/* Bottom Face (Y = 120px) */}
              <div
                className="absolute left-0 top-0 bg-[#281b10] border-2 border-zinc-950"
                style={{
                  transform: 'translate3d(0, 10px, 0) rotateX(90deg)',
                  width: '220px',
                  height: '220px',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
                }}
              />

              {/* Inside Floor Glow Layer */}
              <div
                className="absolute inset-0 bg-black border border-grass/30"
                style={{
                  transform: 'translate3d(0, 10px, 0) rotateX(90deg)',
                  width: '208px',
                  height: '208px',
                  left: '6px',
                }}
              >
                <motion.div
                  style={{ opacity: glowOpacity }}
                  className="w-full h-full bg-gradient-to-t from-grass/40 to-leaf/60 blur-md"
                />
              </div>
            </div>

            {/* --- 3. CHEST LID (Pivots at Back-Top Edge: Y = 0, Z = -110px) --- */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '220px',
                height: '0px',
                z: -110, // Back hinge edge
                rotateX: lidRotation, // Positive angle rotates upwards and backwards
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Lid Box: Center at X = 0, Y = -60px, Z = 110px */}
              <div 
                className="absolute left-0 top-0 w-[220px] h-[60px]" 
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'translate3d(0, -60px, 110px)'
                }}
              >
                {/* Lid Front Face (Z = 110px) */}
                <div
                  className="absolute inset-0 bg-[#83552a] border-[6px] border-[#281b10] flex flex-col justify-between p-2"
                  style={{
                    transform: 'translate3d(0, 0, 110px)',
                    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div className="w-full h-1 bg-white/5" />
                </div>
                
                {/* Lid Back Face (Z = -110px) */}
                <div
                  className="absolute inset-0 bg-[#663a17] border-[6px] border-[#281b10]"
                  style={{
                    transform: 'translate3d(0, 0, -110px) rotateY(180deg)',
                  }}
                />
                
                {/* Lid Left Face (X = -110px) */}
                <div
                  className="absolute inset-0 bg-[#78441c] border-[6px] border-[#281b10]"
                  style={{
                    transform: 'translate3d(-110px, 0, 0) rotateY(-90deg)',
                    width: '220px',
                  }}
                />
                
                {/* Lid Right Face (X = 110px) */}
                <div
                  className="absolute inset-0 bg-[#78441c] border-[6px] border-[#281b10]"
                  style={{
                    transform: 'translate3d(110px, 0, 0) rotateY(90deg)',
                    width: '220px',
                  }}
                />
                
                {/* Lid Top Face (Y = -30px) */}
                <div
                  className="absolute left-0 top-0 bg-[#8f5d2f] border-[6px] border-[#281b10]"
                  style={{
                    transform: 'translate3d(0, -110px, 0) rotateX(90deg)',
                    width: '220px',
                    height: '220px',
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.6)',
                  }}
                />

                {/* --- Latch (Lock) on Front Face --- */}
                <div
                  className="absolute left-[102px] top-[10px] w-[16px] h-[32px]"
                  style={{
                    transform: 'translate3d(0, 10px, 114px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Outer light gray latch block */}
                  <div className="absolute inset-0 bg-[#cccccc] border-[3px] border-[#444444] shadow-md" />
                  <div className="absolute top-0 bottom-0 w-[4px] bg-[#999999]" style={{ left: '-4px', transform: 'translateX(2px) rotateY(-90deg)' }} />
                  <div className="absolute top-0 bottom-0 w-[4px] bg-[#999999]" style={{ right: '-4px', transform: 'translateX(-2px) rotateY(90deg)' }} />
                  <div className="absolute left-0 right-0 h-[4px] bg-[#555555]" style={{ bottom: '-4px', transform: 'translateY(-2px) rotateX(90deg)' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Ambient summary caption */}
        <div className="absolute bottom-24 flex flex-col items-center text-center px-6 pointer-events-none z-20">
          <motion.p
            style={{ opacity: glowOpacity }}
            className="text-xs sm:text-sm text-muted-foreground/80 max-w-sm tracking-wide leading-relaxed font-pixel"
          >
            SELECT A STATION OR CONTINUE SCROLLING
          </motion.p>
        </div>
      </div>
    </div>
  )
}
