"use client";
import React from "react";

interface EmptyStateProps {
  darkMode: boolean;
  showFavView: boolean;
}

export default function EmptyState({ darkMode, showFavView }: EmptyStateProps) {
  return (
    <div
      className={`text-center py-12 ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      <svg
        className="mx-auto mb-4 w-16 h-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            showFavView
              ? "M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
              : "M12 6v6l4 2"
          }
        />
      </svg>
      <p className={`font-semibold text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {showFavView
          ? "No tienes libros favoritos aún"
          : "No se encontraron libros que coincidan con tu búsqueda"}
      </p>
      <p className={`text-sm mt-2 ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
        {showFavView
          ? "¡Agrega libros a favoritos para verlos aquí!"
          : "Intenta con otro título o autor"}
      </p>
    </div>
  );
}
