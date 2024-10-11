"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { IoMdFootball } from "react-icons/io";
import { usePathname } from "next/navigation"; 

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname(); 

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="bg-bluee sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <Link href="/">
              <p className="text-xl flex text-white">
                FreeFootball{" "}
                <span>
                  <IoMdFootball className="mt-1 text-xl" />
                </span>{" "}
              </p>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" onClick={handleLinkClick}>
                  <p
                    className={` ${
                      isActive("/") ? "bg-white pink" : "text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Highlights-Livestream
                  </p>
                </Link>
                <Link href="/lichthidau" onClick={handleLinkClick}>
                  <p
                    className={` ${
                      isActive("/lichthidau") ? "bg-white pink" : "text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Lịch Thi Đấu
                  </p>
                </Link>
                <Link href="/bangxephang" onClick={handleLinkClick}>
                  <p
                    className={` ${
                      isActive("/bangxephang") ? "bg-white pink" : "text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Bảng Xếp hạng
                  </p>
                </Link>
                <Link href="/tintuc" onClick={handleLinkClick}>
                  <p
                    className={`${
                      isActive("/tintuc") ? "bg-white pink" : "text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Tin tức
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button onClick={toggleDrawer} style={{ background: "#3132fe" }}>
              <span className="sr-only">Open main menu</span>
              <IoMdMenu className="text-lg" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={drawerRef}
          className={`w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "#3132fe" }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="flex flex-col">
              <div className="w-full text-end">
                <Button
                  onClick={toggleDrawer}
                  className="mt-1"
                  style={{ background: "#3132fe" }}
                >
                  <MdClose className="text-2xl" style={{ color: "#ffff00" }} />
                </Button>
              </div>
              <div className="w-full">
                <Link href="/" onClick={handleLinkClick}>
                  <p
                    className={`text-white ${
                      isActive("/") ? "bg-white pink" : "white"
                    } block px-3 py-2 rounded-md text-sm`}
                  >
                    Highlights-Livestream
                  </p>
                </Link>
              </div>
              <div className="w-full">
                <Link href="/lichthidau" onClick={handleLinkClick}>
                  <p
                    className={`text-white ${
                      isActive("/lichthidau") ? "bg-white pink" : "white"
                    } block px-3 py-2 rounded-md text-sm`}
                  >
                    Lịch thi đấu
                  </p>
                </Link>
              </div>
              <div className="w-full">
                <Link href="/bangxephang" onClick={handleLinkClick}>
                  <p
                    className={`text-white ${
                      isActive("/bangxephang") ? "bg-white pink" : "white"
                    } block px-3 py-2 rounded-md text-sm`}
                  >
                    Bảng xếp hạng
                  </p>
                </Link>
              </div>
              <div className="w-full">
                <Link href="/tintuc" onClick={handleLinkClick}>
                  <p
                    className={`text-white ${
                      isActive("/tintuc") ? "bg-white pink" : "white"
                    } block px-3 py-2 rounded-md text-sm`}
                  >
                    Tin tức
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
