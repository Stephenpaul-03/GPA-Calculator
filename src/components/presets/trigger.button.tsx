import * as React from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export const PresetsTriggerButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      className="rounded-full h-10 w-10 text-teal-400 hover:text-teal-800 transition-all"
      {...props}
    >
      <Upload className="h-4 w-4" />
    </Button>
  )
})

PresetsTriggerButton.displayName = "PresetsTriggerButton"
