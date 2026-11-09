import type { Metadata } from "next"
import PageHero from "@/lib/components/page-hero"
import { meetingTypes, site } from "@/lib/site"
import BookingRequest from "./booking-request"

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Schedule a consultation, program planning meeting, speaking engagement inquiry, or partnership discussion with Alam Gonzalez of AJG Therapeutics.",
}

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a meeting"
        title={
          <>
            Let’s find a time<span className="text-signal">.</span>
          </>
        }
        intro={
          <p>
            Schedule a consultation, plan a program, ask about a speaking engagement, or start a partnership
            conversation with Alam Gonzalez.
          </p>
        }
      />

      <section className="on-bone bg-bone text-ink" aria-labelledby="types">
        <div className="container-page py-20 md:py-24">
          <h2 id="types" className="eyebrow text-clay">
            What you can book
          </h2>
          <ul className="mt-8 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {meetingTypes.map((m, i) => (
              <li key={m.id} className="bg-bone py-6 sm:px-6" data-reveal style={{ "--d": i } as React.CSSProperties}>
                <p className="text-[0.875rem] font-semibold text-clay">{m.length}</p>
                <h3 className="mt-2 text-[1.25rem] font-semibold leading-snug">{m.title}</h3>
                <p className="mt-3 text-stone">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="schedule" className="scroll-mt-20 bg-ink" aria-labelledby="schedule-title">
        <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 id="schedule-title" className="display text-h2">
              {site.bookingUrl ? "Pick a time" : "Request a time"}
              <span className="text-signal">.</span>
            </h2>
            <p className="mt-6 text-bone/85">
              {site.bookingUrl
                ? "Available times come straight from Alam’s calendar, so there are no double bookings. You’ll get an automatic confirmation by email."
                : "Choose a meeting type and the times that work for you. We’ll confirm a time by email, usually within two business days."}
            </p>
            <p className="mt-6 text-muted">
              Prefer to call?{" "}
              <a href={site.phone.href} className="font-semibold text-bone underline decoration-signal underline-offset-4">
                {site.phone.label}
              </a>
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {site.bookingUrl ? (
              <iframe
                src={`${site.bookingUrl}?hide_gdpr_banner=1&background_color=f3efe9&primary_color=083224`}
                title="Book a meeting with Alam Gonzalez"
                className="h-[760px] w-full border-0 bg-bone"
                loading="lazy"
              />
            ) : (
              <div className="on-bone bg-bone p-6 text-ink md:p-10">
                <BookingRequest />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
