// import { Home } from 'lucide-react'

// import Disrupt from '../assets/disrupt.svg'
export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              {/* <Disrupt className="h-8 w-8 text-blue-500" /> */}
              <span className="ml-2 text-xl font-semibold text-gray-800">MyApp</span>
            </a>
          </div>
          <div className="hidden sm:flex space-x-4">
            <a href="#about" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#tracks" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Tracks</a>
            <a href="#faq" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
            <a href="#speakers" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Speakers</a>
            <a href="#sponsors" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Sponsors</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
