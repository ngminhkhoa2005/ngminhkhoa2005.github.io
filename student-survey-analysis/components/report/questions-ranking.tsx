"use client"

import { questionRanking, peopleWithNoQuestions, headline } from "@/lib/analysis"
import { SectionHeader } from "./section-header"
import { Reveal, Stagger, staggerItem } from "./reveal"
import { motion } from "motion/react"

export function QuestionsRanking() {
  const realQuestions = questionRanking.filter(
    (q) => !q.label.toLowerCase().includes("không có câu hỏi"),
  )
  const max = Math.max(...realQuestions.map((q) => q.count))

  return (
    <section id="questions" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="06"
          kicker="Câu hỏi chưa thỏa mãn"
          title="Những câu hỏi"
          italic="không ai dạy họ cách trả lời."
          description={
            <>
              Khi được mời chọn 4 chủ đề "chưa nhận được câu trả lời thỏa mãn", sinh viên không
              chọn những câu hỏi học thuật trừu tượng. Họ chọn những câu hỏi về{" "}
              <span className="text-foreground">cái chết, đau khổ, và bản thân</span>.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-8 glass rounded-2xl p-8 md:p-12">
            <Stagger className="flex flex-col gap-6">
              {realQuestions.map((q, i) => (
                <motion.div
                  key={q.label}
                  variants={staggerItem}
                  className="grid grid-cols-[auto_1fr_auto] gap-5 items-center group"
                >
                  <span className="font-mono text-xs text-muted-foreground tabular-nums w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-base md:text-lg font-medium leading-snug text-balance mb-2">
                      "{q.label}"
                    </p>
                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(q.count / max) * 100}%` }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{
                          duration: 1,
                          delay: 0.05 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-full ${i < 2 ? "bg-primary" : i < 5 ? "bg-foreground/70" : "bg-foreground/40"}`}
                      />
                    </div>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">
                    {q.count}
                  </span>
                </motion.div>
              ))}
            </Stagger>
          </Reveal>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <Reveal delay={0.1} className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-primary/10 blur-3xl" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80 block mb-4 relative">
                Top 2 câu hỏi
              </span>
              <p className="text-2xl md:text-3xl font-medium leading-tight text-balance relative">
                Không phải logic. Là{" "}
                <span className="font-serif-italic text-primary">trái tim</span>.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed relative">
                "Sau khi chết, chúng ta sẽ đi về đâu?" và "Tại sao có quá nhiều đau khổ?" — đây là
                hai câu hỏi cổ điển nhất của loài người. Sinh viên Việt Nam năm 2026 vẫn đang hỏi
                chúng, chỉ là âm thầm.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="glass rounded-2xl p-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-4">
                Sự im lặng
              </span>
              <p className="text-5xl font-medium text-display text-primary tabular-nums mb-3">
                {peopleWithNoQuestions}/{headline.total}
              </p>
              <p className="text-base font-medium leading-snug text-balance mb-3">
                bạn chọn "Tôi không có câu hỏi nào như vậy"
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                Trong nghiên cứu xã hội học, đây thường không phải dấu hiệu "đã có câu trả lời" —
                mà là dấu hiệu của <span className="text-foreground">né tránh hiện sinh</span>:
                quá bận, quá mệt, hoặc quá sợ để cho phép mình hỏi.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
