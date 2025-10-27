import { SearchParams } from "nuqs"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { CardCompact } from "@/components/card-compact"
import { Heading } from "@/components/heading"
import { Placeholder } from "@/components/placeholder"
import { Spinner } from "@/components/spinner"
import { getAuth } from "@/features/auth/actions/get-auth"
import { TicketList } from "@/features/ticket/components/ticket-list"
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form"
import { searchParamsCache } from "@/features/ticket/search-params"
// import { getBaseUrl } from "@/utils/url"

type TicketsPageProps = {
  searchParams: Promise<SearchParams>
}

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth()

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
        <CardCompact
          title="Create Ticket"
          description="A new ticket will be created"
          className="w-full max-w-[420px] self-center"
          content={<TicketUpsertForm />}
        ></CardCompact>

        <Suspense fallback={<Spinner />}>
          <TicketList userId={user?.id} searchParams={await searchParamsCache.parse(searchParams)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default TicketsPage
