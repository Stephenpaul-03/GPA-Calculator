import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner"
import { Mail, Github, Linkedin } from "lucide-react"
import Calculator from "@/containers/calculator.container"
import Result from "@/containers/results.container"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { ThemeProvider } from "@/components/theme/theme-provider"
import type { Subject } from "@/types/subjectRow.types"
import type { GPAResults } from "@/types/gpa.types"

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

export function DashboardView({
  subjects,
  setSubjects,
  results,
  setResults,
  open,
  setOpen,
  parsedSubjects,
  presetMode,
  parsedHasGrades,
  uploadButton,
}: Props) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <div className="absolute top-4 right-4">
          <Card className="flex flex-row w-fit h-fit m-2 items-center rounded-full p-1 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("mailto:stephenpaul4040@gmail.com", "_blank")
              }
              className="rounded-full text-red-400 hover:text-red-800"
            >
              <Mail className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://github.com/stephenpaul-03", "_blank")
              }
              className="rounded-full text-gray-400 hover:text-gray-800"
            >
              <Github className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open(
                  "https://linkedin.com/in/stephen-paul-i",
                  "_blank"
                )
              }
              className="rounded-full text-blue-400 hover:text-blue-800"
            >
              <Linkedin className="h-4 w-4" />
            </Button>

            <Separator
              orientation="vertical"
              className="h-6 bg-accent-foreground"
            />

            <ModeToggle />
          </Card>
        </div>

        {/* Main Section */}
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="min-w-4xl items-center flex justify-center">
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

        {/* Results Dialog */}
        {results && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl sm:max-w-4xl bg-background/95 backdrop-blur-2xl rounded-4xl">
              <Result results={results} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Toaster />
    </ThemeProvider>
  )
}
