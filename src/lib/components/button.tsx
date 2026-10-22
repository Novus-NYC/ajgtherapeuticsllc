import Link from "next/link"

type Variant = "primary" | "ghost" | "ghost-dark" | "text"

const styles: Record<Variant, string> = {
  primary:
    "bg-signal text-ink hover:bg-bone border border-signal hover:border-bone px-6 py-3.5",
  ghost: "border border-bone/40 text-bone hover:border-signal hover:text-signal px-6 py-3.5",
  "ghost-dark": "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-bone px-6 py-3.5",
  text: "text-current underline decoration-signal decoration-2 underline-offset-[6px] hover:decoration-current py-2",
}

type Props = {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  external?: boolean
}

export function ButtonLink({ href, children, variant = "primary", className = "", external }: Props) {
  const cls = `group inline-flex min-h-[48px] items-center justify-center gap-3 text-[0.9375rem] font-semibold tracking-wide transition-colors duration-300 ${styles[variant]} ${className}`
  const arrow = (
    <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
      {external ? "↗" : "→"}
    </span>
  )
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
        {arrow}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  )
}
