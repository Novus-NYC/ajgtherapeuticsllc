import Image from "next/image"
import Link from "next/link"
import ScrollFilm from "@/lib/components/scroll-film"
import { ButtonLink } from "@/lib/components/button"
import ClosingCta from "@/lib/components/closing-cta"
import { audiences, founder, logos, pastWork, pillars, procurement, site, stats, testimonials } from "@/lib/site"

const featured = ["25th Anniversary Leadership Awards", "Let’s Talk Peace Summit", "Telemundo: El Show de Jackie"]

export default function HomePage() {
  const work = featured.map((t) => pastWork.find((w) => w.title === t)!)

  return (
    <>
      <ScrollFilm
        hero={
          <div className="container-page pb-6 pt-24 md:pb-14 md:pt-32">
            <p className="eyebrow text-signal" data-reveal>
              {site.area}
            </p>
            <h1 className="display mt-5 text-h1" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              Men<span className="text-signal">.</span> Fathers<span className="text-signal">.</span>
              <br />
              Healing<span className="text-signal">.</span> Change<span className="text-signal">.</span>
            </h1>
            <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-12 md:items-end md:gap-8">
              <p className="max-w-[34rem] text-lead text-bone/90 md:col-span-6" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                Trauma-informed programs for youth, fathers, and violence prevention in NYC.
                <span className="max-sm:hidden">
                  {" "}
                  Culturally grounded group facilitation, workshops, and trainings that strengthen emotional regulation,
                  leadership, and community safety.
                </span>
              </p>
              <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                <ButtonLink href="/contact#quote">Request a quote</ButtonLink>
                <ButtonLink href={site.capabilityStatement} variant="ghost" external>
                  Capability statement
                </ButtonLink>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-bone/15 pt-4 text-[0.875rem] text-bone/75 md:mt-10 md:pt-5" data-reveal style={{ "--d": 4 } as React.CSSProperties}>
              <li>NYC DOE Vendor</li>
              <li>NYC MBE certified</li>
              <li className="max-sm:hidden">Insured and contract-ready</li>
              <li className="max-sm:hidden">Founded by Alam Gonzalez, MSW, CASAC-T</li>
            </ul>
          </div>
        }
      />

      {/* Who we serve */}
      <section className="on-bone bg-bone text-ink">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <p className="eyebrow text-clay md:col-span-3" data-reveal>
              Who we serve
            </p>
            <h2 className="font-serif text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.05] md:col-span-9" data-reveal>
              We deliver trauma-informed programming for schools, community-based organizations, and justice-involved
              populations across NYC.
            </h2>
          </div>

          <ul className="mt-16 border-t border-ink/15 md:ml-[25%]">
            {audiences.map((a, i) => (
              <li key={a.title} className="border-b border-ink/15" data-reveal style={{ "--d": i } as React.CSSProperties}>
                <Link
                  href={a.href}
                  className="group flex min-h-[80px] items-center justify-between gap-6 py-5 transition-colors hover:text-clay"
                >
                  <span className="display text-[clamp(1.5rem,3vw,2.5rem)] leading-none">{a.title}</span>
                  <span aria-hidden className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="border-t-2 border-ink pt-4" data-reveal style={{ "--d": i } as React.CSSProperties}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-none">{s.value}</dd>
                <dd className="mt-2 text-[0.9375rem] text-stone">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-ink">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display max-w-3xl text-h2" data-reveal>
              Three pillars guide <span className="text-signal">everything we do.</span>
            </h2>
            <ButtonLink href="/programs" variant="text" className="self-start md:self-auto">
              All programs
            </ButtonLink>
          </div>
          <ol className="mt-14 border-t border-bone/15">
            {pillars.map((p, i) => (
              <li key={p.id} className="border-b border-bone/15" data-reveal style={{ "--d": i } as React.CSSProperties}>
                <Link
                  href={`/programs#${p.id}`}
                  className="group grid gap-4 py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-12"
                >
                  <span className="display text-[4.5rem] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_#FFCB37] md:col-span-2 md:text-[7rem]">
                    {p.number}
                  </span>
                  <span className="md:col-span-5">
                    <span className="block text-h3 font-semibold transition-colors group-hover:text-signal">{p.title}</span>
                    <span className="mt-3 block text-muted">Sessions of {p.length}</span>
                  </span>
                  <span className="text-bone/85 md:col-span-4">{p.summary}</span>
                  <span aria-hidden className="hidden text-2xl text-signal transition-transform duration-300 group-hover:translate-x-2 md:col-span-1 md:block md:text-right">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-ink-2">
        <div className="container-page grid gap-12 py-24 md:grid-cols-12 md:gap-10 md:py-32">
          <div className="relative md:col-span-5" data-reveal="mask">
            <Image
              src="/media/founder.jpg"
              alt="Alam Gonzalez, founder of AJG Therapeutics, in a dark suit"
              width={1060}
              height={1400}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <p className="absolute -bottom-5 left-5 bg-signal px-4 py-2 text-[0.875rem] font-semibold text-ink">
              {founder.role}
            </p>
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <p className="eyebrow text-signal" data-reveal>
              Lived experience, professional practice
            </p>
            <h2 className="display mt-4 text-h2" data-reveal>
              {founder.name}
              <span className="mt-3 block font-sans text-lead font-medium normal-case tracking-normal text-muted [font-stretch:100%]">
                {founder.credentials}
              </span>
            </h2>
            <ul className="mt-8 grid gap-x-6 gap-y-2 text-bone/90 sm:grid-cols-2" data-reveal>
              {founder.bio.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
            <figure className="mt-10 border-l-2 border-signal pl-6" data-reveal>
              <blockquote className="font-serif text-[1.5rem] italic leading-snug">
                “We thank you for speaking on behalf of all the young men in the program… Your words were incredibly
                moving.”
              </blockquote>
              <figcaption className="mt-3 text-[0.9375rem] text-muted">
                The Committee for Hispanic Children and Families, 2012, after Alam spoke for its Opening Doors to the
                Future program at NBC Studios
              </figcaption>
            </figure>
            <ButtonLink href="/about" variant="text" className="mt-8 self-start">
              Meet the founder
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="on-bone bg-bone text-ink" aria-labelledby="voices">
        <div className="container-page py-24 md:py-32">
          <h2 id="voices" className="eyebrow text-clay" data-reveal>
            In their words
          </h2>
          <div className="mt-12 grid gap-16 md:grid-cols-12">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={i === 0 ? "md:col-span-7" : "md:col-span-7 md:col-start-6"}
                data-reveal
              >
                <blockquote className="font-serif text-quote">
                  <span aria-hidden className="mr-1 text-clay">“</span>
                  {t.quote}
                  <span aria-hidden className="text-clay">”</span>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 font-semibold">
                  <span aria-hidden className="h-px w-10 bg-ink" />
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="bg-ink">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display text-h2" data-reveal>
              In the room<span className="text-signal">.</span> On the record<span className="text-signal">.</span>
            </h2>
            <ButtonLink href="/work" variant="text" className="self-start md:self-auto">
              See past work
            </ButtonLink>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-12">
            {work.map((w, i) => (
              <li
                key={w.title}
                className={["md:col-span-5", "md:col-span-4 md:mt-24", "md:col-span-3 md:mt-48"][i]}
                data-reveal
                style={{ "--d": i } as React.CSSProperties}
              >
                <div className="overflow-hidden bg-ink-3">
                  <Image
                    src={w.image!.src}
                    alt={w.image!.alt}
                    width={w.image!.w}
                    height={w.image!.h}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-4 text-signal">{w.date}</p>
                <h3 className="mt-2 text-h3 font-semibold">{w.title}</h3>
                <p className="mt-2 text-muted">{w.detail}</p>
              </li>
            ))}
          </ul>

          <div className="on-bone mt-24 bg-bone px-6 py-10 md:px-10" data-reveal>
            <h2 className="eyebrow text-stone">Affiliations, collaborations, and featured platforms</h2>
            <ul className="mt-8 grid grid-cols-3 items-center gap-x-10 gap-y-10 md:grid-cols-5 lg:grid-cols-9">
              {logos.map((l) => (
                <li key={l.src} className="flex h-16 items-center justify-center">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={l.w}
                    height={l.h}
                    sizes="120px"
                    className="max-h-16 w-auto object-contain mix-blend-multiply"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Procurement */}
      <section className="on-bone bg-signal text-ink">
        <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-6">
            <p className="eyebrow" data-reveal>
              For schools and agencies
            </p>
            <h2 className="display mt-4 text-h2" data-reveal>
              Contract-ready. Outcomes on paper.
            </h2>
            <p className="mt-6 max-w-measure text-lead" data-reveal>
              Group cycles of {procurement.cycles.join(", ").replace(/, (\d+)$/, ", or $1")} weeks, with sign-in sheets,
              pre/post surveys, summary reports, and participation certificates delivered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <Link
                href="/schools-agencies"
                className="inline-flex min-h-[48px] items-center gap-3 bg-ink px-6 font-semibold text-bone transition-colors hover:bg-ink-3"
              >
                Procurement details <span aria-hidden>→</span>
              </Link>
              <ButtonLink href={site.capabilityStatement} variant="ghost-dark" external>
                Capability statement
              </ButtonLink>
            </div>
          </div>
          <dl className="grid content-end gap-6 sm:grid-cols-2 md:col-span-5 md:col-start-8">
            <div className="border-t-2 border-ink pt-3" data-reveal>
              <dt className="text-[0.9375rem] font-semibold">NYC DOE Vendor ID</dt>
              <dd className="display mt-1 text-[2rem] leading-none">{procurement.vendorId}</dd>
            </div>
            <div className="border-t-2 border-ink pt-3" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <dt className="text-[0.9375rem] font-semibold">NYC MBE certification</dt>
              <dd className="display mt-1 text-[2rem] leading-none">{procurement.mbe}</dd>
            </div>
            <div className="border-t-2 border-ink pt-3 sm:col-span-2" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              <dt className="text-[0.9375rem] font-semibold">Insurance</dt>
              <dd className="mt-1">{procurement.insurance}</dd>
            </div>
          </dl>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
