"use client";

import { useState } from "react";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import Calculator from "@/components/Calculator";
import Result from "@/components/Result";
import type { GPAResults } from "@/components/Calculator_Logic";
import { Mail, Github, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./theme_toggle/mode-toggle";
import { ThemeProvider } from "./theme_toggle/theme-provider";
import Presets from "@/components/Preset_Logic"; // this is your Presets.tsx file
import { type Subject } from "@/components/SubjectRow";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
const Dashboard = () => {
  // calculator subjects
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

  // GPA results
  const [results, setResults] = useState<GPAResults | null>(null);
  const [open, setOpen] = useState(false);

  // Preset handling
  const [parsedSubjects, setParsedSubjects] = useState<Subject[]>([]);
  const [presetMode, setPresetMode] = useState(false);
  const [parsedHasGrades, setParsedHasGrades] = useState(false);

  // When Presets finishes parsing or applying
  const handlePresetsDone = (result: {
    parsedSubjects: Subject[];
    mode: "preset" | "apply";
    hasGrades: boolean;
  }) => {
    const { parsedSubjects: data, mode, hasGrades } = result;

    if (mode === "apply") {
      // Apply directly to calculator
      setSubjects(
        data.map((s, i) => ({
          ...s,
          number: i + 1,
        }))
      );
      setParsedSubjects([]);
      setPresetMode(false);
      setParsedHasGrades(false);
      toast("Uploaded data applied directly to calculator.");
    } else {
      // Use as preset: show filter dropdown in calculator
      setParsedSubjects(data);
      setPresetMode(true);
      setParsedHasGrades(hasGrades);
      toast("Preset loaded. Use the filter to apply semesters.");
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <div className="absolute top-4 right-4">
          <Menubar className="w-fit h-fit m-2 flex items-center rounded-full p-2 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("mailto:stephenpaul4040@gmail.com", "_blank")
              }
              className="hover:text-destructive rounded-full"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://github.com/stephenpaul-03", "_blank")
              }
              className="hover:text-muted-foreground rounded-full"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://linkedin.com/in/stephen-paul-i", "_blank")
              }
              className="hover:text-primary rounded-full"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Separator
              orientation="vertical"
              className="h-6 bg-accent-foreground"
            />
            <MenubarMenu>
              <ModeToggle />
            </MenubarMenu>
          </Menubar>
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
              // upload button (icon) goes inside calculator toolbar
              uploadButton={<Presets onDone={handlePresetsDone} />}
              // preset props passed in
              presetMode={presetMode}
              parsedSubjects={parsedSubjects}
              parsedHasGrades={parsedHasGrades}
            />
          </div>
        </div>

        {/* Results Dialog */}
        {results && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-6xl sm:max-w-4xl bg-background/95 backdrop-blur-2xl">
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
