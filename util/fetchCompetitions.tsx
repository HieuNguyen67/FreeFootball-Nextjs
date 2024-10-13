
export interface Competition {
  id: number;
  "generic-name": string;
  "full-name": string;
}

export const fetchCompetitions = async (): Promise<Competition[]> => {
  const url =
    "https://football-web-pages1.p.rapidapi.com/competitions.json?include=rounds";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "59cc4e63b3msh4d842910a03af33p1c1163jsn6fe5d033ef64",
      "x-rapidapi-host": "football-web-pages1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.competitions || [];
  } catch (error) {
    console.error("Error fetching competitions:", error);
    return [];
  }
};
