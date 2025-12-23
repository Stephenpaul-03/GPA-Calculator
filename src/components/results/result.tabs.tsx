import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  activeTab: string
  setActiveTab: (v: string) => void
  semesterTabs: string[]
}

export function ResultTabs({
  activeTab,
  setActiveTab,
  semesterTabs,
}: Props) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="w-full overflow-x-auto">
        <TabsList className="flex-nowrap">
          {semesterTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab === "all" ? "All Semesters" : tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  )
}
