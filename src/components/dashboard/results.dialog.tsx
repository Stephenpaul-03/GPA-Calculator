import { Dialog, DialogContent } from "@/components/ui/dialog"
import Result from "@/containers/results.container"
import type { GPAResults } from "@/types/gpa.types"

type Props = {
  results: GPAResults | null
  open: boolean
  setOpen: (v: boolean) => void
}

export function DashboardResultsDialog({
  results,
  open,
  setOpen,
}: Props) {
  if (!results) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95vw] h-[90vh] max-w-none rounded-xl bg-background/95 backdrop-blur-2xl md:h-auto md:max-w-6xl md:rounded-4xl">
        <Result results={results} />
      </DialogContent>
    </Dialog>
  )
}
