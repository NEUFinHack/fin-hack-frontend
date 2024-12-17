'use client'
import Marquee from 'react-fast-marquee'
import Card from 'react-bootstrap/Card';
const sponsors = [
  {
    id: 1,
    name: "DMSB",
    logo: "public/assets/DMSB N Logo Cropped.webp",
    border: "border-[#cd7f32]",
  },
  {
    id: 2,
    name: "SVB",
    logo: "public/assets/SVB.png",
    border: "border-[#FFD700]",
  },
  {
    id: 3,
    name: "Google",
    logo: "public/assets/Google.jpg",
    border: "border-[#cd7f32]",
  },
  {
    id: 4,
    name: "HRT",
    logo: "public/assets/HRT.png",
    border: "border-[#C0C0C0]",
  },
  {
    id: 5,
    name: "RedBull",
    logo: "public/assets/redbull.png",
    border: "border-[#cd7f32]",
  },
  {
    id: 6,
    name: "Percent",
    logo: "public/assets/Percent.png",
    border: "border-[#C0C0C0]",
  }

]
export default function Sponsors() {
  return (
    <div className="w-full bg-[#0a1628] flex items-center justify-center p-4 md:p-8">
      <Card className="w-full bg-white/60 backdrop-blur-sm shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-8 text-gray-800">
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
              className={`
                mx-8 
                bg-white 
                rounded-lg 
                p-4 
                shadow-md 
                flex 
                items-center 
                justify-center 
                min-w-[240px] 
                h-[180px] 
                border-4 
                ${sponsor.border} 
                hover:scale-105 
                transition-transform 
                duration-300 
                ease-in-out
              `}
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