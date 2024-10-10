"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Use router.pathname to track path changes

  return null;
};

export default ScrollToTop;
