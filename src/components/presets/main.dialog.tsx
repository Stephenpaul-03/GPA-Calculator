import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import UploadArea from "@/components/ui/upload"
import type { Props } from "../../types/presets.types"

type DialogProps = Props & {
  children: React.ReactNode
}

export function PresetsMainDialog({
  open,
  setOpen,
  selectedFile,
  setSelectedFile,
  parsedCount,
  hasGrades,
  error,
  onAdd,
  children,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="sm:max-w-md rounded-4xl backdrop-blur-2xl"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Upload Excel Preset</DialogTitle>
          <DialogDescription className="sr-only">
            Upload an Excel file to use as a GPA preset
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <UploadArea onFileSelect={setSelectedFile} />

          {selectedFile && (
            <div className="text-sm">
              <div>Selected file: {selectedFile.name}</div>
              <div className="text-muted-foreground">
                Parsed rows: {parsedCount}
                {hasGrades ? " • grade column detected" : ""}
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <Button
          onClick={onAdd}
          disabled={!selectedFile || parsedCount === 0}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  )
}
