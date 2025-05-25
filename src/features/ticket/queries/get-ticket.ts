import { initialTickets } from "@/data"
import { Ticket } from "../types"

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  // wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const maybeTicket = initialTickets.find((ticket) => ticket.id === ticketId)
  return new Promise((resolve) => {
    resolve(maybeTicket || null)
  })
}
