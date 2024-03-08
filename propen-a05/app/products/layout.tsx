import MainLayout from "@/components/MainLayout";

export const metadata = {
    title: "Products",
};

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
    return <MainLayout><div className="py-10 px-10">{children}</div>;</MainLayout>
};

export default ProductLayout;