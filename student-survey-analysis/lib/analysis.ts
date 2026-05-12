import { responses, type Response } from "./survey-data"

// ---------- helpers ----------
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
const pct = (n: number, total = responses.length) => Math.round((n / total) * 1000) / 10

function pearson(xs: number[], ys: number[]) {
  const n = xs.length
  const mx = mean(xs)
  const my = mean(ys)
  let num = 0,
    dx = 0,
    dy = 0
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my)
    dx += (xs[i] - mx) ** 2
    dy += (ys[i] - my) ** 2
  }
  return num / Math.sqrt(dx * dy)
}

function countBy<T extends string>(items: T[]): Record<T, number> {
  return items.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    },
    {} as Record<T, number>,
  )
}

// ---------- demographics ----------
export const demographics = {
  total: responses.length,
  byYear: countBy(responses.map((r) => r.year)),
  byGender: countBy(responses.map((r) => r.gender)),
  bySchool: countBy(responses.map((r) => r.school)),
  byReligion: countBy(responses.map((r) => r.religion)),
}

// ---------- pressure & emptiness ----------
const B1 = responses.map((r) => r.B1_pressure)
const B2 = responses.map((r) => r.B2_emptiness)
const B3 = responses.map((r) => r.B3_needBigger)
const B5 = responses.map((r) => r.B5_priority)
const B7 = responses.map((r) => r.B7_beliefPct)
const B9 = responses.map((r) => r.B9_openness)

export const scales = {
  pressure: { mean: mean(B1), highPct: pct(B1.filter((v) => v >= 4).length), distribution: distFor(B1, 5) },
  emptiness: { mean: mean(B2), highPct: pct(B2.filter((v) => v >= 4).length), distribution: distFor(B2, 5) },
  needBigger: {
    mean: mean(B3),
    highPct: pct(B3.filter((v) => v >= 4).length),
    distribution: distFor(B3, 5),
  },
  priority: {
    mean: mean(B5),
    distribution: distFor(B5, 10),
  },
  belief: {
    mean: mean(B7),
    pctScore: Math.round(mean(B7) * 10),
    highPct: pct(B7.filter((v) => v >= 7).length),
    lowPct: pct(B7.filter((v) => v <= 2).length),
    midPct: pct(B7.filter((v) => v > 2 && v < 7).length),
    distribution: distFor(B7, 10, 0),
  },
  openness: {
    mean: mean(B9),
    openPct: pct(B9.filter((v) => v >= 4).length),
    closedPct: pct(B9.filter((v) => v <= 2).length),
    distribution: distFor(B9, 5),
  },
}

function distFor(values: number[], max: number, min = 1) {
  const out: { value: number; count: number; pct: number }[] = []
  for (let v = min; v <= max; v++) {
    const c = values.filter((x) => x === v).length
    out.push({ value: v, count: c, pct: Math.round((c / values.length) * 1000) / 10 })
  }
  return out
}

// ---------- B4 success definition ----------
export const successDefinitions = Object.entries(countBy(responses.map((r) => r.B4_success)))
  .map(([label, count]) => ({ label, count, pct: pct(count) }))
  .sort((a, b) => b.count - a.count)

// ---------- B6 view of God ----------
export const godViews = Object.entries(
  countBy(
    responses.map((r) => {
      // normalize "không quan tâm" duplicates
      if (r.B6_view.toLowerCase().includes("không quan tâm")) return "Tôi không quan tâm đến chủ đề này"
      return r.B6_view
    }),
  ),
)
  .map(([label, count]) => ({ label, count, pct: pct(count) }))
  .sort((a, b) => b.count - a.count)

// ---------- B8 barriers ----------
export const barriers = Object.entries(
  countBy(
    responses.map((r) => {
      if (r.B8_barrier.toLowerCase().includes("không quan tâm")) return "Không quan tâm / né tránh"
      return r.B8_barrier
    }),
  ),
)
  .map(([label, count]) => ({ label, count, pct: pct(count) }))
  .sort((a, b) => b.count - a.count)

