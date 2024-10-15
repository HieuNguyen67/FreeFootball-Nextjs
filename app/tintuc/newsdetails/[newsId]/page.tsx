"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/styles/Newsdetail.scss";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
import Backdrop from "@/components/backdrop";
type NewsDetailProps = {
  news_id: number;
  title: string;
  content: string;
  created_at: string;
  user_name: string;
  category_name: string;
};

const NewsDetail: React.FC = () => {
  const params = useParams(); 
  const newsId = params.newsId;

  const [newsDetail, setNewsDetail] = useState<NewsDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (newsId) {
      const fetchNewsDetail = async () => {
        try {
          const response = await fetch(
            `https://backend-football.vercel.app/v1/api/admin/news/${newsId}`
          );
          
          const data = await response.json();
          setNewsDetail(data[0]); 
          setLoading(false);
        } catch (error) {
          console.error("Error fetching news detail:", error);
          setLoading(false);
        }
      };

      fetchNewsDetail();
    }
  }, [newsId]);

  if (loading) {
    return <Backdrop isLoading={loading} />;
  }

  if (!newsDetail) {
    return <p>News not found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div>
        <Link href="/tintuc">
          <IoArrowBackSharp className="yellow text-3xl my-5" />
        </Link>
      </div>
      <div className="bg-transparent backdrop-blur-lg shadow-lg rounded-lg lg:p-8 p-5 lg:px-20 text-white border-2 ">
        <h1 className="text-3xl  mb-4">{newsDetail.title}</h1>
        <p className=" mb-4">
          {new Date(newsDetail.created_at).toLocaleDateString()} by{" "}
          {newsDetail.user_name} | Category: {newsDetail.category_name}
        </p>
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: newsDetail.content }}
        />
      </div>
    </div>
  );
};

export default NewsDetail;
