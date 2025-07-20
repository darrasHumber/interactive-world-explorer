import HomeIcon from "./HomeIcon";
import CountriesDropdown from "./CountriesDropdown";
import RegionsDropdown from "./RegionsDropdown";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side - Home Icon */}
          <div className="flex-shrink-0">
            <HomeIcon />
          </div>

          {/* Center - Brand/Title (Optional) */}
          <div className="hidden md:flex flex-1 justify-center">
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🌍 World Explorer
            </h1>
          </div>

          {/* Right Side - Dropdowns */}
          <div className="flex items-center gap-3">
            <CountriesDropdown />
            <RegionsDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
