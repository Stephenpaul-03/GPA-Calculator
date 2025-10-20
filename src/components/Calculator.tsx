"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  SquareEqual,
  CircleX,
  Wrench,
  Calculator as CalculatorIcon,
  Filter,
} from "lucide-react";
import SubjectRow, { type Subject } from "../components/SubjectRow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { calculateGPA, type GPAResults } from "@/components/Calculator_Logic";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface CalculatorProps {
  subjects: Subject[];
  onSubjectsChange: (subjects: Subject[]) => void;
  onResultsChange?: (results: GPAResults | null) => void;
  uploadButton?: React.ReactNode;
  presetMode?: boolean;
  parsedSubjects?: Subject[];
  parsedHasGrades?: boolean;
}

type AlertConfig = {
  title: string;
  description: string;
  actions: {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive";
  }[];
};

const Calculator: React.FC<CalculatorProps> = ({
  subjects,
  onSubjectsChange,
  onResultsChange,
  uploadButton,
  presetMode = false,
  parsedSubjects = [],
}) => {
  const [_, setResults] = useState<GPAResults | null>(null);
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showCalculationSteps, setShowCalculationSteps] = useState(false);

  const addSubject = () =>
    onSubjectsChange([
      ...subjects,
      {
        number: subjects.length + 1,
        code: "",
        semester: "",
        name: "",
        credits: "",
        grade: "",
      },
    ]);

  const deleteSubject = (index: number) =>
    onSubjectsChange(subjects.filter((_, i) => i !== index));

  const updateSubject = (
    index: number,
    field: keyof Subject,
    value: string
  ) => {
    onSubjectsChange(
      subjects.map((subj, i) =>
        i === index ? { ...subj, [field]: value } : subj
      )
    );
  };

  const handleCalculate = () => {
    const { results, error } = calculateGPA(subjects);
    if (error) {
      setAlertConfig({
        title: "Error",
        description: error.message,
        actions: [
          {
            label: "OK",
            onClick: () => setAlertConfig(null),
          },
        ],
      });
    }
    if (results) {
      setResults(results);
      onResultsChange?.(results);
    }
  };

  const handleClear = () => {
    onSubjectsChange(
      Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        code: "",
        semester: "",
        name: "",
        credits: "",
        grade: "",
      }))
    );
    setResults(null);
    onResultsChange?.(null);
    setAlertConfig(null);
  };

  const showClearDialog = () => {
    setAlertConfig({
      title: "Clear All Subjects?",
      description:
        "This will reset all subject data to empty fields. This action cannot be undone.",
      actions: [
        {
          label: "Cancel",
          onClick: () => setAlertConfig(null),
        },
        {
          label: "Clear All",
          onClick: () => {
            handleClear();
            toast("Subjects Cleared");
          },
          variant: "destructive",
        },
      ],
    });
  };

  const availableSemesters = useMemo(() => {
    const setSem = new Set<string>();
    parsedSubjects.forEach((s) => {
      if (s.semester) setSem.add(s.semester);
    });
    return Array.from(setSem).sort((a, b) => Number(a) - Number(b));
  }, [parsedSubjects]);

  const findMissingSemesters = (selected: string[]) => {
    if (selected.length === 0) return [];
    const arr = selected.map(Number).sort((a, b) => a - b);
    const missing: number[] = [];
    for (let n = arr[0]; n <= arr[arr.length - 1]; n++) {
      if (!arr.includes(n)) missing.push(n);
    }
    return missing;
  };

  const handleApplySemesters = () => {
    if (!selectedSemesters.length) {
      toast("Select at least one semester to apply.");
      return;
    }

    const missing = findMissingSemesters(selectedSemesters);
    if (missing.length > 0) {
      toast.warning(
        `Missing semesters: ${missing.join(
          ", "
        )}. You can still apply if you want.`
      );
    }

    const toApply = parsedSubjects.filter((s) =>
      selectedSemesters.includes(s.semester)
    );

    if (toApply.length === 0) {
      toast("No rows found for selected semesters.");
      return;
    }

    const existingHasData = subjects.some(
      (s) => s.code || s.name || s.credits || s.grade
    );

    if (existingHasData) {
      showApplyDialog(toApply);
      return;
    }

    onSubjectsChange(toApply);
    toast("Semester data applied.");
    setSelectedSemesters([]);
  };

  const showApplyDialog = (toApply: Subject[]) => {
    setAlertConfig({
      title: "Existing Data Found",
      description:
        "Calculator already has data. Do you want to replace it with the applied semester data or append the new rows?",
      actions: [
        {
          label: "Cancel",
          onClick: () => setAlertConfig(null),
        },
        {
          label: "Replace Data",
          onClick: () => confirmApply(toApply, true),
        },
        {
          label: "Append Rows",
          onClick: () => confirmApply(toApply, false),
        },
      ],
    });
  };

  const confirmApply = (toApply: Subject[], replace: boolean) => {
    if (replace) {
      onSubjectsChange(toApply);
      toast("Replaced with applied semester data.");
    } else {
      const merged = [
        ...subjects,
        ...toApply.map((s, i) => ({ ...s, number: subjects.length + i + 1 })),
      ];
      onSubjectsChange(merged);
      toast("Appended applied semester data.");
    }

    setAlertConfig(null);
    setSelectedSemesters([]);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row gap-3">
        <Card className="flex p-4 flex-col h-[60vh] items-center justify-center rounded-3xl flex-1">
          <div className="flex-1 overflow-y-scroll max-h-[60vh] w-full custom-scrollbar">
            {subjects.map((subj, idx) => (
              <SubjectRow
                key={idx}
                index={idx}
                subject={subj}
                updateSubject={updateSubject}
                deleteSubject={deleteSubject}
              />
            ))}
          </div>
        </Card>

        {/* Desktop Button Column */}
        <div className="hidden md:flex flex-col justify-between">
          <Card className="flex flex-col justify-between items-center w-fit h-fit rounded-full p-0 py-1 m-0">
            <div className="flex flex-col relative px-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>{uploadButton}</div>
                </TooltipTrigger>
                <TooltipContent side="right">Upload Excel</TooltipContent>
              </Tooltip>

              {(presetMode || parsedSubjects.length > 0) &&
                availableSemesters.length > 0 && (
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="rounded-full h-10 w-10"
                          >
                            <Filter className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Select Semesters
                      </TooltipContent>
                    </Tooltip>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Available Semesters</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {availableSemesters.map((sem) => (
                        <DropdownMenuCheckboxItem
                          key={sem}
                          onSelect={(e) => e.preventDefault()}
                          checked={selectedSemesters.includes(sem)}
                          onCheckedChange={(checked) => {
                            setSelectedSemesters((prev) =>
                              checked
                                ? [...prev, sem]
                                : prev.filter((s) => s !== sem)
                            );
                          }}
                        >
                          Semester {sem}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleApplySemesters}>
                        Apply
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      addSubject();
                      toast("Subject Row Added.");
                    }}
                    className="rounded-full h-10 w-10"
                  >
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Add Subject</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={showClearDialog}
                    className="rounded-full h-10 w-10 hover:text-destructive"
                  >
                    <CircleX className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Clear All</TooltipContent>
              </Tooltip>

              <Separator
                orientation="horizontal"
                className="bg-border w-fit my-2"
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleCalculate();
                      toast("Result Calculated");
                    }}
                    className="rounded-full h-10 w-10 hover:text-primary"
                  >
                    <SquareEqual className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Calculate</TooltipContent>
              </Tooltip>
            </div>
          </Card>

          <Card className="flex flex-col justify-between items-center w-fit h-fit rounded-full p-0 py-1 m-0">
            <div className="flex flex-col relative px-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setShowHowToUse(true)}
                    className="rounded-full h-10 w-10"
                  >
                    <Wrench />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">How to Use</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full h-10 w-10"
                    onClick={() => setShowCalculationSteps(true)}
                  >
                    <CalculatorIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Calculation Steps</TooltipContent>
              </Tooltip>
            </div>
          </Card>
        </div>

        {/* Mobile Button Row */}
        <div className="md:hidden flex flex-row justify-between gap-2">
          <Card className="flex flex-row items-center w-fit rounded-full p-1">
            <div className="flex flex-row gap-1">
              {uploadButton}

              {(presetMode || parsedSubjects.length > 0) &&
                availableSemesters.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="rounded-full h-9 w-9">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Available Semesters</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {availableSemesters.map((sem) => (
                        <DropdownMenuCheckboxItem
                          key={sem}
                          onSelect={(e) => e.preventDefault()}
                          checked={selectedSemesters.includes(sem)}
                          onCheckedChange={(checked) => {
                            setSelectedSemesters((prev) =>
                              checked
                                ? [...prev, sem]
                                : prev.filter((s) => s !== sem)
                            );
                          }}
                        >
                          Semester {sem}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleApplySemesters}>
                        Apply
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              <Button
                variant="ghost"
                onClick={() => {
                  addSubject();
                  toast("Subject Row Added.");
                }}
                className="rounded-full h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                onClick={showClearDialog}
                className="rounded-full h-9 w-9 hover:text-destructive"
              >
                <CircleX className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-8 mx-1" />

              <Button
                variant="ghost"
                onClick={() => {
                  handleCalculate();
                  toast("Result Calculated");
                }}
                className="rounded-full h-9 w-9 hover:text-primary"
              >
                <SquareEqual className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          <Card className="flex flex-row items-center w-fit rounded-full p-1">
            <div className="flex flex-row gap-1">
              <Button
                variant="ghost"
                onClick={() => setShowHowToUse(true)}
                className="rounded-full h-9 w-9"
              >
                <Wrench className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                className="rounded-full h-9 w-9"
                onClick={() => setShowCalculationSteps(true)}
              >
                <CalculatorIcon className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Unified Alert Dialog */}
      <AlertDialog
        open={!!alertConfig}
        onOpenChange={(open) => !open && setAlertConfig(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertConfig?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertConfig?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {alertConfig?.actions.map((action, idx) => {
              if (idx === 0 && alertConfig.actions.length > 1) {
                return (
                  <AlertDialogCancel key={idx} onClick={action.onClick}>
                    {action.label}
                  </AlertDialogCancel>
                );
              }
              return (
                <AlertDialogAction
                  key={idx}
                  onClick={action.onClick}
                  className={
                    action.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : ""
                  }
                >
                  {action.label}
                </AlertDialogAction>
              );
            })}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* How to Use Dialog */}
      <Dialog open={showHowToUse} onOpenChange={setShowHowToUse}>
        <DialogContent className="max-w-2xl sm:max-w-xl rounded-2xl bg-background/95 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">How to Use</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="withExcel" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="withExcel">With Excel</TabsTrigger>
              <TabsTrigger value="withoutExcel">Without Excel</TabsTrigger>
            </TabsList>

            <TabsContent
              value="withExcel"
              className="space-y-2 mt-2 text-sm text-muted-foreground"
            >
              <ol className="list-decimal list-inside space-y-1">
                <li>Click the Upload icon and select your Excel file.</li>
                <li>
                  If the file contains grades, choose "Use as Preset" to apply
                  later or "Apply Directly" to populate immediately.
                </li>
                <li>
                  If using as preset, open the semester filter icon to select
                  which semesters to apply.
                </li>
                <li>
                  Click the Calculate button to compute GPA for the applied
                  semesters.
                </li>
                <li>You can add or delete subjects manually as needed.</li>
              </ol>
            </TabsContent>

            <TabsContent
              value="withoutExcel"
              className="space-y-2 mt-2 text-sm text-muted-foreground"
            >
              <ol className="list-decimal list-inside space-y-1">
                <li>Click the "+" icon to add a new subject row manually.</li>
                <li>
                  Fill in the subject name, credits, semester, and grade (if
                  available).
                </li>
                <li>Repeat for all subjects you want to include.</li>
                <li>Click the Calculate button to compute GPA.</li>
                <li>
                  You can clear all subjects with the "X" icon if you want to
                  start over.
                </li>
              </ol>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button onClick={() => setShowHowToUse(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calculation Steps Dialog */}
      <Dialog
        open={showCalculationSteps}
        onOpenChange={setShowCalculationSteps}
      >
        <DialogContent className="max-w-2xl sm:max-w-xl rounded-2xl bg-background/95 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Calculation Steps
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="withExcel" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="withExcel">With Excel</TabsTrigger>
              <TabsTrigger value="withoutExcel">Without Excel</TabsTrigger>
            </TabsList>

            <TabsContent
              value="withExcel"
              className="space-y-2 mt-2 text-sm text-muted-foreground"
            >
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Parse the Excel file to extract subjects, credits, semesters,
                  and grades.
                </li>
                <li>Map each grade to its numeric value (O=10, A+=9, etc.).</li>
                <li>Calculate per-subject score = credits × grade value.</li>
                <li>Sum all valid credits and scores to get totals.</li>
                <li>
                  Group subjects by semester and compute semester GPA = total
                  score ÷ total credits.
                </li>
                <li>Compute CGPA trend cumulatively across semesters.</li>
                <li>
                  Generate grade distribution and find max/min semester GPA.
                </li>
                <li>Return final GPAResults object with all details.</li>
              </ol>
            </TabsContent>

            <TabsContent
              value="withoutExcel"
              className="space-y-2 mt-2 text-sm text-muted-foreground"
            >
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Manually enter subjects with semester, credits, and grades.
                </li>
                <li>Validate entered credits and grades.</li>
                <li>Calculate per-subject score = credits × grade value.</li>
                <li>Accumulate total credits and total score.</li>
                <li>Compute semester-wise GPA and overall CGPA trend.</li>
                <li>
                  Generate grade distribution and identify max/min semester GPA.
                </li>
                <li>Display the results in the GPAResults structure.</li>
              </ol>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button onClick={() => setShowCalculationSteps(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calculator