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

    // Add header section with merged cells
    const semesterName = tab === "all" ? "All Semesters" : `Semester ${tab}`;
    
    // Row 1: Semester Name (merged across all columns)
    ws.mergeCells('A1:G1');
    ws.getCell('A1').value = semesterName;
    ws.getCell('A1').font = { bold: true, size: 16, name: "Times New Roman" };
    ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    
    // Row 2: CGPA (merged across all columns)
    ws.mergeCells('A2:G2');
    ws.getCell('A2').value = `CGPA upto ${semesterName}: ${getCGPATill(tab)}`;
    ws.getCell('A2').font = { bold: true, size: 14, name: "Times New Roman" };
    ws.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
    
    // Row 3: GPA (merged across all columns)
    ws.mergeCells('A3:G3');
    ws.getCell('A3').value = `GPA for ${semesterName}: ${getSemesterGPA(tab)}`;
    ws.getCell('A3').font = { bold: true, size: 14, name: "Times New Roman" };
    ws.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' };
    
    // Row 4: Empty row for spacing
    ws.addRow([]);

    // Row 5: Column headers
    ws.columns = [
      { header: "Index", key: "index", width: 10 },
      { header: "Semester", key: "semester", width: 15 },
      { header: "Code", key: "code", width: 15 },
      { header: "Name", key: "name", width: 30 },
      { header: "Credits", key: "credits", width: 10 },
      { header: "Grade", key: "grade", width: 10 },
      { header: "Score", key: "score", width: 10 },
    ];

    // Style header row (row 5)
    const headerRow = ws.getRow(5);
    headerRow.values = ["Index", "Semester", "Code", "Name", "Credits", "Grade", "Score"];
    headerRow.font = { bold: true, size: 14, name: "Times New Roman" };
    headerRow.alignment = { vertical: "middle", horizontal: "left" };

    // Add data rows starting from row 6
    rows.forEach((row) => {
      const dataRow = ws.addRow({
        index: row.index,
        semester: row.semester || "-",
        code: row.subjectCode || "-",
        name: row.name,
        credits: row.credits,
        grade: row.grade,
        score: row.score.toFixed(2),
      });
      
      // Set font for all cells
      dataRow.font = { name: "Times New Roman", size: 12 };
      dataRow.alignment = { vertical: "middle", horizontal: "left" };
      
      // Convert semester and score to numbers
      if (row.semester) {
        dataRow.getCell(2).value = parseFloat(row.semester) || row.semester;
      }
      dataRow.getCell(7).value = parseFloat(row.score.toFixed(2));
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
      score: parseFloat(totalScore.toFixed(2)),
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

    // Styling totals & summary
    totalRow.font = { bold: true, size: 14, name: "Times New Roman" };
    summaryRow.font = { bold: true, size: 14, name: "Times New Roman" };
    totalRow.alignment = { vertical: "middle", horizontal: "left" };
    summaryRow.alignment = { vertical: "middle", horizontal: "left" };
  }

  // Generate buffer and trigger download for browser
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "results.xlsx";
  link.click();
  URL.revokeObjectURL(url);
};

// ------------------- PDF DOWNLOAD -------------------
export const downloadPDF = (
  results: GPAResults,
  getSemesterGPA: (tab: string) => string,
  getCGPATill: (tab: string) => string
) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const semesterTabs = ["all", ...results.semesterResults.map((s) => s.semester)];
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let currentY = margin;

  const summaryData: Array<{
    semester: string;
    gpa: string;
    cgpa: string;
    totalCredits: number;
    totalScore: string;
  }> = [];

  semesterTabs.forEach((tab, index) => {
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
    const gpa = getSemesterGPA(tab);
    const cgpa = getCGPATill(tab);

    // Store summary data
    summaryData.push({
      semester: title,
      gpa,
      cgpa,
      totalCredits,
      totalScore: totalScore.toFixed(2),
    });

    // Check if we need a new page
    if (index > 0) {
      const estimatedHeight = rows.length * 20 + 150;
      if (currentY + estimatedHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        currentY = margin;
      } else {
        currentY += 40; // Add spacing between semesters
      }
    }

    // Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, currentY);
    currentY += 20;

    // Table
    autoTable(doc, {
      head: [["#", "Sem", "Code", "Name", "Credits", "Grade", "Score"]],
      body: rows,
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { fontSize: 9, cellPadding: 2, font: "helvetica" },
      headStyles: { fillColor: [66, 139, 202], fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 35 },
        2: { cellWidth: 60 },
        3: { cellWidth: 'auto' },
        4: { cellWidth: 50 },
        5: { cellWidth: 45 },
        6: { cellWidth: 50 },
      },
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Summary box for this semester
    const boxWidth = pageWidth - 2 * margin;
    const boxHeight = 60;
    
    // Check if box fits on current page
    if (currentY + boxHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      currentY = margin;
    }

    doc.setDrawColor(66, 139, 202);
    doc.setLineWidth(1);
    doc.rect(margin, currentY, boxWidth, boxHeight);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`GPA: ${gpa}`, margin + 10, currentY + 20);
    doc.text(`CGPA: ${cgpa}`, margin + 10, currentY + 35);
    doc.text(`Total Credits: ${totalCredits}`, margin + boxWidth / 2, currentY + 20);
    doc.text(`Total Score: ${totalScore.toFixed(2)}`, margin + boxWidth / 2, currentY + 35);

    currentY += boxHeight + 10;
  });

  // Add summary page with all semesters
  doc.addPage();
  currentY = margin;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Summary - All Semesters", pageWidth / 2, currentY, { align: "center" });
  currentY += 40;

  summaryData.forEach((summary) => {
    const boxWidth = pageWidth - 2 * margin;
    const boxHeight = 70;

    // Check if box fits on current page
    if (currentY + boxHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      currentY = margin;
    }

    doc.setDrawColor(66, 139, 202);
    doc.setLineWidth(1);
    doc.rect(margin, currentY, boxWidth, boxHeight);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(summary.semester, margin + 10, currentY + 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`GPA: ${summary.gpa}`, margin + 10, currentY + 40);
    doc.text(`CGPA: ${summary.cgpa}`, margin + 10, currentY + 55);
    doc.text(`Total Credits: ${summary.totalCredits}`, margin + boxWidth / 2, currentY + 40);
    doc.text(`Total Score: ${summary.totalScore}`, margin + boxWidth / 2, currentY + 55);

    currentY += boxHeight + 15;
  });

  doc.save("results.pdf");
};