"use client"

import type { Props } from "../types/presets.types"
import { PresetsTriggerButton } from "../components/presets/trigger.button"
import { PresetsMainDialog } from "../components/presets/main.dialog"
import { PresetsGradeAlert } from "../components/presets/grade.alert"

export function PresetsView(props: Props) {
  return (
    <>
      <PresetsMainDialog {...props}>
        <PresetsTriggerButton />
      </PresetsMainDialog>

      <PresetsGradeAlert
        open={props.showGradeDialog}
        setOpen={props.setShowGradeDialog}
        onUseAsPreset={props.onUseAsPreset}
        onApplyDirectly={props.onApplyDirectly}
      />
    </>
  )
}
