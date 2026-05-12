"use client"

import { motion } from "motion/react"
import { headline } from "@/lib/analysis"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      {/* Atmospheric light */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[60rem] rounded-full bg-primary/10 blur-[160px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 size-[40rem] rounded-full bg-accent/5 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Báo cáo nghiên cứu · 2026
          </span>
          <span className="h-px flex-1 max-w-32 bg-border" />
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            N = {headline.total}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium text-balance"
        >
          Thế hệ
          <br />
          <span className="font-serif-italic text-primary">đang tìm.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
        >
          Một báo cáo dữ liệu về thế giới nội tâm của sinh viên Việt Nam — áp lực âm thầm,
          cảm giác trống rỗng không gọi tên, định nghĩa thành công, và những câu hỏi lớn
          chưa từng được trả lời về Chúa và ý nghĩa cuộc đời.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden"
        >
          <HeroStat
            value={`${headline.pressureHighPct}%`}
            label="sinh viên cảm thấy áp lực cao bởi kỳ vọng của người khác"
          />
          <HeroStat
            value={`${headline.emptinessHighPct}%`}
            label='đã trải qua cảm giác "trống rỗng không lý giải được"'
          />
          <HeroStat
            value={`${headline.beliefAvgPct}%`}
            label="là mức tin trung bình rằng có Đức Chúa Trời"
          />
          <HeroStat
            value={`${headline.neverExploredPct}%`}
            label='nói "chưa bao giờ thật sự tìm hiểu" về niềm tin'
            highlight
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 flex items-center gap-6 text-xs text-muted-foreground"
        >
          <span className="font-mono uppercase tracking-[0.2em]">Cuộn để bắt đầu</span>
          <div className="flex flex-col gap-1">
            <span className="h-4 w-px bg-foreground/30 animate-pulse" />
            <span className="h-2 w-px bg-foreground/30" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HeroStat({
  value,
  label,
  highlight,
}: {
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <div className="bg-background p-6 md:p-8 flex flex-col gap-3 group">
      <span
        className={`text-4xl md:text-5xl font-medium text-display tabular-nums ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </span>
      <span className="text-xs md:text-sm text-muted-foreground leading-relaxed text-pretty">
        {label}
      </span>
    </div>
  )
}
