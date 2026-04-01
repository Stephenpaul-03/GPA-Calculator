import type { ResultRow } from "@/types/gpa.types"
import { ResultTabs } from "../components/results/result.tabs"
import { ResultTable } from "../components/results/result.table"
import { ResultStats } from "../components/results/stats"

type Props = {
  activeTab: string
  setActiveTab: (v: string) => void
  semesterTabs: string[]
  rows: ResultRow[]
  totalCredits: number
  totalScore: number
  semesterGPA: string
  cgpaTill: string
  onDownloadPDF: () => void
  onDownloadExcel: () => void
}

export function ResultView(props: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 h-fit min-h-[72vh]">
      <ResultTabs
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
        semesterTabs={props.semesterTabs}
      />

      <ResultTable
        rows={props.rows}
        totalCredits={props.totalCredits}
        totalScore={props.totalScore}
      />

      <ResultStats
        cgpaTill={props.cgpaTill}
        semesterGPA={props.semesterGPA}
        totalScore={props.totalScore}
        totalCredits={props.totalCredits}
        onDownloadPDF={props.onDownloadPDF}
        onDownloadExcel={props.onDownloadExcel}
      />
    </div>
  )
}
