import type { Metadata } from "next"
import Image from "next/image"
import PageHero from "@/lib/components/page-hero"
import ClosingCta from "@/lib/components/closing-cta"
import { ButtonLink } from "@/lib/components/button"
import { approach, pillars, serviceLines, settings } from "@/lib/site"

export const metadata: Metadata = {
  title: "Programs",
  description:
    "School-based violence prevention and SEL workshops, trauma-informed therapeutic groups and healing circles, and staff training in de-escalation and Motivational Interviewing.",
}

const pillarImages: Record<string, { src: string; alt: string; w: number; h: number; pos: string }> = {
  schools: {
    src: "/media/career-day.jpg",
    alt: "Alam Gonzalez speaking to students in a classroom",
    w: 1600,
    h: 928,
    pos: "50% 40%",
  },
  groups: {
    src: "/media/group-circle.jpg",
    alt: "Participants seated in a wide circle of chairs during a group session",
    w: 738,
    h: 960,
    pos: "50% 8%",
  },
  training: {
    src: "/media/lets-talk-peace.jpg",
    alt: "Alam Gonzalez addressing an audience at the Let’s Talk Peace Summit",
    w: 1050,
    h: 1400,
    pos: "50% 45%",
  },
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={
          <>
            Structured<span className="text-signal">.</span> Trauma-informed
            <span className="text-signal">.</span> Built for the room<span className="text-signal">.</span>
          </>
        }
        intro={<p>{approach}</p>}
        aside={
          <nav aria-label="Program pillars" className="border-t border-bone/15">
            {pillars.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="flex min-h-[56px] items-center justify-between gap-4 border-b border-bone/15 font-semibold transition-colors hover:text-signal"
              >
                <span>
                  <span className="mr-3 text-signal">{p.number}</span>
                  {p.title}
                </span>
                <span aria-hidden>↓</span>
              </a>
            ))}
          </nav>
        }
      />

      {pillars.map((p, i) => {
        const img = pillarImages[p.id]
        const light = i % 2 === 1
        return (
          <section
            key={p.id}
            id={p.id}
            aria-labelledby={`${p.id}-title`}
            className={light ? "on-bone bg-bone text-ink" : i === 0 ? "bg-ink-2" : "bg-ink"}
          >
            <div className="container-page grid gap-12 py-24 md:grid-cols-12 md:py-32">
              <div className="md:col-span-5">
                <div className="md:sticky md:top-28">
                  <p
                    className={`display text-[6rem] leading-[0.8] text-transparent md:text-[9rem] ${
                      light ? "[-webkit-text-stroke:1.5px_#0F0E0C]" : "[-webkit-text-stroke:1.5px_#FFCB37]"
                    }`}
                    aria-hidden
                  >
                    {p.number}
                  </p>
                  <h2 id={`${p.id}-title`} className="display mt-6 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[0.92]" data-reveal>
                    {p.title}
                  </h2>
                  <p className={`mt-6 max-w-measure text-lead ${light ? "text-stone" : "text-bone/85"}`} data-reveal>
                    {p.summary}
                  </p>
                  <div className="mt-8 hidden overflow-hidden md:block" data-reveal="mask">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      sizes="40vw"
                      className="aspect-[16/10] w-full object-cover"
                      style={{ objectPosition: img.pos }}
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 md:col-start-7">
                <h3 className={`eyebrow ${light ? "text-clay" : "text-signal"}`}>{p.listLabel}</h3>
                <ol className={`mt-6 border-t ${light ? "border-ink/15" : "border-bone/15"}`}>
                  {p.items.map((item, k) => (
                    <li
                      key={item.name}
                      className={`grid grid-cols-[2.5rem_1fr] gap-2 border-b py-6 ${light ? "border-ink/15" : "border-bone/15"}`}
                      data-reveal
                      style={{ "--d": k } as React.CSSProperties}
                    >
                      <span className={`pt-1 text-[0.875rem] font-semibold ${light ? "text-clay" : "text-signal"}`}>
                        {i + 1}.{k + 1}
                      </span>
                      <span>
                        <span className="block text-[1.1875rem] font-semibold leading-snug">{item.name}</span>
                        {item.detail && (
                          <span className={`mt-1 block ${light ? "text-stone" : "text-muted"}`}>{item.detail}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>

                <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className={`eyebrow ${light ? "text-stone" : "text-muted"}`}>Ideal for</dt>
                    <dd className="mt-2">{p.idealFor}</dd>
                  </div>
                  <div>
                    <dt className={`eyebrow ${light ? "text-stone" : "text-muted"}`}>
                      {p.id === "training" ? "Training length" : "Session length"}
                    </dt>
                    <dd className="display mt-2 text-[1.75rem] leading-none">{p.length}</dd>
                  </div>
                  {p.availableFor && (
                    <div className="sm:col-span-2">
                      <dt className={`eyebrow ${light ? "text-stone" : "text-muted"}`}>Available for</dt>
                      <dd className="mt-2">{p.availableFor}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-10">
                  <ButtonLink href="/contact#quote" variant={light ? "ghost-dark" : "primary"}>
                    Request a quote for this program
                  </ButtonLink>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="bg-ink-2">
        <div className="container-page grid gap-12 py-24 md:grid-cols-2 md:py-28">
          <div>
            <h2 className="eyebrow text-signal">Our services</h2>
            <ul className="mt-6 space-y-5">
              {serviceLines.map((s, i) => (
                <li key={s.title} className="display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[0.95]" data-reveal style={{ "--d": i } as React.CSSProperties}>
                  {s.title}
                  {"note" in s && (
                    <span className="ml-3 align-middle font-serif text-[0.7em] font-normal normal-case italic text-signal [font-stretch:100%]">
                      ({s.note})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-signal">Where we work</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {settings.map((s) => (
                <li key={s} className="border border-bone/25 px-4 py-3 text-[1rem]">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-measure text-muted">
              Facilitated in community settings, inside Rikers, and in agency programs.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        title={
          <>
            Bring a program to <span className="text-signal">your school or agency.</span>
          </>
        }
      />
    </>
  )
}
