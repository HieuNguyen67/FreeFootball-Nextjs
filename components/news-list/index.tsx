
"use client";
import { IoTimeOutline } from "react-icons/io5";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type NewsItem = {
  news_id: number;
  title: string;
  content: string;
  created_at: string;
  image_blob: string;
};

type NewsListProps = {
  news: NewsItem[];
};

export const NewsList: React.FC<NewsListProps> = ({ news }) => {
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 6;

 const sortedNews = [...news].sort(
   (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
 );

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentNews = sortedNews.slice(indexOfFirstItem, indexOfLastItem);

 const totalPages = Math.ceil(news.length / itemsPerPage);
 const maxVisibleButtons = 5;

 const handlePageChange = (page: number) => {
   setCurrentPage(page);
 };

 const paginationButtons = () => {
   const buttons = [];
   const start = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
   const end = Math.min(totalPages, start + maxVisibleButtons - 1);

   for (let i = start; i <= end; i++) {
     buttons.push(
       <Button
         key={i}
         onClick={() => handlePageChange(i)}
         className={`px-4 py-2 mx-1 rounded ${
           i === currentPage ? "bg-white pink" : "bg-transparent text-white border border-white"
         }`}
       >
         {i}
       </Button>
     );
   }

   return buttons;
 };

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentNews.map((item) => (
          <Link href={`/tintuc/newsdetails/${item.news_id}`} key={item.news_id}>
            <div
              className="bg-transparent border-2 border-yellow-300 shadow-lg rounded-lg p-6"
            >
              <img
                src={item.image_blob}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-xl  mb-2 text-white">{item.title}</p>
              <p className="text-slate-300 mb-4">
                <span className="flex">
                  <IoTimeOutline className="text-xl me-2 mt-1" />

                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </p>
              <p className="yellow text-sm">
                {item.content.replace(/<[^>]*>?/gm, "").slice(0, 100)}...
              </p>
            </div>
           </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {paginationButtons()}
        {currentPage < totalPages && (
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 mx-1 "
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
