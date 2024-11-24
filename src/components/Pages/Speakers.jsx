

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
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 text-center pb-16">
            Coming Soon
        </div>
      </section>
    </div>
  )
}