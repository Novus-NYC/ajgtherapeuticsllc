import type { Metadata } from "next"
import PageHero from "@/lib/components/page-hero"
import { ButtonLink } from "@/lib/components/button"
import { seeking, site, upcoming } from "@/lib/site"
import QuoteForm from "./quote-form"

export const metadata: Metadata = {
  title: "Contact and Request a Quote",
  description:
    "Request a quote for workshops, group cycles, assemblies, or staff trainings, or support the work with funding, space, referrals, and mentorship.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s bring the circle <span className="text-signal">to your site.</span>
          </>
        }
        intro={<p>Tell us about your school, program, or agency. We serve the Bronx and all of NYC.</p>}
        aside={
          <dl className="space-y-5">
            <div>
              <dt className="eyebrow text-muted">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="break-all text-[1.125rem] font-semibold underline decoration-signal underline-offset-4 hover:text-signal">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Instagram</dt>
              <dd className="mt-1">
                <a href={site.instagram} target="_blank" rel="noreferrer" className="text-[1.125rem] font-semibold underline decoration-signal underline-offset-4 hover:text-signal">
                  @ajgtherapeutics ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Service area</dt>
              <dd className="mt-1 text-[1.125rem] font-semibold">{site.area}</dd>
            </div>
          </dl>
        }
      />

      <section id="quote" className="on-bone scroll-mt-20 bg-bone text-ink" aria-labelledby="quote-title">
        <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 id="quote-title" className="display text-h2">
              Request a quote<span className="text-clay">.</span>
            </h2>
            <p className="mt-6 text-stone">
              Workshops, 6 to 12-week group cycles, student assemblies, and staff trainings. Programs come with sign-in
              sheets, pre/post surveys, summary reports, and participation certificates.
            </p>
            <ButtonLink href={site.capabilityStatement} variant="ghost-dark" external className="mt-8">
              Capability statement
            </ButtonLink>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section id="support" className="scroll-mt-20 bg-ink" aria-labelledby="support-title">
        <div className="container-page grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <p className="eyebrow text-signal">Support the work</p>
            <h2 id="support-title" className="display mt-4 text-h2" data-reveal>
              Join the movement<span className="text-signal">.</span> Support Bronx men<span className="text-signal">.</span>
            </h2>
            <p className="mt-6 text-lead text-bone/85" data-reveal>
              Help us build safer families, stronger communities, and future leaders.
            </p>
            <ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent("Supporting AJG Therapeutics")}`} className="mt-8">
              Offer support
            </ButtonLink>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h3 className="eyebrow text-muted">We are seeking</h3>
            <ol className="mt-6 border-t border-bone/15">
              {seeking.map((s, i) => (
                <li
                  key={s}
                  className="flex items-baseline gap-5 border-b border-bone/15 py-5"
                  data-reveal
                  style={{ "--d": i } as React.CSSProperties}
                >
                  <span className="w-6 text-[0.875rem] font-semibold text-signal">{i + 1}</span>
                  <span className="display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 border border-bone/20 p-6">
              <p className="eyebrow text-signal">Upcoming: {upcoming.title}</p>
              <p className="mt-2">
                {upcoming.when}. {upcoming.details}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
