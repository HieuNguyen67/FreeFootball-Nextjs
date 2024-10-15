import { FC, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Backdrop from "../backdrop";
import { NoteDialog } from "../note-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

interface LeagueTableProps {
  competitionId: number;
}

interface Team {
  id: number;
  name: string;
  position: number;
  "total-points": number;
  "all-matches": {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    "goal-difference": number;
    for: number;
    against: number;
  };
  "home-matches": {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    for: number;
    against: number;
  };
  "away-matches": {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    for: number;
    against: number;
  };
}

interface LeagueTableResponse {
  "league-table": {
    teams: Team[];
  };
}

const LeagueTable: FC<LeagueTableProps> = ({ competitionId }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagueTable = async () => {
      const url = `https://football-web-pages1.p.rapidapi.com/league-table.json?comp=${competitionId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY1 || "",
          "x-rapidapi-host": "football-web-pages1.p.rapidapi.com",
        },
      };

      try {
        setError(null);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: LeagueTableResponse = await response.json();
        setTeams(data["league-table"].teams);
      } catch (error:unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (competitionId) {
      fetchLeagueTable();
    }
  }, [competitionId]);

  if (loading) return <Backdrop isLoading={true}/>;
  

  return (
    <>
      {error ? (
        <div className="lg:px-5">
          <Alert>
            <MdOutlineReportGmailerrorred className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-500">Xin lỗi!</AlertTitle>
            <AlertDescription>
              Chúng tôi chưa có dữ liệu cho giải này. Vui lòng chọn khác!
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <>
          <div className="lg:px-5">
            <NoteDialog />
            <div className=" mt-4 mb-10 border-yellow-300 border-2 ">
              <Table className="shadow bg-transparent  rounded backdrop-blur-lg">
                <TableHeader className="bg-white  ">
                  <TableRow>
                    <TableHead
                      className="blue border border-black text-center"
                      colSpan={2}
                    >
                      CLB
                    </TableHead>
                    <TableHead
                      className="blue border border-black text-center"
                      colSpan={4}
                    >
                      Sân Nhà
                    </TableHead>
                    <TableHead
                      className="blue border border-black text-center"
                      colSpan={4}
                    >
                      Sân Khách
                    </TableHead>
                    <TableHead
                      className="blue border border-black text-center"
                      colSpan={8}
                    >
                      Tổng điểm
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="blue border border-black">
                      Vị trí
                    </TableHead>
                    <TableHead className="blue border border-black">
                      Đội
                    </TableHead>
                    <TableHead className="blue border border-black">
                      P
                    </TableHead>
                    <TableHead className="blue border border-black">
                      W
                    </TableHead>
                    <TableHead className="blue border border-black">
                      D
                    </TableHead>
                    <TableHead className="blue border border-black">
                      L
                    </TableHead>
                    <TableHead className="blue border border-black">
                      P
                    </TableHead>
                    <TableHead className="blue border border-black">
                      W
                    </TableHead>
                    <TableHead className="blue border border-black">
                      D
                    </TableHead>
                    <TableHead className="blue border border-black">
                      L
                    </TableHead>
                    <TableHead className="blue border border-black">
                      P
                    </TableHead>
                    <TableHead className="blue border border-black">
                      W
                    </TableHead>
                    <TableHead className="blue border border-black">
                      D
                    </TableHead>
                    <TableHead className="blue border border-black">
                      L
                    </TableHead>
                    <TableHead className="blue border border-black">
                      F
                    </TableHead>
                    <TableHead className="blue border border-black">
                      A
                    </TableHead>
                    <TableHead className="blue border border-black">
                      +/-
                    </TableHead>
                    <TableHead className="blue border border-black">
                      Pts
                    </TableHead>
                  
                  </TableRow>
                </TableHeader>
                <TableBody className="text-white">
                  {teams.map((team, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{team.position}</TableCell>
                      <TableCell className="yellow">{team.name}</TableCell>

                      <TableCell>{team["home-matches"].played}</TableCell>
                      <TableCell>{team["home-matches"].won}</TableCell>
                      <TableCell>{team["home-matches"].drawn}</TableCell>
                      <TableCell>{team["home-matches"].lost}</TableCell>
                      <TableCell>{team["away-matches"].played}</TableCell>
                      <TableCell>{team["away-matches"].won}</TableCell>
                      <TableCell>{team["away-matches"].drawn}</TableCell>
                      <TableCell>{team["away-matches"].lost}</TableCell>
                      <TableCell>{team["all-matches"].played}</TableCell>
                      <TableCell>{team["all-matches"].won}</TableCell>
                      <TableCell>{team["all-matches"].drawn}</TableCell>
                      <TableCell>{team["all-matches"].lost}</TableCell>
                      <TableCell>{team["all-matches"].for}</TableCell>
                      <TableCell>{team["all-matches"].lost}</TableCell>
                      <TableCell>
                        {team["all-matches"]["goal-difference"]}
                      </TableCell>
                      <TableCell>{team["total-points"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LeagueTable;
