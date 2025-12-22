import type { GPAResults, ResultRow } from "@/types/gpa.types"
import type { ResultComputed } from "../types/results.types"

export function computeResultData(
  results: GPAResults,
  activeTab: string
): ResultComputed {
  const semesterTabs = [
    "all",
    ...results.semesterResults.map((s) => s.semester),
  ]

  const rows: ResultRow[] =
    activeTab === "all"
      ? results.rows
      : results.semesterResults.find((s) => s.semester === activeTab)?.rows || []

  const totalCredits = rows.reduce((sum, r) => sum + r.credits, 0)
  const totalScore = rows.reduce((sum, r) => sum + r.score, 0)

  const semesterGPA =
    activeTab === "all"
      ? results.gpa
      : results.semesterResults.find((s) => s.semester === activeTab)?.gpa || "-"

  let cgpaTill = results.gpa
  if (activeTab !== "all") {
    const semIndex = results.semesterResults.findIndex(
      (s) => s.semester === activeTab
    )
    if (semIndex >= 0) {
      const semTill = results.semesterResults.slice(0, semIndex + 1)
      const credits = semTill.reduce((a, s) => a + s.totalCredits, 0)
      const score = semTill.reduce((a, s) => a + s.totalScore, 0)
      cgpaTill = credits > 0 ? (score / credits).toFixed(3) : "-"
    }
  }

  return {
    semesterTabs,
    rows,
    totalCredits,
    totalScore,
    semesterGPA,
    cgpaTill,
  }
}
