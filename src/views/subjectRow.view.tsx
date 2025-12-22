import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Subject } from "@/types/subjectRow.types"

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]
const grades = ["O", "A+", "A", "B+", "B", "C+", "C"]

type Props = {
  index: number
  subject: Subject

  deleteMode: boolean
  openDelete: boolean
  dontAskAgain: boolean

  onIndexClick: () => void
  confirmDelete: () => void
  setOpenDelete: (v: boolean) => void
  setDontAskAgain: (v: boolean) => void

  updateSubject: (index: number, field: keyof Subject, value: string) => void
}

export const SubjectRowView = forwardRef<HTMLDivElement, Props>(
  (
    {
      index,
      subject,
      deleteMode,
      openDelete,
      dontAskAgain,
      onIndexClick,
      confirmDelete,
      setOpenDelete,
      setDontAskAgain,
      updateSubject,
    },
    ref
  ) => {
    const interactiveStyle = cn(
      "outline-none relative border border-input rounded-full transition-all duration-200 ease-in",
      "hover:border-primary focus:border-[4px] focus:border-primary"
    )

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "subject-row grid items-center p-1 select-none gap-3 max-w-4xl",
            "grid-cols-[40px_60px_minmax(120px,1fr)_minmax(120px,2fr)_minmax(64px,96px)_minmax(98px,98px)]",
            "sm:grid-cols-[40px_80px_minmax(140px,1fr)_minmax(160px,2fr)_minmax(72px,100px)_minmax(100px,100px)]"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center justify-center h-9 w-9 rounded-full text-sm cursor-pointer select-none transition-all duration-200 border bg-accent text-accent-foreground hover:border-red-400",
                  deleteMode
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : ""
                )}
                onClick={onIndexClick}
              >
                {deleteMode ? <Trash2 className="h-4 w-4" /> : index + 1}
              </div>
            </TooltipTrigger>
            <TooltipContent color="red" arrowColor="red" side="left">
              <p>Double-click to delete</p>
            </TooltipContent>
          </Tooltip>

          <Select
            value={subject.semester}
            onValueChange={(val) =>
              updateSubject(index, "semester", val)
            }
          >
            <SelectTrigger className={cn("w-full h-10 px-3", interactiveStyle)}>
              <SelectValue placeholder="Sem" />
            </SelectTrigger>
            <SelectContent className="p-0">
              {semesters.map((sem) => (
                <SelectItem
                  key={sem}
                  value={sem}
                  className="data-[highlighted]:bg-primary data-[highlighted]:text-accent-foreground"
                >
                  {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            value={subject.code}
            onChange={(e) =>
              updateSubject(index, "code", e.target.value)
            }
            placeholder="Subject Code"
            className={cn("w-full h-10 text-center", interactiveStyle)}
          />

          <Input
            value={subject.name}
            onChange={(e) =>
              updateSubject(index, "name", e.target.value)
            }
            placeholder="Subject Name"
            className={cn("w-full h-10", interactiveStyle)}
          />

          <Input
            type="number"
            value={subject.credits}
            onChange={(e) =>
              updateSubject(index, "credits", e.target.value)
            }
            placeholder="Credits"
            min={0}
            max={6}
            className={cn(
              "min-w-[64px] h-10 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]",
              interactiveStyle
            )}
          />

          <Select
            value={subject.grade}
            onValueChange={(val) =>
              updateSubject(index, "grade", val)
            }
          >
            <SelectTrigger
              className={cn(
                "min-w-[90px] h-10 text-center px-3",
                interactiveStyle
              )}
            >
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)]">
              {grades.map((g) => (
                <SelectItem
                  key={g}
                  value={g}
                  className="data-[highlighted]:bg-primary data-[highlighted]:text-accent-foreground"
                >
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Subject?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Do you really want to delete this
                row?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex items-center gap-2 py-2">
              <Switch
                checked={dontAskAgain}
                onCheckedChange={(val) => setDontAskAgain(val)}
              />
              <span className="text-sm text-muted-foreground">
                Don't ask again for next 5 deletions
              </span>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setOpenDelete(false)
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }
)

SubjectRowView.displayName = "SubjectRowView"
