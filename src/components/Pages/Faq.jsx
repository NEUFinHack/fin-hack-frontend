
import { Accordion } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Faq() {
  const faqItems = [
    {
      question: "What is FinHack?",
      answer: "FinHack is a 24-hour hackathon focused on financial technology innovation where students from around the world collaborate to build cutting-edge projects.",
      status: "green"
    },
    {
      question: "When and Where is FinHack?",
      answer: "The event will take place at Northeastern Boston Campus on January 18-19",
      status: "green"
    },
    {
      question: "Who can attend?",
      answer: "Current college undergraduates are eligible to participate. Students must be enrolled during the 2024-2025 academic year.",
      status: "red"
    },
    {
      question: "How do teams work?",
      answer: "Teams can have up to 4 members. You can form teams before or during the event through our team formation activities.",
      status: "green"
    },
    {
      question: "How much does it cost?",
      answer: "The event is completely free! This includes meals, snacks, workshops, mentorship, and swag for all participants.",
      status: "red"
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, charger, personal toiletries, and any other things you need. Sleeping bag is optional.",
      status: "green"
    },
    {
      question: "When are applications due?",
      answer: "12/20/2024  11:59 PM PST",
      status: "green"
    },
    {
      question: "Will food be provided?",
      answer: "Yes! We provide all meals from Saturday breakfast through Sunday lunch, including snacks and beverages. Dietary restrictions will be accommodated.",
      status: "red"
    },
    {
      question: "Do I need coding Experience?",
      answer: "While coding experience is helpful, we welcome participants with diverse skills including design, business, and finance. We will also provide workshops and mentorship to help beginners. ",
      status: "green"
    },
    {
      question: "Additional Questions?",
      answer: "Email us at NUFintech@gmail.com for any other questions or concerns.",
      status: "green"
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
      <section id="faq" className="relative flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl">
          {/* Outer glass card */}
          <div className="absolute inset-2 bg-white/20 backdrop-blur-sm rounded-lg" />
          
          {/* Inner glass card */}
          <div className="relative bg-white/30 backdrop-blur-md rounded-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-8 text-center">
              FAQ
            </h1>
            
            <Accordion className="space-y-4">
              {faqItems.map((item, index) => (
                <Accordion.Item 
                  key={index} 
                  eventKey={index.toString()}
                  className="border-0 rounded-lg bg-white/50 backdrop-blur-sm overflow-hidden"
                >
                  <Accordion.Header className="p-0">
                    <div className="flex items-center gap-3 px-4 py-1 w-full">
                      <div
                        className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent ${
                          item.status === 'green'
                            ? 'border-b-[10px] border-b-[#c5f82a]'
                            : 'border-t-[10px] border-t-red-500'
                        }`}
                      />
                      <span className="text-[#0a1628] font-medium flex-grow text-left">
                        {item.question}
                      </span>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="px-4 py-3 text-[#0a1628]/80">
                    {item.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}