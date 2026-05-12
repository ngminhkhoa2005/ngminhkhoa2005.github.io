"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { Reveal } from "./reveal"
import { headline } from "@/lib/analysis"

export function Closing() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.6, 0.6, 0.2])
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.6])

  return (
    <section ref={ref} id="closing" className="relative isolate overflow-hidden py-32 md:py-48">
      {/* candle glow */}
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity, scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[20vmin] w-[20vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary blur-[60px] animate-pulse-glow"
      />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            kết luận · điều cuối cùng
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-10 text-display text-balance text-5xl font-light leading-[0.95] md:text-7xl lg:text-8xl">
            Một thế hệ <span className="font-serif-italic text-primary">đang tìm</span> —
            <br />
            chỉ là chưa biết{" "}
            <span className="font-serif-italic text-primary">tìm gì.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="divider-line mx-auto mt-16 max-w-md" />
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-12 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {headline.total} sinh viên. {headline.pressureHighPct}% chịu áp lực cao. {headline.emptinessHighPct}% từng
            cảm thấy trống rỗng. {headline.needBiggerPct}% tin có điều gì đó lớn hơn thành tích đang chờ họ. Phần lớn
            chưa từng có ai ngồi xuống và <span className="text-foreground">lắng nghe</span>.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty font-serif-italic text-2xl leading-relaxed text-foreground md:text-3xl">
            &ldquo;Họ không khép kín. Họ chỉ đang chờ một câu trả lời <br className="hidden md:block" />
            xứng đáng với những câu hỏi mà họ đang mang.&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 flex flex-col items-center gap-3">
            <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              báo cáo · 2026 · n = {headline.total}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
