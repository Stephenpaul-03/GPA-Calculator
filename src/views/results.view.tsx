import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, FileDown } from "lucide-react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import type { ResultRow } from "@/types/gpa.types"

type Props = {
  activeTab: string
  setActiveTab: (v: string) => void
  semesterTabs: string[]
  rows: ResultRow[]
  totalCredits: number
  totalScore: number
  semesterGPA: string
  cgpaTill: string
  onDownloadPDF: () => void
  onDownloadExcel: () => void
}

export function ResultView({
  activeTab,
  setActiveTab,
  semesterTabs,
  rows,
  totalCredits,
  totalScore,
  semesterGPA,
  cgpaTill,
  onDownloadPDF,
  onDownloadExcel,
}: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 h-fit min-h-[72vh]">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            {semesterTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab === "all" ? "All Semesters" : tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {/* Table */}
      <Card className="h-[50vh] flex flex-col p-0">
        <CardContent className="p-0 flex-1 overflow-hidden flex flex-col rounded-xl">
          <div className="flex-1 overflow-scroll relative">
            <Table className="table-fixed w-full">
              <TableHeader className="sticky top-0 bg-card z-10 border-b-2">
                <TableRow>
                  <TableHead className="w-8 bg-muted/50 text-center">#</TableHead>
                  <TableHead className="w-16 bg-muted/50 text-center">
                    Semester
                  </TableHead>
                  <TableHead className="w-24 bg-muted/50 text-center">
                    Code
                  </TableHead>
                  <TableHead className="w-[300px] bg-muted/50 text-center">
                    Name
                  </TableHead>
                  <TableHead className="w-20 bg-muted/50 text-center">
                    Credits
                  </TableHead>
                  <TableHead className="w-16 bg-muted/50 text-center">
                    Grade
                  </TableHead>
                  <TableHead className="w-20 bg-muted/50 text-center">
                    Score
                  </TableHead>
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
                  <TableCell className="bg-muted/50">
                    {totalCredits}
                  </TableCell>
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

      {/* Stats */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_0.2fr] gap-4">
        <Stat label="Cumulative GPA" value={cgpaTill} />
        <Stat label="Semester GPA" value={semesterGPA} />
        <Stat label="Total Score" value={totalScore.toFixed(2)} />
        <Stat label="Total Credits" value={totalCredits} />

        <Card className="h-fit w-fit rounded-full p-1 m-0 flex items-center justify-center">
          <CardContent className="p-0 m-0 text-center">
            <TooltipProvider>
              <div className="flex flex-col gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={onDownloadPDF}
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
                      onClick={onDownloadExcel}
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="h-[10vh] min-h-[80px] flex items-center justify-center">
      <CardContent className="p-4 text-center">
        <span className="text-sm text-muted-foreground block">{label}</span>
        <span className="text-lg font-semibold block">{value}</span>
      </CardContent>
    </Card>
  )
}
