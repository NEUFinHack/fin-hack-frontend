// 'use client'

// // import { Card, CardContent } from "@/components/ui/card"
// import Image from "next/image"
import Card from 'react-bootstrap/Card';

const speakers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Leading researcher in quantum computing with over 15 years of experience in developing quantum algorithms. Currently heading the Quantum Computing Initiative at Tech University.",
  },
  {
    id: 2,
    name: "Prof. Marcus Rodriguez",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Distinguished professor of Artificial Intelligence at Global Institute of Technology. Pioneer in developing ethical AI frameworks and author of 'AI in the Modern World'.",
  },
  {
    id: 3,
    name: "Dr. Emily Thompson",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Renowned expert in cybersecurity and blockchain technology. Founded SecureChain Solutions and advises Fortune 500 companies on digital security strategies.",
  },
  {
    id: 4,
    name: "Alex Kumar",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Innovation leader at Future Technologies, specializing in AR/VR development. Led the development of groundbreaking mixed reality applications for education.",
  }
]

export default function Speakers() {
  return (

    <div id="speakers" className="min-h-screen bg-[#0a1628] relative overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0">
            <div className="absolute inset-0">
              {/* Vertical lines */}
              <div className="absolute left-1/4 top-0 h-full w-[1px] bg-white/10" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/10" />
              <div className="absolute left-3/4 top-0 h-full w-[1px] bg-white/10" />
              
              {/* Horizontal lines */}
              <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/10" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
              <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white/10" />
              
              {/* Accent rectangles */}
              <div className="absolute top-1/4 left-1/2 w-1/3 h-24 bg-white/5" />
              <div className="absolute top-2/3 left-1/4 w-1/4 h-32 bg-white/5" />
            </div>
          </div>

          
      <section id="speakers" className="relative bg-white/60 backdrop-blur-md rounded-lg p-12 max-w-2xl mx-auto mt-48 mb-64">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">SPEAKERS</h1>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {speakers.map((speaker) => (
            <Card key={speaker.id} className="bg-white/90 shadow-lg">
              <Card.Body className="p-0">
                <div className="bg-[#e2ff3d] text-black font-medium py-2 px-4 rounded-t-lg">
                  {speaker.name}
                </div>
                <div className="p-4 flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={speaker.image}
                      alt={`${speaker.name}'s profile`}
                      width={200}
                      height={200}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}