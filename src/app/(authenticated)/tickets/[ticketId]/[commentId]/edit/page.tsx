import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CardCompact } from "@/components/card-compact"
import { Separator } from "@/components/ui/separator"
import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner"
import { CommentUpsertForm } from "@/features/comment/components/comment-upsert-form"
import { getComment } from "@/features/comment/queries/get-comment"
import { getTicket } from "@/features/ticket/queries/get-ticket"
import { homePath, ticketPath } from "@/paths"
import { truncate } from "@/utils/truncate"

type CommentEditPageProps = {
  params: Promise<{
    ticketId: string
    commentId: string
  }>
}

const CommentEditPage = async ({ params }: CommentEditPageProps) => {
  const { ticketId, commentId } = await params
  const ticket = await getTicket(ticketId)
  const comment = await getComment(commentId)
  const { user } = await getAuth()

  const isTicketFound = !!ticket
  const isCommentFound = !!comment
  const isCommentOwner = isOwner(user, comment)

  if (!isTicketFound || !isCommentFound || !isCommentOwner) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: truncate(comment.content, 7), href: ticketPath(ticketId) },
        ]}
      />

      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Edit Comment"
          description={`Edit an existing comment`}
          className="w-full max-w-[420px] animate-fade-from-top"
          content={<CommentUpsertForm ticketId={ticketId} comment={comment} />}
        />
      </div>
    </div>
  )
}

export default CommentEditPage
