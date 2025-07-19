"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Continent {
  name: string;
  slug: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const continents: Continent[] = [
  {
    name: "North America",
    slug: "north-america",
    x: 1,
    y: 2,
    width: 41,
    height: 54,
  },
  {
    name: "South America",
    slug: "south-america",
    x: 22,
    y: 56,
    width: 17,
    height: 42,
  },
  { name: "Europe", slug: "europe", x: 45, y: 2, width: 22, height: 40 },
  { name: "Africa", slug: "africa", x: 42, y: 40, width: 20, height: 45 },
  { name: "Asia", slug: "asia", x: 58, y: 3, width: 40, height: 60 },
  { name: "Australia", slug: "australia", x: 78, y: 67, width: 20, height: 27 },
];

interface MapProps {
  mapSrc: string;
}

export default function Map({ mapSrc }: MapProps) {
  const router = useRouter();
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);

  const handleContinentClick = (continent: Continent) => {
    router.push(`/continent/${continent.slug}`);
  };

  // Enhanced continent-specific styling
  const getContinentStyling = (continentName: string) => {
    const styles: {
      [key: string]: {
        bg: string;
        border: string;
        gradient: string;
        shadowColor: string;
        emoji: string;
      };
    } = {
      "North America": {
        bg: "rgba(59, 130, 246, 0.15)",
        border: "#3b82f6",
        gradient: "from-blue-500 via-cyan-500 to-blue-600",
        shadowColor: "shadow-blue-500/30",
        emoji: "🏔️",
      },
      "South America": {
        bg: "rgba(34, 197, 94, 0.15)",
        border: "#22c55e",
        gradient: "from-green-500 via-emerald-500 to-yellow-500",
        shadowColor: "shadow-green-500/30",
        emoji: "🏞️",
      },
      Europe: {
        bg: "rgba(147, 51, 234, 0.15)",
        border: "#9333ea",
        gradient: "from-purple-500 via-violet-500 to-indigo-500",
        shadowColor: "shadow-purple-500/30",
        emoji: "🏰",
      },
      Africa: {
        bg: "rgba(249, 115, 22, 0.15)",
        border: "#f97316",
        gradient: "from-orange-500 via-amber-500 to-red-500",
        shadowColor: "shadow-orange-500/30",
        emoji: "🦁",
      },
      Asia: {
        bg: "rgba(239, 68, 68, 0.15)",
        border: "#ef4444",
        gradient: "from-red-500 via-pink-500 to-rose-500",
        shadowColor: "shadow-red-500/30",
        emoji: "🏯",
      },
      Australia: {
        bg: "rgba(20, 184, 166, 0.15)",
        border: "#14b8a6",
        gradient: "from-teal-500 via-cyan-500 to-blue-500",
        shadowColor: "shadow-teal-500/30",
        emoji: "🦘",
      },
    };
    return styles[continentName] || styles["North America"];
  };

  return (
    <div className="relative w-full">
      {/* Enhanced container with professional styling */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="relative group">
          {/* Professional frame with subtle shadow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

          <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
            <Image
              src={mapSrc}
              alt="Interactive World Map"
              width={1400}
              height={700}
              className="w-full h-auto rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-2xl"
              priority
            />

            {continents.map((continent, index) => {
              const styling = getContinentStyling(continent.name);
              const isHovered = hoveredContinent === continent.name;

              return (
                <div
                  key={index}
                  className="absolute cursor-pointer transition-all duration-300 rounded-xl flex items-center justify-center group/continent"
                  style={{
                    left: `${continent.x}%`,
                    top: `${continent.y}%`,
                    width: `${continent.width}%`,
                    height: `${continent.height}%`,
                    backgroundColor: isHovered ? styling.bg : "transparent",
                    border: isHovered
                      ? `2px solid ${styling.border}`
                      : "2px solid transparent",
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    filter: isHovered ? "brightness(1.05)" : "brightness(1)",
                  }}
                  onClick={() => handleContinentClick(continent)}
                  onMouseEnter={() => setHoveredContinent(continent.name)}
                  onMouseLeave={() => setHoveredContinent(null)}
                >
                  {/* Enhanced button that appears on hover */}
                  <div
                    className={`
                      transform transition-all duration-500 ease-out
                      ${
                        isHovered
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-75 translate-y-8"
                      }
                    `}
                  >
                    <div
                      className={`relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl ${styling.shadowColor} border border-white/50 px-8 py-6 text-center group-hover/continent:shadow-3xl transform transition-all duration-300 hover:scale-105`}
                    >
                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${styling.gradient} opacity-5 rounded-2xl`}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="text-4xl mb-2 animate-bounce">
                          {styling.emoji}
                        </div>
                        <div
                          className={`text-2xl font-black bg-gradient-to-r ${styling.gradient} bg-clip-text text-transparent mb-2`}
                        >
                          {continent.name}
                        </div>
                        <div className="text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
                          <span>Explore Now</span>
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/continent:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Animated border effect */}
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${styling.gradient} rounded-2xl blur opacity-20 group-hover/continent:opacity-40 transition-opacity duration-300`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Professional instructions */}
      <div className="mt-8 text-center">
        <div
          className={`transition-all duration-300 ${
            hoveredContinent ? "opacity-100 scale-100" : "opacity-70 scale-95"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <p className="text-xl font-bold text-gray-800 mb-2">
              {hoveredContinent
                ? `✨ Click to explore ${hoveredContinent}`
                : "🎯 Hover over any continent to begin your journey"}
            </p>
            <p className="text-gray-600">
              Discover fascinating cultures, breathtaking landscapes, and
              incredible adventures across our planet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