// ---------- B10 questions ranking ----------
const allQuestions = responses.flatMap((r) => r.B10_questions)
export const questionRanking = Object.entries(countBy(allQuestions))
  .map(([label, count]) => ({ label, count, pct: pct(count) }))
  .sort((a, b) => b.count - a.count)

export const peopleWithNoQuestions = responses.filter((r) =>
  r.B10_questions.some((q) => q.toLowerCase().includes("không có câu hỏi")),
).length

// ---------- correlations ----------
export const correlations = {
  pressure_emptiness: pearson(B1, B2),
  emptiness_needBigger: pearson(B2, B3),
  pressure_needBigger: pearson(B1, B3),
  belief_openness: pearson(B7, B9),
  priority_openness: pearson(B5, B9),
  emptiness_belief: pearson(B2, B7),
  pressure_belief: pearson(B1, B7),
  needBigger_priority: pearson(B3, B5),
}

export const correlationMatrix: { x: string; y: string; r: number }[] = [
  { x: "Áp lực", y: "Trống rỗng", r: correlations.pressure_emptiness },
  { x: "Áp lực", y: "Cần điều lớn hơn", r: correlations.pressure_needBigger },
  { x: "Áp lực", y: "Tin có Chúa", r: correlations.pressure_belief },
  { x: "Trống rỗng", y: "Cần điều lớn hơn", r: correlations.emptiness_needBigger },
  { x: "Trống rỗng", y: "Tin có Chúa", r: correlations.emptiness_belief },
  { x: "Cần điều lớn hơn", y: "Ưu tiên tìm hiểu", r: correlations.needBigger_priority },
  { x: "Tin có Chúa", y: "Sẵn sàng lắng nghe", r: correlations.belief_openness },
  { x: "Ưu tiên tìm hiểu", y: "Sẵn sàng lắng nghe", r: correlations.priority_openness },
]

// ---------- segmentation: by year ----------
export function segmentByYear() {
  const groups = ["Năm 1", "Năm 2", "Năm 3", "Năm 4"] as const
  return groups.map((y) => {
    const grp = responses.filter((r) => r.year === y)
    if (grp.length === 0) return { year: y, n: 0, pressure: 0, emptiness: 0, belief: 0, openness: 0 }
    return {
      year: y,
      n: grp.length,
      pressure: round(mean(grp.map((r) => r.B1_pressure))),
      emptiness: round(mean(grp.map((r) => r.B2_emptiness))),
      belief: round(mean(grp.map((r) => r.B7_beliefPct))),
      openness: round(mean(grp.map((r) => r.B9_openness))),
    }
  })
}

export function segmentByGender() {
  return (["Nam", "Nữ"] as const).map((g) => {
    const grp = responses.filter((r) => r.gender === g)
    return {
      gender: g,
      n: grp.length,
      pressure: round(mean(grp.map((r) => r.B1_pressure))),
      emptiness: round(mean(grp.map((r) => r.B2_emptiness))),
      needBigger: round(mean(grp.map((r) => r.B3_needBigger))),
      belief: round(mean(grp.map((r) => r.B7_beliefPct))),
      openness: round(mean(grp.map((r) => r.B9_openness))),
    }
  })
}

// segmentation by belief group
export function segmentByBelief() {
  type Bucket = { label: string; filter: (r: Response) => boolean }
  const buckets: Bucket[] = [
    { label: "Vô thần / không tin", filter: (r) => r.B7_beliefPct <= 2 },
    { label: "Hoài nghi / lưng chừng", filter: (r) => r.B7_beliefPct > 2 && r.B7_beliefPct < 7 },
    { label: "Tin / nghiêng về tin", filter: (r) => r.B7_beliefPct >= 7 },
  ]
  return buckets.map((b) => {
    const grp = responses.filter(b.filter)
    return {
      label: b.label,
      n: grp.length,
      pct: pct(grp.length),
      pressure: round(mean(grp.map((r) => r.B1_pressure))),
      emptiness: round(mean(grp.map((r) => r.B2_emptiness))),
      needBigger: round(mean(grp.map((r) => r.B3_needBigger))),
      openness: round(mean(grp.map((r) => r.B9_openness))),
    }
  })
}

