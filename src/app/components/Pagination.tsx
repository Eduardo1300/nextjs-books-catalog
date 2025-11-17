"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  darkMode: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  darkMode,
  onPreviousPage,
  onNextPage,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        className={`px-4 py-2 rounded-lg border font-semibold shadow-sm hover:shadow transition-all duration-200 ${
          darkMode
            ? "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700"
            : "bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={onPreviousPage}
        disabled={currentPage === 1 || isLoading}
      >
        ← Anterior
      </button>

      <span
        className={`px-4 py-2 font-mono text-sm font-semibold ${
          darkMode ? "text-yellow-200" : "text-blue-700"
        }`}
      >
        Página {currentPage} de {totalPages}
      </span>

      <button
        className={`px-4 py-2 rounded-lg border font-semibold shadow-sm hover:shadow transition-all duration-200 ${
          darkMode
            ? "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700"
            : "bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={onNextPage}
        disabled={currentPage === totalPages || isLoading}
      >
        Siguiente →
      </button>
    </div>
  );
}
