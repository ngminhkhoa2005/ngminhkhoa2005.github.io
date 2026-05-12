"use client"

import { correlationMatrix, segmentByYear, segmentByGender, pressureClusters } from "@/lib/analysis"
import { SectionHeader } from "./section-header"
import { Reveal, Stagger, staggerItem } from "./reveal"
import { motion } from "motion/react"

export function CorrelationMatrix() {
  const yearSeg = segmentByYear().filter((s) => s.n > 0)
  const genderSeg = segmentByGender()
  const clusters = pressureClusters()

  return (
    <section id="correlation" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="07"
          kicker="Tương quan · Phân khúc"
          title="Những đường dây"
          italic="nối các nỗi đau với nhau."
          description="Khi xếp các biến tâm lý cạnh nhau, các pattern xuất hiện. Áp lực không đứng một mình. Trống rỗng không đứng một mình. Niềm tin không đứng một mình. Chúng kéo theo nhau."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Correlation list */}
          <Reveal className="lg:col-span-12 glass rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <h3 className="text-2xl md:text-3xl font-medium text-balance">
                Hệ số tương quan Pearson (r)
              </h3>
              <p className="text-xs text-muted-foreground max-w-md md:text-right">
                |r| ≥ 0.5 = tương quan mạnh · 0.3–0.5 = vừa · &lt; 0.3 = yếu. Dấu dương = cùng chiều.
              </p>
            </div>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {correlationMatrix.map((c) => {
                const strength = Math.abs(c.r)
                const isStrong = strength >= 0.5
                const isMod = strength >= 0.3 && strength < 0.5
                return (
                  <motion.div
                    key={`${c.x}-${c.y}`}
                    variants={staggerItem}
                    className={`relative rounded-xl p-5 border ${
                      isStrong
                        ? "border-primary/40 bg-primary/[0.04]"
                        : "border-border bg-card/40"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-3">
                      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {isStrong ? "Mạnh" : isMod ? "Vừa" : "Yếu"}
                      </span>
                      <span
                        className={`font-mono text-2xl tabular-nums ${
                          isStrong ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {c.r >= 0 ? "+" : ""}
                        {c.r.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm leading-snug text-balance">
                      <span className="text-foreground font-medium">{c.x}</span>
                      <span className="text-muted-foreground"> ↔ </span>
                      <span className="text-foreground font-medium">{c.y}</span>
                    </p>
                    <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${strength * 100}%` }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full ${isStrong ? "bg-primary" : "bg-foreground/60"}`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </Stagger>
          </Reveal>

          {/* Pressure cluster comparison */}
          <Reveal delay={0.1} className="lg:col-span-7 glass rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-medium mb-2">Khi áp lực tăng — điều gì tăng theo?</h3>
            <p className="text-sm text-muted-foreground mb-8">
              So sánh 3 nhóm theo mức áp lực kỳ vọng (B1).
            </p>

            <div className="space-y-6">
              {clusters.map((c, i) => (
                <div key={c.label} className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-5 items-center">
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="font-mono text-xs text-muted-foreground">n = {c.n}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <ClusterBar label="Trống rỗng" value={c.emptiness} max={5} highlight={i === 2} />
                    <ClusterBar
                      label="Cần điều lớn hơn"
                      value={c.needBigger}
                      max={5}
                      highlight={i === 2}
                    />
                    <ClusterBar
                      label="Tin có Chúa"
                      value={c.belief}
                      max={10}
                      highlight={i === 2}
                      accent
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground leading-relaxed text-pretty">
              <span className="text-foreground font-medium">Đọc dữ liệu:</span> Nhóm áp lực cao có
              điểm trống rỗng và nhu cầu "điều gì lớn hơn thành tích" đều cao nhất. Áp lực không
              chỉ làm họ mệt — nó đẩy họ vào câu hỏi ý nghĩa.
            </p>
          </Reveal>

          {/* Year & gender segments */}
          <Reveal delay={0.2} className="lg:col-span-5 glass rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-medium mb-6">Theo nhân khẩu</h3>

            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
                Năm học
              </p>
              <div className="space-y-3">
                {yearSeg.map((s) => (
                  <SegmentRow
                    key={s.year}
                    label={s.year}
                    n={s.n}
                    metrics={[
                      { label: "Áp lực", v: s.pressure, max: 5 },
                      { label: "Trống rỗng", v: s.emptiness, max: 5 },
                    ]}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
                Giới tính
              </p>
              <div className="space-y-3">
                {genderSeg.map((s) => (
                  <SegmentRow
                    key={s.gender}
                    label={s.gender}
                    n={s.n}
                    metrics={[
                      { label: "Áp lực", v: s.pressure, max: 5 },
                      { label: "Trống rỗng", v: s.emptiness, max: 5 },
                      { label: "Cởi mở", v: s.openness, max: 5 },
                    ]}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ClusterBar({
  label,
  value,
  max,
  highlight,
  accent,
}: {
  label: string
  value: number
  max: number
  highlight?: boolean
  accent?: boolean
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="font-mono text-xs tabular-nums">{value.toFixed(2)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(value / max) * 100}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full ${
            highlight ? "bg-primary" : accent ? "bg-accent" : "bg-foreground/50"
          }`}
        />
      </div>
    </div>
  )
}

function SegmentRow({
  label,
  n,
  metrics,
}: {
  label: string
  n: number
  metrics: { label: string; v: number; max: number }[]
}) {
  return (
    <div className="grid grid-cols-[5rem_1fr] items-center gap-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="font-mono text-[10px] text-muted-foreground">n={n}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] text-muted-foreground truncate">{m.label}</span>
              <span className="font-mono text-[10px] tabular-nums">{m.v.toFixed(1)}</span>
            </div>
            <div className="h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(m.v / m.max) * 100}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-foreground/60"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
