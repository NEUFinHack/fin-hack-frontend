'use client'

import Marquee from 'react-fast-marquee'
import Card from 'react-bootstrap/Card';


const sponsors = [
  {
    id: 1,
    name: "IRT",
    logo: "/src/assets/HRT.png",
  },
  {
    id: 2,
    name: "Fidelity Investments",
    logo: "/src/assets/Fidelity.png",
  },
  {
    id: 3,
    name: "JPMorgan Chase & Co.",
    logo: "/src/assets/JP Morgan Chase Logo.png",
  },
  {
    id: 4,
    name: "Google",
    logo: "/src/assets/Google.jpg",
  },
  {
    id: 5,
    name: "Microsoft",
    logo: "/src/assets/microsoft.png",
  },
  {
    id: 6,
    name: "Apple",
    logo: "/src/assets/apple.png",
  }
]

export default function Sponsors() {
  return (
    <div className="w-full bg-[#0a1628] flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-5xl bg-gray-200/30 backdrop-blur-sm  shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-8">
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
              className="mx-8 bg-white rounded-lg p-2 shadow-md flex items-center justify-center min-w-[240px] h-[160px]"
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