"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("saturday");

  const scheduleItems = {
    saturday: [
      {
        time: "9:00 AM",
        event: "Hacker Check-In / Venue Open",
        location: "Indoor Quad",
      },
      {
        time: "9:30 AM",
        event: "Opening Ceremony",
        location: "Raytheon 240",
        endTime: "10:00 AM",
      },
      {
        time: "10:00 AM",
        event: "Hacking Begins!",
        location: "Curry Student Center Indoor Quad",
      },
      {
        time: "10:00 AM",
        event: "Team Finding Activity",
        location: "Dodge 050",
        endTime: "10:30 AM",
      },
      {
        time: "11:00 AM - 12:00 PM",
        event: "Rev Workshop",
        location: "East Village 024",
      },
      {
        time: "11:00 AM - 12:00 PM",
        event: "Sandbox Workshop",
        location: "Dodge 050",
      },
      {
        time: "12:00 PM - 1:30 PM",
        event: "NEUBlockchain Workshop",
        location: "Dodge 050",
      },
      {
        time: "1:15 PM",
        event: "Lunch",
        location: "Curry Student Center Indoor Quad",
      },
      {
        time: "3:30 PM",
        event: "AI Workshop",
        location: "Dodge 050",
        endTime: "4:00 PM",
      },
      {
        time: "6:00 PM",
        event:
          "Boba break Fireside Chat with Senior Microsoft Engineer: Careers and Cybersecurity",
        location: "Dodge 050",
        endTime: "6:30 PM",
      },
      {
        time: "6:15 PM",
        event: "Dinner",
        location: "Curry Student Center Indoor Quad",
      },
      {
        time: "9:00 PM",
        event: "Venue Closes",
      },
    ],
    sunday: [
      {
        time: "10:00 AM",
        event: "Venue Reopens",
        location: "Curry Student Center Indoor Quad",
      },
      {
        time: "10:30 AM",
        event: "Breakfast Officially Begins",
        location: "Curry Student Center Indoor Quad",
      },
      {
        time: "11:00 AM",
        event: "Hacking Ends",
      },
      {
        time: "12:00 PM",
        event: "First Round of Judging Begin",
        location: "TBA",
      },
      {
        time: "1:30 PM",
        event: "Final Judging Round",
        location: "Dodge 050",
      },
      {
        time: "3:00 PM",
        event: "Closing Ceremony and Winner Announcements",
        location: "Raytheon 240",
      },
    ],
  };

  return (
    <div
      id="schedule"
      className="bg-[#0a1628] relative overflow-hidden py-12 px-4"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-full w-[1px] bg-white" />
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white" />
          <div className="absolute left-3/4 top-0 h-full w-[1px] bg-white" />
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white" />
          <div className="absolute top-1/4 right-1/4 w-1/3 h-24 bg-white/20" />
          <div className="absolute bottom-1/4 left-1/4 w-1/4 h-32 bg-white/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Event Schedule
        </h1>

        {/* Day Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                activeDay === "saturday"
                  ? "bg-[#c5f82a] text-[#0a1628]"
                  : "text-white"
              }`}
              onClick={() => setActiveDay("saturday")}
            >
              Saturday 18th
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                activeDay === "sunday"
                  ? "bg-[#c5f82a] text-[#0a1628]"
                  : "text-white"
              }`}
              onClick={() => setActiveDay("sunday")}
            >
              Sunday 19th
            </button>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          <div className="h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#c5f82a] scrollbar-track-white/10">
            {scheduleItems[activeDay].map((item, index) => (
              <div
                key={index}
                className="p-4 border-b border-white/10 last:border-b-0 transition-all duration-300 hover:bg-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[#c5f82a] text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {item.time}
                    {item.endTime && ` - ${item.endTime}`}
                  </span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  {item.event}
                </h3>
                {item.location && (
                  <div className="text-white/80 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {item.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
