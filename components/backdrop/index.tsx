"use client";
import React from "react";

interface ProgressBarProps {
  isLoading: boolean;
}

const Backdrop: React.FC<ProgressBarProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-40">
      <div className="w-full max-w-md">
        <div className="h-2 bg-gray-200 overflow-hidden rounded">
          <div className="bg-blue-500 h-full w-4/4 animate-progress-bar"></div>
        </div>
        <p className="mt-2 text-center">LOADING...</p>
      </div>
    </div>
  );
};

export default Backdrop;
