import { ButtonLink } from "@/lib/components/button"

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pb-20 pt-36">
      <p className="eyebrow text-signal">Page not found</p>
      <h1 className="display mt-5 text-[clamp(3rem,8vw,7rem)] leading-[0.88]">
        This room is empty<span className="text-signal">.</span>
      </h1>
      <p className="mt-6 max-w-measure text-lead text-bone/85">The page you were looking for has moved or never existed.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/programs" variant="ghost">
          View programs
        </ButtonLink>
      </div>
    </section>
  )
}
