"use client";

import { useState, useEffect } from "react";
import Map from "./components/Map";
import MapSelector from "./components/MapSelector";

export default function Home() {
  const [selectedMap, setSelectedMap] = useState("/images/world-map.jpg");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load map selection from localStorage on component mount
  useEffect(() => {
    const savedMap = localStorage.getItem("selectedWorldMap");
    if (savedMap) {
      setSelectedMap(savedMap);
    }
    setIsLoaded(true);
  }, []);

  const handleMapSelect = (mapSrc: string) => {
    setSelectedMap(mapSrc);
    localStorage.setItem("selectedWorldMap", mapSrc);
  };

  // Professional loading screen
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-4xl animate-bounce">🌍</span>
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-blue-200 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            World Explorer
          </h2>
          <p className="text-gray-600 animate-pulse">
            Preparing your journey...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Professional hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          {/* Professional header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50 mb-8">
              <span className="text-3xl">🌍</span>
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Interactive World Explorer
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6 leading-tight">
              Discover Our
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Beautiful Planet
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Embark on an interactive journey across continents. Choose your
              map style and explore the diverse cultures, landscapes, and
              wonders that make our world extraordinary.
            </p>

            {/* Professional stats */}
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">6</div>
                <div className="text-sm text-gray-600 font-medium">
                  Continents
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">3</div>
                <div className="text-sm text-gray-600 font-medium">
                  Map Styles
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">∞</div>
                <div className="text-sm text-gray-600 font-medium">
                  Discoveries
                </div>
              </div>
            </div>
          </div>

          {/* Professional container */}
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
            <MapSelector
              onMapSelect={handleMapSelect}
              selectedMap={selectedMap}
            />

            <Map mapSrc={selectedMap} />
          </div>

          {/* Professional footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              © 2024 Interactive World Explorer. Discover the beauty of our
              planet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
