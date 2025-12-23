import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import type { Subject } from "@/types/subjectRow.types"
import type { GPAResults } from "@/types/gpa.types"

import { DashboardHeader } from "../components/dashboard/dashboard.header"
import { DashboardMain } from "../components/dashboard/dashboard.main"
import { DashboardResultsDialog } from "../components/dashboard/results.dialog"
import { MadeByCard } from "@/components/dashboard/made-by.card"

type Props = {
  subjects: Subject[]
  setSubjects: (s: Subject[]) => void

  results: GPAResults | null
  setResults: (r: GPAResults | null) => void

  open: boolean
  setOpen: (v: boolean) => void

  parsedSubjects: Subject[]
  presetMode: boolean
  parsedHasGrades: boolean

  uploadButton: React.ReactNode
}

export function DashboardView(props: Props) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        <DashboardHeader />

        <DashboardMain
          subjects={props.subjects}
          setSubjects={props.setSubjects}
          setResults={props.setResults}
          setOpen={props.setOpen}
          uploadButton={props.uploadButton}
          presetMode={props.presetMode}
          parsedSubjects={props.parsedSubjects}
          parsedHasGrades={props.parsedHasGrades}
        />

        <DashboardResultsDialog
          results={props.results}
          open={props.open}
          setOpen={props.setOpen}
        />
        <MadeByCard/>
      </div>

      <Toaster />
    </ThemeProvider>
  )
}
