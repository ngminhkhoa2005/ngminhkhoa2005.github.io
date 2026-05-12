"use client"

import { successDefinitions, paradoxes, headline } from "@/lib/analysis"
import { SectionHeader } from "./section-header"
import { Reveal, Stagger, staggerItem } from "./reveal"
import { motion } from "motion/react"

export function SuccessMeaning() {
  const max = Math.max(...successDefinitions.map((d) => d.count))

  return (
    <section id="success" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="04"
          kicker="Định nghĩa thành công"
          title="Thước đo nào"
          italic="thật sự dùng để đo cuộc đời?"
          description={
            <>
              Cha mẹ đo bằng tiền, xã hội đo bằng địa vị, mạng xã hội đo bằng lượt thích. Nhưng khi
              được hỏi riêng, một mình, sinh viên chọn một câu trả lời khác hẳn.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-7 glass rounded-2xl p-8 md:p-12">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              "Nếu phải chọn một điều, đối với bạn 'thành công' nghĩa là…"
            </h3>

            <Stagger className="flex flex-col gap-5">
              {successDefinitions.map((d, i) => (
                <motion.div
                  key={d.label}
                  variants={staggerItem}
                  className="group"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="text-base md:text-lg font-medium text-balance leading-snug max-w-md">
                      {d.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
                      {d.count}/{headline.total} · {d.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.count / max) * 100}%` }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-foreground/60"}`}
                    />
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </Reveal>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal delay={0.2} className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 size-56 rounded-full bg-primary/10 blur-3xl" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80 mb-4 block relative">
                Nghịch lý
              </span>
              <p className="text-2xl md:text-3xl font-medium leading-tight text-balance relative">
                <span className="text-foreground">
                  {paradoxes.pressureButNonMaterialSuccess}/{headline.total}
                </span>{" "}
                bạn{" "}
                <span className="font-serif-italic text-primary">bị áp lực cao</span>{" "}
                — nhưng định nghĩa thành công của họ là{" "}
                <span className="font-serif-italic text-primary">bình an</span> hoặc{" "}
                <span className="font-serif-italic text-primary">gia đình</span>, không phải tiền.
              </p>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed text-pretty relative">
                Họ đang chạy theo một thước đo mà chính họ không tin. Đây là định nghĩa lâm sàng của
                khủng hoảng ý nghĩa: sống cho điều mình không muốn, vì sợ làm thất vọng người khác.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="glass rounded-2xl p-8 md:p-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                Nghịch lý 2
              </span>
              <p className="text-xl md:text-2xl font-medium leading-snug text-balance">
                <span className="text-primary">{paradoxes.chaseMoneyAndEmpty}</span> bạn chọn
                "độc lập tài chính" làm thành công — nhưng vẫn cảm thấy{" "}
                <span className="font-serif-italic">trống rỗng</span>.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed text-pretty">
                Tiền không lấp được khoảng trống. Họ chưa nhận ra điều đó, nhưng dữ liệu thì có.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
