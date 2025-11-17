"use client";
import React from "react";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  showFavView: boolean;
  onToggleFavView: () => void;
  favoritesCount: number;
}

export default function Header({
  darkMode,
  onToggleDarkMode,
  showFavView,
  onToggleFavView,
  favoritesCount,
}: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <h1
        className={`text-3xl font-extrabold tracking-tight ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Catálogo de Libros
      </h1>

      <div className="flex gap-2 items-center">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 border ${
            darkMode
              ? "bg-gray-800 text-yellow-300 border-gray-600 hover:bg-gray-700"
              : "bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200"
          }`}
          onClick={onToggleDarkMode}
          aria-label="Alternar modo oscuro/claro"
          title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {darkMode ? (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
              Claro
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 6.66l-.71-.71M4.05 4.93l-.71-.71"
                />
              </svg>
              Oscuro
            </>
          )}
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 border relative ${
            showFavView
              ? darkMode
                ? "bg-yellow-400 text-gray-900 border-yellow-500 scale-105"
                : "bg-yellow-200 text-yellow-900 border-yellow-400"
              : darkMode
              ? "bg-gray-800 text-yellow-300 border-gray-600 hover:bg-gray-700"
              : "bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200"
          }`}
          onClick={onToggleFavView}
          aria-label="Ver todos los favoritos"
          title={`Favoritos (${favoritesCount})`}
        >
          <svg
            className="w-5 h-5"
            fill={showFavView ? "currentColor" : "none"}
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
          {showFavView ? "Catálogo" : `Favoritos`}
          {favoritesCount > 0 && (
            <span
              className={`ml-1 px-2 py-0.5 text-xs font-bold rounded-full ${
                showFavView
                  ? darkMode
                    ? "bg-gray-900 text-yellow-300"
                    : "bg-yellow-100 text-yellow-800"
                  : darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-blue-200 text-blue-700"
              }`}
            >
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
