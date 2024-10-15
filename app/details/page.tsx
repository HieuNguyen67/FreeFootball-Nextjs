"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import "@/styles/Home.scss";

const DetailsPage = () => {
  const searchParams = useSearchParams();

  const side1 = searchParams.get("side1");
  const side2 = searchParams.get("side2");
  const date = searchParams.get("date");
  const competition = searchParams.get("competition");
  const videoTitles = searchParams.get("videoTitles")?.split(",") || [];
  const videoEmbeds = searchParams.get("videoEmbeds")?.split(",") || [];

  return (
    <>
      <div className="backgroundimg  w-12/12 lg:h-56 h-36 bg-cover bg-top bg-no-repeat"></div>
      <div className="w-12/12 bg-yelloww ">
        <p className="text-center grid lg:text-4xl text-2xl justify-center items-center blue  h-24 py-2">
          <span className="text-2xl">Trận Đấu </span>
          {side1} - {side2}
        </p>
      </div>
      <div className="w-12/12 bg-transparent backdrop-blur-lg border border-white container mx-auto py-4 ">
        <p className="text-center grid lg:text-xl justify-center items-center yellow  h-20">
          {date}
          <br />
          Giải đấu: {competition}
        </p>
      </div>
      <div className="text-white container mx-auto lg:px-28">
        {videoTitles.map((videoTitle, index) => (
          <div key={index}>
            <div className="flex justify-center">
              <p className=" my-5 lg:text-4xl backdrop-blur-lg text-xl py-3 w-5/12 text-center border-2 flex justify-center border-white items-center">
                {videoTitle}
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: videoEmbeds[index] || "",
              }}
              className="lg:px-48 px-5"
            />
          </div>
        ))}
      </div>
    </>
  );
};

const DetailsPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsPage />
    </Suspense>
  );
};

export default DetailsPageWrapper;
