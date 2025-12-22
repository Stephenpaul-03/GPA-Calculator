import type { Subject } from "./subjectRow.types"

export interface PresetsResult {
  parsedSubjects: Subject[]
  mode: "preset" | "apply"
  hasGrades: boolean
}

export interface PresetsProps {
  onDone: (result: PresetsResult) => void
}
