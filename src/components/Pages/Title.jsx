'use client'
import { useEffect, useState } from 'react'
import Navbar from '../NavBar'

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
      <div className="bg-cover bg-center  w-screen min-h-screen bg-no-repeat"  style={{ backgroundImage: `url(src/assets/background.png) `}}>

      {/* Navigation */}
      <Navbar/>
      

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 text-center mt-32">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-[#0a1628] p-2 rounded-lg">FINHACK 2024</h1>
        <p className="text-2xl md:text-4xl text-[#c5f82a] mb-20 bg-[#0a1628] p-1 rounded-lg ">01.16 - 01.17</p>

        <h2 className="text-2xl md:text-4xl text-white mb-8 bg-[#0a1628] p-2 rounded-lg">MARKET OPENS IN</h2>
        {/* Countdown Timer */}
        <div className="w-8/12 max-w-4xl">
          
          <div className="grid grid-cols-4 gap-16">
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-12 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.days}</span>
              </div>
              <span className="text-white mt-2">DAYS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-12 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.hours}</span>
              </div>
              <span className="text-white mt-2">HOURS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-12 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.minutes}</span>
              </div>
              <span className="text-white mt-2">MINUTES</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/90 w-full py-12 rounded-lg">
                <span className="text-3xl md:text-5xl font-bold text-[#0a1628]">{timeLeft.seconds}</span>
              </div>
              <span className="text-white mt-2">SECONDS</span>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}