"use client";
import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
}

export default function SearchBar({
  value,
  onChange,
  darkMode,
}: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar por título o autor..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-400"
            : "bg-white text-gray-900 border-gray-300 focus:ring-blue-600 focus:border-blue-400 placeholder-gray-500"
        }`}
        aria-label="Buscar libros por título o autor"
      />
    </div>
  );
}
