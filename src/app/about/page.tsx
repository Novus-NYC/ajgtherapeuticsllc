import type { Metadata } from "next"
import Image from "next/image"
import PageHero from "@/lib/components/page-hero"
import ClosingCta from "@/lib/components/closing-cta"
import { ButtonLink } from "@/lib/components/button"
import { approach, founder, mission, site, upcoming, vision } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "AJG Therapeutics supports men of color and justice-impacted families in the Bronx. Founded by Alam Gonzalez, MSW, CASAC-T, an ATI social worker and violence prevention specialist.",
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Transform pain into <span className="font-serif font-normal normal-case italic text-signal [font-stretch:100%]">power.</span>
          </>
        }
        intro={<p>{approach}</p>}
      />

      {/* Mission + vision */}
      <section className="on-bone bg-bone text-ink">
        <div className="container-page grid gap-16 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-6">
            <h2 className="eyebrow text-clay">Mission</h2>
            <div className="mt-6 space-y-6 text-[1.125rem] leading-relaxed">
              {mission.map((m, i) => (
                <p key={i} data-reveal style={{ "--d": i } as React.CSSProperties}>
                  {m}
                </p>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h2 className="eyebrow text-clay">Vision</h2>
            <p className="mt-6 font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.05]" data-reveal>
              {vision.lead}
            </p>
            <div className="mt-8 space-y-5 text-stone">
              {vision.body.map((v, i) => (
                <p key={i} data-reveal style={{ "--d": i } as React.CSSProperties}>
                  {v}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="bg-ink" aria-labelledby="founder-name">
        <div className="container-page grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28" data-reveal="mask">
              <Image
                src="/media/founder.jpg"
                alt="Alam Gonzalez, founder of AJG Therapeutics, in a dark suit"
                width={1060}
                height={1400}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-signal">Meet the founder</p>
            <h2 id="founder-name" className="display mt-4 text-h2" data-reveal>
              {founder.name}
            </h2>
            <p className="mt-3 text-lead text-muted">{founder.credentials}</p>
            <ul className="mt-10 border-t border-bone/15">
              {founder.bio.map((b, i) => (
                <li
                  key={b}
                  className="flex gap-4 border-b border-bone/15 py-4 text-[1.0625rem]"
                  data-reveal
                  style={{ "--d": i % 4 } as React.CSSProperties}
                >
                  <span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0 bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.founderLinkedIn} variant="ghost" external>
                Alam on LinkedIn
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`} variant="text">
                {site.email}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Origin: the 2012 letter */}
      <section className="bg-ink-2" aria-labelledby="origin">
        <div className="container-page grid items-center gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-6 md:order-2 md:col-start-7" data-reveal="mask">
            <Image
              src="/media/chcf-letter.jpg"
              alt="Letter from The Committee for Hispanic Children and Families to Alam Gonzalez, dated June 25, 2012"
              width={1200}
              height={1600}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="md:col-span-5 md:order-1">
            <p className="eyebrow text-signal">Lived experience</p>
            <h2 id="origin" className="display mt-4 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[0.92]" data-reveal>
              In 2012, he spoke for the young men in the program.
            </h2>
            <p className="mt-6 text-lead text-bone/85" data-reveal>
              The Committee for Hispanic Children and Families wrote to Alam after he spoke on behalf of the young men in
              its Opening Doors to the Future program at NBC Studios:
            </p>
            <blockquote className="mt-6 border-l-2 border-signal pl-6 font-serif text-[1.625rem] italic leading-snug" data-reveal>
              “Your words were incredibly moving; you touched everyone in the room with your speech.”
            </blockquote>
            <p className="mt-6 text-muted" data-reveal>
              Today AJG Therapeutics is delivered by trained facilitators with lived experience.
            </p>
          </div>
        </div>
      </section>

      {/* Recognition + upcoming */}
      <section className="on-bone bg-bone text-ink">
        <div className="container-page grid gap-12 py-24 md:grid-cols-12 md:py-28">
          <figure className="md:col-span-4" data-reveal="mask">
            <Image
              src="/media/award-night.jpg"
              alt="Alam Gonzalez holding his Community Impact Award plaque beside a guest at the Latino Social Work Coalition awards"
              width={1050}
              height={1400}
              sizes="(min-width: 768px) 30vw, 100vw"
              className="aspect-[3/4] w-full object-cover"
            />
          </figure>
          <div className="md:col-span-4">
            <p className="eyebrow text-clay">November 2025</p>
            <h2 className="display mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-[0.92]" data-reveal>
              Community Impact Award
            </h2>
            <p className="mt-5 text-stone" data-reveal>
              Presented by the Latino Social Work Coalition & Scholarship Fund at its 25th Anniversary Leadership Awards.
            </p>
          </div>
          <aside className="self-start bg-ink p-8 text-bone md:col-span-4" aria-labelledby="upcoming" data-reveal>
            <p className="eyebrow text-signal">Upcoming</p>
            <h2 id="upcoming" className="display mt-4 text-[2.25rem] leading-[0.92]">
              {upcoming.title}
            </h2>
            <p className="mt-4 font-semibold">{upcoming.when}</p>
            <p className="mt-2 text-muted">{upcoming.details}</p>
            <ButtonLink href="/contact#quote" className="mt-6 w-full">
              Ask about joining
            </ButtonLink>
          </aside>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
