// src/Components/Spinner/Spinner.tsx
import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "#3b82f6", // blue-500 (matches your theme)
  message = "Loading...",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-gradient-to-br from-indigo-950 to-blue-950 flex items-center justify-center z-50"
    : "flex flex-col items-center justify-center py-10";

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-4 border-t-transparent ${sizeClasses[size]}`}
          style={{ borderColor: `${color}33`, borderTopColor: color }}
        />
        {/* Optional inner ring for crypto vibe */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-pulse ${sizeClasses[size]}`}
          style={{ borderColor: `${color}66` }}
        />
      </div>

      {message && (
        <p className="mt-4 text-slate-300 font-medium tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};

// Minimal version
export const MinimalSpinner = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-blue-950 to-purple-950 flex items-center justify-center z-50">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
  </div>
);
export default { Spinner };
