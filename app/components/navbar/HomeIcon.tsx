"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeIcon() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Link
      href="/"
      className={`group flex items-center justify-center w-12 h-12 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
        isHome
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
          : "bg-white/80 hover:bg-white text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300"
      }`}
      title="Home"
    >
      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
        🏠
      </span>
    </Link>
  );
}
