"use client";

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Upload } from "lucide-react";
import { type Subject } from "@/components/SubjectRow";
import UploadArea from "@/components/ui/upload";
import { toast } from "sonner";

interface PresetsResult {
  parsedSubjects: Subject[];
  mode: "preset" | "apply";
  hasGrades: boolean;
}

interface PresetsProps {
  onDone: (result: PresetsResult) => void;
}
const Presets: React.FC<PresetsProps> = ({ onDone }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedSubjects, setParsedSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showGradeDialog, setShowGradeDialog] = useState(false);
  const [hasGrades, setHasGrades] = useState(false);

  useEffect(() => {
    if (!selectedFile) return;

    const name = selectedFile.name.toLowerCase();
    if (!(name.endsWith(".xls") || name.endsWith(".xlsx"))) {
      setError("Please upload a valid Excel (.xls or .xlsx) file.");
      setParsedSubjects([]);
      setHasGrades(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        });

        const subjects: Subject[] = jsonData
          .map((row, idx) => {
            const credits = row["credits"]?.toString().trim();
            if (!credits) return null;
            return {
              number: idx + 1,
              semester: row["semester"]?.toString().trim() || "",
              code: row["subjectcode"]?.toString().trim() || "",
              name: row["subjectname"]?.toString().trim() || "",
              credits,
              grade: row["grade"]?.toString().trim() || "",
            };
          })
          .filter((s): s is Subject => s !== null);

        if (subjects.length === 0) {
          setError("No valid rows found. Each row must include credits.");
          setParsedSubjects([]);
          setHasGrades(false);
          return;
        }

        const gradeColumnPresent = jsonData.some((row) => {
          return (
            Object.prototype.hasOwnProperty.call(row, "grade") &&
            row["grade"] !== ""
          );
        });

        setParsedSubjects(subjects);
        setHasGrades(gradeColumnPresent);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to parse Excel file.");
        setParsedSubjects([]);
        setHasGrades(false);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  }, [selectedFile]);
  const resetState = () => {
    setSelectedFile(null);
    setParsedSubjects([]);
    setHasGrades(false);
    setError(null);
  };
  const handleAddClick = () => {
    if (parsedSubjects.length === 0) {
      setError("No parsed data to add.");
      return;
    }

    if (hasGrades) {
      setShowGradeDialog(true);
      return;
    }

    onDone({ parsedSubjects, mode: "preset", hasGrades: false });
    toast("Parsed — open the filter to apply semesters.");
    resetState();
    setOpen(false);
  };

  const handleApplyDirectly = () => {
    if (parsedSubjects.length === 0) return;
    onDone({ parsedSubjects, mode: "apply", hasGrades });
    const presetSubjects = parsedSubjects.map((s) => ({
      ...s,
      grade: "",
    }));
    onDone({ parsedSubjects: presetSubjects, mode: "preset", hasGrades });
    toast("Data applied directly and preset saved for reuse.");
    resetState();
    setShowGradeDialog(false);
    setOpen(false);
  };

  const handleUseAsPreset = () => {
    if (parsedSubjects.length === 0) return;
    const presetSubjects = parsedSubjects.map((s) => ({
      ...s,
      grade: "",
    }));
    onDone({ parsedSubjects: presetSubjects, mode: "preset", hasGrades });
    resetState();
    setShowGradeDialog(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            resetState();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full h-10 w-10 dark:hover:text-teal-500"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-md rounded-4xl backdrop-blur-2xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Upload Excel Preset</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <UploadArea onFileSelect={(f) => setSelectedFile(f)} />
            {selectedFile && (
              <div className="text-sm">
                <div>Selected file: {selectedFile.name}</div>
                <div className="text-muted-foreground">
                  Parsed rows: {parsedSubjects.length}
                  {hasGrades ? " • grade column detected" : ""}
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <Button
            onClick={handleAddClick}
            disabled={!selectedFile || parsedSubjects.length === 0}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Grade Column Detected</AlertDialogTitle>
            <AlertDialogDescription>
              This file includes grades. Do you want to use them as a preset
              (choose which semesters to apply later) or apply the data directly
              to the calculator now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowGradeDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleUseAsPreset}>
              Use as Preset
            </AlertDialogAction>
            <AlertDialogAction onClick={handleApplyDirectly}>
              Apply Directly
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Presets;
