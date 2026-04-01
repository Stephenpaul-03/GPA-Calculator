import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  dontAskAgain: boolean
  setDontAskAgain: (v: boolean) => void
  confirmDelete: () => void
}

export function SubjectRowDeleteAlert({
  open,
  setOpen,
  dontAskAgain,
  setDontAskAgain,
  confirmDelete,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Subject?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Do you really want to delete this
            row?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex items-center gap-2 py-2">
          <Switch
            checked={dontAskAgain}
            onCheckedChange={(val) => setDontAskAgain(val)}
          />
          <span className="text-sm text-muted-foreground">
            Don't ask again for next 5 deletions
          </span>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
