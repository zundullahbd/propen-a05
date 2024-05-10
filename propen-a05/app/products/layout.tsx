import type { Metadata } from "next";
import MainLayout from "../components/ui/MainLayout";



export const metadata: Metadata = {
    title: "Products",
}

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <MainLayout>
        <div className="py-10 px-10">{children}</div>
      </MainLayout>
    ); 
  }