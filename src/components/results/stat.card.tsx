import { Card, CardContent } from "@/components/ui/card"

type Props = {
  label: string
  value: string | number
}

export function ResultStatCard({ label, value }: Props) {
  return (
    <Card className="min-h-[80px] md:h-[10vh] flex items-center justify-center">
      <CardContent className="p-4 text-center">
        <span className="text-sm text-muted-foreground block">
          {label}
        </span>
        <span className="text-lg font-semibold block">
          {value}
        </span>
      </CardContent>
    </Card>
  )
}
