"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Continent {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  gradient: string;
}

const continents: Continent[] = [
  {
    name: "North America",
    slug: "north-america",
    emoji: "🏔️",
    description: "Mountains, forests, and modern cities",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    name: "South America",
    slug: "south-america",
    emoji: "🏞️",
    description: "Amazon rainforest and ancient cultures",
    gradient: "from-green-500 to-yellow-600",
  },
  {
    name: "Europe",
    slug: "europe",
    emoji: "🏰",
    description: "Rich history and diverse cultures",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    name: "Africa",
    slug: "africa",
    emoji: "🦁",
    description: "Wildlife safaris and ancient civilizations",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "Asia",
    slug: "asia",
    emoji: "🏯",
    description: "Temples, technology, and traditions",
    gradient: "from-red-500 to-pink-600",
  },
  {
    name: "Australia & Oceania",
    slug: "australia",
    emoji: "🦘",
    description: "Unique wildlife and stunning landscapes",
    gradient: "from-teal-500 to-blue-600",
  },
];

export default function ContinentsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleContinentClick = (continent: Continent) => {
    setIsOpen(false);
    router.push(`/continent/${continent.slug}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
          isOpen
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
            : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-indigo-400 border border-gray-600 hover:border-indigo-400"
        }`}
      >
        <span className="text-2xl">🌍</span>
        <span className="hidden sm:block text-lg">Continents</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 overflow-hidden z-50 animate-fade-in">
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-xl flex items-center gap-2">
                🌍 Explore Continents
              </h3>
              <p className="text-sm opacity-90 mt-1">
                Discover the 6 continents of our world
              </p>
            </div>
            <div className="absolute -top-4 -right-4 text-6xl opacity-20">
              🗺️
            </div>
          </div>

          <div className="p-3">
            {continents.map((continent) => (
              <button
                key={continent.slug}
                onClick={() => handleContinentClick(continent)}
                onMouseEnter={() => setHoveredContinent(continent.slug)}
                onMouseLeave={() => setHoveredContinent(null)}
                className="w-full p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 text-left group relative overflow-hidden"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="flex-shrink-0">
                    <span
                      className={`text-3xl group-hover:scale-110 transition-transform duration-300 ${
                        hoveredContinent === continent.slug
                          ? "animate-bounce"
                          : ""
                      }`}
                    >
                      {continent.emoji}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-bold text-lg transition-all duration-300 ${
                        hoveredContinent === continent.slug
                          ? `bg-gradient-to-r ${continent.gradient} bg-clip-text text-transparent`
                          : "text-gray-800"
                      }`}
                    >
                      {continent.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {continent.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 transition-all duration-300 ${
                        hoveredContinent === continent.slug
                          ? "text-indigo-600 translate-x-1"
                          : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${continent.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}
                ></div>

                {/* Animated Border */}
                {hoveredContinent === continent.slug && (
                  <div
                    className={`absolute inset-0 border-2 bg-gradient-to-r ${continent.gradient} rounded-xl opacity-20 animate-pulse`}
                  ></div>
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                🎯 Click any continent to explore its countries
              </p>
              <div className="flex justify-center gap-1 text-xs">
                {continents.map((continent) => (
                  <span key={continent.slug} className="text-lg">
                    {continent.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
