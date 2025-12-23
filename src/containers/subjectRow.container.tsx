"use client"

import { useEffect, useRef, useState } from "react"
import { hasRowContent } from "../hooks/use-subjectRow"
import type { SubjectRowContainerProps } from "../types/subjectRow.types"
import { SubjectRowView } from "../views/subjectRow.view"

export default function SubjectRow({
  index,
  subject,
  updateSubject,
  deleteSubject,
}: SubjectRowContainerProps) {
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [dontAskAgain, setDontAskAgain] = useState(false)
  const [skipConfirmCount, setSkipConfirmCount] = useState(0)

  const rowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
        setDeleteMode(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const onIndexClick = () => {
    if (!deleteMode) {
      setDeleteMode(true)
      return
    }

    if (!hasRowContent(subject)) {
      deleteSubject(index)
      setDeleteMode(false)
      return
    }

    if (skipConfirmCount > 0) {
      deleteSubject(index)
      setSkipConfirmCount((c) => c - 1)
      setDeleteMode(false)
      return
    }

    setOpenDelete(true)
  }

  const confirmDelete = () => {
    deleteSubject(index)
    setDeleteMode(false)

    if (dontAskAgain) {
      setSkipConfirmCount(5)
      setDontAskAgain(false)
    }
  }

  return (
    <SubjectRowView
      ref={rowRef}
      index={index}
      subject={subject}
      deleteMode={deleteMode}
      openDelete={openDelete}
      dontAskAgain={dontAskAgain}
      setDontAskAgain={setDontAskAgain}
      setOpenDelete={setOpenDelete}
      onIndexClick={onIndexClick}
      confirmDelete={confirmDelete}
      updateSubject={updateSubject}
    />
  )
}
