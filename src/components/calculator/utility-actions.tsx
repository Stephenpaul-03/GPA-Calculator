import { Wrench, Calculator as CalculatorIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/helpers"

type Props = {
  setShowHowToUse: (v: boolean) => void
  setShowCalculationSteps: (v: boolean) => void
}

export function UtilityActions({
  setShowHowToUse,
  setShowCalculationSteps,
}: Props)
 {
  const isMobile = useIsMobile()
    const tooltipSide = isMobile ? "bottom" : "right"
  return (
    <Card className="flex flex-row md:flex-col items-center rounded-full p-1 w-fit gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => setShowHowToUse(true)}
            className="rounded-full h-10 w-10 text-rose-400 hover:text-rose-800 shrink-0"
          >
            <Wrench />
          </Button>
        </TooltipTrigger>
        <TooltipContent color="rose" arrowColor="rose" side={tooltipSide}>
          How to Use
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full h-10 w-10 text-emerald-400 hover:text-emerald-800 shrink-0"
            onClick={() => setShowCalculationSteps(true)}
          >
            <CalculatorIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent color="emerald" arrowColor="emerald" side={tooltipSide}>
          Calculation Steps
        </TooltipContent>
      </Tooltip>
    </Card>
  )
}

