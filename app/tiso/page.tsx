import "@/styles/Home.scss";

import ScheduleMatches from "@/components/shedule-matches";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tỉ số bóng đá",
  description: "Xem tỉ số bóng đá trực tuyến",
};
const MacthScore = () => {
  return (
    <>
      <div className="backgroundimg4  w-12/12 lg:h-56 h-36 bg-cover bg-top  bg-no-repeat"></div>
      <h1 className="text-center lg:text-3xl text-lg blue grid items-center bg-yelloww lg:h-24 h-16">
        XEM TỈ SỐ BÓNG ĐÁ
      </h1>
      <ScheduleMatches />
    </>
  );
};

export default MacthScore;
