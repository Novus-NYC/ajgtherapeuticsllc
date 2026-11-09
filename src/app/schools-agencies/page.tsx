import type { Metadata } from "next"
import Image from "next/image"
import PageHero from "@/lib/components/page-hero"
import ClosingCta from "@/lib/components/closing-cta"
import { ButtonLink } from "@/lib/components/button"
import { contractingSteps, institutionalClients, pillars, procurement, programAreas, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "For Schools and Agencies",
  description: `NYC DOE Vendor ID ${procurement.vendorId}. Workshops, group cycles, assemblies, and staff trainings with sign-in sheets, pre/post surveys, summary reports, and participation certificates.`,
}

export default function SchoolsAgenciesPage() {
  return (
    <>
      <PageHero
        eyebrow="For institutional clients"
        title={
          <>
            Procurement<span className="text-signal">,</span> made plain<span className="text-signal">.</span>
          </>
        }
        intro={
          <p>
            AJG Therapeutics LLC is a certified Minority Business Enterprise (MBE) and an approved NYC Department of
            Education vendor. Here is everything a school, agency, or institution needs to bring us in: certifications,
            program areas, formats, and how contracting works.
          </p>
        }
        aside={
          <div className="flex flex-col gap-3">
            <ButtonLink href="/book">Book a partnership call</ButtonLink>
            <ButtonLink href="/contact#quote" variant="ghost">
              Send a contracting inquiry
            </ButtonLink>
            <ButtonLink href={site.capabilityStatement} variant="ghost" external>
              Download capability statement
            </ButtonLink>
          </div>
        }
      />

      {/* Credentials sheet */}
      <section className="on-bone bg-bone text-ink" aria-labelledby="status">
        <div className="container-page py-20 md:py-28">
          <h2 id="status" className="eyebrow text-clay">
            Vendor status
          </h2>
          <dl className="mt-8 grid border-t-2 border-ink md:grid-cols-3">
            <div className="border-b border-ink/15 py-8 md:border-b-0 md:border-r md:pr-8" data-reveal>
              <dt className="font-semibold">NYC DOE Vendor ID</dt>
              <dd className="display mt-3 break-all text-[clamp(2.5rem,5vw,4rem)] leading-none">{procurement.vendorId}</dd>
            </div>
            <div className="border-b border-ink/15 py-8 md:border-b-0 md:border-r md:px-8" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <dt className="font-semibold">NYC MBE certification</dt>
              <dd className="display mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-none">{procurement.mbe}</dd>
            </div>
            <div className="py-8 md:pl-8" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              <dt className="font-semibold">Insurance</dt>
              <dd className="mt-3 text-lead">
                Insured and contract-ready. <strong>Certificate of Insurance (COI)</strong> available on request.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Who we partner with + program areas */}
      <section className="bg-ink" aria-labelledby="partners">
        <div className="container-page grid gap-14 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <h2 id="partners" className="display text-h2" data-reveal>
              Who we <span className="text-signal">partner with.</span>
            </h2>
            <ul className="mt-10 border-t border-bone/15">
              {institutionalClients.map((c, i) => (
                <li key={c.title} className="border-b border-bone/15 py-5" data-reveal style={{ "--d": i } as React.CSSProperties}>
                  <span className="block text-[1.25rem] font-semibold">{c.title}</span>
                  <span className="mt-1 block text-muted">{c.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h2 className="eyebrow text-signal">Program areas</h2>
            <ul className="mt-6 space-y-3">
              {programAreas.map((a) => (
                <li key={a} className="flex items-center gap-3 border-b border-bone/15 pb-3 text-[1.125rem] font-semibold">
                  <span aria-hidden className="h-px w-4 bg-signal" />
                  {a}
                </li>
              ))}
            </ul>
            <ButtonLink href="/programs" variant="text" className="mt-6">
              Program details
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Cycles */}
      <section className="bg-ink" aria-labelledby="cycles">
        <div className="container-page grid gap-14 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-4">
            <h2 id="cycles" className="display text-h2" data-reveal>
              Typical <span className="text-signal">durations.</span>
            </h2>
            <p className="mt-6 text-muted" data-reveal>
              Group cycles run 6, 8, or 12 weeks. Single workshops, assemblies, and trainings are also available.
            </p>
          </div>
          <div className="space-y-10 md:col-span-7 md:col-start-6">
            {procurement.cycles.map((weeks) => (
              <div key={weeks} data-reveal>
                <div className="flex items-baseline justify-between">
                  <p className="display text-[2.5rem] leading-none">
                    {weeks}
                    <span className="ml-2 font-sans text-[1rem] font-semibold normal-case tracking-normal text-muted [font-stretch:100%]">
                      week cycle
                    </span>
                  </p>
                </div>
                <div className="mt-4 grid h-14 gap-1.5" style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }} aria-hidden>
                  {Array.from({ length: 12 }, (_, k) => (
                    <span
                      key={k}
                      className={`cycle-tick block ${k < weeks ? "bg-signal" : "bg-bone/10"}`}
                      style={{ "--i": k } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats + deliverables */}
      <section className="bg-ink-2">
        <div className="container-page grid gap-14 py-24 md:grid-cols-3 md:py-28">
          <div data-reveal>
            <h2 className="eyebrow text-signal">Service formats</h2>
            <ul className="mt-6 space-y-3">
              {procurement.formats.map((f) => (
                <li key={f} className="border-b border-bone/15 pb-3 text-[1.25rem] font-semibold">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <h2 className="eyebrow text-signal">Deliverables provided</h2>
            <ul className="mt-6 space-y-3">
              {procurement.deliverables.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-bone/15 pb-3 text-[1.25rem] font-semibold">
                  <span aria-hidden className="text-signal">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            <h2 className="eyebrow text-signal">Session lengths</h2>
            <ul className="mt-6 space-y-3">
              {pillars.map((p) => (
                <li key={p.id} className="border-b border-bone/15 pb-3">
                  <span className="block font-semibold">{p.title}</span>
                  <span className="text-muted">{p.length}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">Available for {procurement.availableFor}.</p>
          </div>
        </div>
      </section>

      {/* Contracting process */}
      <section id="contracting" className="scroll-mt-20 bg-ink" aria-labelledby="process">
        <div className="container-page py-24 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="process" className="display text-h2" data-reveal>
              How contracting <span className="text-signal">works.</span>
            </h2>
            <ButtonLink href="/book" className="self-start md:self-auto">
              Book a partnership call
            </ButtonLink>
          </div>
          <ol className="mt-12 grid gap-px bg-bone/15 md:grid-cols-4">
            {contractingSteps.map((step, i) => (
              <li key={step.title} className="bg-ink py-8 md:px-6" data-reveal style={{ "--d": i } as React.CSSProperties}>
                <span className="display text-[3rem] leading-none text-signal">{i + 1}</span>
                <h3 className="mt-4 text-[1.25rem] font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof */}
      <section className="on-bone bg-bone text-ink">
        <div className="container-page grid items-center gap-12 py-24 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5" data-reveal="mask">
            <Image
              src="/media/clinton-note.jpg"
              alt="Handwritten thank-you note to Alam beside a DeWitt Clinton High School graduation program dated June 25, 2021"
              width={1062}
              height={1400}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-clay">Trusted by school communities</p>
            <h2 className="display mt-4 text-h2" data-reveal>
              Graduations<span className="text-clay">,</span> career days<span className="text-clay">,</span> summits<span className="text-clay">.</span>
            </h2>
            <p className="mt-6 max-w-measure text-lead text-stone" data-reveal>
              From commencement addresses and career days to youth leadership summits, Alam brings the same structured,
              trauma-informed practice to assemblies and classrooms that he brings to group cycles.
            </p>
            <div className="mt-8">
              <ButtonLink href="/work" variant="ghost-dark">
                See past work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title={
          <>
            Ready to scope a cycle<span className="text-signal">?</span> Tell us about <span className="text-signal">your site.</span>
          </>
        }
      />
    </>
  )
}
