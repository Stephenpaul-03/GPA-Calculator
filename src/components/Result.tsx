// src/components/Result.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileDown } from "lucide-react";
import { downloadExcel, downloadPDF } from "@/components/Download_Utils";
import type { GPAResults, ResultRow } from "@/components/Calculator_Logic";

interface ResultProps {
  results: GPAResults;
}

const Result: React.FC<ResultProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState("all");

  const semesterTabs = ["all", ...results.semesterResults.map((s) => s.semester)];

  const getRowsForTab = (tab: string): ResultRow[] =>
    tab === "all"
      ? results.rows
      : results.semesterResults.find((s) => s.semester === tab)?.rows || [];

  const getSemesterGPA = (tab: string) => {
    if (tab === "all") return results.gpa;
    return results.semesterResults.find((s) => s.semester === tab)?.gpa || "-";
  };

  const getCGPATill = (tab: string) => {
    if (tab === "all") return results.gpa;
    const semIndex = results.semesterResults.findIndex((s) => s.semester === tab);
    if (semIndex === -1) return "-";
    const semTill = results.semesterResults.slice(0, semIndex + 1);
    const totalCredits = semTill.reduce((acc, s) => acc + s.totalCredits, 0);
    const totalScore = semTill.reduce((acc, s) => acc + s.totalScore, 0);
    return totalCredits > 0 ? (totalScore / totalCredits).toFixed(3) : "-";
  };

  const rows = getRowsForTab(activeTab);
  const totalCredits = rows.reduce((sum, r) => sum + r.credits, 0);
  const totalScore = rows.reduce((sum, r) => sum + r.score, 0);

  return (
    <div className="flex flex-col gap-4 p-4 h-[90vh]">
      {/* Card 1: Tabs and Download Buttons - 10vh */}
      <Card className="h-[10vh] min-h-[80px]">
        <CardContent className="p-4 h-full flex items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                {semesterTabs.map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab === "all" ? "All Semesters" : tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => downloadPDF(results, getSemesterGPA, getCGPATill)}
                >
                  <FileDown className="w-4 h-4 mr-2" /> PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadExcel(results, getSemesterGPA, getCGPATill)}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" /> Excel
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Card 2: Table - 60vh */}
      <Card className="h-[60vh] flex flex-col">
        <CardContent className="p-0 flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto relative">
            <Table className="table-fixed w-full">
              <TableHeader className="sticky top-0 bg-card z-10 border-b">
                <TableRow>
                  <TableHead className="w-8 bg-muted/50">#</TableHead>
                  <TableHead className="w-16 bg-muted/50">Semester</TableHead>
                  <TableHead className="w-24 bg-muted/50">Code</TableHead>
                  <TableHead className="w-[300px] bg-muted/50">Name</TableHead>
                  <TableHead className="w-20 bg-muted/50">Credits</TableHead>
                  <TableHead className="w-16 bg-muted/50">Grade</TableHead>
                  <TableHead className="w-20 bg-muted/50">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.index}>
                    <TableCell>{row.index}</TableCell>
                    <TableCell>{row.semester || "-"}</TableCell>
                    <TableCell>{row.subjectCode || "-"}</TableCell>
                    <TableCell className="truncate">{row.name}</TableCell>
                    <TableCell>{row.credits}</TableCell>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell>{row.score.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableHeader className="sticky bottom-0 bg-card z-10 border-t">
                <TableRow className="font-semibold hover:bg-transparent">
                  <TableCell colSpan={4} className="bg-muted/50">Total</TableCell>
                  <TableCell className="bg-muted/50">{totalCredits}</TableCell>
                  <TableCell className="bg-muted/50" />
                  <TableCell className="bg-muted/50">{totalScore.toFixed(2)}</TableCell>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: GPA Details - 10vh */}
      <Card className="h-[10vh] min-h-[80px]">
        <CardContent className="p-4 h-full flex items-center">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Semester GPA</span>
              <span className="text-lg font-semibold">{getSemesterGPA(activeTab)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Cumulative GPA</span>
              <span className="text-lg font-semibold">{getCGPATill(activeTab)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Credits</span>
              <span className="text-lg font-semibold">{totalCredits}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Score</span>
              <span className="text-lg font-semibold">{totalScore.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Result;