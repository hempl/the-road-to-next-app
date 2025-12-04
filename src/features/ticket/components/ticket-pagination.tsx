"use client"

import { useQueryState, useQueryStates } from "nuqs"
import { useEffect, useRef } from "react"
import { Pagination } from "@/components/pagination/pagination"
import { PaginatedData } from "@/components/pagination/types"
import { paginationOptions, paginationParser, searchParser } from "../search-params"

type TicketMetadata = {
  count: number
  hasNextPage: boolean
}

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginatedData<TicketMetadata>["metadata"]
}

const TicketPagination = ({ paginatedTicketMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions)

  const [search] = useQueryState("search", searchParser)
  const prevSearch = useRef(search)

  useEffect(() => {
    if (search === prevSearch.current) return
    prevSearch.current = search

    setPagination({ ...pagination, page: 0 })
  }, [pagination, search, setPagination])

  return <Pagination pagination={pagination} onPagination={setPagination} paginatedMetadata={paginatedTicketMetadata} />
}

export { TicketPagination }
