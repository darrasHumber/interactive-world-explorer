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
          : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-blue-400 border border-gray-600 hover:border-blue-400"
      }`}
      title="Home"
    >
      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
        🏠
      </span>
    </Link>
  );
}
