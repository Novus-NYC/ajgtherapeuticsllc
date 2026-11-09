"use client"

import { useState } from "react"
import { meetingTypes, site } from "@/lib/site"

const inputCls =
  "mt-2 block min-h-[52px] w-full border border-ink/25 bg-white px-4 py-3 text-ink placeholder:text-stone/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink aria-[invalid=true]:border-clay"

type Errors = Partial<Record<"name" | "email" | "times", string>>

// Fallback until a scheduling link is set in site.bookingUrl: composes a
// booking request email in the visitor's own email app.
export default function BookingRequest() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const v = (k: string) => String(data.get(k) ?? "").trim()
    const next: Errors = {}
    if (!v("name")) next.name = "Please enter your name."
    if (!/^\S+@\S+\.\S+$/.test(v("email"))) next.email = "Please enter an email address we can reply to."
    if (!v("times")) next.times = "Please share a few days and times that work for you."
    setErrors(next)
    if (Object.keys(next).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }
    const type = meetingTypes.find((m) => m.id === v("type"))?.title ?? meetingTypes[0].title
    const body = [
      `Meeting: ${type}`,
      `Name: ${v("name")}`,
      `Organization: ${v("org") || "Not given"}`,
      `Email: ${v("email")}`,
      `Phone: ${v("phone") || "Not given"}`,
      `Times that work: ${v("times")}`,
      "",
      v("notes"),
    ].join("\n")
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Booking request: ${type}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const err = (f: keyof Errors) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-2 text-[0.9375rem] font-semibold text-clay">
        {errors[f]}
      </p>
    ) : null

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <fieldset className="sm:col-span-2">
        <legend className="font-semibold">Meeting type</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {meetingTypes.map((m, i) => (
            <label key={m.id} className="flex min-h-[52px] cursor-pointer items-center gap-3 border border-ink/25 bg-white px-4 py-3 has-[:checked]:border-ink has-[:checked]:ring-2 has-[:checked]:ring-ink">
              <input type="radio" name="type" value={m.id} defaultChecked={i === 0} className="accent-[#083224]" />
              <span className="text-[0.9375rem] font-medium leading-snug">{m.title}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="b-name" className="font-semibold">
          Name <span className="text-clay">(required)</span>
        </label>
        <input id="b-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputCls} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="b-org" className="font-semibold">
          School or organization
        </label>
        <input id="b-org" name="org" autoComplete="organization" className={inputCls} />
      </div>
      <div>
        <label htmlFor="b-email" className="font-semibold">
          Email <span className="text-clay">(required)</span>
        </label>
        <input id="b-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputCls} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="b-phone" className="font-semibold">
          Phone
        </label>
        <input id="b-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="b-times" className="font-semibold">
          Days and times that work <span className="text-clay">(required)</span>
        </label>
        <input id="b-times" name="times" placeholder="e.g. Tuesday or Thursday afternoons, week of the 16th" aria-invalid={!!errors.times} aria-describedby={errors.times ? "times-error" : undefined} className={inputCls} />
        {err("times")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="b-notes" className="font-semibold">
          Anything we should know
        </label>
        <textarea id="b-notes" name="notes" rows={4} className={inputCls} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="inline-flex min-h-[52px] items-center justify-center gap-3 bg-ink px-8 font-semibold text-bone transition-colors hover:bg-ink-3">
          Request this meeting <span aria-hidden>→</span>
        </button>
        <p className="text-[0.9375rem] text-stone">Opens your email app with the request filled in.</p>
      </div>
      <div aria-live="polite" className="sm:col-span-2">
        {sent && (
          <p className="border-l-4 border-ink bg-white px-5 py-4">
            <strong>Your email app should now be open.</strong> Press send there and we’ll confirm a time.
          </p>
        )}
      </div>
    </form>
  )
}
