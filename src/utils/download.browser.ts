import type { GPAResults } from "@/types/gpa.types"
import {
  buildExcelWorkbook,
  buildPDFDocument,
} from "./download.core"

export async function downloadExcel(
  results: GPAResults,
  getSemesterGPA: (tab: string) => string,
  getCGPATill: (tab: string) => string
) {
  const wb = buildExcelWorkbook(results, getSemesterGPA, getCGPATill)
  const buffer = await wb.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  triggerDownload(blob, "results.xlsx")
}

export function downloadPDF(
  results: GPAResults,
  getSemesterGPA: (tab: string) => string,
  getCGPATill: (tab: string) => string
) {
  const doc = buildPDFDocument(results, getSemesterGPA, getCGPATill)
  doc.save("results.pdf")
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
