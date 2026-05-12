"use client"

import { SectionHeader } from "./section-header"
import { Stagger, staggerItem } from "./reveal"
import { motion } from "motion/react"
import { headline, paradoxes, correlations, questionRanking } from "@/lib/analysis"

export function ExecSummary() {
  const findings = [
    {
      n: "01",
      title: "Áp lực và trống rỗng đi cùng nhau",
      body: `${headline.pressureHighPct}% sinh viên cảm thấy áp lực cao bởi kỳ vọng của người khác, và ${headline.emptinessHighPct}% đã từng cảm thấy "trống rỗng không lý giải được". Hệ số tương quan giữa hai biến này đạt r = ${correlations.pressure_emptiness.toFixed(2)} — một mối liên hệ rõ rệt. Càng bị kỳ vọng đè nặng, các bạn càng cảm thấy hụt hơi với chính cuộc đời mình.`,
    },
    {
      n: "02",
      title: '"Cần điều lớn hơn thành tích để neo đỗ cuộc đời"',
      body: `${headline.needBiggerPct}% sinh viên đồng ý rằng họ cần một điều gì đó lớn hơn thành tích để bám víu. Sự "trống rỗng" càng lớn, nhu cầu này càng mạnh (r = ${correlations.emptiness_needBigger.toFixed(2)}). Đây là tiếng kêu của một thế hệ không còn tin rằng GPA, lương cao, hay danh tiếng là đủ.`,
    },
    {
      n: "03",
      title: "Định nghĩa thành công đã âm thầm chuyển dịch",
      body: `Chỉ 29% chọn "độc lập tài chính", trong khi 61% chọn "gia đình hạnh phúc" hoặc "bình an nội tâm". Sinh viên không nói ra điều này với cha mẹ, nhưng trong sâu thẳm, họ đang đo lường cuộc đời theo một thước khác.`,
    },
    {
      n: "04",
      title: "Phần lớn không từ chối Chúa — họ chưa từng tìm hiểu",
      body: `Rào cản số một (${headline.neverExploredPct}%) không phải khoa học, không phải đau khổ, mà là "chưa bao giờ thật sự tìm hiểu nên không rõ". Đây là một thế hệ đang ở trạng thái lưng chừng — không tin, không không-tin, chỉ đơn giản là chưa được hỏi đúng câu hỏi.`,
    },
    {
      n: "05",
      title: "Hai câu hỏi nhức nhối nhất",
      body: `Hai câu hỏi được nêu nhiều nhất là "${questionRanking[0].label}" và "${questionRanking[1].label}". Một là câu hỏi về cõi sau. Một là câu hỏi về đau khổ. Cả hai đều không phải câu hỏi logic — chúng là câu hỏi của trái tim.`,
    },
    {
      n: "06",
      title: "Tỉ lệ cởi mở vẫn cao bất ngờ",
      body: `Dù chỉ ${headline.beliefAvgPct}% là mức tin trung bình rằng có Đức Chúa Trời, vẫn có ${paradoxes.openButDontBelieve}/${headline.total} bạn nói sẵn sàng lắng nghe khi ai đó đưa ra lập luận hợp lý — dù bản thân chưa tin. Cánh cửa chưa khép. Họ đang đợi một cuộc trò chuyện chân thành.`,
    },
  ]

  return (
    <section id="summary" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          kicker="Executive Summary"
          title="Sáu phát hiện"
          italic="cốt lõi"
          description={
            <>
              Sáu insight quan trọng nhất rút ra từ {headline.total} sinh viên tại{" "}
              {Object.keys({}).length || 12}+ trường đại học. Đây không phải mô tả dữ liệu — đây là{" "}
              <span className="text-foreground">chân dung nội tâm</span> của một thế hệ.
            </>
          }
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {findings.map((f) => (
            <motion.div
              key={f.n}
              variants={staggerItem}
              className="bg-background p-8 md:p-12 flex flex-col gap-6 group hover:bg-card transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {f.n}
                </span>
                <span className="size-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium text-balance leading-tight">
                {f.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                {f.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
