"use client"

import { useState } from "react"
import Presets from "./presets.container"
import type { GPAResults } from "@/types/gpa.types"
import type { Subject } from "@/types/subjectRow.types"
import { DashboardView } from "../views/dashboard.view"

export default function DashboardContainer() {
  const [subjects, setSubjects] = useState<Subject[]>(
    Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      code: "",
      semester: "",
      name: "",
      credits: "",
      grade: "",
    }))
  )

  const [results, setResults] = useState<GPAResults | null>(null)
  const [open, setOpen] = useState(false)
  const [parsedSubjects, setParsedSubjects] = useState<Subject[]>([])
  const [presetMode, setPresetMode] = useState(false)
  const [parsedHasGrades, setParsedHasGrades] = useState(false)

  const handlePresetsDone = (result: {
    parsedSubjects: Subject[]
    mode: "preset" | "apply"
    hasGrades: boolean
  }) => {
    const { parsedSubjects: data, mode, hasGrades } = result

    if (mode === "apply") {
      setSubjects(
        data.map((s, i) => ({
          ...s,
          number: i + 1,
        }))
      )
      setParsedSubjects([])
      setPresetMode(false)
      setParsedHasGrades(false)
    } else {
      setParsedSubjects(data)
      setPresetMode(true)
      setParsedHasGrades(hasGrades)
    }
  }

  return (
    <DashboardView
      subjects={subjects}
      setSubjects={setSubjects}
      results={results}
      setResults={setResults}
      open={open}
      setOpen={setOpen}
      parsedSubjects={parsedSubjects}
      presetMode={presetMode}
      parsedHasGrades={parsedHasGrades}
      uploadButton={<Presets onDone={handlePresetsDone} />}
    />
  )
}
