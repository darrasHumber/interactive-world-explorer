"use client";

import { useState } from "react";
import Image from "next/image";

interface MapOption {
  id: string;
  name: string;
  src: string;
  description: string;
}

const mapOptions: MapOption[] = [
  {
    id: "world-map",
    name: "Classic World Map",
    src: "/images/world-map.jpg",
    description: "Clean and professional design",
  },
  {
    id: "world-map-countries",
    name: "Detailed Countries Map",
    src: "/images/world-map-countries.jpg",
    description: "Shows country boundaries and details",
  },
  {
    id: "world-countries-map-colored",
    name: "Vibrant Countries Map",
    src: "/images/world-countries-map-colored.jpg",
    description: "Colorful and engaging visualization",
  },
];

interface MapSelectorProps {
  onMapSelect: (mapSrc: string) => void;
  selectedMap?: string;
}

export default function MapSelector({
  onMapSelect,
  selectedMap,
}: MapSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMapSelect = (mapSrc: string) => {
    onMapSelect(mapSrc);
    setIsOpen(false);
  };

  const currentMap =
    mapOptions.find((map) => map.src === selectedMap) || mapOptions[0];

  return (
    <div className="mb-12">
      {/* Professional header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
          Choose Your Map Style
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select the perfect map visualization to enhance your exploration
          experience
        </p>
      </div>

      {/* Current Selection Display - Professional Card */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={currentMap.src}
                alt={currentMap.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                Current Selection
              </p>
              <h3 className="font-bold text-gray-800 text-lg">
                {currentMap.name}
              </h3>
              <p className="text-sm text-gray-600">{currentMap.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Toggle Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
            {isOpen ? "🗂️" : "🗺️"}
          </span>
          <span className="text-lg">
            {isOpen ? "Hide Map Options" : "Browse Map Styles"}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
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

          {/* Animated background */}
          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Enhanced Map Options Grid */}
      {isOpen && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
            {mapOptions.map((map) => (
              <div
                key={map.id}
                className={`group relative cursor-pointer transition-all duration-500 transform hover:-translate-y-2 ${
                  selectedMap === map.src ? "scale-105" : "hover:scale-105"
                }`}
                onClick={() => handleMapSelect(map.src)}
              >
                <div
                  className={`relative bg-white rounded-2xl p-6 shadow-xl border-2 transition-all duration-300 ${
                    selectedMap === map.src
                      ? "border-blue-500 shadow-blue-500/25 shadow-2xl"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-2xl"
                  }`}
                >
                  {/* Selected indicator */}
                  {selectedMap === map.src && (
                    <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Map preview */}
                  <div className="relative h-40 mb-6 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={map.src}
                      alt={map.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {map.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {map.description}
                    </p>

                    {/* Action button */}
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        selectedMap === map.src
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 group-hover:bg-blue-500 group-hover:text-white"
                      }`}
                    >
                      {selectedMap === map.src ? (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Selected
                        </>
                      ) : (
                        <>
                          <span>Select Map</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
