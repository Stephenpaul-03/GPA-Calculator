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

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  onUseAsPreset: () => void
  onApplyDirectly: () => void
}

export function PresetsGradeAlert({
  open,
  setOpen,
  onUseAsPreset,
  onApplyDirectly,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
  )
}
