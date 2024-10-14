"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/styles/Newsdetail.scss";
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
    return <p>Loading...</p>;
  }

  if (!newsDetail) {
    return <p>News not found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg lg:p-8 p-5 lg:px-20">
        <h1 className="text-3xl font-bold mb-4">{newsDetail.title}</h1>
        <p className="text-gray-500 mb-4">
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
