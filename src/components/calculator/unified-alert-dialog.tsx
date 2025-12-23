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
import type { AlertConfig } from "@/types/calculator.types"

type Props = {
  alertConfig: AlertConfig | null
  setAlertConfig: (v: AlertConfig | null) => void
}

export function UnifiedAlertDialog({ alertConfig, setAlertConfig }: Props) {
  return (
    <AlertDialog
      open={!!alertConfig}
      onOpenChange={(open) => !open && setAlertConfig(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertConfig?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertConfig?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {alertConfig?.actions.map((action, idx) => {
            if (idx === 0 && alertConfig.actions.length > 1) {
              return (
                <AlertDialogCancel key={idx} onClick={action.onClick}>
                  {action.label}
                </AlertDialogCancel>
              )
            }
            return (
              <AlertDialogAction
                key={idx}
                onClick={action.onClick}
                className={
                  action.variant === "destructive"
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : ""
                }
              >
                {action.label}
              </AlertDialogAction>
            )
          })}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
