"use client"

import { LucidePencil } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { commentEditPath } from "@/paths"

type CommentEditButtonProps = {
  ticketId: string
  id: string
}

const CommentEditButton = ({ ticketId, id }: CommentEditButtonProps) => {
  return (
    <Button variant="outline" size="icon">
      <Link prefetch href={commentEditPath(ticketId, id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  )
}

export { CommentEditButton }
