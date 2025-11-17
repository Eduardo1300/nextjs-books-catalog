"use client";
import React from "react";

interface LoadingSkeletonProps {
  darkMode: boolean;
  count?: number;
}

export default function LoadingSkeleton({ darkMode, count = 10 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 py-4 px-3 border-b animate-pulse rounded-md ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          {/* ID Skeleton */}
          <div
            className={`inline-block font-mono text-xs font-bold rounded px-2 py-0.5 w-12 h-6 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          />

          {/* Title Skeleton */}
          <div className="flex-1">
            <div
              className={`h-4 rounded w-3/4 mb-2 ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
            <div
              className={`h-3 rounded w-1/2 ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          </div>

          {/* Button Skeleton */}
          <div
            className={`px-4 py-2 rounded w-20 h-8 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
