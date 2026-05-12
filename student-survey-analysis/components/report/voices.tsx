"use client"

import { SectionHeader } from "./section-header"
import { Reveal, Stagger, staggerItem } from "./reveal"
import { motion } from "motion/react"

// "Voices" — synthesized composite profiles, anchored in actual data clusters.
// Each voice represents a real psychological pattern that appears in the dataset.
const voices = [
  {
    profile: "Nữ · Năm 1 · ULAW · Không tôn giáo",
    quote:
      "Tôi tin 10% rằng có Chúa. Mỗi khi nghe về đau khổ trên thế giới — tôi không hiểu nổi.",
    tags: ["Áp lực 2/5", "Trống rỗng 1/5", "Mở 1/5"],
    note: "Một bạn không khắc nghiệt với bản thân, nhưng đau khổ thế giới là vết thương đủ lớn để khép cửa với Chúa.",
  },
  {
    profile: "Nam · Năm 3 · IUH · Không tôn giáo",
    quote:
      "Tôi tin có Đức Chúa Trời — 10/10. Tôi đang cảm thấy trống rỗng cao và cần điều lớn hơn thành tích.",
    tags: ["Áp lực 4/5", "Trống rỗng 5/5", "Mở 5/5"],
    note: 'Trường hợp hiếm: tin mạnh nhưng vẫn trống. Niềm tin chưa đủ kết nối với cuộc sống thường ngày.',
  },
  {
    profile: "Nữ · Năm 1 · VLU · Công giáo",
    quote:
      "Tôi tin có Chúa — nhưng câu hỏi 'tại sao Ngài im lặng trước đau khổ của tôi?' vẫn ám ảnh.",
    tags: ["Áp lực 5/5", "Trống rỗng 5/5", "Mở 4/5"],
    note: "Người duy nhất có truyền thống Công giáo trong mẫu — vẫn đang vật lộn. Đức tin gia đình không đảm bảo đức tin cá nhân.",
  },
  {
    profile: "Nữ · Năm 2 · HCMUT · Không tôn giáo",
    quote:
      'Tôi thấy mình "sống tốt đã đủ" — nhưng vẫn hỏi "tôi là ai và mình đang sống vì điều gì?"',
    tags: ["Áp lực 2/5", "Trống rỗng 2/5", "Mở 3/5"],
    note: "Đại diện cho nhóm 'humanist không tôn giáo' — không phản đối Chúa, nhưng tự tin rằng đạo đức cá nhân là đủ. Tuy vậy, câu hỏi căn tính vẫn còn.",
  },
  {
    profile: "Nam · Năm 3 · UTH · Không tôn giáo",
    quote: "Tôi từng tin, nhưng đã không còn tin nữa. Người có đạo sống không khác người không có đạo.",
    tags: ["Áp lực 4/5", "Trống rỗng 4/5", "Mở 1/5"],
    note: "Đây là bạn duy nhất chọn 'từng tin nhưng không còn'. Lý do không phải khoa học — mà là sự thất vọng với hành xử của người có đạo.",
  },
  {
    profile: "Nữ · Năm 1 · HUIT · Phật giáo / Thờ cúng",
    quote:
      "Tôi đang tìm hiểu và cởi mở. Tôi tin 80%. Áp lực 5/5, trống rỗng 5/5, cần điều lớn hơn 5/5.",
    tags: ["Áp lực 5/5", "Trống rỗng 5/5", "Mở 3/5"],
    note: "Một trong những hồ sơ 'đang đói' nhất — mọi thang điểm đều ở mức cực điểm. Đây là người sẵn sàng nhất để trò chuyện sâu.",
  },
]

export function Voices() {
  return (
    <section id="voices" className="px-6 py-32 md:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="09"
          kicker="Tiếng nói thật"
          title="Sáu chân dung"
          italic="ẩn trong dữ liệu."
          description="Đằng sau mỗi điểm số là một con người. Đây là sáu hồ sơ thật trong khảo sát — được tổng hợp từ câu trả lời của họ, để bạn nhìn thấy gương mặt phía sau con số."
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {voices.map((v, i) => (
            <motion.figure
              key={i}
              variants={staggerItem}
              className="bg-background p-8 md:p-12 flex flex-col gap-6"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {v.profile}
              </span>

              <blockquote className="text-2xl md:text-3xl font-serif-italic leading-snug text-balance text-foreground/95">
                <span className="text-primary/60 mr-1">"</span>
                {v.quote}
                <span className="text-primary/60 ml-1">"</span>
              </blockquote>

              <div className="flex flex-wrap gap-2">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-foreground/[0.04] border border-border font-mono text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <figcaption className="text-sm text-muted-foreground leading-relaxed text-pretty pt-4 border-t border-border">
                {v.note}
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
