import TableDataHighlight from "@/components/table-data-hightlight";
import React from "react";

interface DataItem {
  title: string;
  thumbnail: string;
  date: string;
  side1: string;
  side2: string;
  competition: string;
  videoTitles: string[]; 
}

interface ApiResponseItem {
  title: string;
  thumbnail: string;
  date: string;
  side1: { name: string };
  side2: { name: string };
  competition: { name: string };
  videos?: { title: string }[];
}

export const fetchData = async (): Promise<DataItem[]> => {
  const url = "https://free-football-soccer-videos1.p.rapidapi.com/v1/";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.API_KEY || "",
      "x-rapidapi-host": "free-football-soccer-videos1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data: ApiResponseItem[] = await response.json();
    return data.map((item) => ({
      title: item.title,
      thumbnail: item.thumbnail,
      date: new Date(item.date).toLocaleDateString(),
      side1: item.side1.name,
      side2: item.side2.name,
      competition: item.competition.name,
      videoTitles: item.videos?.map((video) => video.title) || [
        "No videos available",
      ], 
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const ServerComponent = async () => {
  const data = await fetchData();
    return (
      <>
        <div className="backgroundimg  w-12/12 h-56 bg-cover bg-top bg-no-repeat"></div>
        <div className="container mx-auto px-4" >
          <h1 className="text-center lg:text-3xl text-lg yellow mt-4">
            XEM HIGHLIGHTS - LIVESTREAM BÓNG ĐÁ
          </h1>
          <TableDataHighlight data={data} />
        </div>
      </>
    );
}
export default ServerComponent;
