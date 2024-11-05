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
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
      <div className="relative bg-white/40 backdrop-blur-md rounded-lg p-12 max-w-2xl mx-auto">
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
                      width={100}
                      height={100}
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
      </div>
    </div>
  )
}