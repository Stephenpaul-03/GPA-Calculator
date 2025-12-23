import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/helpers"
import type { SubjectRowViewProps } from "../types/subjectRow.types"
import { SubjectRowIndexCell } from "../components/subjectRow/index.cell"
import { SubjectRowFields } from "../components/subjectRow/fields"
import { SubjectRowDeleteAlert } from "../components/subjectRow/delete.alert"

export const SubjectRowView = forwardRef<
  HTMLDivElement,
  SubjectRowViewProps
>(
  (
    {
      index,
      subject,
      deleteMode,
      openDelete,
      dontAskAgain,
      onIndexClick,
      confirmDelete,
      setOpenDelete,
      setDontAskAgain,
      updateSubject,
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const tooltipSide = isMobile ? "bottom" : "left"

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "subject-row grid items-center p-1 select-none gap-3 max-w-4xl",
            "grid-cols-[40px_80px_minmax(200px,1fr)_minmax(200px,2fr)_minmax(90px,100px)_minmax(90px,100px)]",
            "sm:grid-cols-[40px_80px_minmax(200px,1fr)_minmax(200px,2fr)_minmax(90px,100px)_minmax(90px,100px)]"
          )}
        >
          <SubjectRowIndexCell
            index={index}
            deleteMode={deleteMode}
            onClick={onIndexClick}
            tooltipSide={tooltipSide}
          />

          <SubjectRowFields
            index={index}
            subject={subject}
            updateSubject={updateSubject}
          />
        </div>

        <SubjectRowDeleteAlert
          open={openDelete}
          setOpen={setOpenDelete}
          dontAskAgain={dontAskAgain}
          setDontAskAgain={setDontAskAgain}
          confirmDelete={confirmDelete}
        />
      </>
    )
  }
)

SubjectRowView.displayName = "SubjectRowView"
