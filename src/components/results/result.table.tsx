import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import type { ResultRow } from "@/types/gpa.types"

type Props = {
  rows: ResultRow[]
  totalCredits: number
  totalScore: number
}

export function ResultTable({
  rows,
  totalCredits,
  totalScore,
}: Props) {
  return (
    <Card className="flex flex-col p-0 md:h-[50vh]">
      <CardContent className="p-0 flex-1 overflow-hidden flex flex-col rounded-xl">
        <div className="flex-1 overflow-x-auto overflow-y-auto relative">
          <Table className="min-w-[800px] table-fixed w-full">
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
                <TableRow key={row.index} className="hover:bg-white/20">
                  <TableCell className="text-center">
                    {row.index}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.semester || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.subjectCode || "-"}
                  </TableCell>
                  <TableCell className="truncate">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.credits}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.grade}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.score.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableHeader className="sticky bottom-0 bg-card z-10 border-t">
              <TableRow className="font-semibold">
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
  )
}
