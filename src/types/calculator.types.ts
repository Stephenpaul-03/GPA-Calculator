import type { Subject } from "./subjectRow.types"
import type { GPAResults } from "./gpa.types"

export interface CalculatorProps {
  subjects: Subject[]
  onSubjectsChange: (subjects: Subject[]) => void
  onResultsChange?: (results: GPAResults | null) => void
  uploadButton?: React.ReactNode
  presetMode?: boolean
  parsedSubjects?: Subject[]
  parsedHasGrades?: boolean
}

export type AlertAction = {
  label: string
  onClick: () => void
  variant?: "default" | "destructive"
}

export type AlertConfig = {
  kind?: "clear-all" | "generic"
  title: string
  description: string
  actions: AlertAction[]
}
