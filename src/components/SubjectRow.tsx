"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Subject {
  number: number;
  code: string;
  semester: string;
  name: string;
  credits: string;
  grade: string;
}

interface SubjectRowProps {
  index: number;
  subject: Subject;
  updateSubject: (index: number, field: keyof Subject, value: string) => void;
  deleteSubject: (index: number) => void;
}

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const grades = ["O", "A+", "A", "B+", "B", "C+", "C"];

const SubjectRow: React.FC<SubjectRowProps> = ({
  index,
  subject,
  updateSubject,
  deleteSubject,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const [skipConfirmCount, setSkipConfirmCount] = useState(0);

  const rowRef = useRef<HTMLDivElement>(null);

  // Detect click outside to cancel delete mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rowRef.current && !rowRef.current.contains(event.target as Node)) {
        setDeleteMode(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIndexClick = () => {
    if (!deleteMode) {
      // First click: enter delete mode
      setDeleteMode(true);
    } else {
      // Second click: check if row has content
      const hasContent =
        (subject.code && subject.code.trim() !== "") ||
        (subject.name && subject.name.trim() !== "") ||
        (subject.credits && subject.credits.trim() !== "") ||
        (subject.grade && subject.grade !== "") ||
        (subject.semester && subject.semester !== "");

      if (hasContent) {
        // Show confirmation dialog if row has content
        if (skipConfirmCount > 0) {
          deleteSubject(index);
          setSkipConfirmCount((c) => c - 1);
          setDeleteMode(false);
        } else {
          setOpenDelete(true);
        }
      } else {
        // Delete immediately if row is empty
        deleteSubject(index);
        setDeleteMode(false);
      }
    }
  };

  const interactiveStyle = cn(
    "outline-none relative border border-input rounded-full",
    "transition-colors duration-200 ease-in",
    // "focus:border-foreground",
    // "focus:ring-1 focus:ring-ring",
    // "focus:ring-offset-0",
    // "focus-visible:border-foreground",
    // "focus-visible:ring-1 focus-visible:ring-ring",
    // "focus-visible:ring-offset-0"
  );

  return (
    <>
      <div
        ref={rowRef}
        className={cn(
          "subject-row interactive-top-bottom grid items-center p-1 select-none gap-3 max-w-4xl",
          "grid-cols-[40px_60px_minmax(120px,1fr)_minmax(120px,2fr)_minmax(64px,96px)_minmax(98px,98px)]",
          "sm:grid-cols-[40px_80px_minmax(140px,1fr)_minmax(160px,2fr)_minmax(72px,100px)_minmax(100px,100px)]"
        )}
      >
        {/* 1. Index (click to toggle delete mode) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "flex items-center justify-center h-9 w-9 rounded-full text-sm cursor-pointer select-none transition-all duration-200 border bg-accent",
                deleteMode
                  ? "bg-destructive/10 text-destructive border-destructive/20"
                  : "text-muted-foreground"
              )}
              onClick={handleIndexClick}
            >
              {deleteMode ? <Trash2 className="h-4 w-4" /> : index + 1}
            </div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Double-click to delete</p>
          </TooltipContent>
        </Tooltip>
        {/* 2. Semester */}
        <Select
          value={subject.semester}
          onValueChange={(val) => updateSubject(index, "semester", val)}
        >
          <SelectTrigger className={cn("w-full h-10 px-3", interactiveStyle)}>
            <SelectValue placeholder="Sem" />
          </SelectTrigger>
          <SelectContent className="p-0">
            {semesters.map((sem) => (
              <SelectItem key={sem} value={sem}>
                {sem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 3. Subject Code */}
        <Input
          value={subject.code}
          onChange={(e) => updateSubject(index, "code", e.target.value)}
          placeholder="Subject Code"
          className={cn("w-full h-10 text-center", interactiveStyle)}
        />

        {/* 4. Subject Name */}
        <Input
          value={subject.name}
          onChange={(e) => updateSubject(index, "name", e.target.value)}
          placeholder="Subject Name"
          className={cn("w-full h-10", interactiveStyle)}
        />

        {/* 5. Credits */}
        <Input
          type="number"
          value={subject.credits}
          onChange={(e) => updateSubject(index, "credits", e.target.value)}
          placeholder="Credits"
          min={0}
          max={6}
          className={cn(
            "min-w-[64px] h-10 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]",
            interactiveStyle
          )}
        />

        {/* 6. Grade */}
        <Select
          value={subject.grade}
          onValueChange={(val) => updateSubject(index, "grade", val)}
        >
          <SelectTrigger
            className={cn(
              "min-w-[90px] h-10 text-center px-3",
              interactiveStyle
            )}
          >
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent className="w-[var(--radix-select-trigger-width)]">
            {grades.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subject?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Do you really want to delete this
              row?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex items-center gap-2 py-2">
            <Switch
              checked={dontAskAgain}
              onCheckedChange={(val) => setDontAskAgain(val)}
            />
            <span className="text-sm text-muted-foreground">
              Don't ask again for next 5 deletions
            </span>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteMode(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteSubject(index);
                setDeleteMode(false);
                if (dontAskAgain) {
                  setSkipConfirmCount(5);
                  setDontAskAgain(false);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubjectRow;
