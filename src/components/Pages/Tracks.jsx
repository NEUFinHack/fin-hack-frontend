export default function Tracks() {
  const tracks = [
    {
      name: "Blockchain",
      description: "Explore decentralized technologies and build secure, transparent solutions for real-world challenges.",
      mainNumber: "88.09",
      subNumber: "2.15%"
    },
    {
      name: "Artificial Intelligence",
      description: "Leverage artificial intelligence to create innovative tools and solve complex problems with machine learning.",
      mainNumber: "151.01",
      subNumber: "1.72%"
    },
    {
      name: "Web/App Dev",
      description: "Design and develop dynamic web or mobile applications to enhance user experience and productivity.",
      mainNumber: "203.36",
      subNumber: "4.23%"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
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
          <div className="absolute top-1/4 right-1/4 w-1/3 h-24 bg-white/5" />
          <div className="absolute bottom-1/4 left-1/4 w-1/4 h-32 bg-white/5" />
        </div>
      </div>

      {/* Content */}
      <section id="tracks" className="relative min-h-screen flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="relative w-full max-w-2xl">
          {/* Outer glass card */}
          <div className="absolute inset-1 sm:inset-2 bg-white/20 backdrop-blur-sm rounded-lg" />
          
          {/* Inner glass card */}
          <div className="relative bg-white/60 backdrop-blur-md rounded-lg p-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628] mb-4 sm:mb-6 md:mb-8 text-center">
              TRACKS
            </h1>
            
            <div className="space-y-4 sm:space-y-6">
              {tracks.map((track, index) => (
                <div key={track.name} className="relative">
                  <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <h2 className="text-xl sm:text-2xl font-semibold text-[#0a1628] mb-1 sm:mb-0">
                        {track.name}
                      </h2>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-lg sm:text-2xl font-mono text-[#0a1628]">
                          {track.mainNumber}
                        </span>
                        <span className="px-2 py-1 bg-[#c5f82a] rounded-full text-xs font-medium text-[#0a1628]">
                          {track.subNumber}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#0a1628]/80">
                      {track.description}
                    </p>
                  </div>
                  {index < tracks.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0a1628]/10 -mb-2 sm:-mb-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

