import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { MathJax, MathJaxContext } from "better-react-mathjax"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function CalculationStepsDialog({ open, onOpenChange }: Props) {
  return (
    <MathJaxContext
      config={{
        loader: { load: ["input/tex", "output/chtml"] },
        tex: {
          inlineMath: [["\\(", "\\)"]],
          displayMath: [["\\[", "\\]"]],
        },
      }}
    >
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md rounded-2xl bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-2xl shadow-2xl border border-border/40">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold tracking-tight">
              Calculation Steps
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-muted-foreground mt-2 space-y-4">
            <p>The GPA/CPA is calculated as follows:</p>

            <ol className="list-decimal list-inside space-y-2">
              <li>
                Multiply each subject’s credits by its grade value to get the
                subject score.
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
    </MathJaxContext>
  )
}
