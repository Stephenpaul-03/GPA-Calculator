import * as XLSX from "xlsx"
import type { Subject } from "../types/subjectRow.types"

export function parseExcelFile(
  file: File
): {
  subjects: Subject[]
  hasGrades: boolean
  error?: string
} {
  const name = file.name.toLowerCase()
  if (!name.endsWith(".xls") && !name.endsWith(".xlsx")) {
    return {
      subjects: [],
      hasGrades: false,
      error: "Please upload a valid Excel (.xls or .xlsx) file.",
    }
  }

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        })

        const subjects: Subject[] = jsonData
          .map((row, idx) => {
            const credits = row["credits"]?.toString().trim()
            if (!credits) return null

            return {
              number: idx + 1,
              semester: row["semester"]?.toString().trim() || "",
              code: row["subjectcode"]?.toString().trim() || "",
              name: row["subjectname"]?.toString().trim() || "",
              credits,
              grade: row["grade"]?.toString().trim() || "",
            }
          })
          .filter((s): s is Subject => s !== null)

        if (!subjects.length) {
          resolve({
            subjects: [],
            hasGrades: false,
            error: "No valid rows found. Each row must include credits.",
          })
          return
        }

        const hasGrades = jsonData.some(
          (row) =>
            Object.prototype.hasOwnProperty.call(row, "grade") &&
            row["grade"] !== ""
        )

        resolve({ subjects, hasGrades })
      } catch {
        resolve({
          subjects: [],
          hasGrades: false,
          error: "Failed to parse Excel file.",
        })
      }
    }

    reader.readAsArrayBuffer(file)
  }) as any
}
