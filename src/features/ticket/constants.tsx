import { LucideCircleCheck, LucideFile, LucidePencilLine } from "lucide-react"

export const TICKET_ICONS = {
  OPEN: <LucideFile />,
  IN_PROGRESS: <LucidePencilLine />,
  DONE: <LucideCircleCheck />,
}

export const TICKET_STATUS_LABELS = {
  OPEN: "open",
  IN_PROGRESS: "in progress",
  DONE: "done",
}
