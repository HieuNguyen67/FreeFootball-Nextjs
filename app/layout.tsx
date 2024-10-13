import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/main-layout";
import BackToTop from "@/components/backtotop";




export const metadata: Metadata = {
  title: "Higlights, Livestream bóng đá",
  description: "Xem Higlights, Livestream video bóng đá",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
        <BackToTop />
      </body>
    </html>
  );
}
