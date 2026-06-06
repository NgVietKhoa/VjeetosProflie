'use client'

import { useEffect, useRef, useState } from 'react'

/** A small pixelated crosshair cursor that follows the pointer. */
export function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const el = ref.current
    if (!el) return

    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!visible) setVisible(true)
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const leave = () => setVisible(false)

    const loop = () => {
      cx += (tx - cx) * 0.35
      cy += (ty - cy) * 0.35
      el.style.transform = `translate3d(${cx - 11}px, ${cy - 11}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', leave)
    }
  }, [visible])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 150ms' }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        shapeRendering="crispEdges"
        style={{
          transform: pressed ? 'scale(0.8)' : 'scale(1)',
          transition: 'transform 80ms',
        }}
      >
        <rect x="9" y="0" width="4" height="6" fill="#7ec850" />
        <rect x="9" y="16" width="4" height="6" fill="#7ec850" />
        <rect x="0" y="9" width="6" height="4" fill="#7ec850" />
        <rect x="16" y="9" width="6" height="4" fill="#7ec850" />
        <rect x="9" y="9" width="4" height="4" fill="#f0ede6" />
      </svg>
    </div>
  )
}
