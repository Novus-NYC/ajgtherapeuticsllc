type Props = {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  aside?: React.ReactNode
}

// Type-led opening for inner pages. A soft cone of light sits behind the title,
// echoing the homepage film.
export default function PageHero({ eyebrow, title, intro, aside }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[8%] h-[38rem] w-[34rem] max-w-[90vw] bg-[radial-gradient(ellipse_at_top,rgba(255,203,55,0.16),transparent_68%)]"
      />
      <div className="container-page relative grid gap-10 pb-16 pt-36 md:grid-cols-12 md:pb-20 md:pt-44">
        <div className={aside ? "md:col-span-7" : "md:col-span-10"}>
          <p className="eyebrow text-signal" data-reveal>
            {eyebrow}
          </p>
          <h1 className="display mt-5 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.88]" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            {title}
          </h1>
          {intro && (
            <div className="mt-8 max-w-[40rem] text-lead text-bone/85" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              {intro}
            </div>
          )}
        </div>
        {aside && (
          <div className="md:col-span-4 md:col-start-9 md:self-end" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
            {aside}
          </div>
        )}
      </div>
    </section>
  )
}
