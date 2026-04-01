export interface Subject {
  number: number
  code: string
  semester: string
  name: string
  credits: string
  grade: string
}

export interface SubjectRowContainerProps {
  index: number
  subject: Subject
  updateSubject: (index: number, field: keyof Subject, value: string) => void
  deleteSubject: (index: number) => void
}

// subjectRow.types.ts
export interface SubjectRowViewProps {
  index: number
  subject: Subject

  deleteMode: boolean
  openDelete: boolean
  dontAskAgain: boolean

  onIndexClick: () => void
  confirmDelete: () => void
  setOpenDelete: (v: boolean) => void
  setDontAskAgain: (v: boolean) => void

  updateSubject: (
    index: number,
    field: keyof Subject,
    value: string
  ) => void
}
