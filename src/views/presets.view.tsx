"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import UploadArea from "@/components/ui/upload"
import { Upload } from "lucide-react"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void

  selectedFile: File | null
  setSelectedFile: (f: File | null) => void

  parsedCount: number
  hasGrades: boolean
  error: string | null

  showGradeDialog: boolean
  setShowGradeDialog: (v: boolean) => void

  onAdd: () => void
  onApplyDirectly: () => void
  onUseAsPreset: () => void
}

export function PresetsView({
  open,
  setOpen,
  selectedFile,
  setSelectedFile,
  parsedCount,
  hasGrades,
  error,
  showGradeDialog,
  setShowGradeDialog,
  onAdd,
  onApplyDirectly,
  onUseAsPreset,
}: Props) {
  return (
    <>
      {/* MAIN PRESET DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full h-10 w-10 text-teal-400 hover:text-teal-800 transition-all"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-md rounded-4xl backdrop-blur-2xl"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Upload Excel Preset</DialogTitle>
            {/* Required by Radix, visually hidden */}
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

      {/* GRADE DETECTED DIALOG */}
      <AlertDialog
        open={showGradeDialog}
        onOpenChange={setShowGradeDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Grade Column Detected</AlertDialogTitle>
            <AlertDialogDescription>
              This file includes grades. Do you want to use them as a preset
              (choose semesters later) or apply the data directly now?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onUseAsPreset}>
              Use as Preset
            </AlertDialogAction>
            <AlertDialogAction onClick={onApplyDirectly}>
              Apply Directly
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
