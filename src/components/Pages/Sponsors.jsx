'use client'

import Marquee from 'react-fast-marquee'
import Card from 'react-bootstrap/Card';


const sponsors = [
  {
    id: 1,
    name: "IRT",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    id: 2,
    name: "Fidelity Investments",
    logo: "/placeholder.svg?height=60&width=180",
  },
  {
    id: 3,
    name: "JPMorgan Chase & Co.",
    logo: "/placeholder.svg?height=60&width=200",
  },
  {
    id: 4,
    name: "Google",
    logo: "/placeholder.svg?height=60&width=160",
  },
  {
    id: 5,
    name: "Microsoft",
    logo: "/placeholder.svg?height=60&width=160",
  },
  {
    id: 6,
    name: "Apple",
    logo: "/placeholder.svg?height=60&width=140",
  }
]

export default function Sponsors() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-5xl bg-gray-200/90 backdrop-blur-sm p-6 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          SPONSORS
        </h2>
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-4"
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="mx-8 bg-white rounded-lg p-4 shadow-md flex items-center justify-center min-w-[200px] h-[100px]"
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                width={200}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>
      </Card>
    </div>
  )
}