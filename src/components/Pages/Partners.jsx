'use client'
import Marquee from 'react-fast-marquee'
import Card from 'react-bootstrap/Card';

const partners = [
  {
    id: 1,
    name: "Sandbox",
    logo: "/assets/sandbox.png",
    border: "border-[#C0C0C0]",
    url: ""
  },
  {
    id: 2,
    name: "Rev",
    logo: "/assets/rev.jpeg",
    border: "border-[#C0C0C0]",
    url: ""
  },
  {
    id: 3,
    name: "Scout",
    logo: "/assets/scout.png",
    border: "border-[#C0C0C0]",
    url:""
  },
  {
    id: 4,
    name: "Idea",
    logo: "/assets/idea.jpeg",
    border: "border-[#C0C0C0]",
    url: ""
  },
  {
    id: 5,
    name: "NEU BlockChain",
    logo: "/assets/blockchain.png",
    border: "border-[#C0C0C0]",
    url: ""
  }

]
export default function Partners() {
  return (
    <div  id="partners" className="w-full bg-[#0a1628] flex items-center justify-center p-4 md:p-8">
      <Card className="w-full bg-white/60 backdrop-blur-sm shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-8 text-gray-800">
          PARTNERS
        </h2>
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-4"
        >
          {partners.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                mx-8 
                bg-white 
                rounded-lg 
                p-4 
                shadow-md 
                flex 
                items-center 
                justify-center 
                min-w-[200] 
                h-[200] 
                border-4 
                ${sponsor.border} 
                hover:scale-105 
                transition-transform 
                duration-300 
                ease-in-out
                cursor-pointer
              `}
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                width={150}
                height={150}
                className="object-contain"
              />
            </a>
          ))}
        </Marquee>
      </Card>
    </div>
  )
}