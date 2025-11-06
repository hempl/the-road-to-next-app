"use client"

import { Comment } from "@prisma/client"
import { useActionState } from "react"
import { FieldError } from "@/components/form/components/field-error"
import { Form } from "@/components/form/components/form"
import { SubmitButton } from "@/components/form/components/submit-button"
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state"
import { Textarea } from "@/components/ui/textarea"
import { upsertComment } from "@/features/comment/actions/upsert-comment"

type CommentUpsertFormProps = {
  ticketId: string
  comment?: Comment
}
const CommentUpsertForm = ({ ticketId, comment }: CommentUpsertFormProps) => {
  const [actionState, action] = useActionState(upsertComment.bind(null, ticketId, comment?.id), EMPTY_ACTION_STATE)

  return (
    <Form action={action} actionState={actionState}>
      <Textarea
        name="content"
        placeholder="What's on your mind ..."
        defaultValue={(actionState.payload?.get("content") as string) ?? comment?.content}
      />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label={comment ? "Edit" : "Comment"} />
    </Form>
  )
}

export { CommentUpsertForm }
