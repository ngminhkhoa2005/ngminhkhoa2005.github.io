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
import { scales, headline, correlations, paradoxes } from "@/lib/analysis"
import { SectionHeader } from "./section-header"
import { Reveal } from "./reveal"

export function PressureEmptiness() {
  const buildDist = (dist: { value: number; pct: number }[]) =>
    dist.map((d) => ({ name: `${d.value}`, pct: d.pct }))

  return (
    <section id="pressure" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          kicker="Áp lực · Trống rỗng"
          title="Cái họ mang theo"
          italic="mà không ai thấy."
          description={
            <>
              Hệ số tương quan giữa "áp lực kỳ vọng" và "trống rỗng không lý giải" đạt{" "}
              <span className="font-mono text-foreground">
                r = {correlations.pressure_emptiness.toFixed(2)}
              </span>{" "}
              — đủ lớn để khẳng định: kỳ vọng càng đè nặng, sinh viên càng thấy rỗng.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-6 glass rounded-2xl p-8 md:p-10">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-lg font-medium">Áp lực bởi kỳ vọng</h3>
              <span className="font-mono text-xs text-muted-foreground">
                B1 · 1–5 Likert
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              "Tôi thường xuyên cảm thấy áp lực bởi kỳ vọng của người khác dành cho mình."
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-6xl font-medium text-display text-primary tabular-nums">
                {headline.pressureMean}
              </span>
              <span className="text-sm text-muted-foreground">
                điểm trung bình
                <br />
                <span className="font-mono">{headline.pressureHighPct}%</span> ở mức cao (≥4)
              </span>
            </div>

            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={buildDist(scales.pressure.distribution)}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "var(--muted)" }} content={<TT label="Mức" suffix="%" />} />
                  <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                    {scales.pressure.distribution.map((d, i) => (
                      <Cell key={i} fill={d.value >= 4 ? "var(--chart-1)" : "var(--chart-3)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 glass rounded-2xl p-8 md:p-10">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-lg font-medium">Trống rỗng không lý giải được</h3>
              <span className="font-mono text-xs text-muted-foreground">B2 · 1–5 Likert</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              "Tôi đã từng / đang cảm thấy trống rỗng không lý giải được."
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-6xl font-medium text-display text-primary tabular-nums">
                {scales.emptiness.mean.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                điểm trung bình
                <br />
                <span className="font-mono">{scales.emptiness.highPct}%</span> ở mức cao (≥4)
              </span>
            </div>

            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={buildDist(scales.emptiness.distribution)}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "var(--muted)" }} content={<TT label="Mức" suffix="%" />} />
                  <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                    {scales.emptiness.distribution.map((d, i) => (
                      <Cell key={i} fill={d.value >= 4 ? "var(--chart-1)" : "var(--chart-3)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            <InsightCard
              kicker="Insight 01"
              big={`${paradoxes.pressuredAndEmpty}/${headline.total}`}
              title="bạn vừa bị áp lực cao, vừa cảm thấy trống rỗng"
              body="Một cuộc chiến kép: bên ngoài cố tỏ ra ổn, bên trong tự hỏi tại sao mình vẫn không hạnh phúc. Đây là hình hài của burnout hiện đại — không ồn ào, không nức nở, chỉ là cảm giác 'sao tôi đang sống thế này?'"
            />
            <InsightCard
              kicker="Insight 02"
              big={`${headline.needBiggerPct}%`}
              title='nói "tôi cần điều gì đó lớn hơn thành tích để neo đỗ cuộc đời"'
              body="Đây không phải câu trả lời ngẫu nhiên. Khi cảm giác trống rỗng tăng lên, nhu cầu này tăng theo (r = 0.55). Họ biết thành tích không cứu nổi linh hồn — họ chỉ chưa biết phải tìm gì."
            />
            <InsightCard
              kicker="Insight 03"
              big={`r = ${correlations.pressure_emptiness.toFixed(2)}`}
              title="là mức tương quan giữa áp lực và trống rỗng"
              body="Hai biến này không độc lập. Trong tâm lý học, đây là dấu hiệu kinh điển của 'achievement-based identity collapse' — khi bản sắc của bạn được xây trên những thành tựu, mỗi áp lực mới đều đào sâu thêm hố trống."
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function InsightCard({
  kicker,
  big,
  title,
  body,
}: {
  kicker: string
  big: string
  title: string
  body: string
}) {
  return (
    <div className="bg-background p-8 md:p-10 flex flex-col gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {kicker}
      </span>
      <span className="text-4xl md:text-5xl font-medium text-display text-primary tabular-nums">
        {big}
      </span>
      <p className="text-base font-medium text-balance leading-snug">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{body}</p>
    </div>
  )
}

function TT(props: any) {
  const { active, payload, label, suffix } = props
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs shadow-2xl">
      <div className="text-muted-foreground">
        {label} {payload[0].payload?.name}
      </div>
      <div className="tabular-nums font-mono mt-0.5">
        {payload[0].value}
        {suffix ?? ""}
      </div>
    </div>
  )
}
