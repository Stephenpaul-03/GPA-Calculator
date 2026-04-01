import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function HowToUseDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-2xl shadow-2xl border border-border/40">
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

          <TabsContent
            value="withExcel"
            className="text-sm text-muted-foreground space-y-3"
          >
            <ol className="list-decimal list-inside space-y-3">
              <li>
                Click the{" "}
                <span className="text-teal-500 font-medium">Upload icon</span>{" "}
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
                <span className="text-purple-500 font-medium">Calculate</span>{" "}
                to compute GPA.
              </li>
              <li>
                You can{" "}
                <span className="text-yellow-500 font-medium">add</span> or{" "}
                <span className="text-red-500 font-medium">delete</span>{" "}
                subjects manually.
              </li>
            </ol>
          </TabsContent>

          <TabsContent
            value="withoutExcel"
            className="text-sm text-muted-foreground space-y-3"
          >
            <ol className="list-decimal list-inside space-y-3">
              <li>
                Click{" "}
                <span className="text-yellow-500 font-medium">Add</span> to insert
                a subject row.
              </li>
              <li>
                Fill in name, credits, semester, and grade (if available).
              </li>
              <li>Repeat for each subject.</li>
              <li>
                Click{" "}
                <span className="text-purple-500 font-medium">Calculate</span>{" "}
                to get GPA.
              </li>
              <li>
                Use{" "}
                <span className="text-red-500 font-medium">Clear All</span> to
                reset everything.
              </li>
            </ol>
          </TabsContent>

          <TabsContent
            value="Attributions"
            className="text-sm text-muted-foreground space-y-3"
          >
            <ol className="list-disc list-inside space-y-3">
              <li>
                <a href="https://ui.shadcn.com/" title="Shad/cn">
                  Components from Shad/cn.
                </a>
              </li>
              <li>
                <a href="https://tweakcn.com/" title="Tweakcn">
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
            Each subject row can be deleted by double-clicking its index number.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
