import type { Metadata } from "next";
import { Figtree } from 'next/font/google';
import "./styles/globals.css";
import UserNav from "./components/ui/userNav";
import { Toaster } from "react-hot-toast";


const figtree = Figtree({ subsets: ["latin"] });

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
      <body className={figtree.className}>
        <main className='w-full'>
          <UserNav />
          {children}
        </main>
        <div><Toaster position="bottom-right"
          reverseOrder={false} /></div>
      </body>
    </html>
  );
}