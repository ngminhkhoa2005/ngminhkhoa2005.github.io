import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
})

const serif = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Thế Hệ Đang Tìm — Báo cáo nghiên cứu về sinh viên, áp lực, ý nghĩa & niềm tin",
  description:
    "Một báo cáo dữ liệu tương tác sâu sắc về thế giới nội tâm của sinh viên Việt Nam — áp lực, trống rỗng, định nghĩa thành công, và những câu hỏi lớn về Chúa và ý nghĩa cuộc sống.",
  generator: "v0.app",
  themeColor: "#0b1a35",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`dark ${sans.variable} ${serif.variable} ${mono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
