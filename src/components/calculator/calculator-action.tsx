import {
  Plus,
  SquareEqual,
  CircleX,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/helpers"

type Props = {
  uploadButton?: React.ReactNode
  presetMode: boolean
  parsedSubjects: any[]
  availableSemesters: string[]
  selectedSemesters: string[]
  setSelectedSemesters: (v: string[]) => void
  onAdd: () => void
  onClear: () => void
  onCalculate: () => void
  onApplySemesters: () => void
}

export function CalculatorActions(props: Props) {
  const {
    uploadButton,
    presetMode,
    parsedSubjects,
    availableSemesters,
    selectedSemesters,
    setSelectedSemesters,
    onAdd,
    onClear,
    onCalculate,
    onApplySemesters,
  } = props
  const isMobile = useIsMobile()
  const tooltipSide = isMobile ? "bottom" : "right"

  return (
    <Card className="flex flex-row md:flex-col items-center rounded-full p-1 w-fit gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full h-10 w-10 text-teal-400 hover:text-teal-800 transition-all shrink-0"
          >
            {uploadButton}
          </Button>
        </TooltipTrigger>

        <TooltipContent color="teal" arrowColor="teal" side={tooltipSide}>
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
                    className="rounded-full h-10 w-10 text-blue-400 hover:text-blue-800 transition-all shrink-0"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent color="blue" arrowColor="blue" side={tooltipSide}>
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
            className="rounded-full h-10 w-10 text-yellow-400 hover:text-yellow-800 transition-all shrink-0"
          >
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent color="yellow" arrowColor="yellow" side={tooltipSide}>
          Add Subject
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={onClear}
            className="rounded-full h-10 w-10 text-red-400 hover:text-red-800 transition-all shrink-0"
          >
            <CircleX className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent color="red" arrowColor="red" side={tooltipSide}>
          Clear All
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={onCalculate}
            className="rounded-full h-10 w-10 text-purple-400 hover:text-purple-800 transition-all shrink-0"
          >
            <SquareEqual className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent color="primary" arrowColor="primary" side={tooltipSide}>
          Calculate
        </TooltipContent>
      </Tooltip>
    </Card>
  )
}
