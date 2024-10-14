import "@/styles/Home.scss";

import { NewsList } from "@/components/news-list";

async function getNews() {
  const res = await fetch('https://backend-football.vercel.app/v1/api/admin/news-with-images', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function NewsPage() {
  const newsData = await getNews();

  return (
    <>
      <div className="backgroundimg3  w-12/12 lg:h-56 h-36 bg-cover bg-top bg-no-repeat"></div>
      <h1 className="text-center lg:text-3xl text-lg blue grid items-center bg-yelloww lg:h-24 h-16">
        XEM TIN TỨC BÓNG ĐÁ
      </h1>
      <div className="container mx-auto px-5">
        <NewsList news={newsData} />
      </div>
    </>
  );
}

