import { JudgeCard } from "./components/judge-card"

const judges = [
  {
    id: "1",
    name: "Judge One",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-14%20at%2010.59.00%E2%80%AFPM-9LIwJ5ysIFnzOhJyYo8XZl9lUkJjGw.png",
    linkedIn: "https://linkedin.com/in/judge1"
  },
  {
    id: "2",
    name: "Judge Two",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-14%20at%2010.59.00%E2%80%AFPM-9LIwJ5ysIFnzOhJyYo8XZl9lUkJjGw.png",
    linkedIn: "https://linkedin.com/in/judge2"
  },
  {
    id: "3",
    name: "Judge Three",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-14%20at%2010.59.00%E2%80%AFPM-9LIwJ5ysIFnzOhJyYo8XZl9lUkJjGw.png",
    linkedIn: "https://linkedin.com/in/judge3"
  },
  {
    id: "4",
    name: "Judge Four",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-14%20at%2010.59.00%E2%80%AFPM-9LIwJ5ysIFnzOhJyYo8XZl9lUkJjGw.png",
    linkedIn: "https://linkedin.com/in/judge4"
  },
  {
    id: "5",
    name: "Judge Five",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-14%20at%2010.59.00%E2%80%AFPM-9LIwJ5ysIFnzOhJyYo8XZl9lUkJjGw.png",
    linkedIn: "https://linkedin.com/in/judge5"
  },
  {
    id: "6",
    name: "Judge Six",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-14%20at%2010.59.00%E2%80%AFPM-9LIwJ5ysIFnzOhJyYo8XZl9lUkJjGw.png",
    linkedIn: "https://linkedin.com/in/judge6"
  }
]

export default function JudgesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12 text-center text-4xl font-bold tracking-tight">
        SPEAKERS/ JUDGES
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {judges.map((judge) => (
          <JudgeCard key={judge.id} judge={judge} />
        ))}
      </div>
    </div>
  )
}

