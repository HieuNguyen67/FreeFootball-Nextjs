"use client";
import React, { useEffect, useState } from "react";
import { BiArrowToTop } from "react-icons/bi";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 px-4 py-3 bg-white pink  shadow-lg hover:bg-slate-300 transition-colors"
        >
          <BiArrowToTop className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
