import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserNav from "./components/ui/userNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Best Price",
  description: "Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='w-full'>
          <UserNav />
          {children}
        </main>
      </body>
    </html>
  );
}