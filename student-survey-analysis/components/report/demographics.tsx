"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { demographics } from "@/lib/analysis"
import { SectionHeader } from "./section-header"
import { Reveal } from "./reveal"

export function Demographics() {
  const yearData = Object.entries(demographics.byYear).map(([name, value]) => ({ name, value }))
  const genderData = Object.entries(demographics.byGender).map(([name, value]) => ({ name, value }))
  const religionData = Object.entries(demographics.byReligion).map(([name, value]) => ({
    name: name.replace("Phật giáo / Thờ cúng tổ tiên", "Phật giáo / Thờ cúng")
      .replace("Thiên Chúa giáo (Công giáo)", "Công giáo"),
    value,
  }))
  const schoolData = Object.entries(demographics.bySchool)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ]

  return (
    <section id="demographics" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          kicker="Mẫu nghiên cứu"
          title="Ai đã"
          italic="nói thật với chúng tôi?"
          description={`${demographics.total} sinh viên từ ${Object.keys(demographics.bySchool).length} trường đại học, đa dạng về năm học, giới tính và nền tảng tôn giáo gia đình. Một lát cắt đủ chân thật để nhìn thấy chính mình.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-4 glass rounded-2xl p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Theo năm học
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={yearData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    stroke="var(--background)"
                    strokeWidth={2}
                  >
                    {yearData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {yearData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="ml-auto tabular-nums font-mono">{d.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 glass rounded-2xl p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Theo giới tính
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    stroke="var(--background)"
                    strokeWidth={2}
                  >
                    {genderData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {genderData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="ml-auto tabular-nums font-mono">{d.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-4 glass rounded-2xl p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Tôn giáo gia đình
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={religionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    stroke="var(--background)"
                    strokeWidth={2}
                  >
                    {religionData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
              {religionData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full shrink-0"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-muted-foreground truncate">{d.name}</span>
                  <span className="ml-auto tabular-nums font-mono">{d.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3} className="lg:col-span-12 glass rounded-2xl p-8">
            <div className="flex items-end justify-between mb-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Phân bổ theo trường
              </h3>
              <span className="text-xs text-muted-foreground">
                {Object.keys(demographics.bySchool).length} trường
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={schoolData} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip />} />
                  <Bar dataKey="value" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs shadow-2xl">
      <div className="text-muted-foreground">{payload[0].name || payload[0].payload?.name}</div>
      <div className="tabular-nums font-mono mt-0.5">{payload[0].value} người</div>
    </div>
  )
}
