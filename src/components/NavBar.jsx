import { useState } from "react";
import disrupt from "../assets/disrupt.svg";
import LoginModal from "./Auth/loginModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to control modal visibility
  const openModal = () => {
    const date = new Date();
    if (
      date.getFullYear() > 2025 ||
      date.getMonth() > 0 ||
      date.getDate() > 10
    ) {
      alert("Registration Closed");
    } else {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center">
          <img
            className="ml-0.5"
            src={disrupt}
            width="50"
            height="50"
            alt="Logo"
          />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-white hover:text-[#c5f82a] transition-colors"
          >
            About
          </a>
          <a
            href="#tracks"
            className="text-white hover:text-[#c5f82a] transition-colors"
          >
            Tracks
          </a>
          <a
            href="#speakers"
            className="text-white hover:text-[#c5f82a] transition-colors"
          >
            Speakers
          </a>
          <a
            href="#faq"
            className="text-white hover:text-[#c5f82a] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#partners"
            className="text-white hover:text-[#c5f82a] transition-colors"
          >
            Partners
          </a>
          <a
            href="#schedule"
            className="text-white hover:text-[#c5f82a] transition-colors"
          >
            Schedule
          </a>
          <a
            href="#sponsors"
            className="text-white hover:text-[#c5f82a] transition-colors"
          >
            Sponsors
          </a>
        </div>
        <button
          onClick={openModal}
          className="bg-[#c5f82a] text-[#0a1628] hover:bg-[#d4ff3a] font-semibold px-8 py-2 rounded-md"
        >
          Apply
        </button>
      </nav>
      {isModalOpen && (
        <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
}
