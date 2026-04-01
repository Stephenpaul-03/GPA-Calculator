import { Card } from "@/components/ui/card"
import SubjectRow from "@/containers/subjectRow.container"
import type { Subject } from "@/types/subjectRow.types"

type Props = {
  subjects: Subject[]
  onDelete: (index: number) => void
  onUpdate: (index: number, field: keyof Subject, value: string) => void
}

export function SubjectListCard({ subjects, onDelete, onUpdate }: Props) {
  return (
    <Card className="flex p-4 flex-col min-h-[55vh] max-h-[55vh] md:min-h-[50vh] md:max-h-[50vh]items-center justify-center rounded-3xl flex-1">
      <div className="flex-1 overflow-y-scroll max-h-[60vh] w-full custom-scrollbar">
        {subjects.map((subj, idx) => (
          <SubjectRow
            key={idx}
            index={idx}
            subject={subj}
            updateSubject={onUpdate}
            deleteSubject={onDelete}
          />
        ))}
      </div>
    </Card>
  )
}
