export interface Subject {
  number: number
  code: string
  semester: string
  name: string
  credits: string
  grade: string
}

export interface SubjectRowProps {
  index: number
  subject: Subject
  updateSubject: (index: number, field: keyof Subject, value: string) => void
  deleteSubject: (index: number) => void
}
