import HomeIcon from "./HomeIcon";
import CountriesDropdown from "./CountriesDropdown";
import RegionsDropdown from "./RegionsDropdown";
import ContinentsDropdown from "./ContinentsDropdown";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side - Home Icon */}
          <div className="flex-shrink-0">
            <HomeIcon />
          </div>

          {/* Center - Brand/Title */}
          <div className="hidden md:flex flex-1 justify-center">
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              🌍 World Explorer
            </h1>
          </div>

          {/* Right Side - Dropdowns */}
          <div className="flex items-center gap-3">
            <CountriesDropdown />
            <RegionsDropdown />
            <ContinentsDropdown />
          </div>
        </div>

        {/* Mobile brand */}
        <div className="md:hidden flex justify-center pb-2">
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            🌍 World Explorer
          </h1>
        </div>
      </div>
    </nav>
  );
}
