"use client";
import React, { useEffect, useState } from "react";
import "../../styles/Home.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaSort } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Backdrop from "../backdrop";

interface DataItem {
  title: string;
  thumbnail: string;
  date: string;
  side1: string;
  side2: string;
  competition: string;
  videoTitles: string[];
  videoEmbeds: string[];
}

interface ClientComponentProps {
  data: DataItem[];
}

const TableDataHighlight: React.FC<ClientComponentProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(true);

  const itemsPerPage = 7;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const maxVisiblePages = 4;

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const filteredData = data.filter(
    (item) =>
      item.side1.toLowerCase().includes(filter.toLowerCase()) ||
      item.side2.toLowerCase().includes(filter.toLowerCase()) ||
      item.competition.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof DataItem];
    const bValue = b[sortColumn as keyof DataItem];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const paginationStart = Math.max(
    1,
    currentPage - Math.floor(maxVisiblePages / 2)
  );
  const paginationEnd = Math.min(
    totalPages,
    paginationStart + maxVisiblePages - 1
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (pageNum: number) => {
     window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
    setCurrentPage(pageNum);
  };

  const router = useRouter();

  const handleRowClick = (item: DataItem) => {
    const queryParams = new URLSearchParams({
      title: item.title,
      side1: item.side1,
      side2: item.side2,
      date: item.date,
      competition: item.competition,
      videoTitles: item.videoTitles.map((video) => video).join(","),
      videoEmbeds: item.videoEmbeds.map((video) => video).join(","),
    }).toString();

    router.push(`/details?${queryParams}`);
  };

  return (
    <>
      <Backdrop isLoading={loading} />
      <div className="mb-4 mt-10 ">
        <Input
          type="text"
          placeholder="Tìm kiếm trận đấu hoặc giải đấu..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border-2 border-yellow-300 rounded w-full blue"
        />
      </div>

      <div className="mt-4 mb-10 border-yellow-300 border-2 backdrop-blur-lg ">
        <Table className="shadow bg-transparent rounded">
          <TableHeader className="bg-white">
            <TableRow>
              <TableHead
                onClick={() => handleSort("title")}
                className="cursor-pointer blue"
              >
                <div className="flex">
                  Trận đấu <FaSort className="mt-1 ms-1" />
                  {sortColumn === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                </div>
              </TableHead>
              <TableHead className="blue">Hình ảnh</TableHead>
              <TableHead className="blue">Video</TableHead>
              <TableHead
                onClick={() => handleSort("date")}
                className="cursor-pointer blue"
              >
                <div className="flex">
                  Ngày <FaSort className="mt-1 ms-1" />
                  {sortColumn === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("side1")}
                className="cursor-pointer blue"
              >
                <div className="flex">
                  Đội 1 <FaSort className="mt-1 ms-1" />
                  {sortColumn === "side1" && (sortOrder === "asc" ? "↑" : "↓")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("side2")}
                className="cursor-pointer blue"
              >
                <div className="flex">
                  Đội 2 <FaSort className="mt-1 ms-1" />
                  {sortColumn === "side2" && (sortOrder === "asc" ? "↑" : "↓")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("competition")}
                className="cursor-pointer blue"
              >
                <div className="flex">
                  Giải đấu <FaSort className="mt-1 ms-1" />
                  {sortColumn === "competition" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(item)}
                className="cursor-pointer transition duration-300 hover:scale-95 "
              >
                <TableCell className="text-white">{item.title}</TableCell>
                <TableCell>
                  <img
                    src={item.thumbnail}
                    alt="thumbnail"
                    className="lg:h-20 lg:max-w-28 h-16 max-w-20"
                  />
                </TableCell>
                <TableCell className="text-white">
                  {item.videoTitles.map((videoTitle, videoIndex) => (
                    <div key={videoIndex}>{videoTitle}</div>
                  ))}
                </TableCell>
                <TableCell className="text-white">{item.date}</TableCell>
                <TableCell className="text-white">{item.side1}</TableCell>
                <TableCell className="text-white">{item.side2}</TableCell>
                <TableCell className="text-white">{item.competition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center space-x-2 mt-4 mb-20">
        <Button
          className={` ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {Array.from(
          { length: paginationEnd - paginationStart + 1 },
          (_, idx) => {
            const pageNum = paginationStart + idx;
            return (
              <Button
                key={pageNum}
                className={`px-4 py-2 ${
                  currentPage === pageNum
                    ? "pink bg-white"
                    : "bg-transparent border border-white text-white hover:bg-white hover:text-pink-500"
                } rounded`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          }
        )}

        <Button
          className={` ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default TableDataHighlight;
