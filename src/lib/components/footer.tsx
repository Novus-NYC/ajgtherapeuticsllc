import Link from "next/link"
import { nav, site } from "@/lib/site"
import { Wordmark } from "./logo"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-bone/10 bg-ink-2">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="display mt-8 max-w-md text-[clamp(2rem,4vw,3.25rem)] leading-[0.92]">
            Join the movement. <span className="text-signal">Support Bronx men.</span>
          </p>
          <p className="mt-6 max-w-sm text-muted">
            Trauma-informed programs for youth, fathers, and violence prevention. {site.area}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className="eyebrow text-muted">Explore</h2>
          <ul className="mt-5 space-y-1">
            <li>
              <Link href="/" className="inline-block py-1.5 hover:text-signal">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1.5 hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-muted">Contact</h2>
          <ul className="mt-5 space-y-1">
            <li>
              <a href={`mailto:${site.email}`} className="inline-block break-all py-1.5 hover:text-signal">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="inline-block py-1.5 hover:text-signal">
                Instagram ↗
              </a>
            </li>
            <li>
              <a
                href={site.founderLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="inline-block py-1.5 hover:text-signal"
              >
                Founder on LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href={site.capabilityStatement}
                target="_blank"
                rel="noreferrer"
                className="inline-block py-1.5 hover:text-signal"
              >
                Capability statement ↗
              </a>
            </li>
          </ul>
          <Link
            href="/contact#quote"
            className="mt-8 inline-flex min-h-[48px] items-center gap-3 bg-signal px-5 font-semibold text-ink transition-colors hover:bg-bone"
          >
            Request a quote <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.875rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. NYC DOE Vendor. MWBE certification pending.
          </p>
          <a
            href="https://novusnyc.org"
            target="_blank"
            rel="noreferrer"
            className="text-bone underline decoration-signal underline-offset-4 hover:text-signal"
          >
            Made by Novus
          </a>
        </div>
      </div>
    </footer>
  )
}
