import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();

  const goToPortal = () => {
      navigate('/portal');
  };
  return (
    <div className="bg-[#0a1628]">
    <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
            <div className="flex items-center">
              <div className="text-3xl font-bold">
                <span className="text-blue-400">i</span>
                <span className="text-[#c5f82a]">D</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-white hover:text-[#c5f82a] transition-colors">
                About
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
            <button onClick={goToPortal} className="bg-[#c5f82a] text-[#0a1628] hover:bg-[#d4ff3a] font-semibold px-8 py-2 rounded-md">
              Apply
            </button>
          </nav>
    </div>
  )
}
