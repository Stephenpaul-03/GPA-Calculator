"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { calculateGPA } from "@/hooks/use-gpa"
import type { Subject } from "@/types/subjectRow.types"
import type { GPAResults } from "@/types/gpa.types"
import { CalculatorView } from "../views/calculator.view"
import { findMissingSemesters, getAvailableSemesters } from "../hooks/use-calculator"
import type { CalculatorProps, AlertConfig } from "../types/calculator.types"

export default function Calculator({
  subjects,
  onSubjectsChange,
  onResultsChange,
  uploadButton,
  presetMode = false,
  parsedSubjects = []
}: CalculatorProps) {
  const [_, setResults] = useState<GPAResults | null>(null)
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null)
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([])
  const [showHowToUse, setShowHowToUse] = useState(false)
  const [showCalculationSteps, setShowCalculationSteps] = useState(false)

  const availableSemesters = useMemo(
    () => getAvailableSemesters(parsedSubjects),
    [parsedSubjects]
  )

  const onAdd = () => {
    onSubjectsChange([
      ...subjects,
      { number: subjects.length + 1, code: "", semester: "", name: "", credits: "", grade: "" }
    ])
    toast("Subject Row Added.")
  }

  const onDelete = (index: number) =>
    onSubjectsChange(subjects.filter((_, i) => i !== index))

  const onUpdate = (index: number, field: keyof Subject, value: string) =>
    onSubjectsChange(
      subjects.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    )

  const onCalculate = () => {
    const { results, error } = calculateGPA(subjects)
    if (error) {
      setAlertConfig({
        title: "Error",
        description: error.message,
        actions: [{ label: "OK", onClick: () => setAlertConfig(null) }]
      })
      return
    }

    setResults(results!)
    onResultsChange?.(results!)
  }

  const onClear = () => {
    onSubjectsChange(
      Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        code: "",
        semester: "",
        name: "",
        credits: "",
        grade: ""
      }))
    )
    setResults(null)
    onResultsChange?.(null)
    toast("Subjects Cleared")
  }

  const onApplySemesters = () => {
    if (!selectedSemesters.length) {
      toast("Select at least one semester to apply.")
      return
    }

    const missing = findMissingSemesters(selectedSemesters)
    if (missing.length) {
      toast.warning(`Missing semesters: ${missing.join(", ")}`)
    }

    const toApply = parsedSubjects.filter(s =>
      selectedSemesters.includes(s.semester)
    )

    if (!toApply.length) {
      toast("No rows found for selected semesters.")
      return
    }

    onSubjectsChange(toApply)
    toast("Semester data applied.")
    setSelectedSemesters([])
  }

  return (
    <CalculatorView
      subjects={subjects}
      uploadButton={uploadButton}
      presetMode={presetMode}
      availableSemesters={availableSemesters}
      selectedSemesters={selectedSemesters}
      setSelectedSemesters={setSelectedSemesters}
      onAdd={onAdd}
      onDelete={onDelete}
      onUpdate={onUpdate}
      onCalculate={onCalculate}
      onClear={onClear}
      onApplySemesters={onApplySemesters}
      alertConfig={alertConfig}
      setAlertConfig={setAlertConfig}
      showHowToUse={showHowToUse}
      setShowHowToUse={setShowHowToUse}
      showCalculationSteps={showCalculationSteps}
      setShowCalculationSteps={setShowCalculationSteps}
      parsedSubjects={parsedSubjects}
    />
  )
}
