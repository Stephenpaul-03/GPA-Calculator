import type { Subject } from "./subjectRow.types"

export interface PresetsResult {
  parsedSubjects: Subject[]
  mode: "preset" | "apply"
  hasGrades: boolean
}

export interface PresetsProps {
  onDone: (result: PresetsResult) => void
}

export type Props = {
  open: boolean
  setOpen: (v: boolean) => void

  selectedFile: File | null
  setSelectedFile: (f: File | null) => void

  parsedCount: number
  hasGrades: boolean
  error: string | null

  showGradeDialog: boolean
  setShowGradeDialog: (v: boolean) => void

  onAdd: () => void
  onApplyDirectly: () => void
  onUseAsPreset: () => void
}
