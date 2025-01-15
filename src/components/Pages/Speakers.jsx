
import Card from 'react-bootstrap/Card';

const speakers = [
  {
    id: 1,
    name: "Rohan Surana",
    image: "/assets/Speakers/Rohan.jpg",
    linkedIn: "https://www.linkedin.com/in/rohansurana/", // Added LinkedIn URL
  },
  {
    id: 2,
    name: "Caleb Choy",
    image: "",
    likedIn: "https://www.linkedin.com/in/caleb-choy-0b763620a/", // Added LinkedIn URL
  },
  {
    id: 3,
    name: "Allen Lin",
    image: "/assets/Speakers/Allen.jpg",
    linkedIn: "https://www.linkedin.com/in/allenlinsh/", // Added LinkedIn URL
  },
  {
    id: 4,
    name: "Mouad Tiahi",
    image: "/assets/Speakers/Mouad.jpg",
    linkedIn: "https://www.linkedin.com/in/mouad-tiahi-0b361524b/", // Added LinkedIn URL
  },
  {
    id: 5,
    name: "Ananda Patil",
    image: "/assets/Speakers/Anad.jpg",
    linkedIn: "https://www.linkedin.com/in/ananda-patil/", // Added LinkedIn URL
  },
  {
    id: 6,
    name: "Kashyap Shah",
    image: "/assets/Speakers/Kashyap.jpg",
    linkedIn: "https://www.linkedin.com/in/kashyap-shah-profile/", // Added LinkedIn URL
  },
  {
    id: 7,
    name: "John Krupavaram Pole",
    image: "/assets/Speakers/John.jpeg",
    linkedIn: "https://www.linkedin.com/in/john-krupavaram-pole-bhakthavatsalam-5a065912a/", // Added LinkedIn URL
  },  {
    id: 8,
    name: "Karan Kothari",
    image: "/assets/Speakers/Karan.jpg",
    linkedIn: "https://www.linkedin.com/in/kotharikaran/", // Added LinkedIn URL
  },  {
    id: 9,
    name: "Jinit Shah",
    image: "/assets/Speakers/Jinit.jpg",
    linkedIn: "https://www.linkedin.com/in/jinit-shah-58264822/", // Added LinkedIn URL
  },  {
    id: 10,
    name: "Daniel Raj",
    image: "/assets/Speakers/Daniel.jpg",
    linkedIn: "https://www.linkedin.com/in/daniel-raj-07b8a3101/", // Added LinkedIn URL
  },
  {
    id: 11,
    name: "Prem Deepak",
    image: "/assets/Speakers/Prem.jpeg",
    linkedIn: "https://www.linkedin.com/in/prem-deepak-pole-john-a74a0a8b/", // Added LinkedIn URL
  },
  {
    id: 12,
    name: "Marina Watanabe",
    image: "/assets/Speakers/Marina.jpg",
    linkedIn: "https://www.linkedin.com/in/watanabemarina/", // Added LinkedIn URL
  },
  {
    id: 13,
    name: "Mikhail Kalashnikov",
    image: "",
    linkedIn: "https://linkedin.com/in/mikkqu", // Added LinkedIn URL
  },
  {
    id: 14,
    name: "Mithilesh Ramaswamy ",
    image: "/assets/Speakers/Mith.png",
    linkedIn: "https://www.linkedin.com/in/mitr/",
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

      <section className="relative bg-white/60 backdrop-blur-md rounded-lg p-12 max-w-7xl mx-auto mt-48 mb-64">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">SPEAKERS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <Card key={speaker.id} className="bg-white/90 shadow-lg overflow-hidden">
              <Card.Body className="p-0">
                <a 
                  href={speaker.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#e2ff3d] text-black font-medium py-2 px-4 hover:bg-[#d4f023] transition-colors"
                >
                  {speaker.name}
                </a>
              </Card.Body>
              <Card.Body className="p-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={`${speaker.name}'s profile`}
                      width={100}
                      height={100}
                      className=" object-cover"
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

