import type { Metadata } from "next"
import Image from "next/image"
import PageHero from "@/lib/components/page-hero"
import ClosingCta from "@/lib/components/closing-cta"
import { ButtonLink } from "@/lib/components/button"
import { logos, pastWork, projectBeauty } from "@/lib/site"

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Past work by AJG Therapeutics and founder Alam Gonzalez: the Community Impact Award, Youth Leadership Summit, Telemundo’s El Show de Jackie, commencement addresses, and the Let’s Talk Peace Summit.",
}

export default function WorkPage() {
  const dated = pastWork.filter((w) => w.date)
  const field = pastWork.filter((w) => !w.date)

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
            Summits, classrooms, graduation stages, group rooms, and television studios. A record of where the work has
            happened.
          </p>
        }
      />

      {/* Timeline */}
      <section className="bg-ink" aria-label="Timeline">
        <ol className="container-page relative pb-24 md:pb-32">
          <span aria-hidden className="absolute bottom-24 left-gutter top-0 w-px bg-bone/15 md:left-1/2" />
          {dated.map((w, i) => {
            const right = i % 2 === 1
            return (
              <li key={w.title} className="relative grid gap-6 py-12 pl-8 md:grid-cols-2 md:gap-16 md:pl-0">
                <span
                  aria-hidden
                  className="absolute left-[-5px] top-[3.6rem] h-[11px] w-[11px] rounded-full bg-signal md:left-[calc(50%-5px)]"
                />
                <div className={right ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right"}>
                  <p className="eyebrow text-signal" data-reveal>
                    {w.date}
                  </p>
                  <h2 className="display mt-3 text-[clamp(2rem,3.8vw,3.25rem)] leading-[0.92]" data-reveal>
                    {w.title}
                  </h2>
                  <p className={`mt-4 max-w-md text-bone/85 ${right ? "" : "md:ml-auto"}`} data-reveal>
                    {w.detail}
                  </p>
                  {w.link && (
                    <ButtonLink href={w.link.href} variant="text" external className="mt-3">
                      {w.link.label}
                    </ButtonLink>
                  )}
                </div>
                {w.image && (
                  <div className={right ? "md:order-1 md:pr-4" : "md:pl-4"} data-reveal="mask">
                    <Image
                      src={w.image.src}
                      alt={w.image.alt}
                      width={w.image.w}
                      height={w.image.h}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className={`w-full object-cover ${w.image.h > w.image.w ? "aspect-[4/5] md:max-w-md" : "aspect-[3/2]"} ${right ? "md:ml-auto" : ""}`}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </section>

      {/* Field work */}
      <section className="on-bone bg-bone text-ink" aria-labelledby="field">
        <div className="container-page py-24 md:py-28">
          <h2 id="field" className="display text-h2" data-reveal>
            More from the field<span className="text-clay">.</span>
          </h2>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {field.map((w, i) => (
              <li key={w.title} data-reveal style={{ "--d": i } as React.CSSProperties}>
                {w.image && (
                  <div className="overflow-hidden bg-bone-2">
                    <Image
                      src={w.image.src}
                      alt={w.image.alt}
                      width={w.image.w}
                      height={w.image.h}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-square w-full object-cover object-[50%_15%]"
                    />
                  </div>
                )}
                <h3 className="mt-5 text-h3 font-semibold">{w.title}</h3>
                <p className="mt-2 text-stone">{w.detail}</p>
              </li>
            ))}
          </ul>
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
