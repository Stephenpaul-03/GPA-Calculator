import { Card, CardContent } from "@/components/ui/card"
import { ResultStatCard } from "./stat.card"
import { ResultActions } from "./actions"

type Props = {
  cgpaTill: string
  semesterGPA: string
  totalScore: number
  totalCredits: number
  onDownloadPDF: () => void
  onDownloadExcel: () => void
}

export function ResultStats({
  cgpaTill,
  semesterGPA,
  totalScore,
  totalCredits,
  onDownloadPDF,
  onDownloadExcel,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_0.2fr] gap-3 md:gap-4">
      <ResultStatCard label="Cumulative GPA" value={cgpaTill} />
      <ResultStatCard label="Semester GPA" value={semesterGPA} />
      <ResultStatCard
        label="Total Score"
        value={totalScore.toFixed(2)}
      />
      <ResultStatCard label="Total Credits" value={totalCredits} />

      <Card className="h-fit w-fit rounded-full p-1 m-0 flex items-center justify-center">
        <CardContent className="p-0 m-0">
          <ResultActions
            onDownloadPDF={onDownloadPDF}
            onDownloadExcel={onDownloadExcel}
          />
        </CardContent>
      </Card>
    </div>
  )
}
