"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Calculator from "@/components/Calculator";
import Result from "@/components/Result";
import type { GPAResults } from "@/components/Calculator_Logic";
import { Mail, Github, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./theme_toggle/mode-toggle";
import { ThemeProvider } from "./theme_toggle/theme-provider";
import Presets from "@/components/Preset_Logic"; 
import { type Subject } from "@/components/SubjectRow";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { Card } from "./ui/card";
const Dashboard = () => {
  const [subjects, setSubjects] = useState<Subject[]>(
    Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      code: "",
      semester: "",
      name: "",
      credits: "",
      grade: "",
    }))
  );

  const [results, setResults] = useState<GPAResults | null>(null);
  const [open, setOpen] = useState(false);
  const [parsedSubjects, setParsedSubjects] = useState<Subject[]>([]);
  const [presetMode, setPresetMode] = useState(false);
  const [parsedHasGrades, setParsedHasGrades] = useState(false);

  const handlePresetsDone = (result: {
    parsedSubjects: Subject[];
    mode: "preset" | "apply";
    hasGrades: boolean;
  }) => {
    const { parsedSubjects: data, mode, hasGrades } = result;

    if (mode === "apply") {
      setSubjects(
        data.map((s, i) => ({
          ...s,
          number: i + 1,
        }))
      );
      setParsedSubjects([]);
      setPresetMode(false);
      setParsedHasGrades(false);
    } else {
      setParsedSubjects(data);
      setPresetMode(true);
      setParsedHasGrades(hasGrades);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <div className="absolute top-4 right-4">
          <Card className="flex flex-row w-fit h-fit m-2 items-center rounded-full p-1 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("mailto:stephenpaul4040@gmail.com", "_blank")
              }
              className="rounded-full text-red-400 hover:text-red-800"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://github.com/stephenpaul-03", "_blank")
              }
              className="rounded-full text-gray-400 hover:text-gray-800"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://linkedin.com/in/stephen-paul-i", "_blank")
              }
              className="rounded-full text-blue-400 hover:text-blue-800"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Separator
              orientation="vertical"
              className="h-6 bg-accent-foreground"
            />
            <>
              <ModeToggle />
            </>
          </Card>
        </div>

        {/* Main Section */}
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="min-w-4xl items-center flex justify-center">
            <Calculator
              subjects={subjects}
              onSubjectsChange={setSubjects}
              onResultsChange={(res) => {
                setResults(res);
                setOpen(true);
              }}
              uploadButton={<Presets onDone={handlePresetsDone} />}
              presetMode={presetMode}
              parsedSubjects={parsedSubjects}
              parsedHasGrades={parsedHasGrades}
            />
          </div>
        </div>

        {/* Results Dialog */}
        {results && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl sm:max-w-4xl bg-background/95 backdrop-blur-2xl rounded-4xl">
              <Result results={results} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Toaster />
    </ThemeProvider>
  );
};

export default Dashboard;
