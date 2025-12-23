import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { FileSpreadsheet, FileDown } from "lucide-react"

type Props = {
  onDownloadPDF: () => void
  onDownloadExcel: () => void
}

export function ResultActions({
  onDownloadPDF,
  onDownloadExcel,
}: Props) {
  return (
    <TooltipProvider>
      <div className="flex flex-row md:flex-col gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={onDownloadPDF}
              className="w-8 h-8 rounded-full hover:text-red-500"
            >
              <FileDown className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" color="red" arrowColor="red">
            Download PDF
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={onDownloadExcel}
              className="w-8 h-8 rounded-full hover:text-emerald-500"
            >
              <FileSpreadsheet className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            color="emerald"
            arrowColor="emerald"
          >
            Download Excel
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
