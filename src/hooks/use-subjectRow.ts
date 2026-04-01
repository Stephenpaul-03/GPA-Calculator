import type { Subject } from "../types/subjectRow.types"

export function hasRowContent(subject: Subject): boolean {
  return (
    !!subject.code.trim() ||
    !!subject.name.trim() ||
    !!subject.credits.trim() ||
    !!subject.grade ||
    !!subject.semester
  )
}
