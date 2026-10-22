"use client"

import { useState } from "react"
import { pillars, procurement, site } from "@/lib/site"

type Field = "name" | "email" | "message"
type Errors = Partial<Record<Field, string>>

const inputCls =
  "mt-2 block min-h-[52px] w-full border border-ink/25 bg-white px-4 py-3 text-ink placeholder:text-stone/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink aria-[invalid=true]:border-clay"

// No backend: the form validates, then opens the visitor's email app with the
// request filled in, addressed to the business inbox.
export default function QuoteForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const v = (k: string) => String(data.get(k) ?? "").trim()
    const next: Errors = {}
    if (!v("name")) next.name = "Please enter your name."
    if (!/^\S+@\S+\.\S+$/.test(v("email"))) next.email = "Please enter an email address we can reply to, like name@school.org."
    if (v("message").length < 10) next.message = "Please tell us a little about your group or site (a sentence or two)."
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const subject = `Quote request: ${v("program") || "Programs"}${v("org") ? ` for ${v("org")}` : ""}`
    const body = [
      `Name: ${v("name")}`,
      `Organization: ${v("org") || "Not given"}`,
      `Email: ${v("email")}`,
      `Phone: ${v("phone") || "Not given"}`,
      `Program: ${v("program") || "Not sure yet"}`,
      `Format: ${v("format") || "Not sure yet"}`,
      "",
      v("message"),
    ].join("\n")
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-2 text-[0.9375rem] font-semibold text-clay">
        {errors[f]}
      </p>
    ) : null

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2" aria-describedby="form-note">
      <div>
        <label htmlFor="name" className="font-semibold">
          Name <span className="text-clay">(required)</span>
        </label>
        <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputCls} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="org" className="font-semibold">
          School or organization
        </label>
        <input id="org" name="org" autoComplete="organization" className={inputCls} />
      </div>
      <div>
        <label htmlFor="email" className="font-semibold">
          Email <span className="text-clay">(required)</span>
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputCls} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className="font-semibold">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
      </div>
      <div>
        <label htmlFor="program" className="font-semibold">
          Program
        </label>
        <select id="program" name="program" className={inputCls} defaultValue="">
          <option value="">Not sure yet</option>
          {pillars.map((p) => (
            <option key={p.id}>{p.title}</option>
          ))}
          <option>Fatherhood and family support</option>
          <option>Harm reduction and reentry stabilization</option>
        </select>
      </div>
      <div>
        <label htmlFor="format" className="font-semibold">
          Format
        </label>
        <select id="format" name="format" className={inputCls} defaultValue="">
          <option value="">Not sure yet</option>
          {procurement.formats.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="font-semibold">
          About your group or site <span className="text-clay">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Who the participants are, roughly how many, and when you hope to start."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputCls}
        />
        {err("message")}
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-[52px] items-center justify-center gap-3 bg-ink px-8 font-semibold text-bone transition-colors hover:bg-ink-3"
        >
          Send request <span aria-hidden>→</span>
        </button>
        <p id="form-note" className="text-[0.9375rem] text-stone">
          Sending opens your email app with your request filled in, addressed to {site.email}.
        </p>
      </div>
      <div aria-live="polite" className="sm:col-span-2">
        {sent && (
          <p className="border-l-4 border-ink bg-white px-5 py-4">
            <strong>Your email app should now be open.</strong> Press send there to reach us. If nothing opened, email{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            directly.
          </p>
        )}
      </div>
    </form>
  )
}
