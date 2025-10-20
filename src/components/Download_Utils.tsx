// src/utils/downloadUtils.ts
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { GPAResults } from "@/components/Calculator_Logic";

// ------------------- EXCEL DOWNLOAD -------------------
export const downloadExcel = async (
  results: GPAResults,
  getSemesterGPA: (tab: string) => string,
  getCGPATill: (tab: string) => string
) => {
  const wb = new ExcelJS.Workbook();

  const semesterTabs = ["all", ...results.semesterResults.map((s) => s.semester)];

  for (const tab of semesterTabs) {
    const ws = wb.addWorksheet(tab === "all" ? "All Semesters" : tab);

    const rows =
      tab === "all"
        ? results.rows
        : results.semesterResults.find((s) => s.semester === tab)?.rows || [];

    ws.columns = [
      { header: "Index", key: "index", width: 10 },
      { header: "Semester", key: "semester", width: 15 },
      { header: "Code", key: "code", width: 15 },
      { header: "Name", key: "name", width: 30 },
      { header: "Credits", key: "credits", width: 10 },
      { header: "Grade", key: "grade", width: 10 },
      { header: "Score", key: "score", width: 10 },
    ];

    // Add data rows
    rows.forEach((row) => {
      ws.addRow({
        index: row.index,
        semester: row.semester || "-",
        code: row.subjectCode || "-",
        name: row.name,
        credits: row.credits,
        grade: row.grade,
        score: row.score.toFixed(2),
      });
    });

    // Totals row
    const totalCredits = rows.reduce((sum, r) => sum + r.credits, 0);
    const totalScore = rows.reduce((sum, r) => sum + r.score, 0);
    const totalRow = ws.addRow({
      index: "",
      semester: "",
      code: "",
      name: "Total",
      credits: totalCredits,
      grade: "",
      score: totalScore.toFixed(2),
    });

    // Summary row
    const summaryRow = ws.addRow({
      index: "",
      semester: "",
      code: "",
      name: "Summary",
      credits: "",
      grade: `GPA: ${getSemesterGPA(tab)} | CGPA: ${getCGPATill(tab)}`,
      score: "",
    });

    // Styling headers
    ws.getRow(1).font = { bold: true, size: 14, name: "Times New Roman" };

    // Styling totals & summary
    totalRow.font = { bold: true, size: 14, name: "Times New Roman" };
    summaryRow.font = { bold: true, size: 14, name: "Times New Roman" };

    // Align all rows
    ws.eachRow((row) => {
      row.alignment = { vertical: "middle", horizontal: "left" };
    });
  }

  await wb.xlsx.writeFile("results.xlsx");
};

// ------------------- PDF DOWNLOAD -------------------
export const downloadPDF = (
  results: GPAResults,
  getSemesterGPA: (tab: string) => string,
  getCGPATill: (tab: string) => string
) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  const semesterTabs = ["all", ...results.semesterResults.map((s) => s.semester)];
  
  semesterTabs.forEach((tab, index) => {
    if (index > 0) doc.addPage(); // new page for each tab

    const rows = results.rows
      .filter((r) => tab === "all" || r.semester === tab)
      .map((row) => [
        row.index,
        row.semester || "-",
        row.subjectCode || "-",
        row.name,
        row.credits,
        row.grade,
        row.score.toFixed(2),
      ]);

    const totalCredits = results.rows
      .filter((r) => tab === "all" || r.semester === tab)
      .reduce((sum, r) => sum + r.credits, 0);
    const totalScore = results.rows
      .filter((r) => tab === "all" || r.semester === tab)
      .reduce((sum, r) => sum + r.score, 0);

    rows.push(["", "", "", "Total", totalCredits, "", totalScore.toFixed(2)]);

    const title = tab === "all" ? "All Semesters" : `Semester ${tab}`;

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });

    // Table
    autoTable(doc, {
      head: [["#", "Semester", "Code", "Name", "Credits", "Grade", "Score"]],
      body: rows,
      startY: 60,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [66, 139, 202], fontStyle: "bold" },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 60;

    // GPA & CGPA
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `GPA: ${getSemesterGPA(tab)} | CGPA: ${getCGPATill(tab)}`,
      doc.internal.pageSize.getWidth() / 2,
      finalY + 15,
      { align: "center" }
    );
  });

  doc.save("results.pdf");
};
