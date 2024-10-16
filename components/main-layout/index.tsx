"use client";
// import { usePathname } from "next/navigation";
import Footer from "../footer";
import Header from "../header";

interface MainLayoutProps {
  children: React.ReactNode; 
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // const pathname = usePathname();
  // const isHomePage =
  //   pathname === "/" ||
  //   pathname === "/tintuc" ||
  //   pathname === "/lichthidau" ||
  //   pathname === "/bangxephang" ||
  //   pathname === "/details" ||
  //   pathname === "/tiso" ";

  return (
    <>
      {" "}
      <Header />
      {children}
     <Footer />
    </>
  );
};

export default MainLayout;
