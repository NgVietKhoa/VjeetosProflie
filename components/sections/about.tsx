'use client'

import { Reveal, RevealItem } from '../reveal'

const STATS = [
  { value: '1+', label: 'YEAR_DEVELOPING' },
  { value: '20+', label: 'PROJECTS_SHIPPED' },
  { value: '100K+', label: 'LINES_OF_CODE' },
]

const FOCUS_AREAS = [
  { title: 'Fullstack Web Systems', desc: 'Developing clean interfaces with React/Next.js integrated with secure, high-performance API layers using Node.js & Java.' },
  { title: 'Modular Architecture', desc: 'Designing software structures with clear separation of concerns, ensuring code is scalable, readable, and easy to maintain.' },
  { title: 'Performance Optimization', desc: 'Optimizing data queries, system queries, memory footprints, and asset delivery pipelines for rapid response cycles.' },
]

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl overflow-visible px-6 py-32"
    >
      {/* Two column split grid layout */}
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        
        {/* Left Side: Sticky large title with left accent bar */}
        <div className="relative lg:sticky lg:top-28 self-start border-l-[5px] border-grass pl-6 md:pl-8 py-2">
          <Reveal>
            <RevealItem>
              <span className="font-pixel text-[10px] tracking-[0.3em] text-grass block mb-4">
                // PROFILE_CORE
              </span>
            </RevealItem>
            <RevealItem>
              <h2 className="font-sans font-black tracking-tighter text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-foreground uppercase">
                ABOUT<br />
                VIET<br />
                KHOA?
              </h2>
            </RevealItem>
          </Reveal>
        </div>

        {/* Right Side: Scrollable biography and stats info */}
        <div className="space-y-12">
          <Reveal className="space-y-12" amount={0.02}>
            <RevealItem>
              <p className="text-balance text-xl leading-relaxed text-foreground sm:text-2xl font-light">
                I am a Fullstack Developer based in Hanoi, Vietnam. Born in 2006, I approach software engineering with a passion for building robust web systems and clean, optimized digital architectures.
              </p>
            </RevealItem>
            
            <RevealItem>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                My journey is driven by continuous learning and absolute dedication to the craft. I specialize in designing and shipping performant web applications, bridging responsive user experiences with structured backend services.
              </p>
            </RevealItem>

            {/* Stats Grid */}
            <RevealItem>
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="border border-glass-border bg-glass p-4 transition-colors hover:border-grass/40"
                  >
                    <div className="font-pixel text-base text-leaf sm:text-xl">
                      {s.value}
                    </div>
                    <div className="mt-3 text-[9px] uppercase tracking-[0.15em] text-muted-ink">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </RevealItem>

            {/* Philosophy Section */}
            <RevealItem className="space-y-4">
              <span className="font-pixel text-xs text-grass block">// core_values</span>
              <h3 className="text-lg font-pixel uppercase tracking-wide text-foreground">MY PHILOSOPHY</h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                Coding is not just about writing syntax; it is about engineering sustainable solutions. I prioritize modular designs, readable code paths, and proactive performance tuning. I believe starting with a solid structural blueprint is the best investment for software scaling and technical debt reduction.
              </p>
            </RevealItem>

            {/* Focus Areas Section */}
            <RevealItem className="space-y-4">
              <span className="font-pixel text-xs text-grass block">// specialties</span>
              <h3 className="text-lg font-pixel uppercase tracking-wide text-foreground">FOCUS AREAS</h3>
              <div className="space-y-4">
                {FOCUS_AREAS.map((area) => (
                  <div key={area.title} className="border border-glass-border bg-glass/20 p-4">
                    <h4 className="font-pixel text-xs text-leaf uppercase mb-2">{area.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
                  </div>
                ))}
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
