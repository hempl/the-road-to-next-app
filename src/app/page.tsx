import Link from "next/link"

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg">Tickets Page</h2>
      <Link href="/tickets" className="underline">
        Go to tickets
      </Link>
    </div>
  )
}

export default HomePage
