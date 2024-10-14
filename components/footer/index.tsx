import { IoMdMail } from "react-icons/io";
import Link from "next/link";

const Footer:React.FC=()=>{
    return (
      <>
        <footer className=" bottom-0 z-40 w-full bg-transparent container mx-auto px-5 border-t-2 border-yellow-300 text-white mt-10">
          <div className="text-center my-10">
            {" "}
            <span className="text-xl">ABOUT:</span>
            <br />
            <Link href="/">
              <span className="flex mt-2 justify-center hover:text-white yellow">
                Highlights-Livestream
              </span>{" "}
            </Link>
            <Link href="/tiso">
              <span className="flex mt-2 justify-center hover:text-white yellow">
                Tỉ số
              </span>{" "}
            </Link>
            <Link href="/lichthidau">
              <span className="flex mt-2 justify-center hover:text-white yellow">
                Lịch thi đấu
              </span>{" "}
            </Link>
            <Link href="/bangxephang">
              <span className="flex mt-2 justify-center hover:text-white yellow">
                Bảng xếp hạng
              </span>{" "}
            </Link>
            <Link href="/tintuc">
              <span className="flex mt-2 justify-center hover:text-white yellow">
                Tin tức
              </span>
            </Link>
          </div>
          <p className="text-center mb-10">
            {" "}
            <span className="text-xl">CONTACT:</span>
            <br />
            <span className="flex mt-2 justify-center">
              <IoMdMail className="text-2xl me-2" />{" "}
              nguyenminhhieu012846@gmail.com
            </span>
          </p>
          <p className="text-center border-t-2 border-white py-5 mt-5 lg:text-base text-xs yellow">
            Copyright © 2024 Free Football. All Rights Reserved. Designed by
            HieuNguyen.
          </p>
        </footer>
      </>
    );   
}
export default Footer;