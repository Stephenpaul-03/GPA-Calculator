import type { Subject } from "../types/subjectRow.types"

export function findMissingSemesters(selected: string[]) {
  if (!selected.length) return []

  const arr = selected.map(Number).sort((a, b) => a - b)
  const missing: number[] = []

  for (let n = arr[0]; n <= arr[arr.length - 1]; n++) {
    if (!arr.includes(n)) missing.push(n)
  }

  return missing
}

export function getAvailableSemesters(subjects: Subject[]) {
  const set = new Set<string>()
  subjects.forEach(s => s.semester && set.add(s.semester))
  return Array.from(set).sort((a, b) => Number(a) - Number(b))
}
