export interface Match {
  date: string;
  venue: string;
  time: string;
  "home-team": {
    score: number;
    name: string;
  };
  "away-team": {
    score: number;
    name: string;
  };
  referee: string;
  status: {
    full: string;
  };
}

export const fetchMatches = async (compId: number): Promise<Match[]> => {
  const url = `https://football-web-pages1.p.rapidapi.com/fixtures-results.json?comp=${compId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "59cc4e63b3msh4d842910a03af33p1c1163jsn6fe5d033ef64",
      "x-rapidapi-host": "football-web-pages1.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data["fixtures-results"].matches;
};
