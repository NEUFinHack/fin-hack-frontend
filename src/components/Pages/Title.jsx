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
      const eventDate = new Date('2025-01-18T10:00:00')
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
      <div className="bg-cover bg-center  w-screen min-h-screen bg-no-repeat"  style={{ backgroundImage: 'url(/assets/background.png)'}}>

      {/* Navigation */}
      <Navbar/>
      

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 text-center mt-16 sm:mt-24 md:mt-32">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 bg-[#0a1628] p-2 rounded-lg">FINHACKS 2025</h1>
          <p className="text-xl sm:text-2xl md:text-4xl text-[#c5f82a] mb-10 sm:mb-16 md:mb-20 bg-[#0a1628] p-1 rounded-lg">01.18 - 01.19</p>

          <h2 className="text-xl sm:text-2xl md:text-4xl text-white mb-6 sm:mb-8 bg-[#0a1628] p-2 rounded-lg">MARKET OPENS IN</h2>
          
          {/* Countdown Timer */}
          <div className="w-full max-w-4xl px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-16">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINUTES' },
                { value: timeLeft.seconds, label: 'SECONDS' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-white w-full py-4 sm:py-6 md:py-8 lg:py-12 rounded-lg">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1628]">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-white mt-2 text-sm sm:text-base">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}