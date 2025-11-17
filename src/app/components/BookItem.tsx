"use client";
import React from "react";

interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
}

interface BookItemProps {
  book: Book;
  darkMode: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function BookItem({
  book,
  darkMode,
  isFavorite,
  onToggleFavorite,
}: BookItemProps) {
  return (
    <li
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4 px-3 border-b last:border-b-0 transition-colors duration-200 rounded-md ${
        darkMode ? "border-gray-700 hover:bg-gray-800/50" : "border-gray-200 hover:bg-blue-50/30"
      }`}
    >
      <span
        className={`inline-block font-mono text-xs font-bold rounded-md px-2.5 py-1 shadow-sm ${
          darkMode ? "bg-gray-700 text-yellow-200" : "bg-blue-100 text-blue-700"
        }`}
      >
        #{book.id}
      </span>

      <div className="flex-1 min-w-0">
        <span
          className={`font-semibold text-base block truncate ${
            darkMode ? "text-yellow-200" : "text-blue-800"
          }`}
          title={book.title}
        >
          {book.title}
        </span>
        <span
          className={`text-sm ${darkMode ? "text-yellow-200" : "text-blue-700"} font-medium block`}
        >
          {book.authors?.[0]?.name || (
            <span className="italic text-gray-400">Desconocido</span>
          )}
        </span>
      </div>

      <button
        className={`ml-2 flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 border text-sm font-semibold whitespace-nowrap shadow-sm hover:shadow-md ${
          isFavorite
            ? darkMode
              ? "bg-yellow-400 text-gray-900 border-yellow-500 hover:bg-yellow-500 scale-105"
              : "bg-yellow-200 text-yellow-900 border-yellow-400 hover:bg-yellow-300"
            : darkMode
            ? "bg-gray-800 text-yellow-300 border-gray-600 hover:bg-gray-700"
            : "bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200"
        }`}
        onClick={onToggleFavorite}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <svg
          className="w-4 h-4"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a3.375 3.375 0 015.04 3.789l-.804 1.63 1.8.262a3.375 3.375 0 011.87 5.757l-1.3 1.27.307 1.79a3.375 3.375 0 01-4.898 3.557l-1.61-.847-1.61.847a3.375 3.375 0 01-4.898-3.557l.307-1.79-1.3-1.27a3.375 3.375 0 011.87-5.757l1.8-.262-.804-1.63a3.375 3.375 0 015.04-3.789z"
          />
        </svg>
        {isFavorite ? "Favorito" : "Favorito"}
      </button>
    </li>
  );
}
