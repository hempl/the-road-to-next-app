import { LucideCircleCheck, LucideFile, LucidePencilLine } from "lucide-react"
import Link from "next/link"
import { Heading } from "@/components/heading"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { initialTickets } from "@/data"
import { ticketPath } from "@/paths"

const TICKET_ICONS = {
  OPEN: <LucideFile />,
  IN_PROGRESS: <LucidePencilLine />,
  DONE: <LucideCircleCheck />,
}
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="TicketsPage" description="All your tickets at one place"></Heading>
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex gap-2">
                <span>{TICKET_ICONS[ticket.status]}</span>
                <span className="text-lg font-semibold truncate">{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="line-clamp-3 whitespace-break-spaces">{ticket.content}</span>
            </CardContent>
            <CardFooter>
              <Link href={ticketPath(ticket.id)} className="text-sm underline">
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TicketsPage
