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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ResultProps {
  results: GPAResults;
}

const Result: React.FC<ResultProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState("all");

  const semesterTabs = [
    "all",
    ...results.semesterResults.map((s) => s.semester),
  ];

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
    const semIndex = results.semesterResults.findIndex(
      (s) => s.semester === tab
    );
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
    <div className="flex flex-col gap-4 p-4 h-fit min-h-[72vh]">
      {/* Card 1: Tabs and Download Buttons - 10vh */}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            {semesterTabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
              >
                {tab === "all" ? "All Semesters" : tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {/* Card 2: Table - 60vh */}
      <Card className="h-[50vh] flex flex-col p-0">
        <CardContent className="p-0 flex-1 overflow-hidden flex flex-col rounded-xl">
          <div className="flex-1 overflow-scroll relative">
            <Table className="table-fixed w-full">
              <TableHeader className="sticky top-0 bg-card z-10 border-b-2">
                <TableRow>
                  <TableHead className="w-8 bg-muted/50 text-center">#</TableHead>
                  <TableHead className="w-16 bg-muted/50 text-center">Semester</TableHead>
                  <TableHead className="w-24 bg-muted/50 text-center">Code</TableHead>
                  <TableHead className="w-[300px] bg-muted/50 text-center">Name</TableHead>
                  <TableHead className="w-20 bg-muted/50 text-center">Credits</TableHead>
                  <TableHead className="w-16 bg-muted/50 text-center">Grade</TableHead>
                  <TableHead className="w-20 bg-muted/50 text-center">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow className="hover:bg-white/20" key={row.index}>
                    <TableCell className="hover:bg-red-400 text-center">
                      {row.index}
                    </TableCell>
                    <TableCell className="hover:bg-blue-500 text-center">
                      {row.semester || "-"}
                    </TableCell>
                    <TableCell className="hover:bg-indigo-500 text-center">
                      {row.subjectCode || "-"}
                    </TableCell>
                    <TableCell className="hover:bg-purple-500 truncate">
                      {row.name}
                    </TableCell>
                    <TableCell className="hover:bg-teal-500 text-center">
                      {row.credits}
                    </TableCell>
                    <TableCell className="hover:bg-cyan-500 text-center">
                      {row.grade}
                    </TableCell>
                    <TableCell className="hover:bg-emerald-500 text-center">
                      {row.score.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableHeader className="sticky bottom-0 bg-card z-10 border-t">
                <TableRow className="font-semibold hover:bg-transparent">
                  <TableCell colSpan={4} className="bg-muted/50">
                    Total
                  </TableCell>
                  <TableCell className="bg-muted/50">{totalCredits}</TableCell>
                  <TableCell className="bg-muted/50" />
                  <TableCell className="bg-muted/50">
                    {totalScore.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: GPA Details - 10vh */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr] gap-4">
        <Card className="h-[10vh] min-h-[80px] flex items-center justify-center">
          <CardContent className="p-4 text-center">
            <span className="text-sm text-muted-foreground block">
              Cumulative GPA
            </span>
            <span className="text-lg font-semibold block">
              {getCGPATill(activeTab)}
            </span>
          </CardContent>
        </Card>

        <Card className="h-[10vh] min-h-[80px] flex items-center justify-center">
          <CardContent className="p-4 text-center">
            <span className="text-sm text-muted-foreground block">
              Semester GPA
            </span>
            <span className="text-lg font-semibold block">
              {getSemesterGPA(activeTab)}
            </span>
          </CardContent>
        </Card>

        <Card className="h-[10vh] min-h-[80px] flex items-center justify-center">
          <CardContent className="p-4 text-center">
            <span className="text-sm text-muted-foreground block">
              Total Score
            </span>
            <span className="text-lg font-semibold block">
              {totalScore.toFixed(2)}
            </span>
          </CardContent>
        </Card>

        <Card className="h-[10vh] min-h-[80px] flex items-center justify-center">
          <CardContent className="p-4 text-center">
            <span className="text-sm text-muted-foreground block">
              Total Credits
            </span>
            <span className="text-lg font-semibold block">{totalCredits}</span>
          </CardContent>
        </Card>

        <Card className="h-fit w-fit rounded-full p-1 m-0 flex items-center justify-center">
          <CardContent className="p-0 m-0 text-center">
            <div className="flex flex-col gap-1">
              <TooltipProvider>
                <div className="flex flex-col gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          downloadPDF(results, getSemesterGPA, getCGPATill)
                        }
                        className="w-8 h-8 rounded-full hover:text-red-500"
                      >
                        <FileDown className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" color="red" arrowColor="red">
                      Download PDF
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          downloadExcel(results, getSemesterGPA, getCGPATill)
                        }
                        className="w-8 h-8 rounded-full hover:text-emerald-500"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      color="emerald"
                      arrowColor="emerald"
                    >
                      Download Excel
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Result;