// pressure cluster vs need for meaning
export function pressureClusters() {
  type Bucket = { label: string; filter: (r: Response) => boolean }
  const buckets: Bucket[] = [
    { label: "Áp lực thấp (1–2)", filter: (r) => r.B1_pressure <= 2 },
    { label: "Áp lực trung bình (3)", filter: (r) => r.B1_pressure === 3 },
    { label: "Áp lực cao (4–5)", filter: (r) => r.B1_pressure >= 4 },
  ]
  return buckets.map((b) => {
    const grp = responses.filter(b.filter)
    return {
      label: b.label,
      n: grp.length,
      emptiness: round(mean(grp.map((r) => r.B2_emptiness))),
      needBigger: round(mean(grp.map((r) => r.B3_needBigger))),
      belief: round(mean(grp.map((r) => r.B7_beliefPct))),
    }
  })
}

function round(x: number) {
  return Math.round(x * 100) / 100
}

// ---------- paradoxes ----------
export const paradoxes = {
  // people who feel high pressure (>=4) AND feel emptiness (>=4)
  pressuredAndEmpty: responses.filter((r) => r.B1_pressure >= 4 && r.B2_emptiness >= 4).length,
  // chase financial success but feel emptiness
  chaseMoneyAndEmpty: responses.filter(
    (r) =>
      r.B4_success.toLowerCase().includes("độc lập tài chính") && r.B2_emptiness >= 4,
  ).length,
  // not interested but still has unanswered questions
  notInterestedButQuestioning: responses.filter(
    (r) =>
      r.B6_view.toLowerCase().includes("không quan tâm") &&
      !r.B10_questions.some((q) => q.toLowerCase().includes("không có câu hỏi")),
  ).length,
  // feel pressure but define success as inner peace or family (not money)
  pressureButNonMaterialSuccess: responses.filter(
    (r) =>
      r.B1_pressure >= 4 &&
      (r.B4_success.toLowerCase().includes("bình an") ||
        r.B4_success.toLowerCase().includes("gia đình") ||
        r.B4_success.toLowerCase().includes("ý nghĩa")),
  ).length,
  // need bigger thing but low openness
  needBiggerButClosed: responses.filter((r) => r.B3_needBigger >= 4 && r.B9_openness <= 2).length,
  // open to listen but currently doesn't believe much
  openButDontBelieve: responses.filter((r) => r.B9_openness >= 4 && r.B7_beliefPct <= 3).length,
}

// ---------- final formatted big numbers for hero / KPIs ----------
export const headline = {
  total: responses.length,
  pressureMean: round(scales.pressure.mean),
  pressureHighPct: scales.pressure.highPct,
  emptinessHighPct: scales.emptiness.highPct,
  needBiggerPct: scales.needBigger.highPct,
  notInterestedPct: pct(godViews.find((g) => g.label.includes("không quan tâm"))?.count ?? 0),
  searchingPct: pct(
    (godViews.find((g) => g.label.includes("đang tìm hiểu"))?.count ?? 0) +
      (godViews.find((g) => g.label.includes("Đấng Tạo Hóa"))?.count ?? 0) +
      (godViews.find((g) => g.label.includes("bất khả tri"))?.count ?? 0),
  ),
  beliefAvgPct: Math.round(scales.belief.mean * 10),
  openMean: round(scales.openness.mean),
  neverExploredPct: pct(barriers.find((b) => b.label.includes("Chưa bao giờ"))?.count ?? 0),
}
