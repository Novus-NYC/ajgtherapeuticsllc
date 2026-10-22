import { ButtonLink } from "./button"

type Props = {
  title?: React.ReactNode
}

export default function ClosingCta({ title }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[min(70rem,140vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,203,55,0.22),transparent_65%)]"
      />
      <div className="container-page relative py-28 text-center md:py-36">
        <h2 className="display mx-auto max-w-5xl text-h2" data-reveal>
          {title ?? (
            <>
              Help us build safer families, stronger communities, and <span className="text-signal">future leaders.</span>
            </>
          )}
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
          <ButtonLink href="/contact#quote">Request a quote</ButtonLink>
          <ButtonLink href="/contact#support" variant="ghost">
            Support the work
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
