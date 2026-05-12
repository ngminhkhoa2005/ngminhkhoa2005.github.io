import type { ReactNode } from "react"
import { Reveal } from "./reveal"

export function SectionHeader({
  index,
  kicker,
  title,
  italic,
  description,
}: {
  index: string
  kicker: string
  title: string
  italic?: string
  description?: ReactNode
}) {
  return (
    <div className="mb-16 md:mb-24 max-w-4xl">
      <Reveal>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">{index}</span>
          <span className="h-px w-12 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {kicker}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-balance">
          {title}{" "}
          {italic && <span className="font-serif-italic text-primary">{italic}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
