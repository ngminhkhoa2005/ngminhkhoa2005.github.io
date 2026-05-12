"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { scales, godViews, barriers, headline, segmentByBelief } from "@/lib/analysis"
import { SectionHeader } from "./section-header"
import { Reveal, Stagger, staggerItem } from "./reveal"
import { motion } from "motion/react"

export function BeliefSpectrum() {
  const beliefDist = scales.belief.distribution.map((d) => ({
    name: `${d.value}`,
    count: d.count,
    pct: d.pct,
  }))

  const segments = segmentByBelief()

  return (
    <section id="belief" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="05"
          kicker="Niềm tin · Góc nhìn về Chúa"
          title="Phổ niềm tin"
          italic="của một thế hệ lưng chừng."
          description={
            <>
              Không phải vô thần. Không phải tin chắc. Phần lớn sinh viên đang ở giữa — không từ
              chối, không tiếp nhận, chỉ đơn giản là{" "}
              <span className="text-foreground">chưa được mời gọi</span> nghĩ về điều này một cách
              nghiêm túc.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Belief % distribution */}
          <Reveal className="lg:col-span-7 glass rounded-2xl p-8 md:p-10">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-lg font-medium">
                "Bạn tin bao nhiêu % rằng có Đức Chúa Trời?"
              </h3>
              <span className="font-mono text-xs text-muted-foreground">B7 · 0–10</span>
            </div>

            <div className="flex items-baseline gap-4 mt-6 mb-8">
              <span className="text-6xl font-medium text-display text-primary tabular-nums">
                {headline.beliefAvgPct}%
              </span>
              <span className="text-sm text-muted-foreground">
                là mức tin trung bình
                <br />
                Trung vị (median) ={" "}
                <span className="font-mono">30%</span>
              </span>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={beliefDist}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                    label={{
                      value: "Mức tin (0 = không có · 10 = chắc chắn có)",
                      position: "insideBottom",
                      offset: -2,
                      style: { fill: "var(--muted-foreground)", fontSize: 10 },
                    }}
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "var(--muted)" }} content={<BeliefTooltip />} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {beliefDist.map((d, i) => {
                      const v = Number.parseInt(d.name)
                      const color =
                        v <= 2 ? "var(--chart-3)" : v >= 7 ? "var(--chart-1)" : "var(--chart-2)"
                      return <Cell key={i} fill={color} />
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
              {segments.map((s) => (
                <div key={s.label} className="bg-card p-5 flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-2xl font-medium tabular-nums">
                    {s.n}
                    <span className="text-xs text-muted-foreground ml-1.5">· {s.pct}%</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Views of God */}
          <Reveal delay={0.1} className="lg:col-span-5 glass rounded-2xl p-8 md:p-10">
            <h3 className="text-lg font-medium mb-2">Góc nhìn về Đức Chúa Trời</h3>
            <p className="text-sm text-muted-foreground mb-8">B6 · Lựa chọn duy nhất</p>

            <Stagger className="flex flex-col gap-4">
              {godViews.map((g, i) => {
                const maxC = Math.max(...godViews.map((x) => x.count))
                return (
                  <motion.div key={g.label} variants={staggerItem}>
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="text-sm font-medium text-pretty leading-snug max-w-[18rem]">
                        {g.label}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {g.count} · {g.pct}%
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(g.count / maxC) * 100}%` }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full ${
                          g.label.includes("tin là có") || g.label.includes("Đấng Tạo Hóa") || g.label.includes("tìm hiểu")
                            ? "bg-primary"
                            : "bg-foreground/50"
                        }`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </Stagger>
          </Reveal>

          {/* Barriers */}
          <Reveal delay={0.2} className="lg:col-span-12 glass rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-balance">
                  Vì sao người trẻ thấy khó tin?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  B8 · Rào cản lớn nhất theo cảm nhận của chính sinh viên
                </p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                Rào cản hàng đầu:{" "}
                <span className="text-primary font-medium">
                  {barriers[0].label} ({barriers[0].pct}%)
                </span>
              </span>
            </div>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {barriers.map((b, i) => {
                const maxC = barriers[0].count
                return (
                  <motion.div key={b.label} variants={staggerItem}>
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="text-sm md:text-base font-medium text-pretty leading-snug">
                        {b.label}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
                        {b.count} · {b.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(b.count / maxC) * 100}%` }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 1,
                          delay: 0.1 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-full ${i === 0 ? "bg-primary" : "bg-foreground/60"}`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </Stagger>

            <div className="mt-10 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6 text-sm leading-relaxed">
              <div>
                <span className="text-primary font-medium">Insight tâm lý.</span>{" "}
                <span className="text-muted-foreground">
                  Rào cản lớn nhất không phải lý lẽ — mà là{" "}
                  <span className="text-foreground">sự thiếu tiếp xúc</span>. Phần lớn không từ chối
                  Chúa, họ chưa từng được hỏi.
                </span>
              </div>
              <div>
                <span className="text-primary font-medium">Insight xã hội.</span>{" "}
                <span className="text-muted-foreground">
                  Khoa học chỉ chiếm ~10%. Hình ảnh "thế hệ duy lý không tin tâm linh" là một
                  huyền thoại — vấn đề thật là kinh nghiệm và niềm tin vào con người có đạo.
                </span>
              </div>
              <div>
                <span className="text-primary font-medium">Hệ quả thực tiễn.</span>{" "}
                <span className="text-muted-foreground">
                  Không cần "thuyết phục" — cần{" "}
                  <span className="text-foreground">tạo không gian an toàn để hỏi</span>. Sự cởi mở
                  đang ở đó. Vấn đề là không ai mời gọi.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function BeliefTooltip(props: any) {
  const { active, payload } = props
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs shadow-2xl">
      <div className="text-muted-foreground">
        Mức tin {payload[0].payload?.name}/10
      </div>
      <div className="tabular-nums font-mono mt-0.5">
        {payload[0].value} người · {payload[0].payload?.pct}%
      </div>
    </div>
  )
}
