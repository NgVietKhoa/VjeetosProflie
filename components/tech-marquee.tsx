'use client'

const STACK = [
  'JAVASCRIPT',
  'TYPESCRIPT',
  'JAVA',
  'REACT',
  'NEXT.JS',
  'NODE.JS',
  'POSTGRESQL',
  'DOCKER',
  'GIT',
  'TAILWIND',
  'GRAPHQL',
]

/** Constant-speed horizontal marquee of the tech stack. */
export function TechMarquee() {
  const row = [...STACK, ...STACK]
  return (
    <div className="relative flex overflow-hidden border-y border-glass-border bg-surface/60 py-5">
      <div className="animate-marquee flex shrink-0 items-center">
        {row.map((tech, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-sm tracking-[0.2em] text-muted-ink"
          >
            {tech}
            <span className="inline-block h-2 w-2 bg-grass" aria-hidden="true" />
          </span>
        ))}
      </div>
      <div
        className="animate-marquee flex shrink-0 items-center"
        aria-hidden="true"
      >
        {row.map((tech, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-sm tracking-[0.2em] text-muted-ink"
          >
            {tech}
            <span className="inline-block h-2 w-2 bg-grass" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}
