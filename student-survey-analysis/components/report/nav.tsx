"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "hero", label: "Mở đầu" },
  { id: "summary", label: "Tóm tắt" },
  { id: "demographics", label: "Mẫu" },
  { id: "pressure", label: "Áp lực" },
  { id: "success", label: "Thành công" },
  { id: "belief", label: "Niềm tin" },
  { id: "questions", label: "Câu hỏi" },
  { id: "correlation", label: "Tương quan" },
  { id: "paradox", label: "Nghịch lý" },
  { id: "voices", label: "Tiếng nói" },
  { id: "reflection", label: "Suy ngẫm" },
]

export function Nav() {
  const [active, setActive] = useState("hero")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // detect section in view
      let current = "hero"
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.4) current = s.id
        }
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <div
          className={`flex items-center gap-3 transition-all duration-500 ${
            scrolled ? "scale-95" : "scale-100"
          }`}
        >
          <div className="size-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Thế Hệ Đang Tìm
          </span>
        </div>

        <nav
          className={`hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1.5 transition-all duration-500 ${
            scrolled ? "opacity-100" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                active === s.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="font-mono text-xs text-muted-foreground tabular-nums">
          {String(sections.findIndex((s) => s.id === active) + 1).padStart(2, "0")} / {sections.length}
        </div>
      </div>
    </header>
  )
}
