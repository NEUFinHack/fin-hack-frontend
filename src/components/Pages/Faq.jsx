
import { Accordion } from 'react-bootstrap'
import { ChevronDown } from 'lucide-react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Faq() {
  const faqItems = [
    {
      question: "What is FinHack?",
      answer: "FinHack is a finance-themed hackathon that brings together innovators to solve challenges in the financial technology sector.",
      status: "green"
    },
    {
      question: "When and Where is FinHack?",
      answer: "FinHack takes place from February 11-13, 2024. The venue details will be shared with registered participants.",
      status: "green"
    },
    {
      question: "Who can attend?",
      answer: "FinHack is open to students, professionals, and anyone interested in fintech innovation. Participants must be 18 or older.",
      status: "red"
    },
    {
      question: "How do teams work?",
      answer: "Teams can consist of 2-4 members. You can form your own team or join one during the team formation event.",
      status: "green"
    },
    {
      question: "How much does it cost?",
      answer: "There is a nominal registration fee. Early bird discounts are available. Check the registration page for current pricing.",
      status: "red"
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, charger, and any other devices you need. We'll provide food, drinks, and workspace.",
      status: "green"
    },
    {
      question: "When are applications due?",
      answer: "Applications close two weeks before the event. Early applications are encouraged as space is limited.",
      status: "green"
    },
    {
      question: "Do I need coding Experience?",
      answer: "While coding experience is helpful, we welcome participants with diverse skills including design, business, and finance.",
      status: "red"
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
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl">
          {/* Outer glass card */}
          <div className="absolute inset-2 bg-white/20 backdrop-blur-sm rounded-lg" />
          
          {/* Inner glass card */}
          <div className="relative bg-white/30 backdrop-blur-md rounded-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-8 text-center">
              FAQ
            </h1>
            
            <Accordion className="space-y-3">
              {faqItems.map((item, index) => (
                <Accordion.Item 
                  key={index} 
                  eventKey={index.toString()}
                  className="border-0 rounded-lg bg-white/50 backdrop-blur-sm overflow-hidden"
                >
                  <Accordion.Header className="p-0">
                    <div className="flex items-center gap-3 px-4 py-3 w-full">
                      <div
                        className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent ${
                          item.status === 'green'
                            ? 'border-b-[8px] border-b-[#c5f82a]'
                            : 'border-t-[8px] border-t-red-500'
                        }`}
                      />
                      <span className="text-[#0a1628] font-medium flex-grow text-left">
                        {item.question}
                      </span>
                      <ChevronDown className="h-5 w-5 text-[#0a1628] flex-shrink-0" />
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
      </div>
    </div>
  )
}