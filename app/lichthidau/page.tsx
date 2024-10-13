import ScheduleMatches from "@/components/shedule-matches";
import "@/styles/Home.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch bóng đá",
  description: "Xem lịch thi đấu bóng đá trực tuyến",
};

const CompetitionsPage = () => {



  return (
    <>
      <div className="backgroundimg1  w-12/12 lg:h-56 h-36 bg-cover bg-top  bg-no-repeat"></div>
      <h1 className="text-center lg:text-3xl text-lg blue grid items-center bg-yelloww lg:h-24 h-16">
        XEM LỊCH THI ĐẤU BÓNG ĐÁ
      </h1>
      <ScheduleMatches/>
     
    </>
  );
};

export default CompetitionsPage;


