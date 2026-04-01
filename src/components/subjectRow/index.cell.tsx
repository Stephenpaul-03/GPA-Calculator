import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  index: number
  deleteMode: boolean
  onClick: () => void
  tooltipSide: "left" | "bottom"
}

export function SubjectRowIndexCell({
  index,
  deleteMode,
  onClick,
  tooltipSide,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-center h-9 w-9 rounded-full text-sm cursor-pointer select-none transition-all duration-200 border bg-accent text-accent-foreground hover:border-red-400",
            deleteMode
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : ""
          )}
          onClick={onClick}
        >
          {deleteMode ? <Trash2 className="h-4 w-4" /> : index + 1}
        </div>
      </TooltipTrigger>
      <TooltipContent color="red" arrowColor="red" side={tooltipSide}>
        <p>Double-click to delete</p>
      </TooltipContent>
    </Tooltip>
  )
}
