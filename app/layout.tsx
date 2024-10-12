import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/main-layout";
import BackToTop from "@/components/backtotop";




export const metadata: Metadata = {
  title: "Higlights, Livestream match football",
  description: "Higlights, Livestream match football",
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
