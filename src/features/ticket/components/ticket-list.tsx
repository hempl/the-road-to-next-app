import { Placeholder } from "@/components/placeholder"
import { TicketItem } from "@/features/ticket/components/ticket-item"
import { getTickets } from "@/features/ticket/queries/get-tickets"
import { ParsedSearchParams } from "../search-params"
import { TicketPagination } from "./ticket-pagination"
import { TicketSearchInput } from "./ticket-search-input"
import { TicketSortSelect } from "./ticket-sort-select"

type ticketListProps = {
  userId?: string
  searchParams: ParsedSearchParams
}

const TicketList = async ({ userId, searchParams }: ticketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(userId, searchParams)
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
            { label: "Oldest", sortKey: "createdAt", sortValue: "asc" },
            { label: "Bounty", sortKey: "bounty", sortValue: "desc" },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  )
}

export { TicketList }
