"use client"

import { useState } from "react"
import type { ResultProps } from "../types/results.types"
import { computeResultData } from "../hooks/use-results"
import { ResultView } from "../views/results.view"
import { downloadExcel, downloadPDF } from "@/utils/download.browser"

export default function Result({ results }: ResultProps) {
  const [activeTab, setActiveTab] = useState("all")

  const computed = computeResultData(results, activeTab)

  return (
    <ResultView
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      semesterTabs={computed.semesterTabs}
      rows={computed.rows}
      totalCredits={computed.totalCredits}
      totalScore={computed.totalScore}
      semesterGPA={computed.semesterGPA}
      cgpaTill={computed.cgpaTill}
      onDownloadPDF={() =>
        downloadPDF(
          results,
          () => computed.semesterGPA,
          () => computed.cgpaTill
        )
      }
      onDownloadExcel={() =>
        downloadExcel(
          results,
          () => computed.semesterGPA,
          () => computed.cgpaTill
        )
      }
    />
  )
}
