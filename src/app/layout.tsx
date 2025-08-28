import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppBar from "../components/layout/AppBar";
import Footer from "../components/layout/Footer";
import { Providers } from "./providers"; // <-- استدعاء المزود
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "نوطتي | Noutti",
  description:
    "منصة ذكية لتبادل الكتب، النوط، والقرطاسية بين الطلاب السوريين بسهولة وأمان. انضم إلى مجتمع طلابي يساعد بعضه البعض ويوفر الوقت والمال.",

 icons: {
    icon: "/public/undraw_books_wxzz.svg",
  },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AppBar />
         
           <Toaster position="top-center" />
          {children}
         
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
