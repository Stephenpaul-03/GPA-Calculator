import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/subjectRow.types"
import { semesters, grades } from "./constants"

type Props = {
  index: number
  subject: Subject
  updateSubject: (
    index: number,
    field: keyof Subject,
    value: string
  ) => void
}

export function SubjectRowFields({
  index,
  subject,
  updateSubject,
}: Props) {
  const interactiveStyle = cn(
    "outline-none relative border border-input rounded-full transition-all duration-200 ease-in",
    "hover:border-primary focus:border-[4px] focus:border-primary"
  )

  return (
    <>
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
    </>
  )
}
