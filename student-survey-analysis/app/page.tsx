import { Nav } from "@/components/report/nav"
import { Hero } from "@/components/report/hero"
import { ExecSummary } from "@/components/report/exec-summary"
import { Demographics } from "@/components/report/demographics"
import { PressureEmptiness } from "@/components/report/pressure-emptiness"
import { SuccessMeaning } from "@/components/report/success-meaning"
import { BeliefSpectrum } from "@/components/report/belief-spectrum"
import { QuestionsRanking } from "@/components/report/questions-ranking"
import { CorrelationMatrix } from "@/components/report/correlation-matrix"
import { Paradoxes } from "@/components/report/paradoxes"
import { Voices } from "@/components/report/voices"
import { Closing } from "@/components/report/closing"

export default function Page() {
  return (
    <main className="relative">
      <div className="grain" aria-hidden />
      <Nav />
      <Hero />
      <ExecSummary />
      <Demographics />
      <PressureEmptiness />
      <SuccessMeaning />
      <BeliefSpectrum />
      <QuestionsRanking />
      <CorrelationMatrix />
      <Paradoxes />
      <Voices />
      <Closing />
    </main>
  )
}
