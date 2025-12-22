import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plus,
  SquareEqual,
  CircleX,
  Wrench,
  Calculator as CalculatorIcon,
  Filter,
} from "lucide-react"
import SubjectRow from "@/containers/subjectRow.container"
import type { Subject } from "@/types/subjectRow.types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import type { AlertConfig } from "@/types/calculator.types"

type Props = {
  subjects: Subject[]
  uploadButton?: React.ReactNode
  presetMode: boolean
  parsedSubjects: Subject[]

  availableSemesters: string[]
  selectedSemesters: string[]
  setSelectedSemesters: (v: string[]) => void

  onAdd: () => void
  onDelete: (index: number) => void
  onUpdate: (index: number, field: keyof Subject, value: string) => void
  onCalculate: () => void
  onApplySemesters: () => void
  onClear: () => void
  alertConfig: AlertConfig | null
  setAlertConfig: (v: AlertConfig | null) => void

  showHowToUse: boolean
  setShowHowToUse: (v: boolean) => void
  showCalculationSteps: boolean
  setShowCalculationSteps: (v: boolean) => void
}

export function CalculatorView({
  subjects,
  uploadButton,
  presetMode,
  parsedSubjects,
  availableSemesters,
  selectedSemesters,
  setSelectedSemesters,
  onAdd,
  onDelete,
  onUpdate,
  onCalculate,
  onApplySemesters,
  onClear,
  alertConfig,
  setAlertConfig,
  showHowToUse,
  setShowHowToUse,
  showCalculationSteps,
  setShowCalculationSteps,
}: Props) {
  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row gap-3">
        <Card className="flex p-4 flex-col h-[60vh] items-center justify-center rounded-3xl flex-1">
          <div className="flex-1 overflow-y-scroll max-h-[60vh] w-full custom-scrollbar">
            {subjects.map((subj, idx) => (
              <SubjectRow
                key={idx}
                index={idx}
                subject={subj}
                updateSubject={onUpdate}
                deleteSubject={onDelete}
              />
            ))}
          </div>
        </Card>

        {/* Desktop Button Column */}
        <div className="flex flex-col justify-between">
          <Card className="flex flex-col justify-between items-center w-fit h-fit rounded-full p-0 py-1 m-0">
            <div className="flex flex-col relative px-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>{uploadButton}</div>
                </TooltipTrigger>
                <TooltipContent color="teal" arrowColor="teal" side="right">
                  Upload Excel
                </TooltipContent>
              </Tooltip>

              {(presetMode || parsedSubjects.length > 0) &&
                availableSemesters.length > 0 && (
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="rounded-full h-10 w-10 text-blue-400 hover:text-blue-800 transition-all"
                          >
                            <Filter className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent
                        color="blue"
                        arrowColor="blue"
                        side="right"
                      >
                        Select Semesters
                      </TooltipContent>
                    </Tooltip>

                    <DropdownMenuContent align="start" className="w-fit">
                      {availableSemesters.map((sem) => (
                        <DropdownMenuCheckboxItem
                          key={sem}
                          onSelect={(e) => e.preventDefault()}
                          checked={selectedSemesters.includes(sem)}
                          onCheckedChange={(checked) => {
                            setSelectedSemesters(
                              checked
                                ? [...selectedSemesters, sem]
                                : selectedSemesters.filter((s) => s !== sem)
                            )
                          }}
                        >
                          Semester {sem}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onApplySemesters}>
                        Apply
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={onAdd}
                    className="rounded-full h-10 w-10 text-yellow-400 hover:text-yellow-800 transition-all"
                  >
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent color="yellow" arrowColor="yellow" side="right">
                  Add Subject
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={onClear}
                    className="rounded-full h-10 w-10 text-red-400 hover:text-red-800 transition-all"
                  >
                    <CircleX className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent color="red" arrowColor="red" side="right">
                  Clear All
                </TooltipContent>
              </Tooltip>

              <Separator
                orientation="horizontal"
                className="bg-border w-fit my-2"
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={onCalculate}
                    className="rounded-full h-10 w-10 text-purple-400 hover:text-purple-800 transition-all"
                  >
                    <SquareEqual className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  color="primary"
                  arrowColor="primary"
                  side="right"
                >
                  Calculate
                </TooltipContent>
              </Tooltip>
            </div>
          </Card>

          <Card className="flex flex-col justify-between items-center w-fit h-fit rounded-full p-0 py-1 m-0">
            <div className="flex flex-col relative px-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setShowHowToUse(true)}
                    className="rounded-full h-10 w-10 text-rose-400 hover:text-rose-800"
                  >
                    <Wrench />
                  </Button>
                </TooltipTrigger>
                <TooltipContent color="rose" arrowColor="rose" side="right">
                  How to Use
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full h-10 w-10 text-emerald-400 hover:text-emerald-800"
                    onClick={() => setShowCalculationSteps(true)}
                  >
                    <CalculatorIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  color="emerald"
                  arrowColor="emerald"
                  side="right"
                >
                  Calculation Steps
                </TooltipContent>
              </Tooltip>
            </div>
          </Card>
        </div>
      </div>

      {/* Unified Alert Dialog */}
      <AlertDialog
        open={!!alertConfig}
        onOpenChange={(open) => !open && setAlertConfig(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertConfig?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertConfig?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {alertConfig?.actions.map((action, idx) => {
              if (idx === 0 && alertConfig.actions.length > 1) {
                return (
                  <AlertDialogCancel key={idx} onClick={action.onClick}>
                    {action.label}
                  </AlertDialogCancel>
                )
              }
              return (
                <AlertDialogAction
                  key={idx}
                  onClick={action.onClick}
                  className={
                    action.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : ""
                  }
                >
                  {action.label}
                </AlertDialogAction>
              )
            })}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MathJaxContext
        config={{
          loader: { load: ["input/tex", "output/chtml"] },
          tex: {
            inlineMath: [["\\(", "\\)"]],
            displayMath: [["\\[", "\\]"]],
          },
        }}
      >
        <>
          {/* --- How to Use Dialog --- */}
          <Dialog open={showHowToUse} onOpenChange={setShowHowToUse}>
            <DialogContent className="max-w-2xl sm:max-w-xl rounded-2xl bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-2xl shadow-2xl border border-border/40">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold tracking-tight">
                  How to Use
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="withExcel" className="w-full mt-3">
                <TabsList className="grid w-full grid-cols-3 mb-3">
                  <TabsTrigger value="withExcel">With Excel</TabsTrigger>
                  <TabsTrigger value="withoutExcel">Without Excel</TabsTrigger>
                  <TabsTrigger value="Attributions">Attributions</TabsTrigger>
                </TabsList>
                {/* --- With Excel --- */}
                <TabsContent
                  value="withExcel"
                  className="text-sm text-muted-foreground space-y-3"
                >
                  <ol className="list-decimal list-inside space-y-3">
                    <li>
                      Click the{" "}
                      <span className="text-teal-500 font-medium">
                        Upload icon
                      </span>{" "}
                      and select your Excel file.
                    </li>
                    <li>
                      If the file contains grades, choose{" "}
                      <span className="text-teal-500 font-medium">
                        Use as Preset
                      </span>{" "}
                      to save for later or{" "}
                      <span className="text-teal-500 font-medium">
                        Apply Directly
                      </span>{" "}
                      to load instantly.
                    </li>
                    <li>
                      For presets, use the{" "}
                      <span className="text-blue-500 font-medium">
                        semester filter
                      </span>{" "}
                      icon to choose semesters.
                    </li>
                    <li>
                      Click{" "}
                      <span className="text-purple-500 font-medium">
                        Calculate
                      </span>{" "}
                      to compute GPA.
                    </li>
                    <li>
                      You can{" "}
                      <span className="text-yellow-500 font-medium">add</span>{" "}
                      or{" "}
                      <span className="text-red-500 font-medium">delete</span>{" "}
                      subjects manually.
                    </li>
                  </ol>
                </TabsContent>

                {/* --- Without Excel --- */}
                <TabsContent
                  value="withoutExcel"
                  className="text-sm text-muted-foreground space-y-3"
                >
                  <ol className="list-decimal list-inside space-y-3">
                    <li>
                      Click{" "}
                      <span className="text-yellow-500 font-medium">Add</span>{" "}
                      to insert a subject row.
                    </li>
                    <li>
                      Fill in name, credits, semester, and grade (if available).
                    </li>
                    <li>Repeat for each subject.</li>
                    <li>
                      Click{" "}
                      <span className="text-purple-500 font-medium">
                        Calculate
                      </span>{" "}
                      to get GPA.
                    </li>
                    <li>
                      Use{" "}
                      <span className="text-red-500 font-medium">
                        Clear All
                      </span>{" "}
                      to reset everything.
                    </li>
                  </ol>
                </TabsContent>

                {/* --- Attributions --- */}
                <TabsContent
                  value="Attributions"
                  className="text-sm text-muted-foreground space-y-3"
                >
                  <ol className="list-disc list-inside space-y-3">
                    <li>
                      <a
                        href="https://ui.shadcn.com/"
                        title="Shad/cn"
                      >
                        Components from Shad/cn.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tweakcn.com/"
                        title="Tweakcn"
                      >
                        Themes generated from Tweak/cn.
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.flaticon.com/free-icons/graduate"
                        title="graduate icons"
                      >
                        Graduate icons created by Shakeel Ch. - Flaticon
                      </a>
                    </li>
                  </ol>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <div className="mt-3 w-full bg-muted/20 text-xs text-muted-foreground px-3 py-2 rounded-lg border border-border/30">
                  Each subject row can be deleted by double-clicking its index
                  number.
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* --- Calculation Steps Dialog --- */}
          <Dialog
            open={showCalculationSteps}
            onOpenChange={setShowCalculationSteps}
          >
            <DialogContent className="max-w-2xl sm:max-w-xl rounded-2xl bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-2xl shadow-2xl border border-border/40">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-semibold tracking-tight">
                  Calculation Steps
                </DialogTitle>
              </DialogHeader>

              <div className="text-sm text-muted-foreground mt-2 space-y-4">
                <p>The GPA/CPA is calculated as follows:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Multiply each subject’s credits by its grade value to get
                    the subject score.
                  </li>
                  <li>Sum up all subject scores and total credits.</li>
                  <li>Divide total score by total credits.</li>
                  <li>The final result is your GPA or CPA.</li>
                </ol>

                <Separator className="my-4" />

                <div className="space-y-2 text-center font-medium text-foreground">
                  <MathJax inline dynamic>
                    {
                      "\\( \\text{Subject Score} = \\text{Credits} \\times \\text{Grade Value} \\)"
                    }
                  </MathJax>
                  <MathJax dynamic>
                    {
                      "\\[ \\text{GPA} = \\frac{\\sum (\\text{Credits} \\times \\text{Grade Value})}{\\sum \\text{Credits}} \\]"
                    }
                  </MathJax>
                </div>

                <div className="bg-muted/20 text-xs text-muted-foreground px-3 py-2 rounded-lg border border-border/30 mt-4">
                  Note: The calculator uses a 10-point grading scale.
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      </MathJaxContext>
    </>
  )
}
