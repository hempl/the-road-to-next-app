import { CardCompact } from "@/components/card-compact"
import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner"
import { CommentWithMetadata } from "../types"
import { CommentDeleteButton } from "./comment-delete-button"
import { CommentEditButton } from "./comment-edit-button"
import { CommentItem } from "./comment-item"
import { CommentUpsertForm } from "./comment-upsert-form"

type CommentsProps = {
  ticketId: string
  comments?: CommentWithMetadata[]
}

const Comments = async ({ ticketId, comments = [] }: CommentsProps) => {
  const { user } = await getAuth()
  return (
    <div className="flex flex-col gap-y-2">
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentUpsertForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              buttons={[
                ...(isOwner(user, comment)
                  ? [
                      <CommentDeleteButton key="0" id={comment.id} />,
                      <CommentEditButton key="1" ticketId={ticketId} id={comment.id} />,
                    ]
                  : []),
              ]}
            />
          )
        })}
      </div>
    </div>
  )
}

export { Comments }
