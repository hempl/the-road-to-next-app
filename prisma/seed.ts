import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
    // deadline: "2025-12-31",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499, // $4.99
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
]

const seed = async () => {
  const t0 = performance.now()
  await prisma.ticket.deleteMany()

  const promises = tickets.map((tickets) =>
    prisma.ticket.create({
      data: tickets,
    })
  )
  await Promise.all(promises)
  const t1 = performance.now()
  console.log(`DB Seed: Finished (${t1 - t0}ms)`)
}

seed()
