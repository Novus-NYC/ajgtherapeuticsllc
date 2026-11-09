import type { Metadata } from "next"
import Image from "next/image"
import PageHero from "@/lib/components/page-hero"
import ClosingCta from "@/lib/components/closing-cta"
import { ButtonLink } from "@/lib/components/button"
import { logos, projectBeauty, stats, testimonials } from "@/lib/site"
import Gallery from "./gallery"

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Past work by AJG Therapeutics and founder Alam Gonzalez: the Community Impact Award, Youth Leadership Summit, Telemundo’s El Show de Jackie, commencement addresses, and the Let’s Talk Peace Summit.",
}

export default function WorkPage() {

  return (
    <>
      <PageHero
        eyebrow="Past work"
        title={
          <>
            In the room<span className="text-signal">.</span> On the record<span className="text-signal">.</span>
          </>
        }
        intro={
          <p>
            Summits, classrooms, graduation stages, group rooms, and television studios. Awards, media, speaking,
            programs, and collaborations: the evidence of the work, not just a description of it.
          </p>
        }
      />

      {/* Portfolio gallery */}
      <section className="bg-ink" aria-labelledby="portfolio">
        <div className="container-page pb-24 md:pb-32">
          <h2 id="portfolio" className="sr-only">
            Portfolio
          </h2>
          <Gallery />
        </div>
      </section>

      {/* Impact */}
      <section className="on-bone bg-bone text-ink" aria-labelledby="impact">
        <div className="container-page py-24 md:py-28">
          <h2 id="impact" className="eyebrow text-clay">
            Program impact
          </h2>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="border-t-2 border-ink pt-4" data-reveal style={{ "--d": i } as React.CSSProperties}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="display text-[clamp(2.25rem,5vw,4rem)] leading-none">{s.value}</dd>
                <dd className="mt-2 text-[0.9375rem] text-stone">{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} data-reveal>
                <blockquote className="font-serif text-[1.5rem] leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-4 font-semibold">{t.name}, program participant</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Project Beauty */}
      <section className="bg-ink-2" aria-labelledby="beauty">
        <div className="container-page grid items-center gap-12 py-24 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4" data-reveal="mask">
            <Image
              src="/media/project-beauty.jpg"
              alt="Girls from the Project Beauty program posing together with program signs"
              width={451}
              height={467}
              sizes="(min-width: 768px) 30vw, 100vw"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="eyebrow text-signal">Collaboration</p>
            <h2 id="beauty" className="mt-4 font-serif text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.02]" data-reveal>
              {projectBeauty.heading}
            </h2>
            <p className="mt-6 max-w-measure text-bone/85" data-reveal>
              {projectBeauty.body}
            </p>
            <p className="mt-6 text-muted">
              {projectBeauty.name}. {projectBeauty.program}. Founder: {projectBeauty.founder}.
            </p>
            <ButtonLink href={projectBeauty.instagram} variant="text" external className="mt-4">
              Project Beauty on Instagram
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Acknowledgement + logos */}
      <section className="bg-ink" aria-labelledby="ack">
        <div className="container-page grid gap-12 py-24 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <h2 id="ack" className="eyebrow text-signal">
              Letters of acknowledgement
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Image
                src="/media/chcf-letter.jpg"
                alt="Letter of acknowledgement from The Committee for Hispanic Children and Families, 2012"
                width={1200}
                height={1600}
                sizes="(min-width: 768px) 20vw, 50vw"
                className="aspect-[3/4] w-full object-cover object-top"
                data-reveal
              />
              <Image
                src="/media/clinton-note.jpg"
                alt="Handwritten thank-you note to Alam with a DeWitt Clinton High School graduation program, 2021"
                width={1062}
                height={1400}
                sizes="(min-width: 768px) 20vw, 50vw"
                className="aspect-[3/4] w-full object-cover"
                data-reveal
                style={{ "--d": 1 } as React.CSSProperties}
              />
            </div>
          </div>
          <div className="on-bone bg-bone p-8 text-ink md:col-span-7 md:p-10">
            <h2 className="eyebrow text-stone">Affiliations, collaborations, and featured platforms</h2>
            <ul className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3">
              {logos.map((l) => (
                <li key={l.src} className="flex h-20 items-center justify-center">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={l.w}
                    height={l.h}
                    sizes="160px"
                    className="max-h-20 w-auto object-contain mix-blend-multiply"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
