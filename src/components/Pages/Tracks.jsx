export default function Tracks() {
  const tracks = [
    {
      name: "Track one",
      description: "short description of what track is about",
      mainNumber: "151.01",
      subNumber: "181.45"
    },
    {
      name: "Track two",
      description: "short description of what track is about",
      mainNumber: "151.01",
      subNumber: "181.45"
    },
    {
      name: "Track three",
      description: "short description of what track is about",
      mainNumber: "151.01",
      subNumber: "181.45"
    },
    {
      name: "Track four",
      description: "short description of what track is about",
      mainNumber: "151.01",
      subNumber: "181.45"
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
      <section id="tracks" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl">
          {/* Outer glass card */}
          <div className="absolute inset-2 bg-white/20 backdrop-blur-sm rounded-lg" />
          
          {/* Inner glass card */}
          <div className="relative bg-white/60 backdrop-blur-md rounded-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-8 text-center">
              TRACKS
            </h1>
            
            <div className="space-y-6">
              {tracks.map((track, index) => (
                <div key={track.name} className="relative">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-start justify-between">
                      <h2 className="text-2xl font-semibold text-[#0a1628]">
                        {track.name}
                      </h2>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-mono text-[#0a1628]">
                          {track.mainNumber}
                        </span>
                        <span className="px-2 py-1 bg-[#c5f82a] rounded-full text-xs font-medium text-[#0a1628]">
                          {track.subNumber}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#0a1628]/80">
                      {track.description}
                    </p>
                  </div>
                  {index < tracks.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0a1628]/10 -mb-3" />
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