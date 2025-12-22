import type { GPAResults, ResultRow } from "./gpa.types"

export interface ResultProps {
  results: GPAResults
}

export interface ResultComputed {
  semesterTabs: string[]
  rows: ResultRow[]
  totalCredits: number
  totalScore: number
  semesterGPA: string
  cgpaTill: string
}
