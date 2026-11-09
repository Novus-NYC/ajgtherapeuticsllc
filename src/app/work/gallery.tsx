"use client"

import Image from "next/image"
import { useState } from "react"
import { pastWork, workCategories } from "@/lib/site"

const filters = ["All", ...workCategories] as const

export default function Gallery() {
  const [active, setActive] = useState<(typeof filters)[number]>("All")
  const items = active === "All" ? pastWork : pastWork.filter((w) => w.category === active)

  return (
    <>
      <div role="group" aria-label="Filter the portfolio" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className="min-h-[44px] border border-bone/30 px-4 text-[0.9375rem] font-semibold transition-colors hover:border-signal aria-pressed:border-signal aria-pressed:bg-signal aria-pressed:text-ink"
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {items.length} {items.length === 1 ? "item" : "items"}
      </p>
      <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((w) => (
          <li key={w.title}>
            {w.image && (
              <div className="overflow-hidden bg-ink-3">
                <Image
                  src={w.image.src}
                  alt={w.image.alt}
                  width={w.image.w}
                  height={w.image.h}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/5] w-full object-cover object-[50%_20%] transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </div>
            )}
            <p className="eyebrow mt-4 text-signal">
              {w.category}
              {w.date && <span className="text-muted"> · {w.date}</span>}
            </p>
            <h3 className="mt-2 text-h3 font-semibold">{w.title}</h3>
            <p className="mt-2 text-bone/80">{w.detail}</p>
            {w.link && (
              <a href={w.link.href} target="_blank" rel="noreferrer" className="mt-2 inline-block py-2 font-semibold underline decoration-signal underline-offset-4 hover:text-signal">
                {w.link.label} ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
