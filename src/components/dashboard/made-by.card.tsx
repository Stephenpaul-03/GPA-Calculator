import { Card } from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/helpers"
import { cn } from "@/lib/utils"

type Props = {
    href?: string
}

export function MadeByCard({ href }: Props) {
    const isMobile = useIsMobile()

    const handleClick = () => {
        if (!href) return
        window.open(href, "_blank", "noopener,noreferrer")
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Card
                    onClick={handleClick}
                    className="fixed bottom-3 right-3 z-40 px-3 py-1.5 rounded-full cursor-pointer text-xs bg-background/70 backdrop-blur border transition-colors select-none group font-body"
                >
                    <span className="text-muted-foreground">
                        Over-engineered by{" "}
                        <span
                            className={cn(
                                "transition-colors",
                                isMobile
                                    ? "text-teal-800"
                                    : "group-hover:text-teal-800"
                            )}
                        >
                            Stephen Paul I
                        </span>
                    </span>
                </Card>
            </TooltipTrigger>

            <TooltipContent side="left" color="teal">
                Portfolio under construction.
            </TooltipContent>
        </Tooltip>
    )
}
