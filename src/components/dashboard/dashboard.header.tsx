import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Github, Linkedin } from "lucide-react"
import { ModeToggle } from "@/components/theme/mode-toggle"

export function DashboardHeader() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="flex flex-row items-center gap-1 rounded-full p-1 w-fit">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            window.open("mailto:stephenpaul4040@gmail.com", "_blank")
          }
          className="rounded-full shrink-0 text-red-400 hover:text-red-800"
        >
          <Mail className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            window.open("https://github.com/stephenpaul-03", "_blank")
          }
          className="rounded-full shrink-0 text-gray-400 hover:text-gray-800"
        >
          <Github className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            window.open(
              "https://linkedin.com/in/stephen-paul-i",
              "_blank"
            )
          }
          className="rounded-full shrink-0 text-blue-400 hover:text-blue-800"
        >
          <Linkedin className="h-4 w-4" />
        </Button>

        <ModeToggle />
      </Card>
    </div>
  )
}
