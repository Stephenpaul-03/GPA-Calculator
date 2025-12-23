// import React from "react"
import type { Subject } from "@/types/subjectRow.types"
import type { AlertConfig } from "@/types/calculator.types"

import { SubjectListCard } from "../components/calculator/subject-list.card"
import { CalculatorActions } from "../components/calculator/calculator-action"
import { UtilityActions } from "../components/calculator/utility-actions"
import { UnifiedAlertDialog } from "../components/calculator/unified-alert-dialog"
import { HowToUseDialog } from "../components/calculator/how-to-use.dialog"
import { CalculationStepsDialog } from "../components/calculator/calculation-steps.dialog"

type Props = {
  subjects: Subject[]
  uploadButton?: React.ReactNode
  presetMode: boolean
  parsedSubjects: Subject[]

  availableSemesters: string[]
  selectedSemesters: string[]
  setSelectedSemesters: (v: string[]) => void

  onAdd: () => void
  onDelete: (index: number) => void
  onUpdate: (index: number, field: keyof Subject, value: string) => void
  onCalculate: () => void
  onApplySemesters: () => void
  onClear: () => void

  alertConfig: AlertConfig | null
  setAlertConfig: (v: AlertConfig | null) => void

  showHowToUse: boolean
  setShowHowToUse: (v: boolean) => void
  showCalculationSteps: boolean
  setShowCalculationSteps: (v: boolean) => void
}

export function CalculatorView(props: Props) {
  return (
    <>
      <div className="w-full h-full min-h-[55vh] max-h-[55vh] md:min-h-[50vh] md:max-h-[50vh] flex flex-col md:flex-row gap-3">
        <SubjectListCard
          subjects={props.subjects}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />

        <div className="flex flex-row md:flex-col justify-between">
          <UtilityActions {...props} />
          <CalculatorActions {...props} />
        </div>
      </div>

      <UnifiedAlertDialog
        alertConfig={props.alertConfig}
        setAlertConfig={props.setAlertConfig}
      />

      <HowToUseDialog
        open={props.showHowToUse}
        onOpenChange={props.setShowHowToUse}
      />

      <CalculationStepsDialog
        open={props.showCalculationSteps}
        onOpenChange={props.setShowCalculationSteps}
      />
    </>
  )
}
