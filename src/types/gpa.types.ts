export interface ResultRow {
  index: number
  subjectCode: string
  semester: string
  name: string
  credits: number
  grade: string
  score: number
}

export interface SemesterResult {
  semester: string
  totalCredits: number
  totalScore: number
  gpa: string
  rows: ResultRow[]
}

export interface GPAResults {
  rows: ResultRow[]
  totalCredits: number
  totalScore: number
  gpa: string
  semesterResults: SemesterResult[]
  gradeDistribution: Record<string, number>
  maxSemesterGPA?: { semester: string; gpa: string }
  minSemesterGPA?: { semester: string; gpa: string }
  cgpaTrend: { semester: string; cgpa: string }[]
}

export interface GPAWarning {
  subjectIndex: number
  message: string
}

export interface GPAError {
  message: string
  warnings?: GPAWarning[]
}
