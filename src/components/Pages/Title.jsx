'use client'

import { useEffect, useState } from 'react'
export default function Title() {
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-01-26T00:00:00')
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center">
          <div className="text-3xl font-bold">
            <span className="text-blue-400">i</span>
            <span className="text-[#c5f82a]">D</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-white hover:text-[#c5f82a] transition-colors">
            Overview
          </a>
          <a href="#tracks" className="text-white hover:text-[#c5f82a] transition-colors">
            Tracks
          </a>
          <a href="#speakers" className="text-white hover:text-[#c5f82a] transition-colors">
            Speakers
          </a>
          <a href="#faq" className="text-white hover:text-[#c5f82a] transition-colors">
            FAQ
          </a>
          <a href="#sponsors" className="text-white hover:text-[#c5f82a] transition-colors">
            Sponsors
          </a>
        </div>
        <button className="bg-[#c5f82a] text-[#0a1628] hover:bg-[#d4ff3a] font-semibold px-8 py-2 rounded-md">
          Apply
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 text-center mt-32">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">FINHACK 2024</h1>
        <p className="text-2xl md:text-4xl text-[#c5f82a] mb-20">01.16 - 01.17</p>

        {/* Countdown Timer */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl md:text-4xl text-white mb-8">MARKET OPENS IN</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-6 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.days}</span>
              </div>
              <span className="text-white mt-2">DAYS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-6 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.hours}</span>
              </div>
              <span className="text-white mt-2">HOURS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-6 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.minutes}</span>
              </div>
              <span className="text-white mt-2">MINUTES</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-6 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.seconds}</span>
              </div>
              <span className="text-white mt-2">SECONDS</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}