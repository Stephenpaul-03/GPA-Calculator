import Calculator from "@/containers/calculator.container"
import type { Subject } from "@/types/subjectRow.types"
import type { GPAResults } from "@/types/gpa.types"

type Props = {
  subjects: Subject[]
  setSubjects: (s: Subject[]) => void
  setResults: (r: GPAResults | null) => void
  setOpen: (v: boolean) => void

  parsedSubjects: Subject[]
  presetMode: boolean
  parsedHasGrades: boolean
  uploadButton: React.ReactNode
}

export function DashboardMain({
  subjects,
  setSubjects,
  setResults,
  setOpen,
  parsedSubjects,
  presetMode,
  parsedHasGrades,
  uploadButton,
}: Props) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 md:px-6">
      <div className="w-full md:max-w-4xl">
        <Calculator
          subjects={subjects}
          onSubjectsChange={setSubjects}
          onResultsChange={(res) => {
            setResults(res)
            setOpen(true)
          }}
          uploadButton={uploadButton}
          presetMode={presetMode}
          parsedSubjects={parsedSubjects}
          parsedHasGrades={parsedHasGrades}
        />
      </div>
    </div>
  )
}
