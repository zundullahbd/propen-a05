import MainLayout from "../components/ui/MainLayout";

export const metadata = {
    title: "Customers",
};

<<<<<<< HEAD
const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="py-10 px-10">{children}</div>;
=======
const ProductLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MainLayout>
            <div className="py-10 px-10">{children}</div>
        </MainLayout>
    );
>>>>>>> 4d6a3d7571d0d6ab0df8f5173c9d1b5ddc630acb
};

export default CustomerLayout;