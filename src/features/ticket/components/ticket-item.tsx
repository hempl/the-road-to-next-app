import { Prisma } from "@prisma/client"
import clsx from "clsx"
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner"
import { Comments } from "@/features/comment/components/comments"
import { TicketMoreMenu } from "@/features/ticket/components/ticket-more-menu"
import { TICKET_ICONS } from "@/features/ticket/constants"
import { ticketEditPath, ticketPath } from "@/paths"
import { toCurrencyFromCent } from "@/utils/currency"

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: { username: true }
      }
    }
  }>
  isDetail?: boolean
}

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const { user } = await getAuth()
  const isTicketOwner = isOwner(user, ticket)

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  )

  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil />
      </Link>
    </Button>
  ) : null

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null

  return (
    <div className={clsx("w-full flex flex-col gap-y-4", { "max-w-[580px]": isDetail, "max-w-[420px]": !isDetail })}>
      <div className={clsx("w-full flex gap-x-1", { "max-w-[580px]": isDetail, "max-w-[420px]": !isDetail })}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="text-lg font-semibold truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className={clsx("whitespace-break-spaces", { "line-clamp-3": !isDetail })}>{ticket.content}</span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">{toCurrencyFromCent(ticket.bounty)}</p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>

      {isDetail ? (
        <Suspense
          fallback={
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-[200px]" />
              <div className="space-y-2 ml-8">
                <Skeleton className="h-[80px]" />
                <Skeleton className="h-[80px]" />
              </div>
            </div>
          }
        >
          <Comments ticketId={ticket.id} />
        </Suspense>
      ) : null}
    </div>
  )
}

export { TicketItem }
