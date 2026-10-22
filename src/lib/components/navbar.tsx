"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { nav, site } from "@/lib/site"
import { Mark, Wordmark } from "./logo"

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const menu = menuRef.current
    const toggle = toggleRef.current
    document.body.style.overflow = "hidden"
    menu?.querySelector<HTMLElement>("[data-autofocus]")?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key !== "Tab" || !menu) return
      const items = menu.querySelectorAll<HTMLElement>("a, button")
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
      toggle?.focus()
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? "border-b border-bone/10 bg-ink/95" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-nav items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name}, home`} className="-m-2 p-2">
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative py-2 text-[0.9375rem] font-medium transition-colors hover:text-signal ${
                  isActive(item.href) ? "text-signal" : "text-bone/85"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact#quote"
            className="hidden min-h-[44px] items-center bg-signal px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-bone sm:inline-flex"
          >
            Request a quote
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-bone/25 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span aria-hidden className="flex w-5 flex-col gap-[5px]">
              <span className="h-[2px] w-full bg-bone" />
              <span className="h-[2px] w-3/4 bg-bone" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink lg:hidden"
        >
          <div className="container-page flex h-nav items-center justify-between">
            <Mark className="h-8 w-8" />
            <button
              type="button"
              data-autofocus
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center gap-2 border border-bone/25 px-4 text-[0.9375rem] font-semibold"
            >
              Close <span aria-hidden>✕</span>
            </button>
          </div>
          <ul className="container-page mt-6 flex flex-col">
            {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
              <li key={item.href} className="border-b border-bone/10">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="display flex min-h-[64px] items-center justify-between text-[2.5rem] leading-none"
                  style={{ animation: `menu-in 420ms ${i * 40}ms both cubic-bezier(0.22,1,0.36,1)` }}
                >
                  {item.label}
                  <span aria-hidden className="text-2xl text-signal">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page mt-auto pb-10">
            <Link
              href="/contact#quote"
              className="flex min-h-[52px] items-center justify-center bg-signal font-semibold text-ink"
            >
              Request a quote
            </Link>
            <a href={`mailto:${site.email}`} className="mt-4 block text-center text-muted underline">
              {site.email}
            </a>
          </div>
          <style>{`@keyframes menu-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
        </div>
      )}
    </header>
  )
}
