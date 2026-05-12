"use client"

import { paradoxes, headline } from "@/lib/analysis"
import { SectionHeader } from "./section-header"
import { Reveal, Stagger, staggerItem } from "./reveal"
import { motion } from "motion/react"

export function Paradoxes() {
  const items = [
    {
      n: `${paradoxes.pressuredAndEmpty}/${headline.total}`,
      head: "Áp lực cao",
      tail: "Trống rỗng cao",
      title: "Chạy nhanh hơn — nhưng thấy mất phương hướng hơn",
      body: "Không phải càng cố gắng càng thỏa mãn. Trong dữ liệu, càng bị kỳ vọng đè nặng, các bạn càng trải nghiệm trống rỗng. Đây là tâm lý 'striving without arriving'.",
    },
    {
      n: `${paradoxes.chaseMoneyAndEmpty}/${headline.total}`,
      head: "Chọn tiền là thành công",
      tail: "Vẫn cảm thấy trống",
      title: "Tiền không lấp được hố ý nghĩa",
      body: "Những người tự định nghĩa thành công bằng độc lập tài chính vẫn nằm trong nhóm cảm thấy trống rỗng cao. Đây không phải tham lam — đây là cảnh báo rằng mục tiêu này không đủ.",
    },
    {
      n: `${paradoxes.notInterestedButQuestioning}/${headline.total}`,
      head: '"Tôi không quan tâm"',
      tail: "Nhưng vẫn còn câu hỏi",
      title: "Bề ngoài thờ ơ, bên trong vẫn hỏi",
      body: "Có những bạn chọn 'không quan tâm' về Chúa — nhưng khi được mời chọn câu hỏi chưa được trả lời, họ vẫn chọn về cái chết, đau khổ, ý nghĩa. Sự thờ ơ là một lớp áo, không phải sự thật.",
    },
    {
      n: `${paradoxes.openButDontBelieve}/${headline.total}`,
      head: "Chưa tin",
      tail: "Nhưng sẵn sàng lắng nghe",
      title: "Cánh cửa vẫn mở",
      body: "Ngay cả những bạn có mức tin rất thấp vẫn cho điểm cao về 'sẵn sàng lắng nghe nếu có lập luận hợp lý và trung thực'. Họ không đóng — họ đang đợi một cuộc trò chuyện không mang tính giáo điều.",
    },
    {
      n: `${paradoxes.pressureButNonMaterialSuccess}/${headline.total}`,
      head: "Bị áp lực cao",
      tail: "Định nghĩa thành công lại là bình an / gia đình",
      title: "Sống cho điều mình không muốn",
      body: "Có một khoảng cách lớn giữa điều xã hội đòi hỏi và điều sinh viên thật sự khao khát. Bi kịch thầm lặng: dành tuổi 20 cho mục tiêu mà chính họ không tin là quan trọng nhất.",
    },
    {
      n: `${paradoxes.needBiggerButClosed}/${headline.total}`,
      head: '"Cần điều lớn hơn thành tích"',
      tail: "Nhưng vẫn khép kín",
      title: "Khao khát, nhưng phòng vệ",
      body: "Họ thừa nhận cần điều gì đó lớn hơn — nhưng cùng lúc lại đóng cửa với những lập luận có thể đem đến câu trả lời. Đây là dấu hiệu của tổn thương cũ: từng tin, từng thất vọng, giờ thận trọng.",
    },
  ]

  return (
    <section id="paradox" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="08"
          kicker="Nghịch lý nội tâm"
          title="Sáu mâu thuẫn"
          italic="họ đang sống chung."
          description="Mỗi sinh viên không phải một người — họ là một mâu thuẫn đang đi lại. Đây là những nghịch lý hiện rõ nhất trong dữ liệu."
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              className="group relative glass rounded-2xl p-8 md:p-10 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Nghịch lý {String(i + 1).padStart(2, "0")}
              </span>

              <div className="mt-6 flex items-baseline gap-4">
                <span className="text-4xl md:text-5xl font-medium text-display tabular-nums text-primary">
                  {item.n}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-xs font-medium">
                  {item.head}
                </span>
                <span className="text-muted-foreground text-xs">↔</span>
                <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-medium text-primary">
                  {item.tail}
                </span>
              </div>

              <h3 className="mt-6 text-xl md:text-2xl font-medium text-balance leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-pretty">
                {item.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
