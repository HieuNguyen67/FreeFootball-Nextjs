export interface DataItem {
  title: string;
  thumbnail: string;
  date: string;
  side1: string;
  side2: string;
  competition: string;
  videoTitles: string[];
  videoEmbeds: string[];
}

interface ApiResponseItem {
  title: string;
  thumbnail: string;
  date: string;
  side1: { name: string };
  side2: { name: string };
  competition: { name: string };
  videos?: { title: string; embed: string }[];
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
      videoEmbeds: item.videos?.map((video) => video.embed) || [
        "No videos available",
      ],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
