"use client"

import { useEffect, useState } from "react"
import { parseExcelFile } from "../hooks/use-preset"
import { PresetsView } from "../views/presets.view"
import type { PresetsProps } from "../types/presets.types"
import type { Subject } from "../types/subjectRow.types"

export default function Presets({ onDone }: PresetsProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [parsedSubjects, setParsedSubjects] = useState<Subject[]>([])
  const [hasGrades, setHasGrades] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showGradeDialog, setShowGradeDialog] = useState(false)

  /* -----------------------------
     Parse file when it changes
  ------------------------------ */
  useEffect(() => {
    if (!selectedFile) return

    let cancelled = false

    const run = async () => {
      setError(null)
      setParsedSubjects([])
      setHasGrades(false)

      const result = await parseExcelFile(selectedFile)

      if (cancelled) return

      if (result.error) {
        setError(result.error)
        return
      }

      setParsedSubjects(result.subjects)
      setHasGrades(result.hasGrades)
    }

    run()

    return () => {
      cancelled = true
    }
  }, [selectedFile])

  /* -----------------------------
     Reset when dialog closes
  ------------------------------ */
  useEffect(() => {
    if (!open) {
      setSelectedFile(null)
      setParsedSubjects([])
      setHasGrades(false)
      setError(null)
      setShowGradeDialog(false)
    }
  }, [open])

  const handleAdd = () => {
    if (!parsedSubjects.length) return

    if (hasGrades) {
      setShowGradeDialog(true)
      return
    }

    onDone({
      parsedSubjects,
      mode: "preset",
      hasGrades: false,
    })

    setOpen(false)
  }

  const handleUseAsPreset = () => {
    onDone({
      parsedSubjects,
      mode: "preset",
      hasGrades,
    })

    setShowGradeDialog(false)
    setOpen(false)
  }

  const handleApplyDirectly = () => {
    onDone({
      parsedSubjects,
      mode: "apply",
      hasGrades,
    })

    setShowGradeDialog(false)
    setOpen(false)
  }

  return (
    <PresetsView
      open={open}
      setOpen={setOpen}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      parsedCount={parsedSubjects.length}
      hasGrades={hasGrades}
      error={error}
      showGradeDialog={showGradeDialog}
      setShowGradeDialog={setShowGradeDialog}
      onAdd={handleAdd}
      onApplyDirectly={handleApplyDirectly}
      onUseAsPreset={handleUseAsPreset}
    />
  )
}
