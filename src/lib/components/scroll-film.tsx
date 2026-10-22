"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { film } from "@/lib/site"
import { createLightField } from "./light-field"

// Scroll-driven light film, drawn live in WebGL (see light-field.ts). Native
// scroll drives the story; nothing is hijacked. Without JS, with reduced
// motion, or without WebGL, the chapters render as stacked panels.

const CH = film.chapters.length
// Track geometry in svh. The film holds its first formation for HOLD while the
// hero text leaves, then each chapter gets STEP of scroll. Chapter copy is
// placed so it crosses the viewport center exactly when its formation lands (PEAK).
const HOLD = 40
const STEP = 110
const TRACK = 100 + HOLD + CH * STEP
const PEAK = 0.62

// Fallback panel glow, warming chapter by chapter like the film does.
const glow = (i: number) =>
  ({ "--glow": ["rgba(143,153,168,0.16)", "rgba(230,214,184,0.16)", "rgba(250,199,128,0.17)", "rgba(255,189,92,0.18)", "rgba(255,201,71,0.2)", "rgba(255,203,55,0.22)"][i] }) as React.CSSProperties

export default function ScrollFilm({ hero }: { hero: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    section.classList.add("film-on")
    const field = createLightField(canvas)
    if (!field) {
      section.classList.remove("film-on")
      return
    }

    const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-chapter]"))
    let top = 0
    let range = 1
    let raf = 0
    let active = -1

    const measure = () => {
      top = section.getBoundingClientRect().top + window.scrollY
      range = Math.max(1, section.offsetHeight - window.innerHeight)
    }

    const tick = () => {
      raf = 0
      const p = Math.min(1, Math.max(0, (window.scrollY - top) / range))
      // Scrolled distance in svh, then story position in chapters.
      const s = p * (TRACK - 100)
      const f = Math.min(CH, Math.max(0, (s - HOLD) / STEP))
      field.setTarget(f)
      section.style.setProperty("--p", p.toFixed(4))
      for (let i = 0; i < panels.length; i++) {
        panels[i].style.setProperty("--cp", Math.min(1, Math.max(0, f - i)).toFixed(3))
      }
      const idx = Math.min(CH - 1, Math.floor(f))
      if (idx !== active) {
        active = idx
        section.dataset.active = String(idx)
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) {
        measure()
        schedule()
        field.start()
      } else field.stop()
    })
    io.observe(section)
    const onVisibility = () => {
      if (document.hidden) field.stop()
      else if (section.getBoundingClientRect().bottom > 0) field.start()
    }
    document.addEventListener("visibilitychange", onVisibility)
    const ro = new ResizeObserver(() => {
      measure()
      field.resize()
      schedule()
    })
    ro.observe(section)
    window.addEventListener("scroll", schedule, { passive: true })
    const fine = window.matchMedia("(pointer: fine)").matches
    const onPointer = (e: PointerEvent) => {
      field.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true })

    measure()
    tick()
    section.classList.add("film-ready")

    return () => {
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("pointermove", onPointer)
      document.removeEventListener("visibilitychange", onVisibility)
      if (raf) cancelAnimationFrame(raf)
      field.destroy()
      section.classList.remove("film-on", "film-ready")
    }
  }, [])

  return (
    <section ref={sectionRef} className="film relative bg-ink" aria-label="From pain to power">
      {/* Sticky stage, shown only while the film is active. */}
      <div className="film-stage sticky top-0 h-[100svh] overflow-hidden" aria-hidden>
        <div className="film-glow absolute inset-0" />
        <canvas ref={canvasRef} className="film-canvas absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,14,12,0.86)_0%,rgba(15,14,12,0.45)_42%,rgba(15,14,12,0)_70%)] max-md:bg-[linear-gradient(0deg,rgba(15,14,12,0.92)_0%,rgba(15,14,12,0.55)_40%,rgba(15,14,12,0.1)_70%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

        {/* Chapter rail */}
        <ol className="absolute right-gutter top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex">
          {film.chapters.map((c, i) => (
            <li key={c.to} data-rail={i} className="film-rail flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em]">
              <span className="film-rail-label">{c.to}</span>
              <span className="film-rail-dot block h-px w-6 bg-bone/40" />
            </li>
          ))}
        </ol>
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-bone/10">
          <div className="h-full origin-left bg-signal" style={{ transform: "scaleX(var(--p, 0))" }} />
        </div>
      </div>

      <div className="film-track">
        <div className="film-panel film-hero relative flex min-h-[100svh] items-end" style={glow(0)}>
          <div className="relative w-full">{hero}</div>
        </div>

        {film.chapters.map((c, i) => (
          <div
            key={c.to}
            data-chapter={i}
            className="film-panel film-chapter relative flex min-h-[100svh] items-center"
            style={{ ...glow(i + 1), "--at": `${50 + HOLD + (i + PEAK) * STEP}svh` } as React.CSSProperties}
          >
            <div className="container-page relative py-24 max-md:self-end">
              {i === 0 && <p className="eyebrow mb-6 text-signal">Our mission</p>}
              <h2 className="display text-[clamp(3.25rem,10vw,9.5rem)] leading-[0.84]">
                <span className="swap-from inline-block">{c.from}</span>
                <span className="mt-3 block font-sans text-[0.8125rem] font-semibold normal-case tracking-[0.2em] text-bone/70 md:text-[0.9375rem]">
                  BECOMES
                </span>
                <span className="swap-to block font-serif text-[1.08em] font-normal normal-case italic leading-[0.95] tracking-normal text-signal [font-stretch:100%]">
                  {c.to.toLowerCase()}.
                </span>
              </h2>
              <p className="mt-6 max-w-[28rem] text-lead text-bone/90">{c.line}</p>
              {i === CH - 1 && (
                <Link
                  href="/about"
                  className="mt-8 inline-flex min-h-[48px] items-center gap-3 border border-bone/40 px-6 font-semibold transition-colors hover:border-signal hover:text-signal"
                >
                  Read our mission and vision <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .film-on .film-track { position: relative; height: ${TRACK}svh; margin-top: -100svh; }
        .film-on .film-hero { position: absolute; inset: 0 0 auto 0; height: 100svh; }
        .film-on .film-chapter { position: absolute; left: 0; right: 0; top: var(--at); min-height: 0; transform: translateY(-50%); }
        .film-ready .film-canvas { opacity: 1; }
        .film-rail { color: rgba(243,239,233,0.5); transition: color 300ms ease; }
        .film-rail-dot { transition: width 300ms cubic-bezier(0.22,1,0.36,1), background-color 300ms ease; }
        ${film.chapters
          .map(
            (_, i) =>
              `.film[data-active="${i}"] [data-rail="${i}"]{color:#FFCB37}.film[data-active="${i}"] [data-rail="${i}"] .film-rail-dot{width:2.5rem;background:#FFCB37}`,
          )
          .join("")}
        @media (max-width: 767px) {
          .film-on .film-chapter { transform: none; }
        }
      `}</style>
    </section>
  )
}
