import { FC, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import Backdrop from "../backdrop";
import { usePathname } from "next/navigation";
import { fetchMatches, Match } from "@/util/fetchMatches";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const ITEMS_PER_PAGE = 10;
const PAGE_BUTTONS = 4;

const MatchesTable: FC<{ competitionId: number }> = ({ competitionId }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    const getMatches = async () => {
      try {
        const data = await fetchMatches(competitionId);
        setMatches(data);
      } catch (error: unknown) {
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
      setLoading(true);
      getMatches();
    }
  }, [competitionId]);

  if (loading) return <Backdrop isLoading={loading} />;
  if (error) return (
    <div className="lg:px-5">
      <Alert>
        <MdOutlineReportGmailerrorred className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-500">Xin lỗi!</AlertTitle>
        <AlertDescription>
          Chúng tôi chưa có dữ liệu cho giải này. Vui lòng chọn khác!
        </AlertDescription>
      </Alert>
    </div>
  );

   const fullTimeMatches = matches
     .filter((match) => match.status.full === "Full Time")
     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const scheduledMatches = matches.filter(
    (match) => match.status.full !== "Full Time"
  );

  const isHomePage = pathname === "/tiso";
  const matchesToDisplay = isHomePage ? fullTimeMatches : scheduledMatches;

  const filteredMatches = matchesToDisplay.filter(
    (match) =>
      match["home-team"].name.toLowerCase().includes(filter.toLowerCase()) ||
      match["away-team"].name.toLowerCase().includes(filter.toLowerCase()) ||
      match.date.toLowerCase().includes(filter.toLowerCase())
  );

  const totalItems = filteredMatches.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItemIndex = startItemIndex + ITEMS_PER_PAGE;
  const paginatedMatches = filteredMatches.slice(startItemIndex, endItemIndex);

  const renderMatchRow = (match: Match, index: number) => (
    <TableRow key={index}>
      <TableCell>{match.date}</TableCell>
      <TableCell className="yellow">{match["home-team"].name}</TableCell>
      <TableCell>
        {match["home-team"].score} - {match["away-team"].score}
      </TableCell>
      <TableCell className="yellow">{match["away-team"].name}</TableCell>
      <TableCell>{match.time}</TableCell>
      <TableCell>{match.venue}</TableCell>
      <TableCell>{match.referee || "Đang cập nhật"}</TableCell>
      <TableCell>{match.status.full}</TableCell>
    </TableRow>
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startPage = Math.max(1, currentPage - Math.floor(PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + PAGE_BUTTONS - 1);

  return (
    <div className="lg:px-5">
      <Input
        type="text"
        placeholder="Tìm tên đội hoặc ngày"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mt-5 px-3 py-2 border rounded bg-white blue"
      />
      <div className="mt-5 mb-10 border-yellow-300 border-2 ">
        <Table className=" border-2 border-yellow-300">
          <TableHeader className=" bg-white blue">
            <TableRow className="bg-white ">
              <TableHead className="blue">Ngày</TableHead>
              <TableHead className="blue">Đội nhà</TableHead>
              <TableHead className="blue">Tỉ số</TableHead>
              <TableHead className="blue">Đội khách</TableHead>
              <TableHead className="blue">Thời gian</TableHead>
              <TableHead className="blue">Sân</TableHead>
              <TableHead className="blue">Trọng tài</TableHead>
              <TableHead className="blue">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{paginatedMatches.map(renderMatchRow)}</TableBody>
        </Table>
      </div>

      <div className="mt-5 flex justify-center space-x-2">
        <Button
          className="px-3 py-1  rounded"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <Button
            key={index}
            className={`px-4 py-2 ${
              currentPage === startPage + index
                ? "pink bg-white"
                : "bg-transparent border border-white text-white hover:bg-white hover:text-pink-500"
            } rounded`}
            onClick={() => handlePageChange(startPage + index)}
          >
            {startPage + index}
          </Button>
        ))}

        <Button
          className={` ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MatchesTable;
