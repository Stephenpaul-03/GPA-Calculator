import ExcelJS from "exceljs"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { GPAResults } from "@/types/gpa.types"

export function buildExcelWorkbook(
  results: GPAResults,
  getSemesterGPA: (tab: string) => string,
  getCGPATill: (tab: string) => string
) {
  const wb = new ExcelJS.Workbook()
  const semesterTabs = ["all", ...results.semesterResults.map(s => s.semester)]

  for (const tab of semesterTabs) {
    const ws = wb.addWorksheet(tab === "all" ? "All Semesters" : tab)
    const rows =
      tab === "all"
        ? results.rows
        : results.semesterResults.find(s => s.semester === tab)?.rows ?? []

    ws.mergeCells("A1:G1")
    ws.getCell("A1").value =
      tab === "all" ? "All Semesters" : `Semester ${tab}`

    ws.mergeCells("A2:G2")
    ws.getCell("A2").value = `CGPA upto ${
      tab === "all" ? "All Semesters" : `Semester ${tab}`
    }: ${getCGPATill(tab)}`

    ws.mergeCells("A3:G3")
    ws.getCell("A3").value = `GPA: ${getSemesterGPA(tab)}`

    ws.addRow([])

    ws.columns = [
      { header: "Index", key: "index", width: 10 },
      { header: "Semester", key: "semester", width: 15 },
      { header: "Code", key: "code", width: 15 },
      { header: "Name", key: "name", width: 30 },
      { header: "Credits", key: "credits", width: 10 },
      { header: "Grade", key: "grade", width: 10 },
      { header: "Score", key: "score", width: 10 },
    ]

    rows.forEach(r => {
      ws.addRow({
        index: r.index,
        semester: r.semester,
        code: r.subjectCode,
        name: r.name,
        credits: r.credits,
        grade: r.grade,
        score: Number(r.score.toFixed(2)),
      })
    })
  }

  return wb
}

export function buildPDFDocument(
  results: GPAResults,
  getSemesterGPA: (tab: string) => string,
  getCGPATill: (tab: string) => string
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const semesterTabs = ["all", ...results.semesterResults.map(s => s.semester)]

  semesterTabs.forEach(tab => {
    const rows = results.rows
      .filter(r => tab === "all" || r.semester === tab)
      .map(r => [
        r.index,
        r.semester,
        r.subjectCode,
        r.name,
        r.credits,
        r.grade,
        r.score.toFixed(2),
      ])

    autoTable(doc, {
      head: [["#", "Sem", "Code", "Name", "Credits", "Grade", "Score"]],
      body: rows,
    })

    doc.text(
      `GPA: ${getSemesterGPA(tab)} | CGPA: ${getCGPATill(tab)}`,
      40,
      (doc as any).lastAutoTable.finalY + 20
    )

    doc.addPage()
  })

  return doc
}
